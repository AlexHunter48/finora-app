export default function Button({ children, className }) {
  return (
    <button
      className={`rounded-full bg-orange-400 px-3 ${className} transition-all duration-200 hover:bg-orange-300 hover:font-bold`}
    >
      {" "}
      {children}{" "}
    </button>
  );
}
