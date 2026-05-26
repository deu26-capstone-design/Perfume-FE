import toast, { type ToastOptions } from 'react-hot-toast';

const LAYERING_TOAST_STYLE: React.CSSProperties = {
  borderRadius: '50px',
  background: '#ffffff',
  color: 'var(--gray-800)',
  border: '1px solid #f5f5f4',
  fontSize: '0.9rem',
  fontWeight: '600',
  padding: '16px 28px',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  letterSpacing: '-0.02em',
};

export const layeringToast = (message: string, options?: ToastOptions) => {
  return toast(message, {
    ...options,
    style: { ...LAYERING_TOAST_STYLE, ...options?.style },
  });
};

layeringToast.dismiss = () => {
  return toast.dismiss();
};
