// /src/components/ui/Input.jsx
import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      type="text"
      className={`text-black bg-white p-3 rounded w-full ${className}`}
      {...props}
    />
  );
}
