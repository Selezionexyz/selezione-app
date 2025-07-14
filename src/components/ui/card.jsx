import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-black border border-amber-500/30 rounded-xl p-4 shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`text-white ${className}`} {...props}>
      {children}
    </div>
  );
}
