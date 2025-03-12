// Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ children, className = '', onClick, ...props }) => (
    <button className={`btn ${className}`} onClick={onClick} {...props}>
        {children}
    </button>
);

export default Button; // Default export
