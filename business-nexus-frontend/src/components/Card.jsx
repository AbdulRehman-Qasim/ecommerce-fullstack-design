import './Card.css';

const Card = ({ title, children, footer, style = {}, className = '' }) => {
  return (
    <div className={`custom-card ${className}`} style={style}>
      {title && <div className="card-header"><h3>{title}</h3></div>}

      <div className="card-body">
        {children}
      </div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
