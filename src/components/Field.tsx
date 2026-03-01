interface FieldProps {
  className?: string;
  id: string;
  label: string;
  value?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  onInput?: (query: string) => void;
}

const Field = (props: FieldProps) => {
  const { className, id, label, value, type = 'text', onInput } = props;

  return (
    <div className={`field ${className ?? ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="field__input"
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onInput?.(e.target.value)
        }
      />
    </div>
  );
};

export default Field;
