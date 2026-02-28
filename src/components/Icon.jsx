const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.5 16.5L21 21" strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 9h18" />
    </>
  ),
  calculator: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
    </>
  ),
  baby: (
    <>
      {/* Baby face with cap */}
      <circle cx="12" cy="10" r="4" />
      {/* Body swaddle */}
      <path d="M8 14c0 0-2 1-2 4h12c0-3-2-4-2-4" />
      {/* Little hands */}
      <path d="M8 16.5c-1 0-1.5-.5-1.5-1M16 16.5c1 0 1.5-.5 1.5-1" />
    </>
  ),
  pregnant: (
    <>
      {/* Head */}
      <circle cx="11" cy="5.5" r="2.5" />
      {/* Torso with baby bump */}
      <path d="M11 8v3" />
      <path d="M8 11c0 0-1 1-1 3s.5 3 1 3.5" />
      <path d="M11 11c2.5.5 5 2.5 5 4.5s-2 3.5-4 3.5c-1 0-2-.3-3-1" />
      {/* Legs */}
      <path d="M8.5 17.5L7.5 21M11.5 17.5l.5 3.5" />
    </>
  ),
  food: (
    <>
      {/* Bowl shape */}
      <path d="M4 11h16a8 8 0 0 1-16 0z" />
      {/* Steam lines */}
      <path d="M8 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4" />
      {/* Spoon */}
      <path d="M20 3v4" strokeLinecap="round" />
    </>
  ),
  hospital: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M12 9v6M9 12h6" />
      <path d="M9 3h6v3H9z" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h2M12 7h2M16 7h0M8 11h2M12 11h2M8 15h2M12 15h2" />
    </>
  ),
  map: (
    <>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10z" />
      <circle cx="12" cy="11" r="2" />
    </>
  ),
  directions: (
    <>
      <path d="M4 12l8-8 8 8-8 8-8-8z" />
      <path d="M12 7v10M9 10h6" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v10H7l-3 3V5z" />
      <path d="M8 9h8M8 12h6" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.5-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.5-7 9-7 9z" />
  ),
  star: (
    <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.8 6.6 19.8l1-6.1L3.2 9.4l6.1-.9L12 3z" />
  ),
  check: (
    <path d="M5 13l4 4L19 7" />
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M12 8v13M3 12h18" />
      <path d="M7 8a2.5 2.5 0 1 1 0-5c2 0 5 5 5 5s3-5 5-5a2.5 2.5 0 1 1 0 5" />
    </>
  ),
  shield: (
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
  ),
  refresh: (
    <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v6h-6" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9h18L12 3 3 9z" />
      <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
      <path d="M3 18h18" />
    </>
  ),
  alert: (
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </>
  ),
  sunrise: (
    <>
      <path d="M4 17h16" />
      <path d="M12 7v4" />
      <path d="M5 13h14a7 7 0 0 0-14 0z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: (
    <path d="M20 14a7 7 0 1 1-7-10 6 6 0 0 0 7 10z" />
  ),
  snack: (
    <>
      {/* Cup / snack cup */}
      <path d="M7 7h10l-1.5 10H8.5L7 7z" />
      <path d="M5 7h14" />
      <path d="M10 11h4" />
    </>
  ),
  leaf: (
    <path d="M4 20c8-1 12-5 16-13 1 8-3 12-11 13H4z" />
  ),
  crown: (
    <path d="M3 18h18l-2-9-5 4-4-6-4 6-5-4-2 9z" />
  ),
  seed: (
    <>
      <circle cx="12" cy="13" r="5" />
      <path d="M12 8c0-2 2-3 3-3" />
    </>
  ),
  berry: (
    <>
      <circle cx="12" cy="13" r="6" />
      <path d="M12 7c0-2 2-3 3-3" />
    </>
  ),
  lemon: (
    <path d="M7 12c0-4 4-7 5-7s5 3 5 7-4 7-5 7-5-3-5-7z" />
  ),
  avocado: (
    <>
      <path d="M12 4c4 0 7 4 7 9s-3 7-7 7-7-2-7-7 3-9 7-9z" />
      <circle cx="12" cy="14" r="2.5" />
    </>
  ),
  mango: (
    <path d="M8 5c6-2 11 4 8 10-3 6-12 5-12-2 0-3 1-6 4-8z" />
  ),
  corn: (
    <>
      <path d="M12 4c3 0 5 4 5 8s-2 8-5 8-5-4-5-8 2-8 5-8z" />
      <path d="M9 6h6M9 9h6M9 12h6M9 15h6" />
    </>
  ),
  coconut: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="10" cy="10" r="1" />
      <circle cx="14" cy="10" r="1" />
      <path d="M10 14c2 1 4 1 6 0" />
    </>
  ),
  bean: (
    <path d="M7 7c5-2 10 2 10 7s-6 6-9 3-3-8-1-10z" />
  ),
  melon: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  watermelon: (
    <>
      <path d="M4 12a8 8 0 0 0 16 0z" />
      <path d="M8 13h.01M12 15h.01M16 13h.01" />
    </>
  ),
};

export default function Icon({ name, size = 18, color = 'currentColor', stroke = 2, style }) {
  const node = paths[name];
  if (!node) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {node}
    </svg>
  );
}
