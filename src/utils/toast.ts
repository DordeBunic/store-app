import type { ToastType } from "@/models/ToastMessage";
import type { AppDispatch } from "@/services/state/store";
import { addToast } from "@/services/state/toastSlice";
import { useDispatch } from "react-redux";

export const showErrorToast = (message: string) =>{
    showToast(message, "error");
}
export const showSuccessToast = (message: string) =>{
    showToast(message, "success");
}

const showToast = (message: string, type: ToastType) =>{
    const dispatch = useDispatch<AppDispatch>();
    dispatch(addToast({ message, type }));
}