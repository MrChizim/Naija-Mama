import { useState, useEffect, useRef } from 'react';
import Icon from '../components/Icon';
import { foods, herbs, mealPlans } from '../data/foods';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

const HERO_IMG = 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1400&q=80&auto=format&fit=crop';

const PRODUCTS_TO_AVOID = [
  { name: 'Alcohol & spirits', note: 'No safe amount in pregnancy. Avoid completely.' },
  { name: 'Cigarettes, shisha, vapes', note: 'Nicotine reduces oxygen to baby and increases complications.' },
  { name: 'Herbal tonics & agbo mixtures', note: 'Unregulated herbs can trigger contractions.' },
  { name: 'Energy drinks', note: 'High caffeine and stimulants are risky.' },
  { name: 'Skin-lightening creams', note: 'Often contain steroids, mercury, or hydroquinone.' },
  { name: 'Unprescribed pain or sleep meds', note: 'Always check with a doctor before taking medicines.' },
];

const VITAMINS = [
  { name: 'Folic Acid', why: 'Supports neural tube development in early pregnancy.' },
  { name: 'Iron', why: 'Prevents anaemia and supports baby’s growth.' },
  { name: 'Calcium', why: 'Builds baby’s bones and protects yours.' },
  { name: 'Vitamin D', why: 'Helps calcium absorption and immune health.' },
  { name: 'Iodine', why: 'Supports baby’s brain development.' },
  { name: 'Omega‑3 (DHA)', why: 'Supports baby’s brain and eye development.' },
];

const GLOSSARY = [
  { term: 'Trimester', def: 'Pregnancy divided into three stages: weeks 1–13, 14–26, 27–40.' },
  { term: 'Due Date', def: 'Estimated date your baby may arrive (around 40 weeks).' },
  { term: 'Gestational Age', def: 'How far along the pregnancy is, counted from last period.' },
  { term: 'Antenatal', def: 'Care you receive during pregnancy (checkups, tests, scans).' },
  { term: 'Ultrasound', def: 'A scan that uses sound waves to see the baby inside the womb.' },
  { term: 'Fundal Height', def: 'A measurement of your bump used to track baby’s growth.' },
  { term: 'Braxton Hicks', def: 'Practice contractions that can feel like tightening.' },
  { term: 'Mucus Plug', def: 'A protective mucus that seals the cervix during pregnancy.' },
];

export default function FoodGuide() {
  const [filter, setFilter] = useState('all');
  const [safety, setSafety] = useState('all');
  const [search, setSearch] = useState('');
  const [mealTab, setMealTab] = useState('first');
  const r2=useReveal(), r3=useReveal(), r4=useReveal(), r5=useReveal();

  const filtered = foods.filter(f => {
    const s = search.toLowerCase();
    return f.name.toLowerCase().includes(s) &&
      (filter==='all' || f.trimesters.includes(filter)) &&
      (safety==='all' || f.safety===safety);
  });

  const safetyCfg = {
    safe:     { label:'Safe & Recommended', bg:'#ECFDF5', color:'#065F46', border:'#6EE7B7' },
    moderate: { label:'Eat in Moderation',  bg:'#FFFBEB', color:'#92400E', border:'#FCD34D' },
    avoid:    { label:'Avoid During Pregnancy', bg:'#FEF2F2', color:'#991B1B', border:'#FCA5A5' },
  };

  return (
    <div className="page-wrap" style={{ paddingTop:72 }}>
      {/* Hero */}
      <section style={{ position:'relative', height:'clamp(340px,50vh,500px)', display:'flex', alignItems:'flex-end', overflow:'hidden' }}>
        <img src={HERO_IMG} alt="Nigerian food" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(26,10,0,0.3) 0%, rgba(26,10,0,0.85) 100%)' }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:1240, margin:'0 auto', width:'100%', padding:'0 clamp(16px,4vw,48px) 56px' }}>
          <div className="badge" style={{ background:'rgba(224,122,95,0.25)', color:'var(--gold-bright)', display:'inline-flex', marginBottom:16 }}>
Medically reviewed by a registered Nigerian dietitian
          </div>
          <h1 className="display-xl" style={{ color:'white', maxWidth:700 }}>The Nigerian Pregnancy Food Guide</h1>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.0625rem', marginTop:12, maxWidth:560 }}>
            What to eat, what to avoid, and everything in between — written for Nigerian kitchens.
          </p>
        </div>
      </section>

      {/* Safety Legend */}
      <div style={{ background:'var(--white)', padding:'20px clamp(16px,4vw,48px)', borderBottom:'1px solid rgba(156,74,58,0.07)', position:'sticky', top:72, zIndex:100 }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', gap:16, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {Object.entries(safetyCfg).map(([k,v]) => (
              <span key={k} className="badge" style={{ background:v.bg, color:v.color }}>{v.label}</span>
            ))}
          </div>
          {/* Trimester filter */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {[['all','All'],['first','1st Trim'],['second','2nd Trim'],['third','3rd Trim']].map(([id,lb]) => (
              <button key={id} onClick={()=>setFilter(id)} className="btn btn-sm" style={{
                background: filter===id?'var(--crimson)':'transparent',
                color: filter===id?'white':'var(--crimson)',
                border: '1.5px solid var(--crimson)',
              }}>{lb}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Foods Grid */}
      <section ref={r2} className="reveal" style={{ background:'var(--ivory)', padding:'clamp(40px,6vw,80px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          {/* Search + safety filter */}
          <div style={{ display:'flex', gap:12, marginBottom:32, flexWrap:'wrap' }}>
            <div style={{ position:'relative', flex:'1 1 280px' }}>
              <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--earth-light)' }}>
                <Icon name="search" size={16} />
              </span>
              <input className="input" placeholder="Search foods (e.g. beans, zobo, pap)..." value={search} onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:42 }} aria-label="Search foods" />
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {[['all','All','var(--crimson)'],['safe','Safe','#065F46'],['moderate','Limit','#92400E'],['avoid','Avoid','#991B1B']].map(([id,lb,c]) => (
                <button key={id} onClick={()=>setSafety(id)} className="btn btn-sm" style={{
                  background: safety===id?c:'transparent',
                  color: safety===id?'white':c,
                  border: `1.5px solid ${c}`,
                }}>{lb}</button>
              ))}
            </div>
          </div>

          {filtered.length===0 ? (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <p style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--earth-mid)' }}>No foods found for "{search}"</p>
            </div>
          ) : (
            <>
              <p style={{ fontSize:'0.8125rem', color:'var(--earth-light)', marginBottom:20 }}>Showing {filtered.length} foods</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:16 }}>
                {filtered.map(food => <FoodCardNew key={food.id} food={food} cfg={safetyCfg[food.safety]}/>)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Products to Avoid + Vitamins */}
      <section ref={r3} className="reveal" style={{ background:'var(--ivory-dark)', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:24 }}>
          <div className="card" style={{ padding:'28px 24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--ink)' }}>Products to Avoid</h3>
              <span className="badge badge-crimson">Safety first</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:12 }}>
              {PRODUCTS_TO_AVOID.map(p => (
                <div key={p.name} style={{ border:'1.5px solid rgba(0,0,0,0.06)', borderRadius:14, padding:'14px 16px', background:'var(--white)' }}>
                  <p style={{ fontWeight:600, color:'var(--ink)', marginBottom:6 }}>{p.name}</p>
                  <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', lineHeight:1.6 }}>{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding:'28px 24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--ink)' }}>Good Vitamins</h3>
              <span className="badge badge-gold">Ask your doctor</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {VITAMINS.map(v => (
                <div key={v.name} style={{ display:'flex', gap:12, padding:'12px 14px', borderRadius:12, background:'var(--gold-pale)', border:'1.5px solid rgba(224,122,95,0.15)' }}>
                  <div style={{ width:8, borderRadius:10, background:'var(--gold)' }}/>
                  <div>
                    <p style={{ fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{v.name}</p>
                    <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', lineHeight:1.6 }}>{v.why}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop:12, fontSize:'0.75rem', color:'var(--earth-light)' }}>
              Always confirm supplements and dosages with your healthcare provider.
            </p>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section ref={r4} className="reveal" style={{ background:'var(--ivory)', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:36 }}>
            <p className="badge badge-crimson" style={{ display:'inline-flex', marginBottom:14 }}>Pregnancy Glossary</p>
            <h2 className="display-md">Common words, simple meanings</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:16 }}>
            {GLOSSARY.map(g => (
              <div key={g.term} className="card" style={{ padding:'20px 18px' }}>
                <p style={{ fontWeight:700, color:'var(--ink)', marginBottom:6 }}>{g.term}</p>
                <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', lineHeight:1.6 }}>{g.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meal Plans */}
      <section className="reveal" style={{ background:'var(--ivory-dark)', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <p className="badge badge-crimson" style={{ display:'inline-flex', marginBottom:16 }}>Sample Plans</p>
            <h2 className="display-md">7-Day Nigerian Pregnancy Meal Plans</h2>
          </div>
          <div style={{ display:'flex', gap:8, marginBottom:36, justifyContent:'center', flexWrap:'wrap' }}>
            {[['first','1st Trimester'],['second','2nd Trimester'],['third','3rd Trimester']].map(([id,lb]) => (
              <button key={id} onClick={()=>setMealTab(id)} className="btn" style={{
                background: mealTab===id?'var(--crimson)':'transparent',
                color: mealTab===id?'white':'var(--crimson)',
                border: '1.5px solid var(--crimson)',
              }}>{lb}</button>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px,1fr))', gap:16 }}>
            {mealPlans[mealTab].map((day,i) => (
              <div key={i} className="card" style={{ overflow:'hidden' }}>
                <div style={{ background:'linear-gradient(135deg, var(--crimson), var(--gold))', padding:'14px 20px' }}>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', color:'white', fontWeight:700 }}>{day.day}</p>
                </div>
                <div style={{ padding:'18px 20px' }}>
                  {[['sunrise','Breakfast',day.breakfast],['sun','Lunch',day.lunch],['moon','Dinner',day.dinner],['snack','Snack',day.snack]].map(([ic,lb,val]) => (
                    <div key={lb} style={{ marginBottom:12, display:'flex', gap:10 }}>
                      <span style={{ color:'var(--crimson)', flexShrink:0, marginTop:1 }}>
                        <Icon name={ic} size={16} />
                      </span>
                      <div>
                        <p style={{ fontSize:'0.7rem', fontWeight:700, color:'var(--earth-light)', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:2 }}>{lb}</p>
                        <p style={{ fontSize:'0.875rem', color:'var(--ink)', lineHeight:1.5 }}>{val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Herbs Warning */}
      <section ref={r5} className="reveal" style={{ background:'linear-gradient(150deg, var(--ink) 0%, var(--crimson-deep) 100%)', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="badge" style={{ background:'rgba(255,100,100,0.2)', color:'#EF9A9A', display:'inline-flex', marginBottom:20 }}>Important Safety Information</div>
            <h2 className="display-md" style={{ color:'white', marginBottom:16 }}>Local Herbs — Know What's Safe</h2>
            <p style={{ color:'rgba(255,255,255,0.65)', maxWidth:580, margin:'0 auto', lineHeight:1.75 }}>
              Our mothers have deep herbal wisdom. But pregnancy changes everything. These herbs need serious caution.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:16 }}>
            {herbs.map(h => (
              <div key={h.id} style={{ background:'rgba(255,255,255,0.05)', borderRadius:16, padding:'20px', border:`1px solid ${h.dangerLevel==='high'?'rgba(239,154,154,0.3)':'rgba(255,204,128,0.3)'}`, transition:'all var(--dur-mid)' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.09)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                  <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1rem', fontWeight:600, color:'white' }}>{h.name}</h3>
                  <span className="badge" style={{ background: h.dangerLevel==='high'?'rgba(239,154,154,0.2)':'rgba(255,204,128,0.2)', color: h.dangerLevel==='high'?'#EF9A9A':'#FFCC80', whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:6 }}>
                    <Icon name="alert" size={14} color={h.dangerLevel==='high'?'#EF9A9A':'#FFCC80'} />
                    {h.dangerLevel==='high'?'High Risk':'Caution'}
                  </span>
                </div>
                <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', marginBottom:10 }}>{h.localName}</p>
                <p style={{ fontSize:'0.8125rem', color:'rgba(255,255,255,0.72)', lineHeight:1.65 }}>{h.reason}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:40, background:'rgba(255,255,255,0.06)', borderRadius:16, padding:'20px 24px', border:'1px solid rgba(255,255,255,0.08)', textAlign:'center' }}>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.9375rem', lineHeight:1.7 }}>
              <strong style={{ color:'white' }}>Always tell your doctor or midwife</strong> about any herbs, supplements, or local remedies you're taking during pregnancy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FoodCardNew({ food, cfg }) {
  const [open, setOpen] = useState(false);
  const tLabels = { first:'1st', second:'2nd', third:'3rd' };
  return (
    <div onClick={()=>setOpen(o=>!o)} className="card" style={{ padding:'20px', cursor:'pointer', borderTop:`3px solid ${cfg.color}` }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, marginBottom:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:56, height:56, borderRadius:12, overflow:'hidden', background:'var(--ivory-dark)', border:`1.5px solid ${cfg.border}` }}>
            {food.image && <img src={food.image} alt={food.name} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>}
          </div>
          <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1rem', fontWeight:600, color:'var(--ink)', lineHeight:1.3 }}>{food.name}</h3>
        </div>
        <span style={{ fontSize:12, color:'var(--earth-light)', flexShrink:0 }}>{open?'▲':'▼'}</span>
      </div>
      <span className="badge" style={{ background:cfg.bg, color:cfg.color, marginBottom:10 }}>{cfg.label}</span>
      <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:10 }}>
        {food.trimesters.map(t=>(
          <span key={t} className="badge" style={{ background:'var(--gold-soft)', color:'var(--gold)', fontSize:'0.7rem' }}>{tLabels[t]} Trim</span>
        ))}
      </div>
      <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', lineHeight:1.65, display:'-webkit-box', WebkitLineClamp: open?'unset':2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
        {food.explanation}
      </p>
      {open && (
        <div style={{ marginTop:10, padding:'12px 14px', background:cfg.bg, borderRadius:10 }}>
          <p style={{ fontSize:'0.75rem', fontWeight:700, color:cfg.color, marginBottom:4, display:'flex', alignItems:'center', gap:6 }}>
            <Icon name={food.safety==='safe' ? 'check' : 'alert'} size={14} color={cfg.color} />
            {food.safety==='safe'?'Nutritional benefit:':'Risk to note:'}
          </p>
          <p style={{ fontSize:'0.8125rem', color:'var(--ink)', lineHeight:1.55 }}>{food.benefit||food.risk}</p>
        </div>
      )}
    </div>
  );
}
