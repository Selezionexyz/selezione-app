import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-black border border-amber-500 rounded-lg p-4 shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={`text-white ${className}`}>
      {children}
    </div>
  );
}
