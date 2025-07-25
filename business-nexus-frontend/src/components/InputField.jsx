import './InputField.css';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="input-field"
      />
    </div>
  );
};

export default InputField;
