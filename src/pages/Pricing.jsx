import { useState } from 'react';
import { Link } from 'react-router-dom';

const FeatureIcons = {
  community: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(213,176,216,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
      <circle cx="18" cy="7" r="2.5"/><path d="M21 21v-1.5a3.5 3.5 0 0 0-2.5-3.35"/>
    </svg>
  ),
  food: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(213,176,216,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.25 6H15.75A7.02 7.02 0 0 0 19 9a7 7 0 0 0-7-7z"/><rect x="9" y="15" width="6" height="2" rx="1"/><rect x="10" y="17" width="4" height="4" rx="1"/>
      <path d="M8 6.5c.5 1 .5 2 0 3m4-3c.5 1 .5 2 0 3"/>
    </svg>
  ),
  tracker: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(213,176,216,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  ),
  save: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(213,176,216,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  anon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(213,176,216,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9 9.5a3 3 0 0 1 6 0c0 2-2 2.5-3 4m0 3.5h.01"/>
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(213,176,216,0.9)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 3v5c0 5-3.5 9.74-8 11-4.5-1.26-8-6-8-11V5l8-3z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
};

const FEATURES = [
  { iconKey: 'community', title: 'Mama Village Community', desc: 'Post, read, reply — 14,000+ Nigerian mamas.' },
  { iconKey: 'food',      title: 'Nigerian Food Guide',    desc: 'What\'s safe to eat, trimester by trimester.' },
  { iconKey: 'tracker',   title: 'Week-by-Week Tracker',  desc: 'Follow your baby\'s growth from week 1 to 40.' },
  { iconKey: 'save',      title: 'Save Posts',             desc: 'Bookmark and revisit posts any time.' },
  { iconKey: 'anon',      title: 'Post Anonymously',       desc: 'Share without showing your identity.' },
  { iconKey: 'shield',    title: 'Safe & Moderated',       desc: 'AI keeps out hate. Realness stays.' },
];

const TESTIMONIALS = [
  { name: 'Adaeze C.', location: 'Lagos', text: 'Found answers I couldn\'t get from my doctor. These mamas understand real Nigerian pregnancy.' },
  { name: 'Fatima M.', location: 'Abuja', text: 'The food guide alone is worth it. Finally knowing what I can eat from our kitchen was such a relief.' },
];

export default function Join() {
  const [tab, setTab]   = useState('email');
  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [done, setDone] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,460px),1fr))', alignItems: 'stretch' }}>

      {/* ── LEFT PANEL — brand / social proof ── */}
      <div style={{ position: 'relative', background: 'var(--crimson-deep)', overflow: 'hidden', minHeight: 'clamp(420px,50vh,100vh)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(40px,6vw,72px)' }}>

        {/* Background photo */}
        <img
          src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1000&q=85&auto=format&fit=crop"
          alt="Nigerian mamas"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', opacity: 0.28 }}
        />

        {/* Rich gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(38,12,53,0.55) 0%, rgba(38,12,53,0.98) 75%)' }}/>

        {/* Lilac glow orb */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 400, background: 'radial-gradient(ellipse, rgba(138,100,146,0.18) 0%, transparent 70%)', pointerEvents: 'none' }}/>

        {/* Logo */}
        <div style={{ position: 'absolute', top: 'clamp(24px,4vw,40px)', left: 'clamp(28px,4vw,56px)', zIndex: 2 }}>
          <Link to="/">
            <img src="/logo.png" alt="NaijaMama" style={{ height: 52, objectFit: 'contain' }}/>
          </Link>
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* Free badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(213,176,216,0.15)', border: '1px solid rgba(213,176,216,0.3)',
            color: 'var(--amber-soft)', padding: '6px 16px', borderRadius: 'var(--radius-full)',
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="var(--amber-soft)"/></svg>
            Always 100% free
          </div>

          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 800, color: 'white',
            lineHeight: 1.08, letterSpacing: '-0.025em',
            marginBottom: 18,
          }}>
            Your village<br/>is waiting<br/>
            <span style={{ color: 'var(--amber-soft)' }}>for you.</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', lineHeight: 1.75, marginBottom: 36, maxWidth: 380 }}>
            14,000+ Nigerian women — sharing real experiences, real advice, and real support through every week of pregnancy.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(138,100,146,0.22)', border: '1px solid rgba(213,176,216,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{FeatureIcons[f.iconKey]}</span>
                <div>
                  <span style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem' }}>{f.title}</span>
                  <span style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.8125rem', marginLeft: 6 }}>— {f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28 }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 12 }}>
              "{TESTIMONIALS[0].text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--crimson-soft)', border: '2px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 13,
              }}>{TESTIMONIALS[0].name[0]}</div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'white' }}>{TESTIMONIALS[0].name}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{TESTIMONIALS[0].location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — auth card ── */}
      <div style={{ background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,64px)' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {done ? (
            /* ── SUCCESS STATE ── */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--crimson), var(--crimson-soft))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 12px 40px rgba(62,20,68,0.25)',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                Welcome to the village!
              </h2>
              <p style={{ color: 'var(--earth-mid)', fontSize: '0.9375rem', lineHeight: 1.7, marginBottom: 32 }}>
                Your account is ready. Start exploring the community, food guide, and tracker — all completely free.
              </p>
              <Link to="/community" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px',
                background: 'linear-gradient(135deg, var(--crimson), var(--crimson-deep))',
                color: 'white', borderRadius: 'var(--radius-full)',
                fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(62,20,68,0.28)',
                transition: 'all var(--dur-fast)',
              }}>
                Go to Mama Village →
              </Link>
            </div>

          ) : (
            <>
              {/* ── Mode toggle ── */}
              <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 8 }}>
                  {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--earth-mid)', lineHeight: 1.6 }}>
                  {mode === 'signup'
                    ? 'Join 14,000+ Nigerian mamas. Free forever, no card needed.'
                    : 'Good to see you again. Sign in to your account.'}
                </p>
              </div>

              {/* ── Google button ── */}
              <button onClick={() => setDone(true)} style={{
                width: '100%', padding: '14px 20px', borderRadius: 14,
                border: '1.5px solid var(--earth-pale)', background: 'white',
                color: 'var(--ink)', fontWeight: 600, fontSize: '0.9375rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all var(--dur-fast)', fontFamily: 'var(--font-sans)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(62,20,68,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--earth-pale)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
              >
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908C16.658 14.175 17.64 11.9 17.64 9.2z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A9 9 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9 9 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A9 9 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              {/* ── Divider ── */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '20px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--earth-pale)' }}/>
                <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)', fontWeight: 500, whiteSpace: 'nowrap' }}>or with email</span>
                <div style={{ flex: 1, height: 1, background: 'var(--earth-pale)' }}/>
              </div>

              {/* ── Email form ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mode === 'signup' && (
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--earth-light)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    </span>
                    <input className="input" placeholder="Username (e.g. Amara_Lagos)" style={{ paddingLeft: 42 }}/>
                  </div>
                )}

                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--earth-light)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8l10 6 10-6"/></svg>
                  </span>
                  <input
                    className="input"
                    type={mode === 'login' ? 'text' : 'email'}
                    placeholder={mode === 'login' ? 'Email or username' : 'Email address'}
                    style={{ paddingLeft: 42 }}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--earth-light)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input className="input" type="password" placeholder={mode === 'signup' ? 'Create a password' : 'Password'} style={{ paddingLeft: 42 }}/>
                </div>

                {mode === 'login' && (
                  <div style={{ textAlign: 'right', marginTop: -4 }}>
                    <button style={{ fontSize: '0.8125rem', color: 'var(--crimson)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
                      Forgot password?
                    </button>
                  </div>
                )}

                <button onClick={() => setDone(true)} style={{
                  width: '100%', padding: '14px', borderRadius: 14, border: 'none',
                  cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 700,
                  fontSize: '0.9375rem', marginTop: 4, letterSpacing: '0.01em',
                  background: 'linear-gradient(135deg, var(--crimson) 0%, var(--crimson-deep) 100%)',
                  color: 'white',
                  boxShadow: '0 8px 28px rgba(62,20,68,0.28)',
                  transition: 'all var(--dur-fast)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(62,20,68,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(62,20,68,0.28)'; }}
                >
                  {mode === 'signup' ? 'Create free account →' : 'Sign in →'}
                </button>
              </div>

              {mode === 'signup' && (
                <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--earth-light)', marginTop: 14, lineHeight: 1.6 }}>
                  By joining you agree to our{' '}
                  <Link to="/contact" style={{ color: 'var(--crimson)', fontWeight: 600 }}>Terms</Link> &{' '}
                  <Link to="/contact" style={{ color: 'var(--crimson)', fontWeight: 600 }}>Privacy Policy</Link>.
                </p>
              )}

              {/* ── Toggle signup / login ── */}
              <div style={{
                marginTop: 28, paddingTop: 24,
                borderTop: '1px solid var(--earth-pale)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--earth-mid)' }}>
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                </span>
                <button
                  onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                  style={{
                    fontSize: '0.875rem', color: 'var(--crimson)', fontWeight: 700,
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {mode === 'signup' ? 'Log in' : 'Join free'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
