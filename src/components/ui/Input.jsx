import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      type="text"
      className={`p-3 rounded w-full ${className}`}
      {...props}
    />
  );
}
