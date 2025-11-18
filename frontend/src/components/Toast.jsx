import { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 dark:bg-green-600',
    error: 'bg-red-500 dark:bg-red-600',
    warning: 'bg-yellow-500 dark:bg-yellow-600',
    info: 'bg-blue-500 dark:bg-blue-600',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${typeStyles[type]} text-white px-6 py-4 rounded-lg shadow-lg animate-slideInDown flex items-center gap-3 max-w-md`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-2xl" aria-hidden="true">{icons[type]}</span>
      <p className="flex-1">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-white/20 rounded p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;