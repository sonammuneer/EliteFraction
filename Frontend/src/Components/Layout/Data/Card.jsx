// Card.jsx
import React from 'react';
import './Card.css';

export const Card = ({ children, className = '' }) => (
    <div className={`card ${className}`}>
        {children}
    </div>
);

export const CardContent = ({ children }) => (
    <div className="card-content">
        {children}
    </div>
);

export default Card;

