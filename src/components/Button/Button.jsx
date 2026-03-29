import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark focus-visible:ring-offset-2 focus-visible:ring-offset-beige-light';

  const variants = {
    primary: 'bg-dark text-beige-light hover:bg-dark/90',
    outline: 'border border-dark text-dark hover:bg-dark hover:text-beige-light',
    ghost: 'text-dark hover:bg-dark/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
