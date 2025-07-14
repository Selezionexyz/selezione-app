import React from 'react';

export function Input({ type = 'text', value, onChange, placeholder = '', className = '' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`bg-black border border-amber-500/30 text-white p-2 rounded w-full ${className}`}
    />
  );
}
