interface ButtonProps {
  className?: string;
  children: React.ReactNode; // любое, что можно отрендерить в JSX
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { className, children, type = 'button', onClick } = props;
  return (
    <button
      className={`button${className ? ' ' + className : ''}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
