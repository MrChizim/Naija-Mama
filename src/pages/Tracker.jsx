import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { weekData } from '../data/weeks';
import Icon from '../components/Icon';


const HERO = 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1400&q=85&auto=format&fit=crop';

/* Week-by-week size emoji — Nigerian fruits & familiar items */
const SIZE_EMOJI = {
  1: '🌱', 2: '🌱', 3: '🌱', 4: '🫘',
  5: '🫘', 6: '🫐', 7: '🫐', 8: '🍇',
  9: '🍈', 10: '🍈', 11: '🍋', 12: '🍋',
  13: '🍊', 14: '🍊', 15: '🍑', 16: '🥑',
  17: '🥑', 18: '🌽', 19: '🌽', 20: '🥭',
  21: '🥭', 22: '🥭', 23: '🍆', 24: '🌽',
  25: '🌽', 26: '🥬', 27: '🥦', 28: '🥥',
  29: '🥥', 30: '🎃', 31: '🎃', 32: '🍉',
  33: '🍉', 34: '🍉', 35: '🍉', 36: '🍈',
  37: '🥬', 38: '🥬', 39: '🍼', 40: '👶',
};

function CircularProgress({ percent, week, trimester }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const trimColors = { first: 'var(--amber)', second: 'var(--crimson)', third: 'var(--crimson-deep)' };
  const color = trimColors[trimester] || 'var(--crimson)';

  return (
    <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(138,100,146,0.12)" strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--crimson)', lineHeight: 1 }}>
          {week}
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--earth-light)', marginTop: 2 }}>of 40</span>
      </div>
    </div>
  );
}

export default function Tracker() {
  const [searchParams] = useSearchParams();
  const initialWeek = parseInt(searchParams.get('week')) || 1;
  const [selectedWeek, setSelectedWeek] = useState(Math.min(Math.max(initialWeek, 1), 40));
  const weekScrollRef = useRef(null);

  const data = weekData[selectedWeek];
  const percent = Math.round((selectedWeek / 40) * 100);
  const trimester = data?.trimester || 'second';

  const trimesterLabel = {
    first:  { label: 'First Trimester',  range: 'Weeks 1–13',  color: 'var(--amber)' },
    second: { label: 'Second Trimester', range: 'Weeks 14–26', color: 'var(--crimson)' },
    third:  { label: 'Third Trimester',  range: 'Weeks 27–40', color: 'var(--crimson-deep)' },
  };

  useEffect(() => {
    const el = weekScrollRef.current;
    if (!el) return;
    const btn = el.querySelector(`[data-week="${selectedWeek}"]`);
    if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selectedWeek]);

  const tInfo = trimesterLabel[trimester];

  return (
    <div style={{ paddingTop: 0, minHeight: '100vh', background: 'var(--ivory)' }}>

      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(280px,38vh,400px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img src={HERO} alt="Pregnancy tracker" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,10,0,0.2) 0%, rgba(26,10,0,0.88) 100%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 clamp(16px,4vw,48px) 48px' }}>
          <div className="badge" style={{ background: 'rgba(138,100,146,0.25)', color: 'var(--amber-soft)', display: 'inline-flex', gap: 6, marginBottom: 14 }}>
            <Icon name="heart" size={14} color="var(--amber-soft)" />
            Week-by-Week Guide
          </div>
          <h1 className="display-xl" style={{ color: 'white', maxWidth: 620 }}>Your Pregnancy Tracker</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.0625rem', marginTop: 10 }}>Know exactly what's happening with you and your baby, every single week.</p>
        </div>
      </section>

      {/* Disclaimer banner */}
      <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A', padding: '12px clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚕️</span>
          <p style={{ fontSize: '0.8125rem', color: '#92400E', lineHeight: 1.55 }}>
            <strong>Medical disclaimer:</strong> This tracker provides general educational information only. It does not replace advice from your doctor, midwife, or healthcare provider. Always consult a qualified professional for medical guidance during pregnancy.
          </p>
        </div>
      </div>

      {/* Week Selector */}
      <div style={{ background: 'var(--white)', padding: '16px 0', boxShadow: '0 2px 12px rgba(62,20,68,0.08)', position: 'sticky', top: 80, zIndex: 100 }}>
        <div ref={weekScrollRef} style={{
          display: 'flex', gap: 8, overflowX: 'auto',
          padding: '6px clamp(16px,4vw,48px)',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}>
          {Array.from({ length: 40 }, (_, i) => i + 1).map(w => {
            const wTrimester = w <= 13 ? 'first' : w <= 26 ? 'second' : 'third';
            const isSelected = w === selectedWeek;
            const trimBg = { first: 'var(--amber)', second: 'var(--crimson)', third: 'var(--crimson-deep)' };
            return (
              <button
                key={w}
                data-week={w}
                onClick={() => setSelectedWeek(w)}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: isSelected ? 'none' : '1.5px solid rgba(138,100,146,0.2)',
                  background: isSelected ? trimBg[wTrimester] : 'transparent',
                  color: isSelected ? 'white' : 'var(--earth-mid)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transform: isSelected ? 'scale(1.18)' : 'scale(1)',
                  transition: 'all 200ms ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(62,20,68,0.28)' : 'none',
                }}
              >
                {w}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px,4vw,48px) clamp(16px,4vw,48px)' }}>

        {/* Progress + Week Header Card */}
        <div className="card" style={{ padding: 'clamp(24px,4vw,40px)', marginBottom: 24, display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap' }}>
          <CircularProgress percent={percent} week={selectedWeek} trimester={trimester} />

          <div style={{ flex: 1, minWidth: 200 }}>
            <span className="badge badge-crimson" style={{ marginBottom: 12, display: 'inline-flex' }}>
              {tInfo.label} · {tInfo.range}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,64px)', fontWeight: 700, color: 'var(--crimson)', lineHeight: 1 }}>
                Week {selectedWeek}
              </span>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 16,
              background: 'var(--crimson-pale)', borderRadius: 16, padding: '14px 18px',
              border: '1.5px solid rgba(62,20,68,0.15)', maxWidth: '100%',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'white', border: '2px solid rgba(62,20,68,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 30, lineHeight: 1,
              }}>
                {SIZE_EMOJI[selectedWeek] || '🌱'}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: 'var(--crimson)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  Baby's size — Week {selectedWeek}
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--ink)', fontWeight: 700, lineHeight: 1.25 }}>
                  About the size of {data?.babySize?.toLowerCase().replace(/^a(n)? /i, '') || 'a poppy seed'}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--earth-mid)', marginTop: 2 }}>
                  General comparison — every baby grows differently
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--earth-light)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Pregnancy Progress
            </p>
            <div style={{ height: 10, background: 'rgba(138,100,146,0.1)', borderRadius: 5, overflow: 'hidden', marginBottom: 6 }}>
              <div style={{
                height: '100%', width: `${percent}%`,
                background: 'linear-gradient(90deg, var(--crimson-soft), var(--crimson))',
                borderRadius: 5, transition: 'width 0.6s ease',
              }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--earth-light)' }}>Week 1</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--crimson)', fontWeight: 700 }}>{percent}% complete</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--earth-light)' }}>Week 40</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[
                { label: '1st', weeks: '1–13',  key: 'first' },
                { label: '2nd', weeks: '14–26', key: 'second' },
                { label: '3rd', weeks: '27–40', key: 'third' },
              ].map(t => (
                <div key={t.label} style={{
                  flex: 1, padding: '7px 8px',
                  background: t.key === trimester ? 'rgba(62,20,68,0.06)' : 'rgba(0,0,0,0.03)',
                  borderRadius: 10, textAlign: 'center',
                  border: t.key === trimester ? '1.5px solid rgba(138,100,146,0.3)' : '1.5px solid transparent',
                }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: t.key === trimester ? 700 : 500, color: t.key === trimester ? 'var(--crimson)' : 'var(--earth-light)' }}>
                    {t.label} Trim
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: 'var(--earth-light)' }}>Wks {t.weeks}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 20 }}>

          {/* Baby Development */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(62,20,68,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="baby" size={18} color="var(--crimson)" />
              </span>
              Baby's Development
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data?.development.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: 'var(--crimson)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.6875rem',
                  }}>{i + 1}</span>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--earth-mid)', lineHeight: 1.65 }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Your Body */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(62,20,68,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="pregnant" size={18} color="var(--crimson)" />
              </span>
              Your Body This Week
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data?.yourBody.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--crimson)', marginTop: 3, flexShrink: 0 }}><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" fill="var(--crimson)"/></svg></span>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--earth-mid)', lineHeight: 1.65 }}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition - general guidance, no specific prescriptions */}
          <div className="card" style={{ padding: '24px', background: 'var(--ivory-dark)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(62,20,68,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="food" size={18} color="var(--crimson)" />
              </span>
              Nutrition Guide
            </h3>
            {/* Disclaimer */}
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '9px 12px', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 14, flexShrink: 0, lineHeight: 1 }}>⚕️</span>
              <p style={{ fontSize: '0.72rem', color: '#92400E', lineHeight: 1.55 }}>
                These are general Nigerian foods known to support pregnancy. <strong>Always confirm your specific diet with your doctor or registered dietitian.</strong>
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data?.foods.map((food, i) => (
                <div key={i} style={{ background: 'var(--white)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, marginTop: 2 }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#D1FAE5"/><path d="M5 8l2 2 4-4" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: 2 }}>{food.name}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--earth-mid)', lineHeight: 1.5 }}>{food.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Watch For + Antenatal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#FFF8E1', borderRadius: 'var(--radius-lg)', padding: '22px', border: '1.5px solid #FFE082', boxShadow: 'var(--shadow-card)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#E65100', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="alert" size={16} color="#E65100" />
                What to Watch For
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {data?.watchFor.map((item, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--ink)', lineHeight: 1.65, marginBottom: 8, paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#E65100' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#E65100', marginTop: 10, fontWeight: 600 }}>
                Contact your doctor immediately if you experience any of these.
              </p>
            </div>

            {data?.antenatal && (
              <div style={{ background: 'var(--crimson-pale)', borderRadius: 'var(--radius-lg)', padding: '22px', border: '1.5px solid rgba(138,100,146,0.25)', boxShadow: 'var(--shadow-card)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--crimson)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="hospital" size={16} color="var(--crimson)" />
                  Antenatal Reminder
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                  {data.antenatal}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Week Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, gap: 16 }}>
          <button
            onClick={() => setSelectedWeek(w => Math.max(1, w - 1))}
            disabled={selectedWeek === 1}
            className="btn btn-outline"
            style={{ opacity: selectedWeek === 1 ? 0.4 : 1, cursor: selectedWeek === 1 ? 'default' : 'pointer' }}
          >
            ← Week {selectedWeek - 1}
          </button>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--earth-light)' }}>
            Week {selectedWeek} of 40
          </span>
          <button
            onClick={() => setSelectedWeek(w => Math.min(40, w + 1))}
            disabled={selectedWeek === 40}
            className="btn btn-primary"
            style={{ opacity: selectedWeek === 40 ? 0.4 : 1, cursor: selectedWeek === 40 ? 'default' : 'pointer' }}
          >
            Week {selectedWeek + 1} →
          </button>
        </div>
      </div>

      {/* Community CTA */}
      <section style={{ background: 'linear-gradient(150deg,var(--crimson-deep) 0%, #180825 100%)', padding: 'clamp(60px,8vw,100px) clamp(16px,4vw,48px)', textAlign: 'center', marginTop: 48 }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 className="display-md" style={{ color: 'white', marginBottom: 16 }}>Talk to 14,000+ Nigerian mamas</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 28, lineHeight: 1.75 }}>Questions, experiences, hospital advice — real Nigerian women who understand what you're going through.</p>
          <a href="/community" className="btn btn-amber btn-lg" style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
            <Icon name="heart" size={16} color="white" />
            Join the Mama Village
          </a>
        </div>
      </section>

    </div>
  );
}
