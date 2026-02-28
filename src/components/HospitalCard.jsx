import { Building2, Baby, MapPin, Navigation } from 'lucide-react';

export default function HospitalCard({ hospital }) {
  const typeColors = {
    public: { bg: '#E3F2FD', color: '#1565C0' },
    private: { bg: '#F3E5F5', color: '#6A1B9A' },
    maternity: { bg: '#E8F5E9', color: '#2E7D32' },
  };

  const typeConfig = typeColors[hospital.type] || typeColors.public;

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const partial = rating % 1;
    let stars = '';
    for (let i = 0; i < full; i++) stars += '★';
    if (partial >= 0.5) stars += '★';
    while (stars.length < 5) stars += '☆';
    return stars;
  };

  return (
    <div style={{
      background: 'var(--color-white)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      padding: 24,
      transition: 'all 200ms ease',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--color-text-dark)',
            marginBottom: 4,
          }}>{hospital.name}</h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--color-text-light)',
          }}>{hospital.fullName}</p>
        </div>
        <span style={{
          padding: '4px 12px',
          background: typeConfig.bg,
          color: typeConfig.color,
          borderRadius: 20,
          fontFamily: 'var(--font-accent)',
          fontSize: 12,
          fontWeight: 600,
          whiteSpace: 'nowrap',
          textTransform: 'capitalize',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {hospital.type === 'maternity' ? <Baby size={14} color={typeConfig.color} strokeWidth="1.8" /> : <Building2 size={14} color={typeConfig.color} strokeWidth="1.8" />}
            {hospital.type === 'public' ? 'Public' : hospital.type === 'private' ? 'Private' : 'Maternity'}
          </span>
        </span>
      </div>

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: 'var(--color-text-light)' }}>
          <MapPin size={14} color="var(--color-text-light)" strokeWidth="1.8" />
        </span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--color-text-mid)',
        }}>
          {hospital.city}, {hospital.state}
        </span>
      </div>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'var(--color-accent)', fontSize: 16, letterSpacing: 1 }}>
          {renderStars(hospital.rating)}
        </span>
        <span style={{
          fontFamily: 'var(--font-accent)',
          fontWeight: 700,
          color: 'var(--color-text-dark)',
          fontSize: 15,
        }}>{hospital.rating}</span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--color-text-light)',
        }}>({hospital.reviewCount} reviews)</span>
      </div>

      {/* Feature Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {hospital.features.map(f => (
          <span key={f} style={{
            padding: '4px 10px',
            background: 'var(--color-primary-pale)',
            color: 'var(--color-primary)',
            borderRadius: 20,
            fontFamily: 'var(--font-accent)',
            fontSize: 12,
            fontWeight: 500,
          }}>{f}</span>
        ))}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: 'var(--color-text-mid)',
        lineHeight: 1.6,
      }}>{hospital.description}</p>

      {/* Community Quote */}
      <blockquote style={{
        background: 'var(--color-primary-pale)',
        borderLeft: '3px solid var(--color-primary-light)',
        borderRadius: '0 10px 10px 0',
        padding: '10px 14px',
        margin: 0,
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 13,
          color: 'var(--color-text-mid)',
          lineHeight: 1.6,
        }}>{hospital.quote}</p>
      </blockquote>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
        <button style={{
          flex: 1,
          padding: '10px 16px',
          border: '1.5px solid var(--color-primary)',
          borderRadius: 50,
          background: 'transparent',
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-accent)',
          fontWeight: 600,
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all 200ms',
        }}
          onMouseEnter={e => { e.target.style.background = 'var(--color-primary)'; e.target.style.color = 'white'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-primary)'; }}
        >
          See Full Reviews
        </button>
        <button style={{
          padding: '10px 16px',
          border: 'none',
          borderRadius: 50,
          background: 'var(--color-accent)',
          color: 'var(--color-text-dark)',
          fontFamily: 'var(--font-accent)',
          fontWeight: 600,
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all 200ms',
        }}
          onMouseEnter={e => { e.target.style.filter = 'brightness(1.05)'; e.target.style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { e.target.style.filter = 'none'; e.target.style.transform = 'none'; }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Navigation size={14} color="var(--color-text-dark)" strokeWidth="1.8" />
            Directions
          </span>
        </button>
      </div>
    </div>
  );
}
