import type { ToastType } from "@/features/toast/models/ToastMessage";
import { addToast } from "@/features/toast/state/toastSlice";
import type { AppDispatch } from "@app/store";

export const showErrorToast = (message: string, dispatch: AppDispatch) => {
    showToast(message, "error", dispatch);
};

export const showSuccessToast = (message: string, dispatch: AppDispatch) => {
    showToast(message, "success", dispatch);
};

const showToast = (message: string, type: ToastType, dispatch: AppDispatch) => {
    dispatch(addToast({ message, type }));
};