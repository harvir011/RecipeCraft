export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  selected = false,
  ...props
}) {
  const baseClasses = 'inline-block rounded-full font-semibold transition-all duration-200';

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm'
  };

  const variantClasses = {
    primary: selected ? 'bg-fresh-green text-white' : 'bg-fresh-green-light text-fresh-green',
    dietary: selected ? 'bg-fresh-green text-white' : 'bg-fresh-green-light text-fresh-green',
    cuisine: selected ? 'bg-fresh-green text-white' : 'bg-fresh-green-light text-fresh-green'
  };

  return (
    <span
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer hover:shadow-green-glow hover:scale-105' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
}
