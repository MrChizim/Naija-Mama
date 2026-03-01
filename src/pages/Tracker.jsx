import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { weekData } from '../data/weeks';
import { Heart, Baby, User, Utensils, AlertTriangle, Building2, Clock, Stethoscope } from 'lucide-react';


const HERO = 'https://images.pexels.com/photos/33906413/pexels-photo-33906413.jpeg?auto=compress&cs=tinysrgb&w=1400';

/* Baby size text descriptions — Nigerian context */
const SIZE_TEXT = {
  1:  { size: '0.1 mm', compare: 'smaller than a grain of sand' },
  2:  { size: '1 mm',   compare: 'size of a poppy seed' },
  3:  { size: '2 mm',   compare: 'size of a sesame seed' },
  4:  { size: '4 mm',   compare: 'size of a dried kidney bean' },
  5:  { size: '6 mm',   compare: 'size of a grain of rice' },
  6:  { size: '8 mm',   compare: 'size of a lentil' },
  7:  { size: '1.3 cm', compare: 'size of a blueberry' },
  8:  { size: '1.6 cm', compare: 'size of a small grape' },
  9:  { size: '2.3 cm', compare: 'size of a cherry' },
  10: { size: '3.1 cm', compare: 'size of a date fruit' },
  11: { size: '4 cm',   compare: 'size of a fig' },
  12: { size: '5.4 cm', compare: 'size of a large lime' },
  13: { size: '7.4 cm', compare: 'size of a small orange' },
  14: { size: '8.7 cm', compare: 'size of a large orange' },
  15: { size: '10 cm',  compare: 'size of an apple' },
  16: { size: '11.6 cm',compare: 'size of an avocado' },
  17: { size: '13 cm',  compare: 'size of a large pear' },
  18: { size: '14 cm',  compare: 'size of a sweet potato' },
  19: { size: '15 cm',  compare: 'size of a mango' },
  20: { size: '16.4 cm',compare: 'size of a plantain' },
  21: { size: '26 cm',  compare: 'length of a large plantain (head to toe)' },
  22: { size: '27.8 cm',compare: 'length of a small yam tuber' },
  23: { size: '28.9 cm',compare: 'length of a standard ruler' },
  24: { size: '30 cm',  compare: 'length of a large corn cob' },
  25: { size: '34.6 cm',compare: 'length of your forearm' },
  26: { size: '35.6 cm',compare: 'length of a large cucumber' },
  27: { size: '36.6 cm',compare: 'length of a head of cabbage' },
  28: { size: '37.6 cm',compare: 'length of a large coconut shell (top to bottom)' },
  29: { size: '38.6 cm',compare: 'length of a small watermelon' },
  30: { size: '39.9 cm',compare: 'length of a 40 cm ruler' },
  31: { size: '41.1 cm',compare: 'length of a medium pumpkin' },
  32: { size: '42.4 cm',compare: 'size of a small pumpkin' },
  33: { size: '43.7 cm',compare: 'size of a pineapple' },
  34: { size: '45 cm',  compare: 'size of a large pineapple' },
  35: { size: '46.2 cm',compare: 'size of a small watermelon' },
  36: { size: '47.4 cm',compare: 'size of a large watermelon' },
  37: { size: '48.6 cm',compare: 'about the length of a new broom handle' },
  38: { size: '49.8 cm',compare: 'about the length of a newborn baby blanket' },
  39: { size: '50.7 cm',compare: 'close to full newborn size' },
  40: { size: '51.2 cm',compare: 'full-term newborn — ready to meet the world!' },
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
  const urlWeek = parseInt(searchParams.get('week'));

  // If no stored week and no URL param, show the prompt
  const stored = localStorage.getItem('nm_week');
  const [showPrompt, setShowPrompt] = useState(!urlWeek && !stored);
  const [promptInput, setPromptInput] = useState('');

  const initialWeek = urlWeek || (stored ? parseInt(stored) : 1);
  const [selectedWeek, setSelectedWeek] = useState(Math.min(Math.max(initialWeek, 1), 40));
  const weekScrollRef = useRef(null);

  function handlePromptSubmit(week) {
    const w = Math.min(Math.max(parseInt(week) || 1, 1), 40);
    localStorage.setItem('nm_week', w);
    setSelectedWeek(w);
    setShowPrompt(false);
  }

  function handleSkip() {
    localStorage.setItem('nm_week', '1');
    setShowPrompt(false);
  }

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

      {/* ── Week prompt overlay ── */}
      {showPrompt && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(38,12,53,0.72)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}>
          <div style={{
            background: 'white', borderRadius: 24, padding: 'clamp(28px,5vw,44px)',
            maxWidth: 420, width: '100%',
            boxShadow: '0 32px 80px rgba(38,12,53,0.4)',
            animation: 'fadeInUp 0.3s var(--ease)',
            textAlign: 'center',
          }}>
            {/* Icon */}
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--crimson-pale)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={28} stroke="var(--crimson)" strokeWidth="1.8" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginBottom: 10, lineHeight: 1.2 }}>
              What week are you on?
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--earth-mid)', marginBottom: 28, lineHeight: 1.65 }}>
              We'll take you straight to your week so you see the most relevant information.
            </p>

            {/* Week input */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                type="number"
                min="1" max="40"
                placeholder="e.g. 24"
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && promptInput && handlePromptSubmit(promptInput)}
                className="input"
                style={{ flex: 1, fontSize: '1.2rem', fontWeight: 700, textAlign: 'center', height: 56, borderRadius: 14 }}
                autoFocus
              />
              <button
                onClick={() => promptInput && handlePromptSubmit(promptInput)}
                style={{
                  padding: '0 22px', borderRadius: 14, border: 'none',
                  background: promptInput ? 'var(--crimson)' : 'var(--earth-pale)',
                  color: promptInput ? 'white' : 'var(--earth-light)',
                  fontWeight: 700, fontSize: '0.9rem', cursor: promptInput ? 'pointer' : 'default',
                  transition: 'all var(--dur-fast)', height: 56,
                  fontFamily: 'var(--font-sans)',
                }}
              >Go</button>
            </div>

            {/* Quick select — common weeks */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 22 }}>
              {[8, 12, 16, 20, 24, 28, 32, 36].map(w => (
                <button key={w} onClick={() => handlePromptSubmit(w)} style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--earth-pale)', background: 'var(--cream)',
                  color: 'var(--earth-mid)', fontSize: '0.8125rem', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  transition: 'all var(--dur-fast)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson-pale)'; e.currentTarget.style.borderColor = 'var(--crimson-soft)'; e.currentTarget.style.color = 'var(--crimson)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--earth-pale)'; e.currentTarget.style.color = 'var(--earth-mid)'; }}
                >
                  Wk {w}
                </button>
              ))}
            </div>

            <button onClick={handleSkip} style={{ background: 'none', border: 'none', color: 'var(--earth-light)', fontSize: '0.8125rem', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
              Skip — start from week 1
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(280px,38vh,400px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img src={HERO} alt="Pregnancy tracker" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,10,0,0.2) 0%, rgba(26,10,0,0.88) 100%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: '0 clamp(16px,4vw,48px) 48px' }}>
          <div className="badge" style={{ background: 'rgba(138,100,146,0.25)', color: 'var(--amber-soft)', display: 'inline-flex', gap: 6, marginBottom: 14 }}>
            <Heart size={14} color="var(--amber-soft)" strokeWidth="1.8" />
            Week-by-Week Guide
          </div>
          <h1 className="display-xl" style={{ color: 'white', maxWidth: 620 }}>Your Pregnancy Tracker</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.0625rem', marginTop: 10 }}>Know exactly what's happening with you and your baby, every single week.</p>
        </div>
      </section>

      {/* Week change nudge — shown when we have a stored week */}
      {!showPrompt && localStorage.getItem('nm_week') && (
        <div style={{ background: 'var(--crimson-pale)', padding: '10px clamp(16px,4vw,48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--crimson)', fontWeight: 500 }}>
            Showing Week {selectedWeek} — changed week?
          </p>
          <button onClick={() => { localStorage.removeItem('nm_week'); setShowPrompt(true); }} style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--crimson)', background: 'none', border: '1px solid var(--crimson-soft)', borderRadius: 'var(--radius-full)', padding: '4px 14px', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
            Update my week
          </button>
        </div>
      )}

      {/* Disclaimer banner */}
      <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A', padding: '12px clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}><Stethoscope size={16} stroke="#92400E" strokeWidth="1.8" /></span>
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
                background: 'var(--crimson)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Baby size={24} stroke="white" strokeWidth="1.8" />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: 'var(--crimson)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                  Baby's size — Week {selectedWeek}
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 800, lineHeight: 1.2, marginBottom: 2 }}>
                  {SIZE_TEXT[selectedWeek]?.size || data?.babySize || 'Growing'}
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)', lineHeight: 1.4 }}>
                  {SIZE_TEXT[selectedWeek]?.compare || 'Every baby grows differently'}
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
                <Baby size={18} color="var(--crimson)" strokeWidth="1.8" />
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
                <User size={18} color="var(--crimson)" strokeWidth="1.8" />
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
                <Utensils size={18} color="var(--crimson)" strokeWidth="1.8" />
              </span>
              Nutrition Guide
            </h3>
            {/* Disclaimer */}
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '9px 12px', marginBottom: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, lineHeight: 1, display: 'flex', alignItems: 'center' }}><Stethoscope size={14} stroke="#92400E" strokeWidth="1.8" /></span>
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
                <AlertTriangle size={16} color="#E65100" strokeWidth="1.8" />
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
                  <Building2 size={16} color="var(--crimson)" strokeWidth="1.8" />
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
            <Heart size={16} color="white" strokeWidth="1.8" />
            Join the Mama Village
          </a>
        </div>
      </section>

    </div>
  );
}
