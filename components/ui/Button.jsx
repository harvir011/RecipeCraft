export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-accent text-white shadow-lg shadow-accent/30 hover:bg-accent-dark hover:-translate-y-1 active:translate-y-0 active:shadow-md focus:ring-accent',
    secondary: 'bg-cream text-terra border border-border shadow-premium hover:bg-cream-dark transition-all focus:ring-terra',
    outline: 'bg-white text-terra border-2 border-terra shadow-premium hover:bg-cream focus:ring-terra'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
