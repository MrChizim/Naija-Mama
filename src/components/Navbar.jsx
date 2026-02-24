import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/food-guide', label: 'Food Guide' },
  { to: '/tracker',    label: 'Week Tracker' },
  { to: '/community',  label: 'Community' },
  { to: '/hospitals',  label: 'Hospitals' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'all 300ms var(--ease)',
        background: scrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(26,16,8,0.07), 0 4px 24px rgba(0,0,0,0.04)' : 'none',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 48px)',
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <img src="/logo.png" alt="NaijaMama" style={{ height: 56, width: 'auto', objectFit: 'contain' }} />
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hide-mobile">
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} style={{
                padding: '8px 16px', borderRadius: 'var(--radius-full)',
                fontSize: '0.9rem', fontWeight: 500,
                color: isActive(link.to) ? 'var(--crimson)' : 'var(--ink-soft)',
                background: isActive(link.to) ? 'rgba(192,39,45,0.08)' : 'transparent',
                transition: 'all var(--dur-fast)', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { if (!isActive(link.to)) { e.currentTarget.style.color = 'var(--crimson)'; e.currentTarget.style.background = 'rgba(192,39,45,0.06)'; }}}
                onMouseLeave={e => { if (!isActive(link.to)) { e.currentTarget.style.color = 'var(--ink-soft)'; e.currentTarget.style.background = 'transparent'; }}}
              >{link.label}</Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="hide-mobile">
            <button style={{
              padding: '8px 18px', borderRadius: 'var(--radius-full)',
              border: '1.5px solid rgba(192,39,45,0.25)', background: 'transparent',
              color: 'var(--crimson)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer',
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,39,45,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >Log in</button>
            <Link to="/join" className="btn btn-primary btn-sm">Join Free →</Link>
          </div>

          <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu" className="hide-desktop"
            style={{ width: 42, height: 42, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, borderRadius: 'var(--radius-sm)', background: 'transparent' }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, background: 'var(--crimson)', borderRadius: 2,
                transition: 'all var(--dur-mid)',
                transform: menuOpen ? (i===0 ? 'translateY(7px) rotate(45deg)' : i===2 ? 'translateY(-7px) rotate(-45deg)' : 'scaleX(0)') : 'none',
                opacity: menuOpen && i===1 ? 0 : 1,
              }}/>
            ))}
          </button>
        </div>
      </header>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 999, background: 'var(--cream)',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 350ms var(--ease)',
        display: 'flex', flexDirection: 'column',
        padding: '100px 32px 48px',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,39,45,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 32 }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} style={{
              fontFamily: 'var(--font-display)', fontSize: '2rem',
              color: isActive(link.to) ? 'var(--crimson)' : 'var(--ink)',
              padding: '14px 0', borderBottom: '1px solid rgba(192,39,45,0.08)',
            }}>{link.label}</Link>
          ))}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn-outline" style={{ width: '100%' }}>Log in</button>
          <Link to="/join" className="btn btn-primary" style={{ width: '100%' }}>Join Free →</Link>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 32 }}>
          <img src="/logo.png" alt="NaijaMama" style={{ height: 48, opacity: 0.3 }}/>
        </div>
      </div>
    </>
  );
}
