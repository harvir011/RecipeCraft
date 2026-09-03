export default function Card({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`
        bg-white
        rounded-2xl
        shadow-premium
        hover:shadow-premium-lg
        transition-all duration-300
        p-6
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
