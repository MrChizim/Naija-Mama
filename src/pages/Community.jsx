import { useState, useEffect } from 'react';
import { communityPosts, trimesterGroups, trendingTopics } from '../data/community';

const HERO = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=85&auto=format&fit=crop';

/* ── Inline SVG icons — no emojis ── */
function IconHeart({ filled, size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'var(--amber)' : 'none'} stroke={filled ? 'var(--amber)' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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

function IconPencil({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  );
}

function IconUsers({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function IconTrend({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}

function IconPin({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
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

function IconCheck({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* ── Group icon by id ── */
function GroupIcon({ id, size = 22, color }) {
  const s = { width: size, height: size };
  const props = { fill: 'none', stroke: color || 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (id === 'first') return (
    <svg style={s} viewBox="0 0 24 24" {...props}>
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  );
  if (id === 'second') return (
    <svg style={s} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M8 12c-2 1-4 3-4 6h16c0-3-2-5-4-6"/>
      <path d="M12 16v3"/>
    </svg>
  );
  if (id === 'third') return (
    <svg style={s} viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M9 12h6M12 9v6"/>
    </svg>
  );
  return (
    <svg style={s} viewBox="0 0 24 24" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--ink)', color: 'white',
      padding: '12px 22px', borderRadius: 'var(--radius-full)',
      fontWeight: 600, fontSize: '0.875rem',
      boxShadow: '0 8px 32px rgba(26,16,8,0.25)',
      zIndex: 9999, whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: 'fadeInUp 0.3s var(--ease)',
    }}>
      <span style={{ width: 20, height: 20, background: '#2E7D32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <IconCheck size={11}/>
      </span>
      {msg}
    </div>
  );
}

/* ── Group accent colors — warm, not saturated ── */
const GROUP_CFG = {
  first:   { color: '#7A5C3A', bg: '#F5EDE1', activeBg: '#7A5C3A' },
  second:  { color: 'var(--crimson)', bg: 'var(--crimson-pale)', activeBg: 'var(--crimson)' },
  third:   { color: 'var(--crimson-deep)', bg: '#F7EDED', activeBg: 'var(--crimson-deep)' },
  newmama: { color: 'var(--amber-deep)', bg: 'var(--amber-pale)', activeBg: 'var(--amber-deep)' },
};

export default function Community() {
  const [activeGroup, setActiveGroup] = useState('all');
  const [toast, setToast]           = useState(null);
  const [showComposer, setShowComposer] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);

  const filtered = activeGroup === 'all'
    ? communityPosts
    : communityPosts.filter(p => p.trimesterGroup === activeGroup);

  return (
    <div className="page-wrap" style={{ paddingTop: 72, background: 'var(--cream)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', height: 'clamp(320px,44vh,480px)', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <img src={HERO} alt="Community of Nigerian mamas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,16,8,0.18) 0%, rgba(26,16,8,0.84) 100%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '0 clamp(24px,5vw,80px) 56px' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(232,135,26,0.85)', marginBottom: 14 }}>
            14,000 members strong
          </p>
          <h1 className="display-xl" style={{ color: 'white', maxWidth: 560 }}>The Mama Village</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', marginTop: 14, maxWidth: 440 }}>
            Real stories, real support, real Nigerian women.
          </p>
        </div>
      </section>

      {/* ── Group Filters ── */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--earth-pale)', padding: 'clamp(28px,4vw,48px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Find your group</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {trimesterGroups.map(g => {
              const cfg = GROUP_CFG[g.id];
              const isActive = activeGroup === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(isActive ? 'all' : g.id)}
                  style={{
                    padding: '20px',
                    borderRadius: 16,
                    cursor: 'pointer',
                    border: `1.5px solid ${isActive ? 'transparent' : 'var(--earth-pale)'}`,
                    background: isActive ? cfg.activeBg : 'var(--white)',
                    textAlign: 'left',
                    transition: 'all var(--dur-mid) var(--ease)',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = cfg.color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--earth-pale)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}}
                >
                  {/* Icon */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, marginBottom: 12,
                    background: isActive ? 'rgba(255,255,255,0.2)' : cfg.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <GroupIcon id={g.id} size={20} color={isActive ? 'white' : cfg.color}/>
                  </div>

                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, color: isActive ? 'white' : 'var(--ink)', marginBottom: 2 }}>{g.name}</p>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: isActive ? 'rgba(255,255,255,0.65)' : cfg.color, marginBottom: 8 }}>{g.weeks}</p>
                  <p style={{ fontSize: '0.8125rem', color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--earth-mid)', lineHeight: 1.5, marginBottom: 14 }}>{g.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: isActive ? 'rgba(255,255,255,0.55)' : 'var(--earth-light)' }}>
                      <IconUsers size={13}/>
                      <span style={{ fontSize: '0.75rem' }}>{g.members.toLocaleString()}</span>
                    </div>
                    <span
                      onClick={e => { e.stopPropagation(); setToast('Joined group!'); }}
                      style={{
                        fontSize: '0.75rem', fontWeight: 600, padding: '5px 12px',
                        borderRadius: 'var(--radius-full)', cursor: 'pointer',
                        background: isActive ? 'rgba(255,255,255,0.18)' : cfg.bg,
                        color: isActive ? 'white' : cfg.color,
                        border: isActive ? '1px solid rgba(255,255,255,0.3)' : `1px solid ${cfg.color}22`,
                        transition: 'all var(--dur-fast)',
                      }}
                    >Join</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Feed + Sidebar ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px,5vw,60px) clamp(24px,5vw,80px)', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>

        {/* Feed */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)' }}>
                {activeGroup === 'all' ? 'Community Feed' : trimesterGroups.find(g => g.id === activeGroup)?.name + ' Posts'}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--earth-light)', marginTop: 2 }}>{filtered.length} posts</p>
            </div>
            <button
              onClick={() => setShowComposer(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '9px 18px', borderRadius: 'var(--radius-full)',
                background: 'var(--crimson)', color: 'white',
                fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600,
                cursor: 'pointer', border: 'none',
              }}
            >
              <IconPencil size={15}/>
              Write a post
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(post => (
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

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 90 }}>

          {/* Village stats */}
          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid var(--earth-pale)',
            background: 'var(--white)',
          }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--earth-pale)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--crimson-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconUsers size={16} color="var(--crimson)"/>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ink)' }}>Your Village</p>
            </div>
            {[
              { label: 'Total Members',   value: '14,247' },
              { label: 'Posts This Week', value: '1,891'  },
              { label: 'Active Right Now',value: '342'    },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 20px', borderBottom: '1px solid var(--earth-pale)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)' }}>{label}</span>
                <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.875rem' }}>{value}</span>
              </div>
            ))}
            <div style={{ padding: '16px 20px' }}>
              <button
                onClick={() => setToast('Welcome to the village!')}
                style={{
                  width: '100%', padding: '11px', borderRadius: 'var(--radius-full)',
                  background: 'var(--crimson)', color: 'white',
                  fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem',
                  cursor: 'pointer', border: 'none',
                }}
              >
                Join the Village
              </button>
            </div>
          </div>

          {/* Trending Topics */}
          <div style={{ borderRadius: 16, border: '1px solid var(--earth-pale)', background: 'var(--white)', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--earth-pale)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--amber-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconTrend size={14} color="var(--amber-deep)"/>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ink)' }}>Trending Topics</p>
            </div>
            <div style={{ padding: '8px 8px' }}>
              {trendingTopics.map((t, i) => (
                <div key={t.tag} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
                  transition: 'background var(--dur-fast)',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 700,
                      color: i < 3 ? 'var(--crimson)' : 'var(--earth-light)',
                      minWidth: 18, textAlign: 'center',
                    }}>{i + 1}</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--ink)', fontWeight: 500 }}>
                      {/* Strip emojis from tag */}
                      {t.tag.replace(/[^\x00-\x7F]/g, '').trim()}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)', fontVariantNumeric: 'tabular-nums' }}>{t.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div style={{ borderRadius: 16, background: 'var(--amber-pale)', border: '1px solid var(--amber-soft)', padding: '20px' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber-deep)', marginBottom: 10 }}>Today in the village</p>
            {trimesterGroups.map(g => (
              <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(232,135,26,0.12)' }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)' }}>{g.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--amber-deep)', fontWeight: 600 }}>{g.recentActivity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Floating compose button ── */}
      <button
        onClick={() => setShowComposer(true)}
        style={{
          position: 'fixed', bottom: 32, right: 28,
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--crimson)', color: 'white',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(192,39,45,0.4)',
          zIndex: 200, transition: 'all var(--dur-mid) var(--ease)',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(192,39,45,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(192,39,45,0.4)'; }}
      >
        <IconPencil size={20}/>
      </button>

      {/* ── Composer Modal ── */}
      {showComposer && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(26,16,8,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowComposer(false); }}
        >
          <div style={{ background: 'var(--white)', borderRadius: '24px 24px 0 0', padding: '28px 28px 36px', width: '100%', maxWidth: 600, animation: 'fadeInUp 0.25s var(--ease)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>Share your story</h3>
              <button
                onClick={() => setShowComposer(false)}
                style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--cream-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--earth-mid)', cursor: 'pointer', border: 'none' }}
              >
                <IconX size={14}/>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="input" placeholder="Give your post a title..."/>
              <textarea className="input" rows={4} placeholder="Share your experience with the village..." style={{ resize: 'vertical' }}/>
              <select className="input">
                <option value="">Choose a group...</option>
                <option value="first">First Trimester</option>
                <option value="second">Second Trimester</option>
                <option value="third">Third Trimester</option>
                <option value="newmama">New Mamas</option>
              </select>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['#MorningSickness','#Cravings','#HospitalAdvice','#BirthStory','#NigerianFood'].map(tag => (
                  <button key={tag} style={{
                    fontSize: '0.75rem', fontWeight: 600, padding: '5px 12px',
                    borderRadius: 'var(--radius-full)', cursor: 'pointer',
                    background: 'var(--crimson-pale)', color: 'var(--crimson)',
                    border: '1px solid var(--crimson-soft)',
                    fontFamily: 'var(--font-sans)',
                  }}>{tag}</button>
                ))}
              </div>
              <button
                onClick={() => { setShowComposer(false); setToast('Post submitted!'); }}
                style={{
                  width: '100%', padding: '14px',
                  borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer',
                  background: 'var(--crimson)', color: 'white',
                  fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.9375rem',
                  marginTop: 4,
                }}
              >
                Share with the village
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </div>
  );
}

/* ── Post Card ── */
function PostCard({ post, expanded, onExpand, onToast }) {
  const [helpful, setHelpful] = useState(post.helpful);
  const [liked,   setLiked]   = useState(false);
  const [saved,   setSaved]   = useState(false);

  const trimCfg = GROUP_CFG[post.trimesterGroup] || GROUP_CFG.second;

  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 16,
      border: '1px solid var(--earth-pale)',
      padding: '22px',
      transition: 'box-shadow var(--dur-mid) var(--ease)',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-card)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Author row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
          background: post.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 16,
          fontFamily: 'var(--font-sans)',
        }}>{post.initial}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginBottom: 3 }}>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{post.username}</span>
            <span style={{
              fontSize: '0.6875rem', fontWeight: 600, padding: '2px 9px', borderRadius: 'var(--radius-full)',
              background: trimCfg.bg, color: trimCfg.color,
            }}>{post.week}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.6875rem', color: 'var(--earth-light)' }}>
              <IconPin size={11}/>{post.city}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>{post.timePosted}</span>
        </div>
      </div>

      {/* Title + body */}
      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 8, lineHeight: 1.45 }}>{post.title}</h3>
      <p style={{
        fontSize: '0.875rem', color: 'var(--earth-mid)', lineHeight: 1.7, marginBottom: 6,
        display: '-webkit-box', WebkitLineClamp: expanded ? 'unset' : 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{post.body}</p>
      <button onClick={onExpand} style={{
        fontSize: '0.8125rem', color: 'var(--crimson)', background: 'none', border: 'none',
        cursor: 'pointer', fontWeight: 600, marginBottom: 14, padding: 0,
        fontFamily: 'var(--font-sans)',
      }}>
        {expanded ? 'Show less' : 'Read more'}
      </button>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {post.tags.map(t => (
          <span key={t} style={{
            fontSize: '0.6875rem', fontWeight: 600, color: 'var(--ink-soft)',
            background: 'var(--cream)', padding: '3px 10px',
            borderRadius: 'var(--radius-full)', cursor: 'pointer',
            border: '1px solid var(--earth-pale)',
          }}>{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, paddingTop: 12, borderTop: '1px solid var(--earth-pale)' }}>
        <button
          onClick={() => { if (!liked) { setHelpful(h => h + 1); setLiked(true); onToast('Marked helpful!'); }}}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 'var(--radius-full)',
            background: liked ? 'var(--amber-pale)' : 'var(--cream)',
            color: liked ? 'var(--amber-deep)' : 'var(--earth-mid)',
            border: `1px solid ${liked ? 'var(--amber-soft)' : 'var(--earth-pale)'}`,
            fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: liked ? 700 : 500,
            cursor: 'pointer', transition: 'all var(--dur-fast)',
          }}
        >
          <IconHeart filled={liked} size={14}/> {helpful}
        </button>

        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 14px', borderRadius: 'var(--radius-full)',
          background: 'var(--cream)', color: 'var(--earth-mid)',
          border: '1px solid var(--earth-pale)',
          fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500,
          cursor: 'pointer',
        }}>
          <IconMessage size={14}/> {post.replies}
        </button>

        <button
          onClick={() => { setSaved(s => !s); onToast(saved ? 'Removed from saved' : 'Post saved!'); }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 'var(--radius-full)',
            background: saved ? 'var(--crimson-pale)' : 'var(--cream)',
            color: saved ? 'var(--crimson)' : 'var(--earth-mid)',
            border: `1px solid ${saved ? 'var(--crimson-soft)' : 'var(--earth-pale)'}`,
            fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: saved ? 700 : 500,
            cursor: 'pointer', marginLeft: 'auto',
            transition: 'all var(--dur-fast)',
          }}
        >
          <IconBookmark filled={saved} size={14}/> {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}
