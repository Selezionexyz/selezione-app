import React from 'react';

export function Button({ onClick, children, className = '', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded transition-all disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
