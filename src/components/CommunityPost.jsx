import { useState } from 'react';
import Icon from './Icon';

export default function CommunityPost({ post, onSave }) {
  const [expanded, setExpanded] = useState(false);
  const [helpful, setHelpful] = useState(post.helpful);
  const [likedHelpful, setLikedHelpful] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleHelpful = (e) => {
    e.stopPropagation();
    if (!likedHelpful) {
      setHelpful(h => h + 1);
      setLikedHelpful(true);
      onSave && onSave('Marked as helpful!');
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setSaved(s => !s);
    onSave && onSave(saved ? 'Removed from saved' : 'Saved!');
  };

  return (
    <article style={{
      background: 'var(--color-white)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      padding: 20,
      transition: 'all 200ms ease',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44,
          borderRadius: '50%',
          background: post.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white',
          fontFamily: 'var(--font-accent)',
          fontWeight: 700,
          fontSize: 17,
          flexShrink: 0,
        }}>
          {post.initial}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontWeight: 600, fontSize: 14, color: 'var(--color-text-dark)' }}>
              {post.username}
            </span>
            <span style={{
              padding: '2px 8px',
              background: 'rgba(194,24,91,0.1)',
              color: 'var(--color-primary)',
              borderRadius: 20,
              fontFamily: 'var(--font-accent)',
              fontSize: 11,
              fontWeight: 600,
            }}>
              {post.week}
            </span>
            <span style={{
              padding: '2px 8px',
              background: 'var(--color-accent-soft)',
              color: 'var(--color-secondary)',
              borderRadius: 20,
              fontFamily: 'var(--font-accent)',
              fontSize: 11,
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Icon name="pin" size={12} color="var(--color-secondary)" />
              {post.city}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-text-light)' }}>
            {post.timePosted}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--color-text-dark)',
        marginBottom: 8,
        lineHeight: 1.4,
      }}>
        {post.title}
      </h3>

      {/* Body */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14,
        color: 'var(--color-text-mid)',
        lineHeight: 1.65,
        marginBottom: 12,
        display: '-webkit-box',
        WebkitLineClamp: expanded ? 'unset' : 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.body}
      </p>

      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 13,
          color: 'var(--color-primary)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        {expanded ? 'Show less ▲' : 'Read more ▼'}
      </button>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {post.tags.map(tag => (
          <span key={tag} style={{
            padding: '3px 10px',
            background: 'rgba(194,24,91,0.06)',
            color: 'var(--color-primary)',
            borderRadius: 20,
            fontFamily: 'var(--font-accent)',
            fontSize: 11,
            fontWeight: 500,
            cursor: 'pointer',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Reactions */}
      <div style={{
        display: 'flex',
        gap: 16,
        paddingTop: 12,
        borderTop: '1px solid rgba(194,24,91,0.08)',
      }}>
        <button onClick={handleHelpful} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: 'var(--font-accent)', fontSize: 13,
          color: likedHelpful ? 'var(--color-accent)' : 'var(--color-text-light)',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0,
          fontWeight: likedHelpful ? 600 : 400,
          transition: 'color 200ms',
        }}>
          <Icon name="heart" size={14} color={likedHelpful ? 'var(--color-accent)' : 'var(--color-text-light)'} />
          {helpful}
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: 'var(--font-accent)', fontSize: 13,
          color: 'var(--color-text-light)',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0,
        }}>
          <Icon name="chat" size={14} color="var(--color-text-light)" />
          {post.replies}
        </button>
        <button onClick={handleSave} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: 'var(--font-accent)', fontSize: 13,
          color: saved ? 'var(--color-primary)' : 'var(--color-text-light)',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0,
          marginLeft: 'auto',
          fontWeight: saved ? 600 : 400,
          transition: 'color 200ms',
        }}>
          <Icon name="heart" size={14} color={saved ? 'var(--color-primary)' : 'var(--color-text-light)'} />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </article>
  );
}
