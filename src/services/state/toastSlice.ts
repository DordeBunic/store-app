import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ToastItem, ToastType } from "@/models/ToastMessage";

interface ToastState {
  toasts: ToastItem[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<{ message: string; type?: ToastType }>,
    ) => {
      state.toasts.push({
        id: crypto.randomUUID(),
        message: action.payload.message,
        type: action.payload.type ?? "info",
      });
    },

    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
