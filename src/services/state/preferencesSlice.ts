import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/services/api/firebase";
import { waitForAuthReady } from "../api/authReady";
import type { Theme } from "@/models/Theme";
import type { Language } from "@/models/Language";
import { STORAGE_KEYS } from "@/constants/localStorage";
import { storage } from "@/utils/localStorage";

export type Preferences = {
  theme: Theme;
  language: Language;
};

type PreferencesState = {
  preferences: Preferences | null;
  loading: boolean;
  error: string | null;
};

const defaultPreferences: Preferences = {
  theme: "blue",
  language: "en",
};

const loadPreferencesFromStorage = (): Preferences | null => {
  return storage.get<Preferences>(STORAGE_KEYS.PREFERENCES_KEY);
};

const savePreferencesToStorage = (preferences: Preferences) => {
  storage.set(STORAGE_KEYS.PREFERENCES_KEY, preferences);
};

export const loadPreferences = createAsyncThunk<Preferences>(
  "preferences/loadPreferences",
  async (_, { rejectWithValue }) => {
    try {
      await waitForAuthReady();
      const user = auth.currentUser;

      // Not logged in → localStorage or defaults
      if (!user) {
        const localPreferences =
          loadPreferencesFromStorage() ?? defaultPreferences;

        savePreferencesToStorage(localPreferences);
        return localPreferences;
      }

      const docRef = doc(db, "userPreferences", user.uid);
      const docSnap = await getDoc(docRef);

      const preferences = docSnap.exists()
        ? (docSnap.data() as Preferences)
        : defaultPreferences;

      if (!docSnap.exists()) {
        await setDoc(docRef, defaultPreferences);
      }

      savePreferencesToStorage(preferences);
      return preferences;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to load preferences");
    }
  },
);

export const updatePreferences = createAsyncThunk<
  Preferences,
  Partial<Preferences>,
  { state: { preferences: PreferencesState } }
>(
  "preferences/updatePreferences",
  async (updates, { getState, rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      const current = getState().preferences.preferences;

      if (!current) throw new Error("No preferences loaded");

      const merged: Preferences = { ...current, ...updates };

      savePreferencesToStorage(merged);

      if (user) {
        const docRef = doc(db, "userPreferences", user.uid);
        await setDoc(docRef, updates, { merge: true });
      }

      return merged;
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to update preferences");
    }
  },
);

const initialState: PreferencesState = {
  preferences: loadPreferencesFromStorage(),
  loading: false,
  error: null,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    clearPreferences: (state) => {
      state.preferences = null;
      state.loading = false;
      state.error = null;

      storage.remove(STORAGE_KEYS.PREFERENCES_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadPreferences.fulfilled,
        (state, action: PayloadAction<Preferences>) => {
          state.loading = false;
          state.preferences = action.payload;
        },
      )
      .addCase(loadPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePreferences.fulfilled,
        (state, action: PayloadAction<Preferences>) => {
          state.loading = false;
          state.preferences = action.payload;
        },
      )
      .addCase(updatePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
