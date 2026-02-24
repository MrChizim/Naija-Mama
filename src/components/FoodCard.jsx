import { useState } from 'react';
import Icon from './Icon';

export default function FoodCard({ food }) {
  const [expanded, setExpanded] = useState(false);

  const safetyConfig = {
    safe: { label: 'Safe & Recommended', bg: '#ECFDF5', color: '#065F46', border: '#6EE7B7' },
    moderate: { label: 'Eat in Moderation', bg: '#FFFBEB', color: '#92400E', border: '#FCD34D' },
    avoid: { label: 'Avoid During Pregnancy', bg: '#FEF2F2', color: '#991B1B', border: '#FCA5A5' },
  };

  const config = safetyConfig[food.safety];

  const trimesterLabels = {
    first: '1st Trim',
    second: '2nd Trim',
    third: '3rd Trim',
  };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: 'var(--color-white)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        border: `1.5px solid ${expanded ? config.border : 'transparent'}`,
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, overflow: 'hidden', background: 'var(--ivory-dark)', border: `1.5px solid ${cfg.border}` }}>
            {food.image && <img src={food.image} alt={food.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--color-text-dark)',
            lineHeight: 1.3,
          }}>{food.name}</h3>
        </div>
        <span style={{ fontSize: 14, color: 'var(--color-text-light)', marginTop: 4 }}>
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      {/* Safety Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 12px',
        background: config.bg,
        color: config.color,
        borderRadius: 20,
        fontFamily: 'var(--font-accent)',
        fontSize: 12,
        fontWeight: 600,
        marginBottom: 12,
      }}>
        {config.label}
      </div>

      {/* Trimester Tags */}
      {food.trimesters.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {food.trimesters.map(t => (
            <span key={t} style={{
              padding: '3px 10px',
              background: 'var(--color-accent-soft)',
              color: 'var(--color-secondary)',
              borderRadius: 20,
              fontFamily: 'var(--font-accent)',
              fontSize: 11,
              fontWeight: 500,
            }}>{trimesterLabels[t]}</span>
          ))}
        </div>
      )}

      {/* Explanation — always shown */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        color: 'var(--color-text-mid)',
        lineHeight: 1.6,
        marginBottom: expanded ? 12 : 0,
        display: '-webkit-box',
        WebkitLineClamp: expanded ? 'unset' : 2,
        WebkitBoxOrient: 'vertical',
        overflow: expanded ? 'visible' : 'hidden',
        transition: 'all 300ms ease',
      }}>
        {food.explanation}
      </p>

      {/* Expanded content */}
      {expanded && (
        <div style={{
          background: config.bg,
          borderRadius: 10,
          padding: '12px 14px',
          marginTop: 4,
        }}>
          <p style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 12,
            fontWeight: 600,
            color: config.color,
            marginBottom: 4,
          }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
              <Icon name={food.safety === 'safe' ? 'check' : 'alert'} size={14} color={cfg.color} />
              {food.safety === 'safe' ? 'Nutritional benefit:' : 'Risk to note:'}
            </span>
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--color-text-dark)',
            lineHeight: 1.5,
          }}>
            {food.benefit || food.risk}
          </p>
        </div>
      )}
    </div>
  );
}
