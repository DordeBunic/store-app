import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { LoginCredentials } from "@/models/LoginCredentials";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth, getAuth } from "@/services/api/firebase";
import type { TranslationKey } from "../i18n/I18nContext";
import type { AuthUser } from "@/models/AuthUser";
import type { RegisterCredentials } from "@/models/RegisterCredentials";

type AuthState = {
  user: AuthUser | null;
  error: TranslationKey | null;
};

export const logInUserAsync = createAsyncThunk<
  AuthUser,
  LoginCredentials,
  { rejectValue: TranslationKey }
>("auth/logInUserAsync", async (params, { rejectWithValue }) => {
  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      params.email,
      params.password,
    );

    const user = credential.user;

    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error: any) {
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      return rejectWithValue("auth.wrong_credentials");
    }
    return rejectWithValue("auth.something_went_wrong");
  }
});
export const logOutUserAsync = createAsyncThunk(
  "auth/logOutUserAsync",
  async () => {
    const auth = getAuth();
    await signOut(auth);
  },
);

export const registerUserAsync = createAsyncThunk<
  AuthUser,
  RegisterCredentials,
  { rejectValue: TranslationKey }
>("auth/registerUserAsync", async (params, { rejectWithValue }) => {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password,
    );

    const user = credential.user;

    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return rejectWithValue("auth.email_already_in_use");
      case "auth/invalid-email":
        return rejectWithValue("auth.invalid_email");
      case "auth/weak-password":
        return rejectWithValue("auth.weak_password");
      default:
        return rejectWithValue("auth.something_went_wrong");
    }
  }
});

const initialState: AuthState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(logInUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(logInUserAsync.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
    });

    // REGISTER
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(registerUserAsync.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
