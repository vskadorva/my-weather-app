
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Button component with various states and appearances
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactElement} Button component
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  loadingIcon = null,
  className = '',
  type = 'button',
  'data-cy': dataCy = 'button',
  ...rest
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    disabled ? 'button--disabled' : '',
    loading ? 'button--loading' : '',
    icon ? 'button--with-icon' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      data-cy={dataCy}
      {...rest}
    >
      {loading && loadingIcon ? (
        <span className="button__loading-icon">{loadingIcon}</span>
      ) : icon ? (
        <span className="button__icon">{icon}</span>
      ) : null}
      <span className="button__text">{children}</span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  loadingIcon: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  'data-cy': PropTypes.string
};

export default Button;
