import { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function Toast({ type = 'info', message, onClose, duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: {
      bg: 'bg-fresh-green',
      text: 'text-white',
      icon: <CheckCircle className="text-white" size={20} />
    },
    error: {
      bg: 'bg-red-500',
      text: 'text-white',
      icon: <AlertCircle className="text-white" size={20} />
    },
    info: {
      bg: 'bg-blue-500',
      text: 'text-white',
      icon: <Info className="text-white" size={20} />
    }
  };

  const config = styles[type] || styles.info;

  return (
    <div className={`
      fixed bottom-6 right-6 max-w-sm
      ${config.bg} ${config.text}
      rounded-xl shadow-premium-lg
      p-4 flex items-start gap-3
      animate-slideIn
      z-50
    `}>
      {config.icon}
      <p className="flex-1 font-body font-semibold">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="text-current hover:opacity-80 transition-opacity"
      >
        <X size={18} />
      </button>
    </div>
  );
}
