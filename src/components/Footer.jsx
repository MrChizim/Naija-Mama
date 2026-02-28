import { Link } from 'react-router-dom';

const PLATFORM_LINKS = [
  { label: 'Food Guide',    to: '/food-guide' },
  { label: 'Week Tracker',  to: '/tracker' },
  { label: 'Community',     to: '/community' },
  { label: 'Brands',        to: '/brands' },
  { label: 'Saved Posts',   to: '/saved' },
  { label: 'Contact Us',    to: '/contact' },
];

const COMPANY_LINKS = [
  { label: 'About Us',       to: '/legal#about' },
  { label: 'Privacy Policy', to: '/legal#privacy' },
  { label: 'Terms of Use',   to: '/legal#terms' },
  { label: 'Contact Us',     to: '/contact' },
];

const SOCIAL = [
  {
    label: 'TikTok', href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.93a8.18 8.18 0 0 0 4.79 1.53V7a4.85 4.85 0 0 1-1.02-.31z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook', href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram', href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', color: 'rgba(255,255,255,0.8)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px clamp(20px, 5vw, 48px) 0' }}>

        {/* Main grid */}
        <div className="footer-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          paddingBottom: 48,
        }}>

          {/* Brand column */}
          <div className="footer-brand-col">
            <img
              src="/logo.png"
              alt="NaijaMama"
              style={{ height: 52, marginBottom: 16, objectFit: 'contain' }}
            />
            <p style={{
              fontSize: '0.875rem',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 220,
              marginBottom: 24,
            }}>
              Nigeria's pregnancy & motherhood community. Built for Nigerian women, by Nigerian women.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SOCIAL.map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all var(--dur-fast)',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--crimson)';
                    e.currentTarget.style.borderColor = 'var(--crimson)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 18,
            }}>Platform</h4>
            {PLATFORM_LINKS.map(link => (
              <Link key={link.to} to={link.to} style={{
                display: 'block',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: 12,
                transition: 'color var(--dur-fast)',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >{link.label}</Link>
            ))}
          </div>

          {/* Company links */}
          <div>
            <h4 style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 18,
            }}>Company</h4>
            {COMPANY_LINKS.map(({ label, to }) => (
              <Link key={label} to={to} style={{
                display: 'block',
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: 12,
                transition: 'color var(--dur-fast)',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              >{label}</Link>
            ))}
          </div>

          {/* Support / Therapy CTA */}
          <div>
            <h4 style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 18,
            }}>Need support?</h4>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              marginBottom: 16,
            }}>
              Pregnancy can be overwhelming. Talking to a professional can help.
            </p>
            <a
              href="https://www.siriusjobs.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '10px 18px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(62,20,68,0.25)',
                border: '1px solid rgba(62,20,68,0.4)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all var(--dur-fast)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--crimson)';
                e.currentTarget.style.borderColor = 'var(--crimson)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(62,20,68,0.25)';
                e.currentTarget.style.borderColor = 'rgba(62,20,68,0.4)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C3.69 1 1 3.69 1 7s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M7 4.5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Talk to a therapist
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 0 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.22)' }}>
            © 2025 NaijaMama. Made with care for Nigerian mamas everywhere.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.18)', maxWidth: 440, lineHeight: 1.6 }}>
            NaijaMama provides general information only. Always consult your doctor or midwife for medical advice during pregnancy.
          </p>
        </div>
      </div>
    </footer>
  );
}
