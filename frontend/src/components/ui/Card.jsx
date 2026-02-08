/**
 * Generic Card wrapper
 * Used for consistent UI blocks
 */
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-xl
        border
        border-zinc-800
        bg-zinc-900/90
        shadow-sm
        transition-shadow
        hover:shadow-md
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
