export default function Button({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        rounded-full
        border border-white
        px-4 py-2
        uppercase
        transition
        hover:bg-white
        hover:text-[#1d2946]
        ${className}
      `}
    >
      {children}
    </button>
  );
}