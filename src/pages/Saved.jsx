import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { communityPosts } from '../data/community';
import { Heart, MessageCircle, Bookmark, ArrowRight, Share2, UserX } from 'lucide-react';

/* ── Colour map for trimester badges ── */
const TRIMESTER_CFG = {
  first:   { label: 'First Trimester',  bg: '#F0EBF8', color: '#6B4FA0' },
  second:  { label: 'Second Trimester', bg: 'var(--crimson-pale)', color: 'var(--crimson)' },
  third:   { label: 'Third Trimester',  bg: '#FFF0E8', color: '#B85C1A' },
  newmama: { label: 'New Mama',         bg: 'var(--amber-pale)', color: 'var(--amber-deep)' },
  general: { label: 'General',          bg: 'var(--cream)', color: 'var(--earth-mid)' },
};

/* ── Persistent saved IDs via localStorage ── */
const STORAGE_KEY = 'naijamama_saved_ids';

function getSavedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch {}
  // Default: pre-save post 4 (birth story) and post 8 (omugwo) for demo
  return new Set([4, 8]);
}

function writeSavedIds(set) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...set])); } catch {}
}

/* ── Toast ── */
function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{
      position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--ink)', color: 'white', padding: '10px 20px',
      borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 500,
      zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
      pointerEvents: 'none',
    }}>{msg}</div>
  );
}

/* ── Post card (compact, same look as Community) ── */
function SavedPostCard({ post, onUnsave }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.helpful);
  const tri = TRIMESTER_CFG[post.trimesterGroup] || TRIMESTER_CFG.general;

  const handleLike = () => {
    setLiked(l => !l);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`"${post.title}" — NaijaMama Community 🤰\nhttps://naijamama.ng/community`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener');
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: 16,
      border: '1px solid var(--earth-pale)',
      padding: '20px 22px 16px',
      transition: 'box-shadow var(--dur-fast)',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(45,27,34,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        {post.anonymous ? (
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--earth-pale)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexShrink: 0,
          }}>
            <UserX size={16} strokeWidth="1.8" />
          </div>
        ) : (
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: post.avatarColor, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', fontWeight: 700,
            fontSize: '0.9rem', flexShrink: 0,
          }}>{post.initial}</div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--ink)' }}>
            {post.anonymous ? 'Anonymous Mama' : post.username}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--earth-mid)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span>{post.week}</span>
            {!post.anonymous && post.city && <><span>·</span><span>{post.city}</span></>}
            <span>·</span><span>{post.timePosted}</span>
          </div>
        </div>
        {/* Trimester badge */}
        <span style={{
          padding: '3px 10px', borderRadius: 'var(--radius-full)',
          fontSize: '0.72rem', fontWeight: 600,
          background: tri.bg, color: tri.color,
          flexShrink: 0,
        }}>{tri.label}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1rem', fontWeight: 700, color: 'var(--ink)',
        marginBottom: 8, lineHeight: 1.4,
        cursor: 'pointer',
      }}>{post.title}</h3>

      {/* Body excerpt */}
      <p style={{
        fontSize: '0.875rem', color: 'var(--ink-soft)', lineHeight: 1.6,
        marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{post.body}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {post.tags.map(t => (
          <span key={t} style={{
            padding: '3px 9px', background: 'var(--crimson-pale)',
            color: 'var(--crimson)', borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem', fontWeight: 500,
          }}>{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2,
        borderTop: '1px solid var(--earth-pale)', paddingTop: 12,
        flexWrap: 'wrap',
      }}>
        {/* Like */}
        <button onClick={handleLike} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 'var(--radius-full)',
          border: 'none', background: 'transparent',
          color: liked ? 'var(--crimson)' : 'var(--earth-mid)',
          fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
          transition: 'all var(--dur-fast)',
        }}>
          <Heart size={14} fill={liked ? 'var(--crimson)' : 'none'} stroke={liked ? 'var(--crimson)' : 'currentColor'} strokeWidth="1.8" />
          <span>{likeCount}</span>
        </button>

        {/* Replies */}
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 'var(--radius-full)',
          border: 'none', background: 'transparent',
          color: 'var(--earth-mid)', fontSize: '0.8rem', cursor: 'pointer',
        }}>
          <MessageCircle size={14} strokeWidth="1.8" /><span>{post.replies}</span>
        </button>

        {/* WhatsApp share */}
        <button onClick={handleWhatsApp} title="Share on WhatsApp" style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 'var(--radius-full)',
          border: 'none', background: 'transparent',
          color: 'var(--earth-mid)', fontSize: '0.8rem', cursor: 'pointer',
          transition: 'color var(--dur-fast)',
        }}>
          <Share2 size={14} strokeWidth="1.8" />
        </button>

        {/* Unsave / remove bookmark */}
        <button onClick={() => onUnsave(post.id)} title="Remove from saved" style={{
          marginLeft: 'auto',
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 10px', borderRadius: 'var(--radius-full)',
          border: 'none', background: 'var(--crimson-pale)',
          color: 'var(--crimson)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
          transition: 'all var(--dur-fast)',
        }}>
          <Bookmark size={14} fill="var(--crimson)" stroke="var(--crimson)" strokeWidth="1.8" />
          <span>Saved</span>
        </button>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '80px 24px',
      background: 'white', borderRadius: 20,
      border: '1px solid var(--earth-pale)',
    }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--crimson-pale)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px',
      }}>
        <Bookmark size={32} stroke="var(--crimson)" strokeWidth="1.6" />
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>
        No saved posts yet
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--earth-mid)', lineHeight: 1.6, maxWidth: 320, margin: '0 auto 24px' }}>
        Tap the bookmark icon on any post in the community to save it here for later.
      </p>
      <Link to="/community" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '11px 22px', background: 'var(--crimson)', color: 'white',
        borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.9rem',
        transition: 'background var(--dur-fast)',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson-deep)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
      >
        Browse community
        <ArrowRight size={15} strokeWidth="2" />
      </Link>
    </div>
  );
}

/* ── Main page ── */
export default function Saved() {
  const [savedIds, setSavedIds] = useState(getSavedIds);
  const [toast, setToast] = useState(null);

  const savedPosts = communityPosts.filter(p => savedIds.has(p.id));

  const handleUnsave = (id) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      writeSavedIds(next);
      return next;
    });
    setToast('Post removed from saved');
  };

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100vh' }}>

      {/* ── Page header ── */}
      <div style={{
        background: 'var(--ink)',
        padding: '48px 20px 40px',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--crimson)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Bookmark size={22} fill="white" stroke="white" strokeWidth="1.6" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', margin: 0 }}>
                Saved Posts
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
                {savedPosts.length === 0
                  ? 'Nothing saved yet'
                  : `${savedPosts.length} post${savedPosts.length !== 1 ? 's' : ''} saved`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 16px 60px' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: '0.82rem', color: 'var(--earth-mid)' }}>
          <Link to="/community" style={{ color: 'var(--crimson)', fontWeight: 500 }}>Community</Link>
          <span>›</span>
          <span>Saved Posts</span>
        </div>

        {savedPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Clear all */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button onClick={() => {
                setSavedIds(new Set());
                writeSavedIds(new Set());
                setToast('All saved posts cleared');
              }} style={{
                padding: '6px 14px', borderRadius: 'var(--radius-full)',
                border: '1px solid var(--earth-pale)', background: 'white',
                color: 'var(--earth-mid)', fontSize: '0.8rem', cursor: 'pointer',
                fontWeight: 500, transition: 'all var(--dur-fast)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--crimson)'; e.currentTarget.style.color = 'var(--crimson)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--earth-pale)'; e.currentTarget.style.color = 'var(--earth-mid)'; }}
              >
                Clear all
              </button>
            </div>

            {/* Post list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {savedPosts.map(post => (
                <SavedPostCard key={post.id} post={post} onUnsave={handleUnsave} />
              ))}
            </div>

            {/* Footer CTA */}
            <div style={{
              marginTop: 36, textAlign: 'center',
              padding: '28px 20px',
              background: 'white', borderRadius: 16,
              border: '1px solid var(--earth-pale)',
            }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--earth-mid)', marginBottom: 14 }}>
                Want to find more posts to save?
              </p>
              <Link to="/community" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', background: 'var(--crimson)', color: 'white',
                borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.875rem',
                transition: 'background var(--dur-fast)',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--crimson-deep)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--crimson)'}
              >
                Back to Mama Village
                <ArrowRight size={14} strokeWidth="2" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
