interface ButtonProps {
  className?: string;
  children: React.ReactNode; // любое, что можно отрендерить в JSX
  type?: 'button' | 'submit' | 'reset';
}

const Button = (props: ButtonProps) => {
  const { className, children, type = 'button' } = props;
  return (
    <button className={`button${className ? ' ' + className : ''}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
