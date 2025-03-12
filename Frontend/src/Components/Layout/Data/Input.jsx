// Input.jsx
import React from 'react';
import './Input.css';

const Input = ({ placeholder, value, onChange, className = '', ...props }) => (
    <input
        className={`input-field ${className}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
    />
);

export default Input; // Make sure this is a default export
