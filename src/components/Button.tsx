interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`mb-4 bg-blue-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded ${
          className || ""
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
