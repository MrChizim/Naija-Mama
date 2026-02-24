import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import FoodGuide from './pages/FoodGuide';
import Tracker from './pages/Tracker';
import Community from './pages/Community';
import Hospitals from './pages/Hospitals';
import Pricing from './pages/Pricing';
import Icon from './components/Icon';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function FloatingWidget() {
  return (
    <a
      href="/tracker?week=24"
      onClick={e => { e.preventDefault(); window.location.href = '/tracker?week=24'; }}
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--crimson)',
        color: 'white',
        padding: '10px 22px',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: '0.875rem',
        boxShadow: '0 4px 20px rgba(156,74,58,0.4)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        zIndex: 500,
        transition: 'all 200ms ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(-50%) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(156,74,58,0.45)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(-50%) translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(156,74,58,0.4)'; }}
    >
      <Icon name="heart" size={16} color="white" />
      You're at Week 24! See this week →
    </a>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="page-enter">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/food-guide" element={<FoodGuide />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/community" element={<Community />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/join" element={<Pricing />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWidget />
    </>
  );
}
