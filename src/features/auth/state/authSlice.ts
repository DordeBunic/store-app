import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { LoginCredentials } from "@/features/auth/models/LoginCredentials";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth, getAuth } from "@/features/auth/services/firebase";
import type { AuthUser } from "@/features/auth/models/AuthUser";
import type { RegisterCredentials } from "@/features/auth/models/RegisterCredentials";

type AuthState = {
  user: AuthUser | null;
  error: string | null;
};

export const logInUserAsync = createAsyncThunk<
  AuthUser,
  LoginCredentials,
  { rejectValue: string }
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
      return rejectWithValue(error.code)
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
  { rejectValue: string }
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
      return rejectWithValue(error.code);
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
    builder.addCase(logInUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });

    builder.addCase(logInUserAsync.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      }
    });
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
