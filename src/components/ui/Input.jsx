import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-semibold text-charcoal mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full
          px-4 py-3
          border-2 border-gray-200
          rounded-xl
          font-body
          text-charcoal
          placeholder-charcoal-light
          transition-all
          focus:outline-none
          focus:border-fresh-green
          focus:shadow-green-glow
          disabled:bg-cream-dark
          disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500 focus:shadow-none' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm mt-2 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
