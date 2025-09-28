// components/SlideAlert.tsx
import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface SlideAlertProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export function SlideAlert({ type, message, onClose }: SlideAlertProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 3000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className={`fixed top-23 right-4 z-50`}>
      <div
        className={`flex items-center gap-3 px-5 py-3 shadow-lg rounded-xl transition-all duration-300 text-white ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
