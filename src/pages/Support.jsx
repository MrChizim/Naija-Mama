import { useState } from 'react';

const TIERS = [
  {
    id: 'silver',
    name: 'Silver Supporter',
    range: '₦1,000 – ₦10,000',
    color: 'var(--crimson)',
    bg: 'var(--crimson-pale)',
    badgeText: 'Silver',
  },
  {
    id: 'gold',
    name: 'Gold Supporter',
    range: '₦10,000 – ₦50,000',
    color: 'var(--amber-deep)',
    bg: 'var(--amber-pale)',
    badgeText: 'Gold',
  },
  {
    id: 'diamond',
    name: 'Diamond Supporter',
    range: '₦50,000 – ₦100,000',
    color: '#6E4A89',
    bg: '#E8DBF0',
    badgeText: 'Diamond',
  },
  {
    id: 'platinum',
    name: 'Platinum Patron',
    range: '₦100,000+',
    color: '#4B4B4B',
    bg: '#F2F2F2',
    badgeText: 'Platinum',
  },
];

const AMOUNTS = [
  { label: '₦1,000', value: 1000 },
  { label: '₦2,500', value: 2500 },
  { label: '₦5,000', value: 5000 },
  { label: '₦10,000', value: 10000 },
  { label: '₦25,000', value: 25000 },
  { label: '₦50,000', value: 50000 },
  { label: '₦100,000', value: 100000 },
];

export default function Support() {
  const [tier, setTier] = useState('silver');
  const [amountInput, setAmountInput] = useState('5000');
  const [anonymous, setAnonymous] = useState(true);
  const [showBadge, setShowBadge] = useState(false);
  const activeTier = TIERS.find(t => t.id === tier) || TIERS[0];

  return (
    <div className="page-wrap" style={{ background: 'var(--ivory)' }}>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#1C0A0E' }}>
        <img
          src="https://images.pexels.com/photos/6771379/pexels-photo-6771379.jpeg?cs=srgb&dl=pexels-ifeoma-ejiofor-9960370-6771379.jpg&fm=jpg"
          alt="Nigerian mother"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(62,20,68,0.78) 0%, rgba(13,8,15,0.95) 100%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(48px,6vw,88px) clamp(16px,5vw,80px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 32, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--crimson-soft)', marginBottom: 12 }}>
                Support the Mama Community
              </p>
              <h1 className="display-lg" style={{ color: 'white', marginBottom: 12 }}>
                Keep NaijaMama free for every woman
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 560, lineHeight: 1.75 }}>
                Your support funds community safety, expert guidance, and tools that help Nigerian mamas feel seen and supported.
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 18, border: '1px solid rgba(255,255,255,0.12)', padding: 20, color: 'white' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>Your badge (optional)</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="badge" style={{ background: activeTier.bg, color: activeTier.color, border: `1px solid ${activeTier.color}` }}>
                  {activeTier.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>{activeTier.range}</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                Badges are optional and can be hidden anytime. Anonymous support is always available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ padding: 'clamp(24px,4vw,56px) clamp(16px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 24 }}>
          {/* Tiers */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 className="display-md" style={{ color: 'var(--ink)' }}>Choose your tier</h2>
              <span className="badge badge-crimson">Community-first</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {TIERS.map(t => {
                const active = tier === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    style={{
                      textAlign: 'left',
                      padding: '16px 16px',
                      borderRadius: 16,
                      border: active ? `2px solid ${t.color}` : '1px solid var(--earth-pale)',
                      background: active ? t.bg : 'white',
                      cursor: 'pointer',
                      transition: 'all var(--dur-fast)',
                    }}
                  >
                    <p style={{ fontWeight: 700, color: t.color, marginBottom: 6 }}>{t.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)', marginBottom: 10 }}>{t.range}</p>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '6px 12px', borderRadius: 'var(--radius-full)',
                      background: 'rgba(255,255,255,0.6)', border: `1px solid ${t.color}`,
                      color: t.color, fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      {t.badgeText} Badge
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Payment card */}
          <div className="card" style={{ padding: 20, borderRadius: 18 }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>Contribution</p>
            <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>Enter any amount</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 180px' }}>
                <input
                  className="input"
                  inputMode="numeric"
                  placeholder="e.g. 25000"
                  value={amountInput}
                  onChange={e => setAmountInput(e.target.value.replace(/[^0-9]/g, ''))}
                  aria-label="Support amount"
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>Amount in naira</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {AMOUNTS.map(a => (
                <button
                  key={a.value}
                  onClick={() => setAmountInput(String(a.value))}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-full)',
                    border: amountInput === String(a.value) ? '1.5px solid var(--crimson)' : '1px solid var(--earth-pale)',
                    background: amountInput === String(a.value) ? 'var(--crimson-pale)' : 'var(--cream)',
                    color: amountInput === String(a.value) ? 'var(--crimson)' : 'var(--earth-mid)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--ink)' }}>
                <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} />
                Support anonymously
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: 'var(--ink)' }}>
                <input type="checkbox" checked={showBadge} onChange={e => setShowBadge(e.target.checked)} />
                Display supporter badge on my profile and posts
              </label>
              <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', marginTop: 2 }}>
                You can change badge visibility anytime.
              </p>
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 14 }}>
              Continue to payment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
