import { useEffect } from "react";
import type { ToastType } from "@/models/ToastMessage";
import { IoCloseSharp } from "react-icons/io5";
import Text from "./ui/Text";
import { IconSizes } from "@/constants/iconSizes";

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
      <Text size="base" className={"pr-3 m-0 toast-" + toastType}>
        {message}
      </Text>
      <IoCloseSharp
        onClick={() => onClose(id)}
        aria-label="Dismiss"
        size={IconSizes.Toast}
      ></IoCloseSharp>
    </div>
  );
};
