import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/food-guide', label: 'Food Guide' },
  { to: '/tracker',    label: 'Week Tracker' },
  { to: '/community',  label: 'Community' },
  { to: '/brands',     label: 'Brands' },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
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
      {/* ── Desktop & Mobile header ── */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '10px 20px' : '16px 20px',
        transition: 'padding 300ms var(--ease)',
        pointerEvents: 'none',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          background: scrolled
            ? 'rgba(110, 76, 122, 0.97)'
            : 'rgba(100, 66, 112, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(213,176,216,0.18)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(62,20,68,0.35), 0 2px 8px rgba(0,0,0,0.12)'
            : '0 4px 24px rgba(62,20,68,0.22)',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px 0 16px',
          pointerEvents: 'all',
          transition: 'box-shadow 300ms var(--ease), background 300ms var(--ease)',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src="/logo.png"
              alt="NaijaMama"
              style={{ height: 56, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="hide-mobile">
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} style={{
                padding: '7px 15px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive(link.to) ? 'white' : 'rgba(255,255,255,0.62)',
                background: isActive(link.to) ? 'rgba(255,255,255,0.18)' : 'transparent',
                transition: 'all var(--dur-fast)',
                whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive(link.to)) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.62)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >{link.label}</Link>
            ))}
          </nav>

          {/* Desktop auth buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hide-mobile">
            <Link to="/join" style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
              }}
            >Log in</Link>
            <Link to="/join" style={{
              padding: '7px 18px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--crimson)',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: 600,
              transition: 'all var(--dur-fast)',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-deep)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--crimson)'; }}
            >Join free</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="hide-desktop"
            style={{
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)',
              background: menuOpen ? 'rgba(255,255,255,0.12)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              transition: 'background var(--dur-fast)',
              flexShrink: 0,
            }}
          >
            {/* Animated icon: hamburger → X */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {menuOpen ? (
                <>
                  <line x1="3" y1="3" x2="15" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="15" y1="3" x2="3" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="15" y2="5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="9" x2="15" y2="9" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="13" x2="15" y2="13" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>

        </div>
      </header>

      {/* ── Mobile menu drawer ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 998,
        pointerEvents: menuOpen ? 'all' : 'none',
      }}>
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(38,12,53,0.55)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 280ms var(--ease)',
          }}
        />

        {/* Drawer panel */}
        <div style={{
          position: 'absolute',
          top: 84,
          left: 12,
          right: 12,
          background: 'rgba(100, 66, 112, 0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 20,
          border: '1px solid rgba(213,176,216,0.18)',
          boxShadow: '0 24px 64px rgba(62,20,68,0.5)',
          overflow: 'hidden',
          transform: menuOpen ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.97)',
          opacity: menuOpen ? 1 : 0,
          transition: 'transform 300ms var(--ease), opacity 280ms var(--ease)',
        }}>

          {/* Nav links */}
          <nav style={{ padding: '8px 0' }}>
            {NAV_LINKS.map((link, i) => (
              <Link key={link.to} to={link.to} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 24px',
                fontSize: '1rem',
                fontWeight: isActive(link.to) ? 600 : 400,
                color: isActive(link.to) ? 'white' : 'rgba(255,255,255,0.7)',
                background: isActive(link.to) ? 'rgba(255,255,255,0.14)' : 'transparent',
                borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                transition: 'background var(--dur-fast)',
              }}>
                <span>{link.label}</span>
                {isActive(link.to) && (
                  <ChevronRight size={14} stroke="white" strokeWidth="1.5" />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth buttons */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            gap: 10,
          }}>
            <Link to="/join" style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
              fontWeight: 500,
              textAlign: 'center',
            }}>Log in</Link>
            <Link to="/join" style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: 'var(--radius-full)',
              background: 'var(--crimson)',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 600,
              textAlign: 'center',
            }}>Join free</Link>
          </div>
        </div>
      </div>

      {/* Spacer so content doesn't sit under the navbar */}
      <div style={{ height: 80 }} />

      {/* Back-to-top button — appears after scrolling */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed', bottom: 24, right: 20, zIndex: 999,
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--crimson)', color: 'white',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(62,20,68,0.32)',
            transition: 'transform var(--dur-fast), background var(--dur-fast)',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'var(--crimson-deep)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'var(--crimson)'; }}
        >
          <ArrowUp size={16} stroke="white" strokeWidth="1.8" />
        </button>
      )}
    </>
  );
}
