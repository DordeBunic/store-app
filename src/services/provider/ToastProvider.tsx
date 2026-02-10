import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import type { RootState } from "@/services/state/store";
import { Toast } from "@/components/Toast";
import { removeToast } from "@/services/state/toastSlice";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toast.toasts);

  const handleClose = useCallback(
    (id: string) => {
      dispatch(removeToast(id));
    },
    [dispatch],
  );

  return (
    <>
      {children}

      {createPortal(
        <div className="toast-container gap-3 flex flex-row position-fixed">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              onClose={handleClose}
              toastType={toast.type}
            />
          ))}
        </div>,
        document.body,
      )}
    </>
  );
};
