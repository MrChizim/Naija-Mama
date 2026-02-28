import Icon from './Icon';

export default function ArticleCard({ article }) {
  const { category, title, excerpt, readTime, date, author, medicallyReviewed, categoryColor } = article;

  return (
    <div style={{
      background: 'var(--color-white)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      transition: 'all 200ms ease',
      cursor: 'pointer',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
    >
      {/* Image placeholder */}
      <div style={{
        height: 160,
        background: `linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary-pale) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-primary)',
      }}>
        <Icon name={article.icon || 'pregnant'} size={36} color="var(--color-primary)" />
      </div>

      <div style={{ padding: '16px 18px 18px' }}>
        {/* Category */}
        <span style={{
          display: 'inline-block',
          padding: '3px 10px',
          background: categoryColor || 'var(--crimson-pale)',
          color: 'var(--color-primary)',
          borderRadius: 20,
          fontFamily: 'var(--font-accent)',
          fontSize: 11,
          fontWeight: 600,
          marginBottom: 10,
        }}>
          {category}
        </span>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--color-text-dark)',
          lineHeight: 1.4,
          marginBottom: 8,
        }}>{title}</h3>

        {/* Excerpt */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--color-text-mid)',
          lineHeight: 1.6,
          marginBottom: 12,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>{excerpt}</p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 12,
              fontWeight: 500,
              color: 'var(--color-text-dark)',
              marginBottom: 2,
            }}>{author}</p>
            {medicallyReviewed && (
              <span style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 11,
                color: 'var(--color-green)',
                fontWeight: 500,
              }}>✓ Medically Reviewed</span>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-text-light)' }}>{readTime}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--color-text-light)' }}>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
