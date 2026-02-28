import { useState } from 'react';

const TOPICS = [
  'General enquiry',
  'Advertising & brand partnerships',
  'Report a post or user',
  'Technical issue / bug',
  'Community guidelines',
  'Press & media',
  'Other',
];

function IconMail({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function IconInstagram({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconTikTok({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.93a8.18 8.18 0 0 0 4.79 1.53V7a4.85 4.85 0 0 1-1.02-.31z"/>
    </svg>
  );
}
function IconFacebook({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const CONTACT_CHANNELS = [
  {
    icon: <IconMail size={24} />,
    title: 'Email us',
    value: 'hello@naijamama.ng',
    note: 'We respond within 24 hours on business days',
    href: 'mailto:hello@naijamama.ng',
    bg: 'var(--crimson-pale)',
    color: 'var(--crimson)',
  },
  {
    icon: <IconInstagram size={24} />,
    title: 'Instagram',
    value: '@naijamama',
    note: 'DMs open for quick questions',
    href: '#',
    bg: 'rgba(131, 58, 180, 0.08)',
    color: '#833AB4',
  },
  {
    icon: <IconTikTok size={22} />,
    title: 'TikTok',
    value: '@naijamama',
    note: 'Watch our community content',
    href: '#',
    bg: 'rgba(0,0,0,0.05)',
    color: 'var(--ink)',
  },
  {
    icon: <IconFacebook size={22} />,
    title: 'Facebook',
    value: 'NaijaMama',
    note: 'Community updates and stories',
    href: '#',
    bg: 'rgba(24,119,242,0.08)',
    color: '#1877F2',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [topic, setTopic] = useState('');

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <section style={{ position: 'relative', background: '#1C0A0E', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=1400&q=80&auto=format&fit=crop"
          alt="Contact us"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,10,14,0.65) 0%, rgba(28,10,14,0.88) 100%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(56px,9vw,100px) clamp(20px,5vw,80px) clamp(48px,7vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(138,100,146,0.22)', border: '1px solid rgba(180,146,181,0.4)',
            color: 'var(--amber-soft)', padding: '5px 14px', borderRadius: 'var(--radius-full)',
            fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            We're here for you
          </div>
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem,4.5vw,3rem)',
            fontWeight: 700, color: 'white', marginBottom: 14, lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Get in touch
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 480 }}>
            Questions, feedback, advertising enquiries, or just want to say hello — we'd love to hear from you.
          </p>
        </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,48px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 40, alignItems: 'start',
        }}>

          {/* Left: channels + info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
              Reach us directly
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {CONTACT_CHANNELS.map(ch => (
                <a key={ch.title} href={ch.href} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 18px', borderRadius: 16,
                  background: 'white', border: '1px solid var(--earth-pale)',
                  textDecoration: 'none', transition: 'box-shadow var(--dur-fast)',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,27,34,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{
                    width: 46, height: 46, borderRadius: 12,
                    background: ch.bg, color: ch.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {ch.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)', marginBottom: 2 }}>{ch.title}</p>
                    <p style={{ fontSize: '0.85rem', color: ch.color, fontWeight: 500, marginBottom: 2 }}>{ch.value}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>{ch.note}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Advertising callout */}
            <div style={{
              background: 'var(--crimson-pale)', border: '1px solid rgba(62,20,68,0.15)',
              borderRadius: 16, padding: '20px 22px',
            }}>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--crimson)', marginBottom: 6 }}>
                Advertising enquiries
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 14 }}>
                Want to reach 14,000+ pregnant Nigerian women? Visit our Brands page to learn about our listing plans.
              </p>
              <a href="/brands" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', borderRadius: 'var(--radius-full)',
                background: 'var(--crimson)', color: 'white',
                fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'none',
                transition: 'background var(--dur-fast)',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson-deep)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
              >
                View brand listing plans →
              </a>
            </div>
          </div>

          {/* Right: contact form */}
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--earth-pale)', padding: 'clamp(24px,4vw,36px)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'var(--crimson-pale)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
                  Message sent!
                </h3>
                <p style={{ color: 'var(--earth-mid)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 24 }}>
                  Thank you for reaching out. We'll get back to you within 24 hours on business days.
                </p>
                <button onClick={() => setSubmitted(false)} style={{
                  padding: '10px 22px', borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--earth-pale)', background: 'white',
                  color: 'var(--earth-mid)', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500,
                }}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                  Send a message
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)', marginBottom: 22 }}>
                  We read every message and respond personally.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input className="input" placeholder="First name"/>
                    <input className="input" placeholder="Last name"/>
                  </div>
                  <input className="input" type="email" placeholder="Your email address"/>
                  <select
                    className="input"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    style={{ color: topic ? 'var(--ink)' : 'var(--earth-light)' }}
                  >
                    <option value="">What is this about?</option>
                    {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <textarea
                    className="input"
                    rows={5}
                    placeholder="Tell us more..."
                    style={{ resize: 'vertical' }}
                  />
                  <button
                    onClick={() => setSubmitted(true)}
                    style={{
                      width: '100%', padding: '13px', borderRadius: 'var(--radius-full)',
                      border: 'none', cursor: 'pointer', background: 'var(--crimson)', color: 'white',
                      fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9375rem',
                      transition: 'background var(--dur-fast)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson-deep)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
                  >
                    Send message
                  </button>
                  <p style={{ fontSize: '0.72rem', color: 'var(--earth-light)', textAlign: 'center' }}>
                    We never share your information with third parties.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
