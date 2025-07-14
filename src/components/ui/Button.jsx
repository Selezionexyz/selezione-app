import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
