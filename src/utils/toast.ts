import type { ToastType } from "@/models/ToastMessage";
import type { AppDispatch } from "@/services/state/store";
import { addToast } from "@/services/state/toastSlice";

export const showErrorToast = (message: string, dispatch: AppDispatch) => {
    showToast(message, "error", dispatch);
};

export const showSuccessToast = (message: string, dispatch: AppDispatch) => {
    showToast(message, "success", dispatch);
};

const showToast = (message: string, type: ToastType, dispatch: AppDispatch) => {
    dispatch(addToast({ message, type }));
};