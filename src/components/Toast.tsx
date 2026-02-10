import { useEffect } from "react";
import type { ToastType } from "@/models/ToastMessage";
import { IoCloseSharp } from "react-icons/io5";
import { Typography } from "./ui/Text";

interface ToastProps {
  id: string;
  message: string;
  onClose: (id: string) => void;
  duration?: number;
  toastType: ToastType;
}

export const Toast = ({
  id,
  message,
  onClose,
  duration = 7000,
  toastType,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={
        "toast flex align-items-center justify-content-space-between px-3 py-4 radius-8 text-sm" +
        " toast-" +
        toastType
      }
      role="status"
      aria-live="polite"
    >
      <Typography size="base" className={"pr-3 m-0 toast-" + toastType}>
        {message}
      </Typography>
      <IoCloseSharp
        onClick={() => onClose(id)}
        aria-label="Dismiss"
        size={20}
      ></IoCloseSharp>
    </div>
  );
};
