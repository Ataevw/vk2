interface FieldProps {
  className?: string;
  id: string;
  label: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
}

const Field = (props: FieldProps) => {
  const { className, id, label, type = 'text' } = props;

  return (
    <div className={`field${className ? ' ' + className : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="field__input"
        id={id}
        placeholder=" "
        autoComplete="off"
        type={type}
      />
    </div>
  );
};

export default Field;
