/**
 * Badge Component - Display status, type, or labels
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-dm-sans font-medium rounded-full inline-flex items-center justify-center whitespace-nowrap';

  const variants = {
    default: 'bg-slate-700 text-slate-200',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    income: 'bg-green-500/20 text-green-400',
    expense: 'bg-red-500/20 text-red-400',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
