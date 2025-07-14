import React from 'react';

export const Label = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-white mb-1 ${className}`}>
      {children}
    </label>
  );
};
