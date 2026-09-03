import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  options = [],
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
      <select
        ref={ref}
        className={`
          w-full
          px-4 py-3
          border-2 border-gray-200
          rounded-xl
          font-body
          text-charcoal
          bg-white
          cursor-pointer
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
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-600 text-sm mt-2 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
