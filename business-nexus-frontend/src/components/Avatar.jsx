import './Avatar.css';

const Avatar = ({ src, alt = 'User Avatar', size = 'medium' }) => {
  return (
    <div className={`avatar avatar-${size}`}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
