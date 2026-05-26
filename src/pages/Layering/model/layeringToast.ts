import toast, { type ToastOptions } from 'react-hot-toast';
import type { CSSProperties } from 'react';

const LAYERING_TOAST_STYLE: CSSProperties = {
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

type LayeringToastFn = ((message: string, options?: ToastOptions) => ReturnType<typeof toast>) & {
  dismiss: () => ReturnType<typeof toast.dismiss>;
};

export const layeringToast = ((message: string, options?: ToastOptions) => {
  return toast(message, {
    ...options,
    style: { ...LAYERING_TOAST_STYLE, ...options?.style },
  });
}) as LayeringToastFn;

layeringToast.dismiss = () => toast.dismiss();
