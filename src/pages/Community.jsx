import { useState } from 'react';
import { communityPosts, trendingTopics, FLAIRS, FLAIR_COLORS } from '../data/community';
import {
  Heart, MessageCircle, Bookmark, Pencil, X, Flag, Share2,
  TrendingUp, UserX, Check, Info, ChevronDown, Flower2, CheckCircle2,
} from 'lucide-react';

function ChevronIcon({ size = 14, dir = 'down' }) {
  const rot = { down: 0, up: 180, right: -90, left: 90 }[dir];
  return <ChevronDown size={size} style={{ transform: `rotate(${rot}deg)`, transition: 'transform 200ms' }} strokeWidth="2" />;
}

/* ── Mock reply threads (attached to post ID) ── */
const MOCK_REPLIES = {
  1: [
    { id: 'r1a', author: 'Adaeze K.', city: 'Port Harcourt', initial: 'A', avatarColor: '#3E1444', timePosted: '2h ago', body: 'Same thing happened to me at week 28! My doctor said it was normal Braxton Hicks. Did yours feel like tightening across the whole belly?' },
    { id: 'r1b', author: 'Anonymous Mama', isAnon: true, timePosted: '1h ago', body: 'I had this too. Make sure you stay hydrated — dehydration can trigger them earlier. Are you drinking enough water?' },
    { id: 'r1c', author: 'Ngozi T.', city: 'Enugu', initial: 'N', avatarColor: '#8A6492', timePosted: '45m ago', body: 'My midwife told me if they come more than 4 times an hour to call the hospital. Track them with a timer just to be safe 🙏' },
  ],
  2: [
    { id: 'r2a', author: 'Fatima A.', city: 'Kano', initial: 'F', avatarColor: '#5F6B7C', timePosted: '3h ago', body: 'Congratulations mama! LUTH is generally fine, I delivered there in 2023. What ward are you looking at — private or semi-private?' },
    { id: 'r2b', author: 'Chisom O.', city: 'Lagos', initial: 'C', avatarColor: '#2E7D32', timePosted: '2h ago', body: 'I delivered at LUTH last year. The midwives are great but bring your own necessities (towels, basin, sanitary pads, baby clothes). The hospital can be understaffed some nights.' },
  ],
  3: [
    { id: 'r3a', author: 'Bisi A.', city: 'Ibadan', initial: 'B', avatarColor: '#7B1FA2', timePosted: '5h ago', body: 'Zobo is fine in moderation! The concern is usually with hibiscus tea in concentrated form in very early pregnancy. Light zobo drinks are generally considered safe after the first trimester — but confirm with your doctor.' },
    { id: 'r3b', author: 'Mama Titi', city: 'Abuja', initial: 'T', avatarColor: '#C62828', timePosted: '4h ago', body: 'My doctor said 1 small cup a day is fine. The issue is high-concentration hibiscus (like supplements or very strong brewed tea). Cold bottled zobo is usually okay.' },
    { id: 'r3c', author: 'Anonymous Mama', isAnon: true, timePosted: '3h ago', body: 'I avoided it completely in first trimester then had it occasionally after. Better safe than sorry for that critical period.' },
  ],
};

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
      <CheckCircle2 size={18} color="#2E7D32" strokeWidth="1.8" style={{ flexShrink: 0 }} />
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

/* ── Sidebar content (shared between desktop aside and mobile accordion) ── */
function SidebarContent({ onCompose }) {
  return (
    <>
      <div style={{ background: 'var(--ink)', borderRadius: 16, padding: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', marginBottom: 14, lineHeight: 1.6 }}>
          Share your experience with 14,000+ mamas
        </p>
        <button onClick={onCompose} style={{
          width: '100%', padding: '11px', borderRadius: 'var(--radius-full)',
          background: 'var(--crimson)', color: 'white',
          fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem',
          cursor: 'pointer', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}>
          <Pencil size={14} strokeWidth="2" /> Write a post
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
          <TrendingUp size={13} strokeWidth="2" />
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
    </>
  );
}

export default function Community() {
  const [sort, setSort]               = useState('new');
  const [trimFilter, setTrimFilter]   = useState('all');
  const [flairFilter, setFlairFilter] = useState('all');
  const [flairTooltip, setFlairTooltip] = useState(null);
  const [toast, setToast]             = useState(null);
  const [showComposer, setShowComposer] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
          src="/communityhero-1600.jpg"
          srcSet="/communityhero-900.jpg 900w, /communityhero-1600.jpg 1600w"
          sizes="(max-width: 720px) 100vw, 1200px"
          alt="Nigerian women community"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
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
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <a
                href="/support"
                style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--crimson)',
                  color: 'white',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 6px 18px rgba(62,20,68,0.25)',
                }}
              >
                Support the community
              </a>
            </div>

            {/* ── Trimester tabs ── */}
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
                          <div style={{ position: 'absolute', top: -5, left: 16, width: 10, height: 10, background: 'var(--ink)', transform: 'rotate(45deg)', borderRadius: 2 }}/>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {activeFlair?.tooltip && flairFilter !== 'all' && (
              <div style={{ marginTop: 6, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', maxWidth: 520, lineHeight: 1.5 }}>
                <strong style={{ color: 'white' }}>{activeFlair.label}:</strong> {activeFlair.tooltip}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="community-body" style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(16px,4vw,40px) clamp(12px,5vw,80px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) min(300px,30%)', gap: 28, alignItems: 'start' }}>

        {/* Feed */}
        <div>
          {/* ── Mobile sidebar accordion — at TOP before the feed ── */}
          <div className="hide-desktop" style={{ marginBottom: 16 }}>
            <button
              onClick={() => setMobileSidebarOpen(o => !o)}
              style={{
                width: '100%', padding: '12px 18px',
                background: 'white', border: '1px solid var(--earth-pale)',
                borderRadius: mobileSidebarOpen ? '14px 14px 0 0' : 14,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                cursor: 'pointer', fontFamily: 'var(--font-sans)',
                fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={14} strokeWidth="2" />
                Village stats &amp; trending
              </span>
              <ChevronIcon size={16} dir={mobileSidebarOpen ? 'up' : 'down'} />
            </button>
            {mobileSidebarOpen && (
              <div style={{
                background: 'var(--cream)', padding: 16,
                border: '1px solid var(--earth-pale)', borderTop: 'none',
                borderRadius: '0 0 14px 14px',
                display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                <SidebarContent onCompose={() => setShowComposer(true)} />
              </div>
            )}
          </div>

          {/* Feed controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 10 }}>
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
              <Pencil size={14} strokeWidth="2" /> <span className="hide-mobile">Write a post</span><span className="hide-desktop">Post</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sorted.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '56px 20px', background: 'white', borderRadius: 16, border: '1px solid var(--earth-pale)' }}>
                <div style={{ marginBottom: 12 }}><Flower2 size={32} color="var(--crimson-soft)" /></div>
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
          <SidebarContent onCompose={() => setShowComposer(true)} />
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
        <Pencil size={20} strokeWidth="2" />
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
  const [likes,       setLikes]       = useState(post.helpful);
  const [liked,       setLiked]       = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [reported,    setReported]    = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText,   setReplyText]   = useState('');
  const [replies,     setReplies]     = useState(MOCK_REPLIES[post.id] || []);
  const [replyCount,  setReplyCount]  = useState(post.replies);

  const trimCfg  = TRIMESTER_CFG[post.trimesterGroup] || TRIMESTER_CFG.general;
  const flairCfg = FLAIR_COLORS[post.flair];
  const flairObj = FLAIRS.find(f => f.id === post.flair);
  const isAnon   = post.isAnonymous;

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Check out this post on NaijaMama: "' + post.title + '" — naijamama.ng/community');
    window.open('https://wa.me/?text=' + text, '_blank');
  };

  function handleAddReply() {
    if (!replyText.trim()) return;
    const newReply = {
      id: 'user-' + Date.now(),
      author: 'You',
      isAnon: false,
      initial: 'Y',
      avatarColor: 'var(--crimson)',
      timePosted: 'just now',
      body: replyText.trim(),
    };
    setReplies(r => [...r, newReply]);
    setReplyCount(c => c + 1);
    setReplyText('');
  }

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
            <UserX size={17} strokeWidth="1.8" />
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

      {/* ── Actions ── */}
      <div style={{ paddingTop: 10, borderTop: '1px solid var(--earth-pale)' }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <Btn active={liked} activeBg="var(--crimson-pale)" activeColor="var(--crimson)" activeBorder="var(--crimson-soft)"
            onClick={() => { setLiked(l => !l); setLikes(n => liked ? n - 1 : n + 1); }}>
            <Heart size={14} fill={liked ? 'var(--crimson)' : 'none'} stroke={liked ? 'var(--crimson)' : 'currentColor'} strokeWidth="1.8" /> {likes}
          </Btn>
          {/* Replies — toggles thread */}
          <Btn
            active={showReplies}
            activeBg="var(--cream)" activeColor="var(--ink)" activeBorder="var(--earth-pale)"
            onClick={() => setShowReplies(r => !r)}
          >
            <MessageCircle size={14} strokeWidth="1.8" /> {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
          </Btn>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Btn active={saved} activeBg="var(--crimson-pale)" activeColor="var(--crimson)" activeBorder="var(--crimson-soft)"
            onClick={() => { setSaved(s => !s); onToast(saved ? 'Removed from saved' : 'Saved!'); }}>
            <Bookmark size={14} fill={saved ? 'var(--crimson)' : 'none'} stroke={saved ? 'var(--crimson)' : 'currentColor'} strokeWidth="1.8" /> {saved ? 'Saved' : 'Save'}
          </Btn>
          <Btn onClick={handleWhatsApp}>
            <Share2 size={14} strokeWidth="1.8" /> Share
          </Btn>
          {!reported ? (
            <Btn onClick={() => { setReported(true); onToast('Reported. Thank you.'); }}>
              <Flag size={13} strokeWidth="1.8" /> Report
            </Btn>
          ) : (
            <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)', padding: '6px 4px' }}>Reported</span>
          )}
        </div>
      </div>

      {/* ── Reply thread ── */}
      {showReplies && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--earth-pale)' }}>
          {replies.length === 0 && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--earth-light)', marginBottom: 12 }}>No replies yet — be the first to respond.</p>
          )}
          {replies.map((r, i) => (
            <div key={r.id} style={{
              display: 'flex', gap: 10, marginBottom: 14,
              paddingLeft: 12,
              borderLeft: '2px solid var(--earth-pale)',
              animation: i === replies.length - 1 && r.id.startsWith('user-') ? 'fadeInUp 0.25s var(--ease)' : 'none',
            }}>
              {r.isAnon ? (
                <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: 'var(--earth-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserX size={13} strokeWidth="1.8" />
                </div>
              ) : (
                <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: r.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 11 }}>
                  {r.initial || r.author?.[0]}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--ink)' }}>
                    {r.isAnon ? 'Anonymous Mama' : r.author}
                  </span>
                  {r.city && <span style={{ fontSize: '0.6875rem', color: 'var(--earth-light)' }}>· {r.city}</span>}
                  <span style={{ fontSize: '0.6875rem', color: 'var(--earth-light)', marginLeft: 'auto' }}>{r.timePosted}</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)', lineHeight: 1.65 }}>{r.body}</p>
              </div>
            </div>
          ))}

          {/* Reply composer */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginTop: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'white', fontWeight: 700, fontSize: 11 }}>
              Y
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                rows={2}
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddReply(); } }}
                style={{
                  width: '100%', padding: '10px 46px 10px 14px',
                  borderRadius: 12, border: '1.5px solid var(--earth-pale)',
                  fontFamily: 'var(--font-sans)', fontSize: '0.875rem',
                  color: 'var(--ink)', resize: 'none', lineHeight: 1.5,
                  outline: 'none', boxSizing: 'border-box',
                  background: 'var(--cream)',
                  transition: 'border-color var(--dur-fast)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--crimson)'}
                onBlur={e => e.target.style.borderColor = 'var(--earth-pale)'}
              />
              <button
                onClick={handleAddReply}
                disabled={!replyText.trim()}
                style={{
                  position: 'absolute', right: 8, bottom: 8,
                  width: 28, height: 28, borderRadius: '50%',
                  background: replyText.trim() ? 'var(--crimson)' : 'var(--earth-pale)',
                  border: 'none', cursor: replyText.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background var(--dur-fast)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
          <p style={{ fontSize: '0.7rem', color: 'var(--earth-light)', marginTop: 6, paddingLeft: 38 }}>Press Enter to reply · Shift+Enter for new line</p>
        </div>
      )}
    </article>
  );
}

function Btn({ children, active, activeBg, activeColor, activeBorder, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 5,
      padding: '7px 12px', borderRadius: 'var(--radius-full)',
      background: active ? activeBg : 'var(--cream)',
      color: active ? activeColor : 'var(--earth-mid)',
      border: '1px solid ' + (active ? activeBorder : 'var(--earth-pale)'),
      fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: active ? 600 : 400,
      cursor: 'pointer', transition: 'all var(--dur-fast)', whiteSpace: 'nowrap',
    }}>
      {children}
    </button>
  );
}

function ComposerModal({ onClose, onPost }) {
  const [isAnon, setIsAnon] = useState(false);
  const [flair, setFlair] = useState('');
  const flairObj = FLAIRS.find(f => f.id === flair);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(45,27,34,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '20px 20px 32px', width: '100%', maxWidth: 600, animation: 'fadeInUp 0.25s var(--ease)', maxHeight: '92vh', overflowY: 'auto' }}>

        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--earth-pale)', margin: '0 auto 18px' }}/>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--ink)' }}>Share your story</h3>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--earth-mid)', cursor: 'pointer', border: 'none' }}>
            <X size={14} strokeWidth="2.5" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="input" placeholder="Give your post a title..." style={{ fontWeight: 600, fontSize: '1rem' }}/>
          <textarea className="input" rows={4} placeholder="Share your experience with the village..." style={{ resize: 'none', lineHeight: 1.65 }}/>

          <select className="input">
            <option value="">Trimester (optional)</option>
            <option value="first">First Trimester</option>
            <option value="second">Second Trimester</option>
            <option value="third">Third Trimester</option>
            <option value="newmama">New Mama</option>
            <option value="general">General</option>
          </select>
          <select className="input" value={flair} onChange={e => setFlair(e.target.value)}>
            <option value="">Topic / Flair</option>
            {FLAIRS.filter(f => f.id !== 'all').map(f => (
              <option key={f.id} value={f.id}>{f.label}{f.tooltip ? ' — ' + f.tooltip.split(' —')[0] : ''}</option>
            ))}
          </select>
          {flairObj?.tooltip && (
            <p style={{ marginTop: -6, fontSize: '0.75rem', color: 'var(--earth-mid)' }}>
              <strong>{flairObj.label}:</strong> {flairObj.tooltip}
            </p>
          )}

          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', marginBottom: 8, fontWeight: 500 }}>Suggested tags</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['#MorningSickness','#Cravings','#HospitalAdvice','#BirthStory','#NigerianFood','#MILDrama','#Solidarity'].map(tag => (
                <button key={tag} style={{ fontSize: '0.75rem', fontWeight: 500, padding: '5px 10px', borderRadius: 'var(--radius-full)', cursor: 'pointer', background: 'var(--cream)', color: 'var(--earth-mid)', border: '1px solid var(--earth-pale)', fontFamily: 'var(--font-sans)' }}>{tag}</button>
              ))}
            </div>
          </div>

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
