/**
 * Button Component
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-dm-sans font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none';

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600 disabled:bg-slate-600 disabled:cursor-not-allowed',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed',
    ghost: 'text-slate-300 hover:text-white hover:bg-slate-700/50 disabled:text-slate-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
