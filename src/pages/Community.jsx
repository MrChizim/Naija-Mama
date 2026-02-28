import { useState } from 'react';
import { communityPosts, trendingTopics, FLAIRS, FLAIR_COLORS } from '../data/community';

/* ── Icons ── */
function IconHeart({ filled, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'var(--crimson)' : 'none'} stroke={filled ? 'var(--crimson)' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
function IconMessage({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function IconBookmark({ filled, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'var(--crimson)' : 'none'} stroke={filled ? 'var(--crimson)' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function IconPencil({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  );
}
function IconX({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function IconFlag({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
}
function IconShare({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
    </svg>
  );
}
function IconTrend({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}
function IconAnon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/><line x1="3" y1="3" x2="21" y2="21"/>
    </svg>
  );
}
function IconCheck({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function IconInfo({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/>
    </svg>
  );
}

function Toast({ msg, onDone }) {
  setTimeout(onDone, 2800);
  return (
    <div style={{
      position: 'fixed', bottom: 88, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--ink)', color: 'white',
      padding: '11px 20px', borderRadius: 'var(--radius-full)',
      fontWeight: 600, fontSize: '0.875rem',
      boxShadow: '0 8px 32px rgba(45,27,34,0.3)',
      zIndex: 9999, whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'fadeInUp 0.3s var(--ease)',
      pointerEvents: 'none',
    }}>
      <span style={{ width: 18, height: 18, background: '#2E7D32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <IconCheck size={10}/>
      </span>
      {msg}
    </div>
  );
}

const TRIMESTER_CFG = {
  first:   { label: 'First Trimester',  bg: '#F0EBF8', color: '#6B4FA0' },
  second:  { label: 'Second Trimester', bg: 'var(--crimson-pale)', color: 'var(--crimson)' },
  third:   { label: 'Third Trimester',  bg: '#FFF0E8', color: '#B85C1A' },
  newmama: { label: 'New Mama',         bg: 'var(--amber-pale)', color: 'var(--amber-deep)' },
  general: { label: 'General',          bg: 'var(--cream)', color: 'var(--earth-mid)' },
};

const SORT_OPTIONS = [
  { value: 'new',    label: 'New' },
  { value: 'top',    label: 'Top' },
  { value: 'active', label: 'Active' },
];

const TRIMESTER_FILTERS = [
  { value: 'all',     label: 'All' },
  { value: 'first',   label: 'T1' },
  { value: 'second',  label: 'T2' },
  { value: 'third',   label: 'T3' },
  { value: 'newmama', label: 'New Mama' },
];

const TRIMESTER_LABELS = {
  all: 'All posts', first: 'First Trimester', second: 'Second Trimester', third: 'Third Trimester', newmama: 'New Mamas',
};

export default function Community() {
  const [sort, setSort]               = useState('new');
  const [trimFilter, setTrimFilter]   = useState('all');
  const [flairFilter, setFlairFilter] = useState('all');
  const [flairTooltip, setFlairTooltip] = useState(null); // id of flair whose tooltip is open
  const [toast, setToast]             = useState(null);
  const [showComposer, setShowComposer] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);

  const sorted = [...communityPosts]
    .filter(p => trimFilter === 'all' || p.trimesterGroup === trimFilter)
    .filter(p => flairFilter === 'all' || p.flair === flairFilter)
    .sort((a, b) => {
      if (sort === 'top')    return b.helpful - a.helpful;
      if (sort === 'active') return b.replies - a.replies;
      return b.id - a.id;
    });

  const activeFlair = FLAIRS.find(f => f.id === flairFilter);

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100vh' }}>

      {/* ── Page header ── */}
      <div style={{ position: 'relative', background: '#1C0A0E', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=80&auto=format&fit=crop"
          alt="Nigerian women community"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(28,10,14,0.5) 0%, rgba(28,10,14,0.92) 100%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(32px,5vw,64px) clamp(16px,5vw,80px) 0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--crimson-soft)', marginBottom: 10 }}>
              14,000 members strong
            </p>
            <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem,4vw,3.2rem)', fontWeight: 700, color: 'white', marginBottom: 8, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              The Mama Village
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9375rem', marginBottom: 24, maxWidth: 400 }}>
              Real stories, real support, real Nigerian women.
            </p>

            {/* ── Trimester tabs (abbreviated on mobile) ── */}
            <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.08)', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {TRIMESTER_FILTERS.map(f => (
                <button key={f.value} onClick={() => setTrimFilter(f.value)} style={{
                  padding: '10px 14px', background: 'transparent',
                  color: trimFilter === f.value ? 'white' : 'rgba(255,255,255,0.45)',
                  fontFamily: 'var(--font-sans)', fontSize: '0.8125rem',
                  fontWeight: trimFilter === f.value ? 700 : 400,
                  borderBottom: trimFilter === f.value ? '2px solid var(--crimson)' : '2px solid transparent',
                  transition: 'all var(--dur-fast)', whiteSpace: 'nowrap',
                  cursor: 'pointer', flexShrink: 0,
                }}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* ── Flair / topic pills ── */}
            <div style={{ overflowX: 'auto', scrollbarWidth: 'none' }}>
              <div style={{ display: 'flex', gap: 6, padding: '12px 0 14px', width: 'max-content' }}>
                {FLAIRS.map(f => {
                  const active = flairFilter === f.id;
                  const cfg    = FLAIR_COLORS[f.id];
                  const showTip = flairTooltip === f.id;
                  return (
                    <div key={f.id} style={{ position: 'relative', flexShrink: 0 }}>
                      <button
                        onClick={() => {
                          setFlairFilter(f.id);
                          // toggle tooltip on tap for flairs that have one
                          if (f.tooltip) setFlairTooltip(showTip ? null : f.id);
                          else setFlairTooltip(null);
                        }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          padding: '6px 14px', borderRadius: 'var(--radius-full)',
                          background: active ? (cfg ? cfg.bg : 'white') : 'rgba(255,255,255,0.07)',
                          color: active ? (cfg ? cfg.color : 'var(--ink)') : 'rgba(255,255,255,0.55)',
                          border: '1.5px solid ' + (active ? (cfg ? cfg.color : 'white') : 'rgba(255,255,255,0.12)'),
                          fontFamily: 'var(--font-sans)', fontSize: '0.8125rem',
                          fontWeight: active ? 700 : 400,
                          cursor: 'pointer', whiteSpace: 'nowrap',
                          transition: 'all var(--dur-fast)',
                        }}>
                        {f.label}
                        {f.tooltip && (
                          <span style={{
                            width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
                            background: active ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.55rem', fontWeight: 800,
                            color: active ? 'inherit' : 'rgba(255,255,255,0.7)',
                          }}>i</span>
                        )}
                      </button>
                      {/* Inline tooltip — visible on tap, dismisses when another is tapped */}
                      {showTip && f.tooltip && (
                        <div style={{
                          position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 500,
                          background: 'var(--ink)', color: 'white',
                          padding: '8px 12px', borderRadius: 10,
                          fontSize: '0.75rem', lineHeight: 1.5,
                          width: 220, boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                          animation: 'fadeInUp 0.15s var(--ease)',
                          pointerEvents: 'none',
                        }}>
                          {f.tooltip}
                          {/* Arrow */}
                          <div style={{ position: 'absolute', top: -5, left: 16, width: 10, height: 10, background: 'var(--ink)', transform: 'rotate(45deg)', borderRadius: 2 }}/>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="community-body" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px,4vw,40px) clamp(12px,5vw,80px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) min(300px,30%)', gap: 28, alignItems: 'start' }}>

        {/* Feed */}
        <div>
          {/* Feed controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 10 }}>
            {/* Sort pills */}
            <div style={{ display: 'flex', gap: 2, background: 'var(--cream)', borderRadius: 'var(--radius-full)', padding: 3, border: '1px solid var(--earth-pale)', flexShrink: 0 }}>
              {SORT_OPTIONS.map(o => (
                <button key={o.value} onClick={() => setSort(o.value)} style={{
                  padding: '6px 12px', borderRadius: 'var(--radius-full)',
                  background: sort === o.value ? 'white' : 'transparent',
                  color: sort === o.value ? 'var(--ink)' : 'var(--earth-mid)',
                  fontFamily: 'var(--font-sans)', fontSize: '0.8125rem',
                  fontWeight: sort === o.value ? 600 : 400,
                  boxShadow: sort === o.value ? 'var(--shadow-sm)' : 'none',
                  transition: 'all var(--dur-fast)', cursor: 'pointer', whiteSpace: 'nowrap',
                }}>{o.label}</button>
              ))}
            </div>
            {/* Active filter label */}
            {(trimFilter !== 'all' || flairFilter !== 'all') && (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', flex: 1, minWidth: 0 }}>
                {trimFilter !== 'all' && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--crimson)', fontWeight: 600, background: 'var(--crimson-pale)', padding: '3px 8px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                    {TRIMESTER_LABELS[trimFilter]}
                  </span>
                )}
                {flairFilter !== 'all' && activeFlair && (
                  <span style={{ fontSize: '0.75rem', color: FLAIR_COLORS[flairFilter]?.color || 'var(--ink)', fontWeight: 600, background: FLAIR_COLORS[flairFilter]?.bg || 'var(--cream)', padding: '3px 8px', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                    {activeFlair.label}
                  </span>
                )}
                <button onClick={() => { setTrimFilter('all'); setFlairFilter('all'); }} style={{ fontSize: '0.7rem', color: 'var(--earth-light)', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: '0 2px' }}>✕</button>
              </div>
            )}
            <button onClick={() => setShowComposer(true)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 'var(--radius-full)',
              background: 'var(--crimson)', color: 'white',
              fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600,
              cursor: 'pointer', border: 'none',
              boxShadow: '0 4px 16px rgba(62,20,68,0.25)', flexShrink: 0,
            }}>
              <IconPencil size={14}/> <span className="hide-mobile">Write a post</span><span className="hide-desktop">Post</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sorted.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '56px 20px', background: 'white', borderRadius: 16, border: '1px solid var(--earth-pale)' }}>
                <p style={{ fontSize: '2rem', marginBottom: 12 }}>🌸</p>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>No posts here yet</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--earth-mid)' }}>Be the first mama to post in this topic.</p>
              </div>
            ) : sorted.map(post => (
              <PostCard
                key={post.id}
                post={post}
                expanded={expandedPost === post.id}
                onExpand={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                onToast={setToast}
              />
            ))}
          </div>
        </div>

        {/* Sidebar — desktop only */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 96 }} className="hide-mobile">
          <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', marginBottom: 14, lineHeight: 1.6 }}>
              Share your experience with 14,000+ mamas
            </p>
            <button onClick={() => setShowComposer(true)} style={{
              width: '100%', padding: '11px', borderRadius: 'var(--radius-full)',
              background: 'var(--crimson)', color: 'white',
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem',
              cursor: 'pointer', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            }}>
              <IconPencil size={14}/> Write a post
            </button>
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--earth-pale)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--earth-pale)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--ink)' }}>Village stats</p>
            </div>
            {[
              { label: 'Total members',    value: '14,247' },
              { label: 'Posts this week',  value: '1,891' },
              { label: 'Active right now', value: '342' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 18px', borderBottom: '1px solid var(--earth-pale)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)' }}>{label}</span>
                <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.875rem' }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--earth-pale)', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--earth-pale)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <IconTrend size={13}/>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--ink)' }}>Trending</p>
            </div>
            <div style={{ padding: '6px 8px' }}>
              {trendingTopics.map((t, i) => (
                <div key={t.tag} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                  transition: 'background var(--dur-fast)',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: i < 3 ? 'var(--crimson)' : 'var(--earth-light)', minWidth: 16 }}>{i + 1}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--ink)', fontWeight: 500 }}>{t.tag}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="https://www.siriusjobs.com.ng" target="_blank" rel="noopener noreferrer" style={{
            display: 'block', background: 'var(--crimson-pale)', borderRadius: 16,
            padding: '18px', textDecoration: 'none', border: '1px solid var(--crimson-soft)',
            transition: 'background var(--dur-fast)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson-pale)'}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--crimson)', display: 'block', marginBottom: 6 }}>
              Need someone to talk to?
            </span>
            <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)', lineHeight: 1.6 }}>
              Pregnancy can be overwhelming. Therapists and doctors are here for you.
            </p>
          </a>
        </aside>
      </div>

      {/* ── Floating compose (mobile) ── */}
      <button onClick={() => setShowComposer(true)} className="hide-desktop" style={{
        position: 'fixed', bottom: 24, right: 16,
        width: 52, height: 52, borderRadius: '50%',
        background: 'var(--crimson)', color: 'white',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(62,20,68,0.4)', zIndex: 200,
      }}>
        <IconPencil size={20}/>
      </button>

      {showComposer && (
        <ComposerModal
          onClose={() => setShowComposer(false)}
          onPost={() => { setShowComposer(false); setToast('Post submitted for review!'); }}
        />
      )}

      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </div>
  );
}

function PostCard({ post, expanded, onExpand, onToast }) {
  const [likes,    setLikes]    = useState(post.helpful);
  const [liked,    setLiked]    = useState(false);
  const [meToo,    setMeToo]    = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [reported, setReported] = useState(false);

  const trimCfg  = TRIMESTER_CFG[post.trimesterGroup] || TRIMESTER_CFG.general;
  const flairCfg = FLAIR_COLORS[post.flair];
  const flairObj = FLAIRS.find(f => f.id === post.flair);
  const isAnon   = post.isAnonymous;

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Check out this post on NaijaMama: "' + post.title + '" — naijamama.ng/community');
    window.open('https://wa.me/?text=' + text, '_blank');
  };

  return (
    <article style={{
      background: 'white', borderRadius: 14, border: '1px solid var(--earth-pale)',
      padding: '16px',
      transition: 'box-shadow var(--dur-mid) var(--ease)',
    }}>
      {/* Author row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
        {isAnon ? (
          <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: 'var(--earth-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconAnon size={17}/>
          </div>
        ) : (
          <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: post.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, fontFamily: 'var(--font-sans)' }}>
            {post.initial}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>
              {isAnon ? 'Anonymous Mama' : post.username}
            </span>
            {!isAnon && post.city && (
              <span style={{ fontSize: '0.6875rem', color: 'var(--earth-light)' }}>· {post.city}</span>
            )}
          </div>
          {/* Badges on second line — prevents cramping */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 2 }}>
            <span style={{ fontSize: '0.625rem', fontWeight: 600, padding: '2px 7px', borderRadius: 'var(--radius-full)', background: trimCfg.bg, color: trimCfg.color }}>
              {trimCfg.label}
            </span>
            {flairObj && flairCfg && (
              <span style={{ fontSize: '0.625rem', fontWeight: 600, padding: '2px 7px', borderRadius: 'var(--radius-full)', background: flairCfg.bg, color: flairCfg.color }}>
                {flairObj.label}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.6875rem', color: 'var(--earth-light)' }}>{post.timePosted}</span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.4, cursor: 'pointer' }} onClick={onExpand}>
        {post.title}
      </h3>

      {/* Body */}
      <p style={{ fontSize: '0.875rem', color: 'var(--earth-mid)', lineHeight: 1.7, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: expanded ? 'unset' : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {post.body}
      </p>
      <button onClick={onExpand} style={{ fontSize: '0.8125rem', color: 'var(--crimson)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, marginBottom: 10, padding: 0, fontFamily: 'var(--font-sans)' }}>
        {expanded ? 'Show less' : 'Read more'}
      </button>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
        {post.tags.map(t => (
          <span key={t} style={{ fontSize: '0.625rem', fontWeight: 500, color: 'var(--earth-mid)', background: 'var(--cream)', padding: '3px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--earth-pale)' }}>
            {t}
          </span>
        ))}
      </div>

      {/* ── Actions — two rows on mobile ── */}
      <div style={{ paddingTop: 10, borderTop: '1px solid var(--earth-pale)' }}>
        {/* Row 1: engagement */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <Btn active={liked} activeBg="var(--crimson-pale)" activeColor="var(--crimson)" activeBorder="var(--crimson-soft)"
            onClick={() => { setLiked(l => !l); setLikes(n => liked ? n - 1 : n + 1); }}>
            <IconHeart filled={liked} size={14}/> {likes}
          </Btn>
          <Btn active={meToo} activeBg="var(--amber-pale)" activeColor="var(--amber-deep)" activeBorder="var(--amber-soft)"
            onClick={() => { setMeToo(m => !m); if (!meToo) onToast('Me too! 👋'); }}>
            <span style={{ fontSize: 12 }}>👋</span> {meToo ? 'Me too!' : 'Me too'}
          </Btn>
          <Btn onClick={() => {}}>
            <IconMessage size={14}/> {post.replies}
          </Btn>
        </div>
        {/* Row 2: utility */}
        <div style={{ display: 'flex', gap: 6 }}>
          <Btn active={saved} activeBg="var(--crimson-pale)" activeColor="var(--crimson)" activeBorder="var(--crimson-soft)"
            onClick={() => { setSaved(s => !s); onToast(saved ? 'Removed from saved' : 'Saved!'); }}>
            <IconBookmark filled={saved} size={14}/> {saved ? 'Saved' : 'Save'}
          </Btn>
          <Btn onClick={handleWhatsApp}>
            <IconShare size={14}/> Share
          </Btn>
          {!reported ? (
            <Btn onClick={() => { setReported(true); onToast('Reported. Thank you.'); }}>
              <IconFlag size={13}/> Report
            </Btn>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)', padding: '6px 4px' }}>Reported</span>
          )}
        </div>
      </div>
    </article>
  );
}

function Btn({ children, active, activeBg, activeColor, activeBorder, onClick, style: extra }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 5,
      padding: '7px 12px', borderRadius: 'var(--radius-full)',
      background: active ? activeBg : 'var(--cream)',
      color: active ? activeColor : 'var(--earth-mid)',
      border: '1px solid ' + (active ? activeBorder : 'var(--earth-pale)'),
      fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: active ? 600 : 400,
      cursor: 'pointer', transition: 'all var(--dur-fast)', whiteSpace: 'nowrap',
      ...extra,
    }}>
      {children}
    </button>
  );
}

function ComposerModal({ onClose, onPost }) {
  const [isAnon, setIsAnon] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(45,27,34,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '20px 20px 32px', width: '100%', maxWidth: 600, animation: 'fadeInUp 0.25s var(--ease)', maxHeight: '92vh', overflowY: 'auto' }}>

        {/* Handle bar */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--earth-pale)', margin: '0 auto 18px' }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--ink)' }}>Share your story</h3>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--earth-mid)', cursor: 'pointer', border: 'none' }}>
            <IconX size={14}/>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="input" placeholder="Give your post a title..." style={{ fontWeight: 600, fontSize: '1rem' }}/>
          <textarea className="input" rows={4} placeholder="Share your experience with the village..." style={{ resize: 'none', lineHeight: 1.65 }}/>

          {/* Selects stacked on mobile */}
          <select className="input">
            <option value="">Trimester (optional)</option>
            <option value="first">First Trimester</option>
            <option value="second">Second Trimester</option>
            <option value="third">Third Trimester</option>
            <option value="newmama">New Mama</option>
            <option value="general">General</option>
          </select>
          <select className="input">
            <option value="">Topic / Flair</option>
            {FLAIRS.filter(f => f.id !== 'all').map(f => (
              <option key={f.id} value={f.id}>{f.label}{f.tooltip ? ' — ' + f.tooltip.split(' —')[0] : ''}</option>
            ))}
          </select>

          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', marginBottom: 8, fontWeight: 500 }}>Suggested tags</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['#MorningSickness','#Cravings','#HospitalAdvice','#BirthStory','#NigerianFood','#MILDrama','#Solidarity'].map(tag => (
                <button key={tag} style={{ fontSize: '0.75rem', fontWeight: 500, padding: '5px 10px', borderRadius: 'var(--radius-full)', cursor: 'pointer', background: 'var(--cream)', color: 'var(--earth-mid)', border: '1px solid var(--earth-pale)', fontFamily: 'var(--font-sans)' }}>{tag}</button>
              ))}
            </div>
          </div>

          {/* Anonymous toggle */}
          <button onClick={() => setIsAnon(a => !a)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', borderRadius: 14,
            background: isAnon ? 'var(--crimson-pale)' : 'var(--cream)',
            border: '1.5px solid ' + (isAnon ? 'var(--crimson-soft)' : 'var(--earth-pale)'),
            cursor: 'pointer', transition: 'all var(--dur-fast)', textAlign: 'left',
          }}>
            <div style={{ width: 40, height: 22, borderRadius: 11, background: isAnon ? 'var(--crimson)' : 'var(--earth-pale)', position: 'relative', transition: 'background var(--dur-fast)', flexShrink: 0 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: isAnon ? 21 : 3, transition: 'left var(--dur-fast)', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}/>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-sans)', marginBottom: 2 }}>Post anonymously</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--earth-mid)' }}>Your name and location will be hidden</p>
            </div>
          </button>

          <button onClick={onPost} style={{ width: '100%', padding: '15px', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', background: 'var(--crimson)', color: 'white', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', marginTop: 4, boxShadow: '0 4px 16px rgba(62,20,68,0.25)' }}>
            Share with the village
          </button>

          <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', textAlign: 'center', lineHeight: 1.6 }}>
            Posts are reviewed for hate speech and harassment. Crude language is allowed.
          </p>
        </div>
      </div>
    </div>
  );
}
