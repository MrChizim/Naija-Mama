import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function WeekCard({ weekNum, data, compact = false }) {
  if (compact) {
    return (
      <div style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: '24px 20px',
        minWidth: 220,
        transition: 'all 200ms ease',
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
      >
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 40,
          fontWeight: 700,
          color: 'var(--color-primary)',
          lineHeight: 1,
          marginBottom: 4,
        }}>
          W{weekNum}
        </div>
        <div style={{ marginBottom: 8, color: 'var(--crimson)' }}>
          <Icon name={data?.babySizeIcon || 'seed'} size={22} color="var(--crimson)" />
        </div>
        <p style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--color-text-dark)',
          marginBottom: 8,
        }}>
          {data?.babySize}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px' }}>
          {data?.development?.slice(0, 2).map((item, i) => (
            <li key={i} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--color-text-mid)',
              lineHeight: 1.5,
              paddingLeft: 16,
              position: 'relative',
              marginBottom: 4,
            }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--color-primary)' }}>•</span>
              {item}
            </li>
          ))}
        </ul>
        <Link to={`/tracker?week=${weekNum}`} style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 13,
          color: 'var(--color-primary)',
          fontWeight: 600,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          Read more →
        </Link>
      </div>
    );
  }

  return null;
}
