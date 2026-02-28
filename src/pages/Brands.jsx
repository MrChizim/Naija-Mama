import { useState } from 'react';

const FEATURED_BRANDS = [
  {
    id: 1,
    name: 'BabyCare Nigeria',
    category: 'Baby Products',
    logo: 'BC',
    logoColor: '#3E1444',
    tagline: 'Everything your newborn needs, delivered to your door',
    description: 'Premium baby essentials sourced for Nigerian mamas — diapers, nursing bras, and skin-safe products trusted by thousands.',
    website: '#',
    tags: ['Diapers', 'Feeding', 'Skincare'],
    accent: '#EDE3EF',
  },
  {
    id: 2,
    name: 'Mama Glow Skincare',
    category: 'Pregnancy Skincare',
    logo: 'MG',
    logoColor: '#8A6492',
    tagline: 'Safe skincare for pregnancy — no harmful chemicals',
    description: 'Stretch mark oils, belly creams, and gentle body washes formulated for pregnant and nursing mamas across Nigeria.',
    website: '#',
    tags: ['Stretch Marks', 'Skincare', 'Nursing'],
    accent: '#F2E8F3',
  },
  {
    id: 3,
    name: 'NutriMama',
    category: 'Nutrition & Supplements',
    logo: 'NM',
    logoColor: '#2E7D32',
    tagline: 'Nigerian-formulated prenatal vitamins',
    description: 'Prenatal vitamins with folic acid, iron, and DHA blended specifically for Nigerian women — available nationwide.',
    website: '#',
    tags: ['Vitamins', 'Supplements', 'Nutrition'],
    accent: '#ECFDF5',
  },
  {
    id: 4,
    name: 'TinySteps Clothing',
    category: 'Baby Fashion',
    logo: 'TS',
    logoColor: '#5F8F5B',
    tagline: 'Comfortable, breathable clothes for Nigerian babies',
    description: "Lightweight, cotton-first baby clothing designed for Nigeria's climate. From newborn to 3 years, made with love.",
    website: '#',
    tags: ['Clothing', 'Newborn', 'Cotton'],
    accent: '#F0FAF0',
  },
  {
    id: 5,
    name: 'Lagos Birth Centre',
    category: 'Maternity Care',
    logo: 'LB',
    logoColor: '#1565C0',
    tagline: 'Warm, personalised birth experiences in Lagos',
    description: 'A midwife-led birth centre offering antenatal classes, birth packages, and postpartum support for Lagos mamas.',
    website: '#',
    tags: ['Birth', 'Antenatal', 'Lagos'],
    accent: '#EFF6FF',
  },
  {
    id: 6,
    name: 'Àdùnní Nutrition',
    category: 'Maternal Nutrition',
    logo: 'AN',
    logoColor: '#7B1FA2',
    tagline: 'Dietitian-led nutrition coaching for pregnant Nigerian women',
    description: 'Book one-on-one consultations with registered Nigerian dietitians. Nigerian food-based meal guidance for every trimester.',
    website: '#',
    tags: ['Dietitian', 'Meal Plans', 'Coaching'],
    accent: '#FAF0FF',
  },
];

const CATEGORIES = ['All', 'Baby Products', 'Pregnancy Skincare', 'Nutrition & Supplements', 'Baby Fashion', 'Maternity Care', 'Maternal Nutrition'];

const PLANS = [
  {
    name: '6 Months',
    total: '₦55,000',
    originalTotal: '₦60,000',
    saving: 'Save ₦5,000',
    period: '6 months',
    features: [
      'Brand listing in our directory',
      'Logo & category featured',
      'Link to your website',
      '2 sponsored community posts',
      'Performance report after 3 months',
    ],
    highlight: false,
  },
  {
    name: '12 Months',
    total: '₦100,000',
    originalTotal: '₦120,000',
    saving: 'Save ₦20,000',
    period: '1 year',
    features: [
      'Everything in 6-month plan',
      'Priority listing placement',
      '6 sponsored community posts',
      'Monthly performance reports',
      'Banner ad placement (1 month free)',
      'Early access to new ad formats',
    ],
    highlight: true,
  },
];

const STATS = [
  { value: '14,000+', label: 'Monthly active mamas' },
  { value: '6',       label: 'Trusted brands listed' },
  { value: '82%',     label: 'Mamas research products here' },
  { value: '3×',      label: 'Avg. purchase intent lift' },
];

export default function Brands() {
  const [showAdvertise, setShowAdvertise] = useState(false);
  const [selectedPlan, setSelectedPlan]   = useState(null);
  const [showEnquiry, setShowEnquiry]     = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? FEATURED_BRANDS
    : FEATURED_BRANDS.filter(b => b.category === activeCategory);

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100vh' }}>

      {/* ── HERO — full-bleed editorial ── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 'clamp(480px,60vh,640px)', display: 'flex', alignItems: 'flex-end' }}>
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=85&auto=format&fit=crop"
          alt="Brands"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Deep gradient overlay — plum-to-transparent */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(38,12,53,0.97) 0%, rgba(62,20,68,0.80) 45%, rgba(62,20,68,0.30) 100%)' }}/>

        {/* Decorative circle */}
        <div style={{ position: 'absolute', top: -120, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,146,181,0.12) 0%, transparent 70%)', pointerEvents: 'none' }}/>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,80px) clamp(48px,7vw,80px)' }}>
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(180,146,181,0.18)', border: '1px solid rgba(213,176,216,0.35)',
            color: 'var(--amber-soft)', padding: '6px 16px', borderRadius: 'var(--radius-full)',
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" fill="var(--amber-soft)" opacity="0.7"/></svg>
            Trusted by Nigerian Mamas
          </div>

          <h1 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem,5.5vw,4rem)',
            fontWeight: 800, color: 'white', lineHeight: 1.04,
            letterSpacing: '-0.03em', maxWidth: 680, marginBottom: 20,
          }}>
            Brands Nigerian<br/>
            <span style={{ color: 'var(--amber-soft)' }}>mamas love</span> &<br/>
            trust
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 480, marginBottom: 40 }}>
            Every brand listed here is community-reviewed — safe, quality products for pregnancy and early motherhood.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => setShowAdvertise(true)} style={{
              padding: '14px 32px', borderRadius: 'var(--radius-full)',
              background: 'var(--amber-soft)', color: 'var(--crimson-deep)',
              fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700,
              cursor: 'pointer', border: 'none',
              boxShadow: '0 6px 24px rgba(213,176,216,0.35)',
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--amber-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Advertise with us
            </button>
            <a href="#directory" style={{
              padding: '14px 32px', borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.85)',
              fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500,
              border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none',
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.16)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
            >
              Browse brands →
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div style={{
        background: 'var(--crimson)',
        padding: '20px clamp(20px,5vw,80px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: 0 }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center', padding: '12px 16px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600, marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BRAND DIRECTORY ── */}
      <section id="directory" style={{ padding: 'clamp(56px,7vw,80px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson-soft)', marginBottom: 10 }}>Brand Directory</p>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                {filtered.length} brand{filtered.length !== 1 ? 's' : ''} for<br className="hide-desktop"/>
                {' '}Nigerian mamas
              </h2>
            </div>
            <button onClick={() => setShowAdvertise(true)} style={{
              padding: '11px 22px', borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--crimson)', background: 'transparent', color: 'var(--crimson)',
              fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--crimson)'; }}
            >
              + List your brand
            </button>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid var(--earth-pale)' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '8px 18px', borderRadius: 'var(--radius-full)',
                border: 'none',
                background: activeCategory === cat ? 'var(--crimson)' : 'var(--cream-dark)',
                color: activeCategory === cat ? 'white' : 'var(--earth-mid)',
                fontSize: '0.8125rem', fontWeight: activeCategory === cat ? 700 : 500,
                cursor: 'pointer', transition: 'all var(--dur-fast)',
                boxShadow: activeCategory === cat ? '0 4px 12px rgba(62,20,68,0.25)' : 'none',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Cards — editorial two-row layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,320px),1fr))', gap: 24 }}>
            {filtered.map(brand => (
              <BrandCard key={brand.id} brand={brand} onAdvertise={() => setShowAdvertise(true)} />
            ))}
          </div>

        </div>
      </section>

      {/* ── ADVERTISE BAND ── */}
      <section style={{ background: 'var(--crimson-deep)', position: 'relative', overflow: 'hidden', padding: 'clamp(64px,9vw,100px) clamp(20px,5vw,80px)' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(213,176,216,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}/>

        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))', gap: 'clamp(40px,6vw,80px)', alignItems: 'center', position: 'relative', zIndex: 1 }}>

          {/* Copy */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(213,176,216,0.12)', border: '1px solid rgba(213,176,216,0.25)',
              color: 'var(--amber-soft)', padding: '6px 14px', borderRadius: 'var(--radius-full)',
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              marginBottom: 24,
            }}>
              Reach your customers
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 20 }}>
              Is your brand a fit<br/>for NaijaMama?
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
              Reach over 14,000 pregnant Nigerian women who are actively shopping for pregnancy, baby, and postpartum products. No wasted impressions.
            </p>
            <button onClick={() => setShowAdvertise(true)} style={{
              padding: '15px 36px', borderRadius: 'var(--radius-full)',
              background: 'var(--amber-soft)', color: 'var(--crimson-deep)',
              fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700,
              cursor: 'pointer', border: 'none',
              boxShadow: '0 8px 32px rgba(213,176,216,0.25)',
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--amber-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              View advertising plans →
            </button>
          </div>

          {/* What's included preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '📌', title: 'Brand listing in our directory', sub: 'Your logo, tagline, tags, and website link' },
              { icon: '📢', title: 'Sponsored community posts', sub: "Reach mamas where they're already talking" },
              { icon: '📊', title: 'Performance reports', sub: 'See clicks, impressions, and enquiries' },
              { icon: '🎯', title: 'Priority placement', sub: 'Top visibility in your category (12-month plan)' },
            ].map(item => (
              <div key={item.title} style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                background: 'rgba(255,255,255,0.06)', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.09)',
                padding: '16px 18px',
              }}>
                <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1, marginTop: 1 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem', marginBottom: 3 }}>{item.title}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVERTISE MODAL ── */}
      {showAdvertise && !showEnquiry && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(38,12,53,0.7)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', padding: '20px',
            overflowY: 'auto',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowAdvertise(false); }}
        >
          <div style={{
            background: 'white', borderRadius: 28, width: '100%', maxWidth: 700,
            overflow: 'hidden', animation: 'fadeInUp 0.25s var(--ease)',
            margin: 'auto',
          }}>
            {/* Modal header */}
            <div style={{ background: 'linear-gradient(135deg, var(--crimson-deep), var(--crimson))', padding: '32px 36px 28px', position: 'relative' }}>
              <button onClick={() => setShowAdvertise(false)} style={{
                position: 'absolute', top: 20, right: 20,
                width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', border: 'none',
                cursor: 'pointer', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                transition: 'background var(--dur-fast)',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              >✕</button>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(213,176,216,0.2)', border: '1px solid rgba(213,176,216,0.3)', color: 'var(--amber-soft)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Advertise with NaijaMama
              </div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 8, letterSpacing: '-0.02em' }}>
                Reach 14,000+ pregnant<br/>Nigerian women
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                Choose a listing plan that works for your brand. No hidden fees.
              </p>
            </div>

            {/* Plans */}
            <div style={{ padding: '28px 32px 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,270px),1fr))', gap: 16, marginBottom: 24 }}>
                {PLANS.map(plan => (
                  <div
                    key={plan.name}
                    onClick={() => setSelectedPlan(plan.name)}
                    style={{
                      borderRadius: 20, cursor: 'pointer', position: 'relative',
                      border: `2px solid ${selectedPlan === plan.name ? 'var(--crimson)' : 'var(--earth-pale)'}`,
                      background: selectedPlan === plan.name ? 'var(--crimson-pale)' : plan.highlight ? 'var(--ivory)' : 'white',
                      padding: '24px 22px',
                      transition: 'all var(--dur-fast)',
                      boxShadow: selectedPlan === plan.name ? '0 4px 20px rgba(62,20,68,0.15)' : 'none',
                    }}
                  >
                    {plan.highlight && (
                      <div style={{
                        position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                        background: 'linear-gradient(90deg, var(--crimson-deep), var(--crimson))',
                        color: 'white', fontSize: '0.6875rem', fontWeight: 700,
                        padding: '4px 14px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(62,20,68,0.3)',
                      }}>
                        ★ Best value
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>{plan.name}</h3>
                      <div style={{
                        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                        background: selectedPlan === plan.name ? 'var(--crimson)' : 'var(--earth-pale)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all var(--dur-fast)',
                      }}>
                        {selectedPlan === plan.name && (
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><polyline points="2 5.5 4.5 8 9 3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </div>
                    </div>

                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--earth-light)', textDecoration: 'line-through' }}>{plan.originalTotal}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 2 }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 900, color: 'var(--crimson)', lineHeight: 1, letterSpacing: '-0.02em' }}>{plan.total}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--earth-mid)', marginBottom: 6 }}>for {plan.period}</p>
                    <span style={{
                      display: 'inline-flex', background: '#D1FAE5', color: '#065F46',
                      fontSize: '0.6875rem', fontWeight: 700, padding: '3px 10px',
                      borderRadius: 'var(--radius-full)', marginBottom: 18,
                    }}>{plan.saving}</span>

                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {plan.features.map(f => (
                        <li key={f} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: '0.8125rem', color: 'var(--earth-mid)', lineHeight: 1.5 }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                            <circle cx="8" cy="8" r="8" fill="var(--crimson-pale)"/>
                            <polyline points="4.5 8 7 10.5 11.5 5.5" stroke="var(--crimson)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { if (selectedPlan) { setShowAdvertise(false); setShowEnquiry(true); } }}
                disabled={!selectedPlan}
                style={{
                  width: '100%', padding: '15px', borderRadius: 'var(--radius-full)',
                  border: 'none', cursor: selectedPlan ? 'pointer' : 'not-allowed',
                  background: selectedPlan ? 'linear-gradient(135deg, var(--crimson), var(--crimson-deep))' : 'var(--earth-pale)',
                  color: selectedPlan ? 'white' : 'var(--earth-light)',
                  fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9375rem',
                  transition: 'all var(--dur-fast)',
                  boxShadow: selectedPlan ? '0 6px 24px rgba(62,20,68,0.28)' : 'none',
                }}
              >
                {selectedPlan ? `Continue with ${selectedPlan} plan →` : 'Select a plan to continue'}
              </button>
              <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', textAlign: 'center', marginTop: 12 }}>
                No automatic charges. We'll contact you before any payment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── ENQUIRY FORM MODAL ── */}
      {showEnquiry && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(38,12,53,0.7)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', padding: '20px',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowEnquiry(false); }}
        >
          <div style={{
            background: 'white', borderRadius: 28,
            width: '100%', maxWidth: 500,
            animation: 'fadeInUp 0.25s var(--ease)',
            overflow: 'hidden',
          }}>
            <div style={{ background: 'linear-gradient(135deg, var(--crimson-deep), var(--crimson))', padding: '28px 32px 24px', position: 'relative' }}>
              <button onClick={() => setShowEnquiry(false)} style={{
                position: 'absolute', top: 18, right: 18,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)', border: 'none',
                cursor: 'pointer', color: 'white', fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-soft)', marginBottom: 8 }}>
                {selectedPlan} plan
              </p>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
                Let's get you listed
              </h3>
            </div>
            <div style={{ padding: '28px 32px 32px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--earth-mid)', marginBottom: 22, lineHeight: 1.65 }}>
                Fill in your details and we'll be in touch within 24 hours.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input className="input" placeholder="Brand / Company name"/>
                <input className="input" type="email" placeholder="Your email address"/>
                <input className="input" placeholder="Product or service category"/>
                <input className="input" placeholder="Phone number (optional)"/>
                <textarea className="input" rows={3} placeholder="Any details about your brand..." style={{ resize: 'vertical' }}/>
                <button onClick={() => { setShowEnquiry(false); setSelectedPlan(null); }} style={{
                  width: '100%', padding: '14px', borderRadius: 'var(--radius-full)',
                  border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, var(--crimson), var(--crimson-deep))',
                  color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9375rem',
                  boxShadow: '0 6px 24px rgba(62,20,68,0.28)',
                  transition: 'all var(--dur-fast)',
                }}>
                  Send enquiry →
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', textAlign: 'center' }}>
                  We respond within 24 hours on business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BrandCard({ brand, onAdvertise }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 22, overflow: 'hidden',
        background: 'white',
        border: '1px solid var(--earth-pale)',
        boxShadow: hovered ? '0 16px 48px rgba(62,20,68,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all var(--dur-mid) var(--ease)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top accent bar — brand's accent color */}
      <div style={{ height: 5, background: brand.logoColor, opacity: 0.8 }}/>

      {/* Header */}
      <div style={{ padding: '22px 22px 16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{
          width: 58, height: 58, borderRadius: 16, flexShrink: 0,
          background: brand.accent,
          border: `2px solid ${brand.logoColor}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: brand.logoColor, fontWeight: 900, fontSize: 16,
          fontFamily: 'var(--font-sans)',
          boxShadow: `0 4px 12px ${brand.logoColor}18`,
        }}>
          {brand.logo}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', marginBottom: 4, lineHeight: 1.2 }}>{brand.name}</p>
          <span style={{
            fontSize: '0.6875rem', fontWeight: 700, padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--crimson-pale)', color: 'var(--crimson)',
            letterSpacing: '0.03em',
          }}>{brand.category}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '0 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 10, lineHeight: 1.45, fontStyle: 'italic' }}>
          "{brand.tagline}"
        </p>
        <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)', lineHeight: 1.7, marginBottom: 16, flex: 1 }}>{brand.description}</p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {brand.tags.map(t => (
            <span key={t} style={{
              fontSize: '0.6875rem', fontWeight: 600, padding: '4px 11px',
              borderRadius: 'var(--radius-full)', background: brand.accent,
              color: brand.logoColor, border: `1px solid ${brand.logoColor}22`,
            }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <a href={brand.website} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '11px', borderRadius: 'var(--radius-full)',
          background: hovered ? brand.logoColor : 'var(--ivory-dark)',
          color: hovered ? 'white' : 'var(--ink)',
          fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700,
          textDecoration: 'none',
          transition: 'all var(--dur-fast)',
          border: `1.5px solid ${hovered ? brand.logoColor : 'var(--earth-pale)'}`,
        }}>
          Visit {brand.name}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </div>
  );
}
