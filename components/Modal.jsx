import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className={`${sizeClasses[size]} w-full bg-white rounded-3xl shadow-premium-lg max-h-[90vh] overflow-y-auto animate-slideUp`}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-3xl font-bold font-header text-charcoal">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-cream-dark transition-colors"
          >
            <X size={24} className="text-charcoal" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
