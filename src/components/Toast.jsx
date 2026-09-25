import { X, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  const styleMap = {
    success: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-600',
      icon: CheckCircle2,
      iconColor: 'text-white',
    },
    error: {
      bg: 'bg-red-500',
      border: 'border-red-600',
      icon: XCircle,
      iconColor: 'text-white',
    },
    warning: {
      bg: 'bg-amber-500',
      border: 'border-amber-600',
      icon: AlertCircle,
      iconColor: 'text-white',
    },
    info: {
      bg: 'bg-[#0F4C81]',
      border: 'border-[#1E3A8A]',
      icon: Info,
      iconColor: 'text-white',
    },
  };

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-[400px]">
      {toasts.map((toast) => {
        const style = styleMap[toast.type] || styleMap.info;
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto ${style.bg} text-white rounded-2xl shadow-2xl border ${style.border} p-4 pr-10 flex items-start gap-3 animate-in slide-in-from-right-2 fade-in duration-300 min-w-[280px]`}
            style={{
              animation: 'slideInRight 0.3s ease-out',
            }}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.iconColor}`} />
            <div className="flex-1 text-[13px] font-semibold leading-snug break-words">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute right-2 top-2 w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}