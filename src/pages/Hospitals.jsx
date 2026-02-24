import { useState, useEffect } from 'react';
import { hospitals } from '../data/hospitals';
import Icon from '../components/Icon';

const HERO = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1400&q=80&auto=format&fit=crop';
const HERO2 = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&auto=format&fit=crop';
const HERO3 = 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&q=80&auto=format&fit=crop';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Stars({ n }) {
  return <span className="stars">{('★'.repeat(Math.floor(n))+'☆'.repeat(5-Math.floor(n)))}</span>;
}

function Toast({ msg, onDone }) {
  useEffect(()=>{ const t=setTimeout(onDone,2800); return()=>clearTimeout(t); },[onDone]);
  return (
    <div style={{ position:'fixed', bottom:32, left:'50%', transform:'translateX(-50%)', background:'var(--ink)', color:'white', padding:'13px 24px', borderRadius:'var(--radius-full)', fontWeight:600, boxShadow:'0 8px 32px rgba(0,0,0,0.2)', zIndex:9999, whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:10, animation:'fadeInUp 0.3s var(--ease)' }}>
      <span style={{ width:20, height:20, background:'#059669', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Icon name="check" size={11} color="white" />
      </span>
      {msg}
    </div>
  );
}

export default function Hospitals() {
  useReveal();
  const [search, setSearch] = useState('');
  const [typeF, setTypeF]   = useState('all');
  const [stateF, setStateF] = useState('all');
  const [toast, setToast]   = useState(null);
  const [showReview, setShowReview] = useState(false);

  const states = [...new Set(hospitals.map(h=>h.state))];
  const filtered = hospitals.filter(h => {
    const q = search.toLowerCase();
    return (h.name.toLowerCase().includes(q)||h.city.toLowerCase().includes(q)||h.state.toLowerCase().includes(q)) &&
      (typeF==='all'||h.type===typeF) && (stateF==='all'||h.state===stateF);
  });

  return (
    <div className="page-wrap" style={{ paddingTop:72, background:'var(--white)', minHeight:'100vh' }}>

      {/* ── Hero ── */}
      <section style={{ position:'relative', height:'clamp(420px,58vh,600px)', display:'flex', alignItems:'flex-end', overflow:'hidden' }}>
        <img src={HERO} alt="Maternity hospital" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 30%' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)' }}/>

        {/* Floating image accents */}
        <div className="hide-mobile" style={{ position:'absolute', top:48, right:'clamp(40px,6vw,120px)', display:'flex', gap:12, zIndex:2 }}>
          <div style={{ width:160, height:200, borderRadius:16, overflow:'hidden', boxShadow:'0 16px 48px rgba(0,0,0,0.3)', transform:'rotate(-2deg)' }}>
            <img src={HERO2} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
          <div style={{ width:140, height:180, borderRadius:16, overflow:'hidden', boxShadow:'0 16px 48px rgba(0,0,0,0.3)', transform:'rotate(2deg)', marginTop:32 }}>
            <img src={HERO3} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          </div>
        </div>

        <div style={{ position:'relative', zIndex:1, maxWidth:1240, margin:'0 auto', width:'100%', padding:'0 clamp(16px,4vw,48px) 64px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(217,43,58,0.9)', color:'white', padding:'6px 16px', borderRadius:'var(--radius-full)', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:20 }}>
            <Icon name="hospital" size={13} color="white" />
            Reviewed by Nigerian Mamas
          </div>
          <h1 className="display-xl" style={{ color:'white', maxWidth:620, marginBottom:16 }}>Nigerian Maternity<br/>Hospital Directory</h1>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.0625rem', maxWidth:480, lineHeight:1.7, marginBottom:32 }}>
            Real reviews from mamas who've actually been there — antenatal, delivery, and beyond.
          </p>
          {/* Stats row */}
          <div style={{ display:'flex', gap:32, flexWrap:'wrap' }}>
            {[['6','Hospitals Listed'],['4.0','Avg Rating'],['1,121','Mama Reviews'],['3','States Covered']].map(([v,l])=>(
              <div key={l}>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:'1.6rem', fontWeight:800, color:'white', lineHeight:1 }}>{v}</div>
                <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.6)', marginTop:4, fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disclaimer banner ── */}
      <div style={{ background:'#FFFBEB', borderBottom:'1px solid #FDE68A', padding:'14px clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', alignItems:'flex-start', gap:12 }}>
          <div style={{ color:'#D97706', flexShrink:0, marginTop:1 }}>
            <Icon name="alert" size={16} color="#D97706" />
          </div>
          <p style={{ fontSize:'0.8125rem', color:'#92400E', lineHeight:1.6 }}>
            <strong>Information only.</strong> NaijaMama is not a licensed medical provider. Hospital listings and reviews are submitted by community members and do not constitute medical advice. Always consult your doctor or midwife when choosing a maternity facility.
          </p>
        </div>
      </div>

      {/* ── Search + Filters ── */}
      <div style={{ background:'var(--white)', padding:'20px clamp(16px,4vw,48px)', boxShadow:'0 2px 12px rgba(0,0,0,0.06)', position:'sticky', top:72, zIndex:100 }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:'1 1 280px' }}>
            <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--earth-light)' }}>
              <Icon name="search" size={16} />
            </span>
            <input className="input" placeholder="Search hospital, city, or state..." value={search} onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:42 }} aria-label="Search hospitals" />
          </div>
          <select className="input" style={{ flex:'0 0 auto', width:'auto' }} value={stateF} onChange={e=>setStateF(e.target.value)}>
            <option value="all">All States</option>
            {states.map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          <select className="input" style={{ flex:'0 0 auto', width:'auto' }} value={typeF} onChange={e=>setTypeF(e.target.value)}>
            <option value="all">All Types</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <span style={{ fontSize:'0.8125rem', color:'var(--earth-light)', whiteSpace:'nowrap' }}>{filtered.length} hospital{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* ── Hospital Grid ── */}
      <section style={{ maxWidth:1240, margin:'0 auto', padding:'clamp(40px,5vw,64px) clamp(16px,4vw,48px)' }}>
        {filtered.length===0 ? (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'var(--crimson-pale)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
              <Icon name="search" size={28} color="var(--crimson)" />
            </div>
            <p style={{ fontSize:'1.2rem', fontWeight:600, color:'var(--ink)', marginBottom:8 }}>No hospitals found</p>
            <p style={{ color:'var(--earth-mid)' }}>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(360px,1fr))', gap:24 }}>
            {filtered.map((h,i)=><HospCard key={h.id} h={h} index={i}/>)}
          </div>
        )}

        {/* Coming soon map — better design */}
        <div className="reveal" style={{ marginTop:48, borderRadius:24, overflow:'hidden', position:'relative', height:280 }}>
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=70&auto=format&fit=crop" alt="Map of Nigeria" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'saturate(0.4) brightness(0.9)' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(217,43,58,0.75) 0%, rgba(17,24,39,0.85) 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12 }}>
            <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', border:'1.5px solid rgba(255,255,255,0.3)' }}>
              <Icon name="map" size={28} color="white" />
            </div>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'1.25rem', fontWeight:700, color:'white' }}>Interactive Map — Coming Soon</p>
            <p style={{ fontSize:'0.875rem', color:'rgba(255,255,255,0.65)' }}>Find maternity hospitals near you across all 36 states</p>
          </div>
        </div>
      </section>

      {/* ── Why reviews matter ── */}
      <section style={{ background:'var(--cream)', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          <div className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
            <p className="eyebrow" style={{ marginBottom:14 }}>Why it matters</p>
            <h2 className="display-md" style={{ maxWidth:560, margin:'0 auto' }}>Choosing where to deliver is one of the biggest decisions you'll make</h2>
          </div>
          <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:24 }}>
            {[
              { icon:'star', title:'Real mama reviews', body:'Every review comes from a Nigerian woman who has been to that hospital — not a press release.' },
              { icon:'shield', title:'Know before you go', body:'Understand the staff attitude, waiting times, cost, and facilities before your due date.' },
              { icon:'heart', title:'Make an informed choice', body:'Your birth experience matters. Give yourself the best chance at a positive one.' },
              { icon:'chat', title:'Share your story', body:'Help the next mama by sharing your honest experience. Your words have power.' },
            ].map(item => (
              <div key={item.title} style={{ background:'var(--white)', borderRadius:20, padding:'28px 24px', boxShadow:'var(--shadow-sm)', border:'1px solid var(--earth-pale)' }}>
                <div style={{ width:48, height:48, borderRadius:14, background:'var(--crimson-pale)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
                  <Icon name={item.icon} size={22} color="var(--crimson)" />
                </div>
                <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--ink)', marginBottom:10 }}>{item.title}</h3>
                <p style={{ fontSize:'0.875rem', color:'var(--earth-mid)', lineHeight:1.7 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position:'relative', overflow:'hidden', minHeight:400, display:'flex', alignItems:'center' }}>
        <img src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=1400&q=75&auto=format&fit=crop" alt="Nigerian mama" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 20%' }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(17,24,39,0.82)' }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:1240, margin:'0 auto', width:'100%', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)', textAlign:'center' }}>
          <div className="reveal" style={{ maxWidth:560, margin:'0 auto' }}>
            <h2 className="display-md" style={{ color:'white', marginBottom:16 }}>Help other mamas make the right choice</h2>
            <p style={{ color:'rgba(255,255,255,0.65)', marginBottom:32, lineHeight:1.75, fontSize:'1.0625rem' }}>
              Your delivery experience — good or bad — could be exactly what another mama needs to hear before she decides.
            </p>
            <button onClick={()=>setShowReview(true)} className="btn btn-primary btn-lg">Write a Hospital Review</button>
          </div>
        </div>
      </section>

      {/* ── Review modal ── */}
      {showReview && (
        <div style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)', padding:24 }}
          onClick={e=>{ if(e.target===e.currentTarget) setShowReview(false); }}
        >
          <div style={{ background:'var(--white)', borderRadius:24, padding:'36px 32px', width:'100%', maxWidth:520, animation:'fadeInUp 0.25s var(--ease)', boxShadow:'0 32px 80px rgba(0,0,0,0.2)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
              <div>
                <h3 style={{ fontFamily:'var(--font-sans)', fontSize:'1.3rem', fontWeight:700, color:'var(--ink)' }}>Write a Hospital Review</h3>
                <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', marginTop:4 }}>Your honest review helps other Nigerian mamas</p>
              </div>
              <button onClick={()=>setShowReview(false)} style={{ width:36, height:36, borderRadius:'50%', background:'var(--cream-dark)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--earth-mid)', cursor:'pointer', border:'none', flexShrink:0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <select className="input">
                <option value="">Select Hospital...</option>
                {hospitals.map(h=><option key={h.id}>{h.name} — {h.city}</option>)}
              </select>
              <div>
                <p style={{ fontSize:'0.8125rem', fontWeight:600, color:'var(--ink)', marginBottom:8 }}>Your rating</p>
                <div style={{ display:'flex', gap:4 }}>
                  {[1,2,3,4,5].map(n=><button key={n} style={{ fontSize:28, background:'none', border:'none', cursor:'pointer', color:'var(--amber)', lineHeight:1 }}>★</button>)}
                </div>
              </div>
              <textarea className="input" rows={4} placeholder="Share your experience — antenatal care, delivery room, staff, waiting time, costs..." style={{ resize:'vertical' }}/>
              <input className="input" placeholder="Your name (e.g. Adaeze_Lagos)"/>
              <p style={{ fontSize:'0.75rem', color:'var(--earth-light)', lineHeight:1.6 }}>
                Reviews are shared for informational purposes only and do not constitute medical advice.
              </p>
              <button className="btn btn-primary" style={{ width:'100%', padding:'14px' }} onClick={()=>{ setShowReview(false); setToast('Review submitted. Thank you, mama!'); }}>Submit Review</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast} onDone={()=>setToast(null)}/>}
    </div>
  );
}

function HospCard({ h, index }) {
  const typeCfg = {
    public:  { bg:'#EFF6FF', color:'#1D4ED8', label:'Public'  },
    private: { bg:'#F5F3FF', color:'#6D28D9', label:'Private' },
  };
  const cfg = typeCfg[h.type] || typeCfg.public;

  return (
    <div className={`card reveal reveal-delay-${(index % 3) + 1}`} style={{ padding:0, overflow:'hidden', display:'flex', flexDirection:'column' }}>
      {/* Card image */}
      <div style={{ height:180, overflow:'hidden', position:'relative', flexShrink:0 }}>
        <img
          src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1519494026892-80bbd2d6fd0d' : '1551076805-e1869033e561'}?w=600&q=75&auto=format&fit=crop`}
          alt={h.name}
          loading="lazy"
          style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.5s var(--ease)' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position:'absolute', top:14, left:14 }}>
          <span style={{ background:cfg.bg, color:cfg.color, padding:'4px 12px', borderRadius:'var(--radius-full)', fontSize:'0.75rem', fontWeight:700 }}>{cfg.label}</span>
        </div>
        <div style={{ position:'absolute', top:14, right:14, background:'rgba(0,0,0,0.55)', borderRadius:'var(--radius-full)', padding:'4px 10px', display:'flex', alignItems:'center', gap:4 }}>
          <Stars n={h.rating}/>
          <span style={{ fontSize:'0.75rem', color:'white', fontWeight:700 }}>{h.rating}</span>
        </div>
      </div>

      <div style={{ padding:'22px', flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ marginBottom:10 }}>
          <h3 style={{ fontFamily:'var(--font-sans)', fontSize:'1.0625rem', fontWeight:700, color:'var(--ink)', marginBottom:3, lineHeight:1.3 }}>{h.name}</h3>
          <p style={{ fontSize:'0.75rem', color:'var(--earth-light)', marginBottom:8 }}>{h.fullName}</p>
          <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', display:'flex', alignItems:'center', gap:6 }}>
            <Icon name="pin" size={13} color="var(--earth-light)" />
            {h.city}, {h.state}
          </p>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
          <span style={{ fontSize:'0.8125rem', color:'var(--earth-mid)' }}>({h.reviewCount} reviews)</span>
        </div>

        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
          {h.features.map(f=><span key={f} style={{ background:'var(--crimson-pale)', color:'var(--crimson)', padding:'3px 10px', borderRadius:'var(--radius-full)', fontSize:'0.7rem', fontWeight:600 }}>{f}</span>)}
        </div>

        <p style={{ fontSize:'0.875rem', color:'var(--earth-mid)', lineHeight:1.65, marginBottom:14, flex:1 }}>{h.description}</p>

        <blockquote style={{ background:'var(--cream)', borderLeft:'3px solid var(--crimson)', borderRadius:'0 12px 12px 0', padding:'10px 14px', marginBottom:18 }}>
          <p style={{ fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:'0.875rem', color:'var(--ink-soft)', lineHeight:1.65 }}>"{h.quote}"</p>
        </blockquote>

        <div style={{ display:'flex', gap:10 }}>
          <button className="btn btn-outline btn-sm" style={{ flex:1 }}>See Full Reviews</button>
          <button className="btn btn-primary btn-sm" style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <Icon name="directions" size={13} color="white" />
            Directions
          </button>
        </div>
      </div>
    </div>
  );
}
