import './Button.css';

const Button = ({
  label,
  type = 'button',
  variant = 'primary', // primary | secondary | danger
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`custom-button ${variant}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
