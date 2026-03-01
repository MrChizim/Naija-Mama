import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import FoodGuide from './pages/FoodGuide';
import Tracker from './pages/Tracker';
import Community from './pages/Community';
import Pricing from './pages/Pricing';
import Saved from './pages/Saved';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Legal from './pages/Legal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
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
          <Route path="/join" element={<Pricing />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/legal" element={<Legal />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
