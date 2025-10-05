import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { INotificationCardProps } from "../Interfaces/ComponentsInterfaces";

export function NotificationCard({
  message,
  isSuccess,
  show,
  onClose,
  duration = 3000,
}: INotificationCardProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium z-50 ${
            isSuccess ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
