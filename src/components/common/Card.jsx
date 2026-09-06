import React from 'react';

export default function Card({ title, subtitle, children, style = {}, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1.5rem',
        background: 'var(--bg)',
        boxShadow: 'var(--shadow)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textAlign: 'left',
        ...style
      }}
    >
      {title && <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-h)' }}>{title}</h3>}
      {subtitle && <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text)', fontSize: '0.9rem', fontWeight: 'normal' }}>{subtitle}</h4>}
      <div>{children}</div>
    </div>
  );
}
