// Select.jsx
import React from 'react';

const Select = ({ value, onChange, children }) => (
    <select className="select-field" value={value} onChange={onChange}>
        {children}
    </select>
);

export const SelectItem = ({ value, children }) => (
    <option value={value}>{children}</option>
);

export default Select; // Ensure this is a default export
