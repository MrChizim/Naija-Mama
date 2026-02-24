import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'Food Guide',    to: '/food-guide' },
  { label: 'Week Tracker',  to: '/tracker' },
  { label: 'Community',     to: '/community' },
  { label: 'Hospitals',     to: '/hospitals' },
  { label: 'Join Premium',  to: '/join' },
];
const COMPANY = ['About Us','Our Experts','Privacy Policy','Terms of Use','Contact Us'];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.85)', paddingTop: 80 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, paddingBottom: 64 }}>

          {/* Brand column */}
          <div style={{ gridColumn: '1 / span 1' }}>
            <img src="/logo.png" alt="NaijaMama" style={{ height: 64, marginBottom: 16, filter: 'brightness(0) invert(1)', opacity: 0.9 }}/>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: 240, marginBottom: 24 }}>
              Nigeria's #1 pregnancy & motherhood community. Built for Nigerian women, by Nigerian women.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['X','f','in','▶'].map((icon,i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, transition: 'all var(--dur-fast)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--crimson)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Platform</h4>
            {LINKS.map(link => (
              <Link key={link.to} to={link.to} style={{ display: 'block', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', marginBottom: 12, transition: 'color var(--dur-fast)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
              >{link.label}</Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Company</h4>
            {COMPANY.map(item => (
              <a key={item} href="#" style={{ display: 'block', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', marginBottom: 12, transition: 'color var(--dur-fast)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
              >{item}</a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Weekly Mama Tips</h4>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', marginBottom: 16, lineHeight: 1.65 }}>Nigerian pregnancy tips, food guides, and community highlights — every week.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input type="email" placeholder="your@email.com" className="input" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)', color: 'white' }} aria-label="Email address" autoComplete="email" />
              <button className="btn btn-amber" style={{ width: '100%' }}>Get weekly tips</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '24px 0', display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.25)' }}>© 2025 NaijaMama. Made with care for Nigerian mamas everywhere.</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', maxWidth: 480, lineHeight: 1.6 }}>
            NaijaMama provides general information only. Always consult your doctor or midwife for medical advice during pregnancy.
          </p>
        </div>
      </div>
    </footer>
  );
}
