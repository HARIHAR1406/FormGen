import toast from 'react-hot-toast';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const defaultOptions = {
  duration: 4000,
  style: {
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-secondary)',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  }
};

export const notify = {
  success: (message, options = {}) => {
    return toast.success(message, {
      ...defaultOptions,
      icon: <FiCheckCircle color="#10B981" size={18} />,
      ...options,
    });
  },
  error: (message, options = {}) => {
    return toast.error(message, {
      ...defaultOptions,
      icon: <FiAlertCircle color="#EF4444" size={18} />,
      ...options,
    });
  },
  info: (message, options = {}) => {
    return toast(message, {
      ...defaultOptions,
      icon: <FiInfo color="#3B82F6" size={18} />,
      ...options,
    });
  },
  loading: (message, options = {}) => {
    return toast.loading(message, {
      ...defaultOptions,
      ...options,
    });
  },
  dismiss: (toastId) => toast.dismiss(toastId),
};
