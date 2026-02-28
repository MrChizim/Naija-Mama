import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Users, Shield, FileText, Mail, Clock } from 'lucide-react';

const NAV_SECTIONS = [
  { id: 'about',   label: 'About Us' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'terms',   label: 'Terms of Use' },
  { id: 'contact-info', label: 'Contact' },
];

export default function Legal() {
  const { hash } = useLocation();

  // Scroll to anchor on load
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [hash]);

  return (
    <div style={{ background: 'var(--ivory)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ background: 'linear-gradient(150deg, var(--crimson-deep) 0%, #1C0A0E 100%)', padding: 'clamp(48px,7vw,80px) clamp(20px,5vw,80px) clamp(40px,6vw,64px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--crimson-soft)', marginBottom: 12 }}>NaijaMama</p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 800, color: 'white', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 16 }}>
            About us & legal information
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 540 }}>
            Everything you need to know about who we are, how we handle your data, and the terms of using NaijaMama.
          </p>
        </div>
      </section>

      {/* ── Sticky section nav ── */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--earth-pale)', position: 'sticky', top: 80, zIndex: 100 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 clamp(20px,5vw,80px)', display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {NAV_SECTIONS.map(s => (
            <a key={s.id} href={'#' + s.id} style={{
              padding: '14px 18px', fontSize: '0.875rem', fontWeight: 500,
              color: 'var(--earth-mid)', whiteSpace: 'nowrap', textDecoration: 'none',
              borderBottom: '2px solid transparent',
              transition: 'all var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--crimson)'; e.currentTarget.style.borderBottomColor = 'var(--crimson)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--earth-mid)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,80px)' }}>

        {/* ── About Us ── */}
        <section id="about" style={{ marginBottom: 64, scrollMarginTop: 140 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--crimson-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={18} stroke="var(--crimson)" strokeWidth="1.8" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>About Us</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: '0.9375rem', color: 'var(--earth-mid)', lineHeight: 1.85 }}>
              <strong style={{ color: 'var(--ink)' }}>NaijaMama</strong> is Nigeria's pregnancy and motherhood community — a free, safe space built by Nigerian women for Nigerian women. We believe every mama deserves access to reliable information, real community support, and resources tailored to the Nigerian experience.
            </p>

            <div style={{ background: 'var(--crimson-pale)', borderRadius: 16, padding: '22px 24px', border: '1px solid rgba(62,20,68,0.12)' }}>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--crimson)', marginBottom: 12 }}>Our mission</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.8 }}>
                To make pregnancy support accessible to every Nigerian woman — whether she's in Lagos, Kano, Enugu, or a rural community. We combine culturally relevant information, a free community forum, and connections to Nigerian health professionals.
              </p>
            </div>

            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>What we offer</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 12 }}>
              {[
                { title: 'The Mama Village', desc: 'A free community forum where Nigerian mamas ask questions, share stories, and support each other.' },
                { title: 'Nigerian Food Guide', desc: 'A pregnancy-specific guide to Nigerian foods — what is safe, what to limit, and what to avoid.' },
                { title: 'Week-by-Week Tracker', desc: 'General information about fetal development and maternal changes across all 40 weeks of pregnancy.' },
                { title: 'Trusted Brands', desc: 'A curated directory of Nigerian brands that serve pregnant women and new mothers.' },
              ].map(item => (
                <div key={item.title} style={{ background: 'white', borderRadius: 14, padding: '18px', border: '1px solid var(--earth-pale)' }}>
                  <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 6, fontSize: '0.9rem' }}>{item.title}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--earth-mid)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--earth-mid)', lineHeight: 1.8 }}>
              NaijaMama is <strong style={{ color: 'var(--ink)' }}>completely free</strong> and always will be. We are sustained through community brand partnerships. We never charge mamas for access to information or community.
            </p>
          </div>
        </section>

        <div style={{ height: 1, background: 'var(--earth-pale)', marginBottom: 64 }}/>

        {/* ── Privacy Policy ── */}
        <section id="privacy" style={{ marginBottom: 64, scrollMarginTop: 140 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--crimson-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={18} stroke="var(--crimson)" strokeWidth="1.8" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Privacy Policy</h2>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--earth-light)', marginBottom: 24 }}>Last updated: March 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              {
                title: 'What information we collect',
                content: `When you create an account, we collect your name, email address, and any profile information you choose to provide (such as your trimester or due date). When you post in the community, we store the content of your posts. If you post anonymously, your name is not publicly attached to that post but your account is still linked internally for moderation purposes. We also collect basic usage data (pages visited, features used) to improve the platform.`,
              },
              {
                title: 'How we use your information',
                content: `We use your information to provide and improve NaijaMama's services — including personalising content, showing you relevant community posts, and sending you optional notifications. We do not sell your personal information to any third party. We may share anonymised, aggregated data with advertisers (e.g., "82% of our users are in their second trimester") but never individual identifiable data.`,
              },
              {
                title: 'Anonymous posting',
                content: `When you post anonymously, your username and location are hidden from other community members. However, your post is still linked to your account internally so that our moderation team can act on reports. We never expose your identity against your choice, except when legally required.`,
              },
              {
                title: 'Cookies and local storage',
                content: `We use browser local storage to remember your preferences (e.g., your pregnancy week, saved posts) without requiring a server round-trip. We use minimal cookies for authentication sessions. We do not use advertising trackers or third-party analytics without your consent.`,
              },
              {
                title: 'Your rights',
                content: `You have the right to access, correct, or delete the personal data we hold about you at any time. To request data deletion, email us at hello@naijamama.ng with the subject "Data deletion request". We will process your request within 14 business days.`,
              },
              {
                title: 'Data security',
                content: `We use industry-standard encryption and security practices to protect your data. Community posts marked anonymous are technically separated from your public identity in our database. Despite our efforts, no system is completely secure — if you become aware of any security issue, please contact us immediately.`,
              },
            ].map(section => (
              <div key={section.title}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{section.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--earth-mid)', lineHeight: 1.85 }}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'var(--earth-pale)', marginBottom: 64 }}/>

        {/* ── Terms of Use ── */}
        <section id="terms" style={{ marginBottom: 64, scrollMarginTop: 140 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--crimson-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={18} stroke="var(--crimson)" strokeWidth="1.8" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Terms of Use</h2>
          </div>

          <p style={{ fontSize: '0.8125rem', color: 'var(--earth-light)', marginBottom: 24 }}>Last updated: March 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[
              {
                title: 'Acceptance of terms',
                content: `By creating an account or using NaijaMama, you agree to these Terms of Use. If you do not agree, please do not use the platform. We may update these terms from time to time — continued use after an update constitutes acceptance.`,
              },
              {
                title: 'Community rules',
                content: `NaijaMama is a supportive community. The following are not allowed: hate speech targeting any ethnic group, religion, or identity; harassment, bullying, or personal attacks on other members; sharing of another person's private information without consent; spam or commercial promotion without authorisation; and content that is sexually explicit or harmful to minors. We use AI moderation plus human review to enforce these rules. Crude language and strong opinions are allowed — but must remain respectful of individuals.`,
              },
              {
                title: 'Medical information disclaimer',
                content: `Everything on NaijaMama — including the Food Guide, Week Tracker, and community posts — is for general informational and educational purposes only. Nothing on this platform is a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified doctor, midwife, or registered dietitian before making decisions about your pregnancy. Do not delay or disregard professional medical advice because of something you read on NaijaMama.`,
              },
              {
                title: 'Your content',
                content: `You retain ownership of any content you post on NaijaMama. By posting, you grant NaijaMama a non-exclusive licence to display your content on the platform. We do not claim ownership of your posts. You are responsible for the accuracy and legality of content you post.`,
              },
              {
                title: 'Account termination',
                content: `We reserve the right to suspend or permanently terminate accounts that violate these terms. If your account is terminated for a serious violation, you may not create a new account. If you believe a termination was made in error, contact us at hello@naijamama.ng.`,
              },
              {
                title: 'Limitation of liability',
                content: `NaijaMama is provided "as is" without warranties of any kind. We are not responsible for the medical accuracy of user-generated community posts, outcomes resulting from actions taken based on content on the platform, or service interruptions. Our liability is limited to the fullest extent permitted by Nigerian law.`,
              },
            ].map(section => (
              <div key={section.title}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10 }}>{section.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--earth-mid)', lineHeight: 1.85 }}>{section.content}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: 1, background: 'var(--earth-pale)', marginBottom: 64 }}/>

        {/* ── Contact ── */}
        <section id="contact-info" style={{ marginBottom: 24, scrollMarginTop: 140 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--crimson-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Mail size={18} stroke="var(--crimson)" strokeWidth="1.8" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Contact</h2>
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--earth-mid)', lineHeight: 1.85, marginBottom: 20 }}>
            For questions about privacy, your account, or these terms, reach us at:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: 'white', borderRadius: 14, padding: '16px 20px', border: '1px solid var(--earth-pale)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--crimson-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Mail size={16} stroke="var(--crimson)" strokeWidth="1.8" />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--earth-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Email</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>hello@naijamama.ng</p>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: 14, padding: '16px 20px', border: '1px solid var(--earth-pale)', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--crimson-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={16} stroke="var(--crimson)" strokeWidth="1.8" />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--earth-light)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Response time</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>Within 24 hours on business days</p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 'var(--radius-full)',
              background: 'var(--crimson)', color: 'white',
              fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 700,
              textDecoration: 'none',
            }}>
              Send us a message →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
