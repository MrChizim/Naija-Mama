import Icon from './Icon';

export default function PricingCard({ plan }) {
  const { name, price, period, features, highlighted, badge, ctaLabel, icon } = plan;

  return (
    <div style={{
      background: 'var(--color-white)',
      borderRadius: 20,
      boxShadow: highlighted ? '0 8px 40px rgba(194,24,91,0.2)' : 'var(--shadow-card)',
      padding: '32px 28px',
      border: highlighted ? '2px solid var(--color-primary)' : '1.5px solid rgba(194,24,91,0.08)',
      transform: highlighted ? 'scale(1.04)' : 'scale(1)',
      position: 'relative',
      transition: 'all 200ms ease',
      display: 'flex',
      flexDirection: 'column',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 48px rgba(194,24,91,0.2)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = highlighted ? '0 8px 40px rgba(194,24,91,0.2)' : 'var(--shadow-card)'; }}
    >
      {badge && (
        <div style={{
          position: 'absolute',
          top: -16,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--color-primary)',
          color: 'white',
          padding: '6px 20px',
          borderRadius: 20,
          fontFamily: 'var(--font-accent)',
          fontSize: 13,
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {badge}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 8, color: 'var(--color-primary)' }}>
          <Icon name={icon || 'heart'} size={28} color="var(--color-primary)" />
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--color-text-dark)',
          marginBottom: 8,
        }}>{name}</h3>
        <div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 36,
            fontWeight: 700,
            color: highlighted ? 'var(--color-primary)' : 'var(--color-text-dark)',
          }}>{price}</span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--color-text-light)',
            marginLeft: 6,
          }}>{period}</span>
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, flex: 1, marginBottom: 24 }}>
        {features.map((f, i) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            marginBottom: 12,
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            color: 'var(--color-text-mid)',
            lineHeight: 1.5,
          }}>
            <span style={{ flexShrink: 0, marginTop: 1 }}>
              <Icon name="check" size={14} color="var(--color-primary)" />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <button style={{
        width: '100%',
        padding: '14px 24px',
        borderRadius: 50,
        border: highlighted ? 'none' : '1.5px solid var(--color-primary)',
        background: highlighted ? 'var(--color-primary)' : 'transparent',
        color: highlighted ? 'white' : 'var(--color-primary)',
        fontFamily: 'var(--font-accent)',
        fontWeight: 700,
        fontSize: 15,
        cursor: 'pointer',
        transition: 'all 200ms',
        boxShadow: highlighted ? '0 4px 16px rgba(194,24,91,0.3)' : 'none',
      }}
        onMouseEnter={e => {
          e.target.style.background = highlighted ? '#a01550' : 'var(--color-primary)';
          e.target.style.color = 'white';
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={e => {
          e.target.style.background = highlighted ? 'var(--color-primary)' : 'transparent';
          e.target.style.color = highlighted ? 'white' : 'var(--color-primary)';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
