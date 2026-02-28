import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { weekData } from '../data/weeks';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Real photography ── */
const IMG = {
  hero:       'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1200&q=85&auto=format&fit=crop',
  mother1:    'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=80&auto=format&fit=crop',
  mother2:    'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=700&q=80&auto=format&fit=crop',
  mother3:    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&auto=format&fit=crop',
  food:       'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80&auto=format&fit=crop',
  community:  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop',
  hospital:   'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=80&auto=format&fit=crop',
  avatar1:    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80&auto=format&fit=crop&face',
  avatar2:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop&face',
  avatar3:    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&q=80&auto=format&fit=crop&face',
};

const STATS = [
  { value: '14,000+', label: 'Nigerian Mamas' },
  { value: '40',      label: 'Weeks Covered'   },
  { value: '50+',     label: 'Foods Reviewed'  },
  { value: '100%',    label: 'Free to Join'    },
];


const FOOD_ITEMS = [
  { name: 'Eba & Egusi Soup', note: 'Safe — all trimesters', safe: true  },
  { name: 'Pap / Akamu',      note: 'Safe — all trimesters', safe: true  },
  { name: 'Suya',             note: 'Limit in 1st trimester', safe: null },
  { name: 'Agbo Herbal Tea',  note: 'Avoid during pregnancy', safe: false },
  { name: 'Bitter Leaf Soup', note: 'Safe — normal amounts',  safe: true  },
  { name: 'Zobo Drink',       note: 'Avoid in 1st trimester', safe: null },
];

function SafeDot({ safe }) {
  const color = safe === true ? '#2E7D32' : safe === false ? '#C62828' : '#E65100';
  return <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }}/>;
}

export default function Landing() {
  useReveal();

  return (
    <div className="page-wrap" style={{ paddingTop: 0, overflow: 'hidden' }}>

      {/* ════ HERO ════ */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {/* Full-bleed photo */}
        <img
          src={IMG.hero}
          alt="Nigerian pregnant woman"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />

        {/* Layered gradient: top-left dark for text legibility, bottom stays lighter */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(28,10,14,0.82) 0%, rgba(28,10,14,0.50) 50%, rgba(28,10,14,0.08) 100%)',
        }}/>

        {/* Content — bottom-left anchored */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(32px,5vw,80px)',
          alignItems: 'flex-end',
        }}>

          {/* Left — headline + CTA */}
          <div>
            <p className="animate-fadeInUp" style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--amber)',
              marginBottom: 20,
            }}>
              Nigeria's Pregnancy Platform
            </p>

            <h1 className="animate-fadeInUp anim-delay-1" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem,5.8vw,5rem)',
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              color: 'white',
              marginBottom: 24,
            }}>
              Pregnancy care<br/>
              built for<br/>
              <span style={{ color: 'var(--amber)' }}>Nigerian women</span>
            </h1>

            <p className="animate-fadeInUp anim-delay-2" style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.68)',
              lineHeight: 1.75,
              marginBottom: 36,
              maxWidth: 520,
              fontWeight: 400,
            }}>
              Week-by-week guidance, Nigerian food safety advice, and a community of 14,000+ women who truly get it — all completely free.
            </p>

            <div className="animate-fadeInUp anim-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
              <Link to="/join" className="btn btn-primary btn-lg">Start for free</Link>
              <Link to="/food-guide" className="btn btn-ghost btn-lg">Explore the guide</Link>
            </div>

            {/* Social proof */}
            <div className="animate-fadeInUp anim-delay-4" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {[IMG.avatar1, IMG.avatar2, IMG.avatar3].map((src, i) => (
                  <img key={i} src={src} alt="" loading="lazy" style={{
                    width: 34, height: 34, borderRadius: '50%', objectFit: 'cover',
                    border: '2px solid rgba(255,255,255,0.3)',
                    marginLeft: i === 0 ? 0 : -9,
                  }}/>
                ))}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                <strong style={{ color: 'white', fontWeight: 600 }}>14,000+</strong> Nigerian mamas
              </p>
            </div>
          </div>

          {/* Right — floating stat cards (desktop only) */}
          <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 14, alignSelf: 'flex-end', paddingBottom: 8 }}>

            {/* Food guide card */}
            <div className="animate-float" style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 16,
              padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'var(--crimson)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C6.686 3 4 5.686 4 9c0 2.21 1.196 4.143 2.97 5.2L7 17h6l.03-2.8C14.804 13.143 16 11.21 16 9c0-3.314-2.686-6-6-6z" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Food Guide</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-sans)' }}>20+ Nigerian foods rated</p>
              </div>
            </div>

            {/* Community card */}
            <div className="animate-floatSlow anim-delay-2" style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 16,
              padding: '20px 24px',
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: 'var(--amber)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="7.5" cy="7.5" r="3" stroke="white" strokeWidth="1.5"/>
                  <circle cx="13" cy="7" r="2.5" stroke="white" strokeWidth="1.5"/>
                  <path d="M2 16c0-2.5 2.5-4 5.5-4s5.5 1.5 5.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M13 12c2 0 4 1 4 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>The Mama Village</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-sans)' }}>14,000+ mamas talking</p>
              </div>
            </div>

          </div>
        </div>

        {/* Subtle bottom fade into next section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, var(--ivory), transparent)', pointerEvents: 'none' }}/>

      </section>

      {/* ════ STAT STRIP ════ */}
      <div style={{ background: 'var(--ivory)', borderTop: '1px solid var(--earth-pale)', borderBottom: '1px solid var(--earth-pale)', padding: '20px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 40, paddingRight: 64, flexShrink: 0 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--earth-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
              </div>
              <div style={{ width: 1, height: 32, background: 'var(--earth-pale)' }}/>
            </div>
          ))}
        </div>
      </div>
      <div className="section-divider" />

      {/* ════ FEATURES ════ */}
      <section className="section-texture" style={{ background: 'var(--cream)', padding: 'clamp(80px,10vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 64 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>What we offer</p>
            <h2 className="display-lg" style={{ maxWidth: 500, color: 'var(--ink)' }}>
              Everything a Nigerian mama needs
            </h2>
          </div>

          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {[
              {
                img:   IMG.food,
                label: 'Nigerian Food Guide',
                text:  'Egusi, pap, zobo, suya — know exactly what is safe and what to avoid in your kitchen.',
                to:    '/food-guide',
              },
              {
                img:   IMG.mother1,
                label: 'Week-by-Week Tracker',
                text:  "Follow your baby's growth with real Nigerian context — from ube to pawpaw.",
                to:    '/tracker',
              },
              {
                img:   IMG.community,
                label: 'Mama Village Community',
                text:  'A village of 14,000+ women — post anonymously, share experiences, and find real Nigerian support.',
                to:    '/community',
              },
              {
                img:   IMG.mother3,
                label: 'Join Free — Always',
                text:  'No subscriptions, no paywalls. Create an account with Google or email in under a minute.',
                to:    '/join',
              },
            ].map((f, i) => (
              <Link key={f.label} to={f.to} className={`reveal reveal-delay-${i + 1}`} style={{ textDecoration: 'none', display: 'block', overflow: 'hidden', borderRadius: i === 0 ? '20px 0 0 20px' : i === 3 ? '0 20px 20px 0' : 0, position: 'relative', minHeight: 400 }}
                onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'; e.currentTarget.querySelector('.feature-overlay').style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; e.currentTarget.querySelector('.feature-overlay').style.opacity = '0'; }}
              >
                <img src={f.img} alt={f.label} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform 0.55s var(--ease)' }}/>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,16,8,0.85) 0%, rgba(26,16,8,0.3) 60%, transparent 100%)' }}/>
                <div className="feature-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(138,100,146,0.22)', opacity: 0, transition: 'opacity 0.3s ease' }}/>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px' }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
                    {f.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', color: 'white', lineHeight: 1.55 }}>{f.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TRACKER PREVIEW ════ */}
      <section style={{ background: 'var(--ivory)', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

          {/* Left — cards */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[8, 20, 32].map((w, i) => {
              const d = weekData[w];
              const trLabel = w <= 13 ? 'First Trimester' : w <= 26 ? 'Second Trimester' : 'Third Trimester';
              return (
                <Link to={`/tracker?week=${w}`} key={w} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    display: 'flex', gap: 20, alignItems: 'center',
                    padding: '20px 24px', borderRadius: 16,
                    border: '1.5px solid var(--earth-pale)',
                    background: i === 1 ? 'var(--crimson-pale)' : 'var(--white)',
                    transition: 'all var(--dur-mid) var(--ease)',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = i === 1 ? 'var(--crimson-soft)' : 'var(--earth-pale)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: i === 1 ? 'var(--crimson)' : 'var(--cream-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: i === 1 ? 'white' : 'var(--crimson)' }}>{w}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--earth-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{trLabel}</p>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>Week {w}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)' }}>Baby is the size of {d?.babySize}</p>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l6 6-6 6" stroke="var(--earth-light)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                </Link>
              );
            })}

            <Link to="/tracker" className="btn btn-outline" style={{ marginTop: 8, alignSelf: 'flex-start' }}>
              View all 40 weeks
            </Link>
          </div>

          {/* Right — copy */}
          <div className="reveal reveal-delay-2">
            <p className="eyebrow" style={{ marginBottom: 20 }}>Week-by-Week Tracker</p>
            <h2 className="display-lg" style={{ color: 'var(--ink)', marginBottom: 20 }}>
              Your baby is growing.<br/>Stay informed, week by week.
            </h2>
            <div style={{ width: 48, height: 2, background: 'var(--crimson)', borderRadius: 2, marginBottom: 24 }}/>
            <p style={{ fontSize: '1rem', color: 'var(--earth-mid)', lineHeight: 1.8, marginBottom: 16 }}>
              Every week, discover what is happening inside your body and how your baby is developing — explained in language that fits Nigerian life.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--earth-mid)', lineHeight: 1.8 }}>
              Size comparisons use things you actually know — like ukwa, groundnut, and pawpaw — not blueberries and lemons.
            </p>
          </div>
        </div>
      </section>

      {/* ════ FOOD GUIDE — HERO FEATURE ════ */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#1C0A0E' }}>
        {/* Full-bleed food photo */}
        <img src={IMG.food} alt="Nigerian food" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.38 }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(28,10,14,0.97) 0%, rgba(28,10,14,0.78) 55%, rgba(28,10,14,0.35) 100%)' }}/>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

          {/* Left — copy */}
          <div className="reveal">
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--crimson)', color:'white', padding:'5px 14px', borderRadius:'var(--radius-full)', fontSize:'0.6875rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:24 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.2 3.6H11L8.4 6.8l.9 3.7L6 8.5l-3.3 2 .9-3.7L1 4.6h3.8z" fill="white"/></svg>
              Nigeria's #1 Feature
            </div>
            <h2 className="display-lg" style={{ color: 'white', marginBottom: 20 }}>
              Not salmon and kale.<br/><span style={{ color: 'var(--amber)' }}>Real Nigerian food.</span>
            </h2>
            <div style={{ width: 48, height: 3, background: 'var(--amber)', borderRadius: 2, marginBottom: 24 }}/>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 16 }}>
              We know your kitchen. We know what your mother-in-law cooks and what you crave at midnight.
            </p>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 36 }}>
              Our food guide covers 20+ Nigerian foods — egusi, pap, zobo, suya, bitter leaf, agbo — and tells you exactly what is safe, what to limit, and what to avoid, trimester by trimester.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/food-guide" className="btn btn-amber btn-lg">Explore the food guide</Link>
              <Link to="/food-guide" className="btn btn-ghost">See all 20+ foods</Link>
            </div>
          </div>

          {/* Right — food list card */}
          <div className="reveal reveal-delay-2">
            <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>Common Nigerian foods</p>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Quick reference</span>
              </div>
              {FOOD_ITEMS.map((food, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 24px',
                  borderBottom: i < FOOD_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <SafeDot safe={food.safe}/>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{food.name}</p>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: food.safe === true ? '#6EE7B7' : food.safe === false ? '#FCA5A5' : '#FCD34D', fontWeight: 600, textAlign: 'right' }}>{food.note}</p>
                </div>
              ))}
              <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <Link to="/food-guide" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--amber)', display: 'flex', alignItems: 'center', gap: 6 }}>
                  See all 20+ foods rated
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ COMMUNITY ════ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 600, display: 'flex', alignItems: 'center' }}>
        <img src={IMG.community} alt="Nigerian mothers community" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,10,14,0.78)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: 'clamp(80px,10vw,120px) clamp(20px,5vw,80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center' }}>

          <div className="reveal">
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: 20 }}>The Mama Village</p>
            <h2 className="display-lg" style={{ color: 'white', marginBottom: 20 }}>
              You don't have to do this alone.
            </h2>
            <div style={{ width: 48, height: 2, background: 'var(--amber)', borderRadius: 2, marginBottom: 24 }}/>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 36 }}>
              Real stories, real support, real Nigerian women. Whether you're in Lagos, Abuja, Port Harcourt — or abroad — your village is here.
            </p>
            <Link to="/community" className="btn btn-amber btn-lg">Join the conversation</Link>
          </div>

          <div className="reveal reveal-delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Adaeze, Lagos', week: '28 weeks', text: 'Anyone else feel like their husband has completely checked out? Looking for solidarity.' },
              { name: 'Fatima, Abuja', week: '10 weeks', text: 'My mother-in-law says no eggs in the first trimester. My doctor says eat protein. Feeling confused.' },
              { name: 'Blessing, Lagos', week: 'New mama', text: 'BIRTH STORY: I had my baby at LUTH after 18 hours of labour. Here is everything that happened.' },
            ].map((post, i) => (
              <div key={i} style={{
                padding: '18px 20px', borderRadius: 14,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                transition: 'all var(--dur-mid) var(--ease)',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateX(0)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem' }}>{post.name}</span>
                  <span style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.08)', padding: '3px 10px', borderRadius: 20 }}>{post.week}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PHOTO GALLERY ════ */}
      <section className="section-texture" style={{ background: 'var(--cream)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 40 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>A community that looks like you</p>
          </div>
          <div className="photo-gallery-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '280px 280px', gap: 12 }}>
            <div className="reveal photo-frame" style={{ gridRow: '1 / 3', borderRadius: 20 }}>
              <img src={IMG.mother2} alt="Nigerian mama" loading="lazy"/>
            </div>
            <div className="reveal reveal-delay-1 photo-frame" style={{ borderRadius: 20 }}>
              <img src={IMG.mother1} alt="Nigerian mama" loading="lazy"/>
            </div>
            <div className="reveal reveal-delay-2 photo-frame" style={{ borderRadius: 20 }}>
              <img src={IMG.mother3} alt="Nigerian mama" loading="lazy"/>
            </div>
            <div className="reveal reveal-delay-1 photo-frame" style={{ borderRadius: 20 }}>
              <img src={IMG.food} alt="Nigerian food" loading="lazy"/>
            </div>
            <div className="reveal reveal-delay-2 photo-frame" style={{ borderRadius: 20 }}>
              <img src={IMG.hospital} alt="Hospital" loading="lazy"/>
            </div>
          </div>
        </div>
      </section>

      {/* ════ FINAL CTA ════ */}
      <section style={{
        background: '#1C0A0E',
        padding: 'clamp(80px,12vw,140px) clamp(24px,5vw,80px)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle amber glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(180,146,181,0.18) 0%, transparent 70%)', pointerEvents: 'none' }}/>

        <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <img src="/logo.png" alt="NaijaMama" style={{ height: 72, margin: '0 auto 32px', objectFit: 'contain' }}/>
            <h2 className="display-lg" style={{ color: 'white', marginBottom: 20 }}>Your village is waiting</h2>
            <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 40 }}>
              Join 14,000+ Nigerian mamas getting the guidance, food advice, and community support they deserve.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/join"      className="btn btn-amber btn-lg">Join free today</Link>
              <Link to="/community" className="btn btn-ghost btn-lg">Explore the community</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
