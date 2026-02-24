import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { auth } from "@/features/auth/services/firebase";
import { waitForAuthReady } from "@/features/auth/services/authReady";
import { loadPreferencesFromStorage, savePreferencesToStorage } from "@shared/utils/helpers/storage";
import { loadPreferencesFromFirestore, savePreferencesToFirestore } from "@shared/utils/helpers/firestoreStorage";
import type { Preferences } from "@/features/preferences/models/Preferences";

type PreferencesState = {
  preferences: Preferences;
  loading: boolean;
  error: string | null;
};

export const loadPreferences = createAsyncThunk<Preferences>(
  "preferences/loadPreferences",
  async (_, { rejectWithValue }) => {
    try {
      await waitForAuthReady();
      const user = auth.currentUser;

      if (!user) {
        const localPreferences =
          loadPreferencesFromStorage();

        savePreferencesToStorage(localPreferences);
        return localPreferences;
      }

      var  preferences  = await loadPreferencesFromFirestore();
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

      const merged: Preferences = { ...current, ...updates };

      savePreferencesToStorage(merged);

      if (user) {
        savePreferencesToFirestore(updates)
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
  reducers: {  },
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

export default preferencesSlice.reducer;
