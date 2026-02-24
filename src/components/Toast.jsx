import { useEffect, useState } from 'react';

export default function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 32,
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      opacity: visible ? 1 : 0,
      transition: 'all 300ms ease',
      background: 'var(--color-primary)',
      color: 'white',
      padding: '14px 24px',
      borderRadius: 50,
      fontFamily: 'var(--font-accent)',
      fontSize: 15,
      fontWeight: 500,
      boxShadow: '0 8px 32px rgba(194,24,91,0.3)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      whiteSpace: 'nowrap',
    }}>
      <span>✓</span>
      {message}
    </div>
  );
}
