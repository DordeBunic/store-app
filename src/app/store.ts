import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@features/auth/state/authSlice";
import cartReducer from "@features/cart/state/cartSlice";
import toastReducer from "@features/toast/state/toastSlice";
import preferencesReducer from "@/features/preferences/state/preferencesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    toast: toastReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
