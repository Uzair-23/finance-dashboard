/**
 * Card Component - Container with glassmorphism styling
 */
const Card = ({
  children,
  className = '',
  onClick,
  padding = 'p-6',
  ...props
}) => {
  const baseStyles = 'border border-slate-700/50 bg-slate-800/60 backdrop-blur rounded-lg transition-all duration-200 hover:border-slate-600/70';
  
  return (
    <div
      className={`${baseStyles} ${padding} ${className} ${onClick ? 'cursor-pointer hover:bg-slate-800/80' : ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
