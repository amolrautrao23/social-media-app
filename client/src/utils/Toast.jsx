// src/components/ToastMessage.js
import { toast } from 'react-toastify';

// Simple toast
export const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'warning':
      toast.warning(message);
      break;
    case 'info':
    default:
      toast.info(message);
      break;
  }
};

// Async toast
export const showAsyncToast = (promise, messages) => {
  // messages = { pending, success, error }
  return toast.promise(
    promise,
    {
      pending: messages.pending || 'Processing...',
      success: messages.success || 'Success 🎉',
      error: messages.error || 'Something went wrong ❌',
    },
    {
      position: 'top-right',
      autoClose: 3000,
    }
  );
};
