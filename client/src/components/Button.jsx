export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-orange-400 px-3 ${className} mx-auto transition-all duration-200 hover:bg-orange-300 hover:font-bold`}
    >
      {" "}
      {children}{" "}
    </button>
  );
}
