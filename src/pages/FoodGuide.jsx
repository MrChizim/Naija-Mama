import { useState, useEffect, useRef } from 'react';
import { Search, Check, AlertTriangle, Stethoscope } from 'lucide-react';
import { foods, herbs } from '../data/foods';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible'); }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return ref;
}

const HERO_IMG = '/foodhero.png';

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
  const r2=useReveal(), r3=useReveal(), r4=useReveal(), r5=useReveal(), r7=useReveal();

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
    <div className="page-wrap" style={{ paddingTop:0 }}>
      {/* Hero */}
      <section style={{ position:'relative', height:'clamp(280px,42vh,420px)', display:'flex', alignItems:'flex-end', overflow:'hidden' }}>
        <img src={HERO_IMG} alt="Nigerian food" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(26,10,0,0.3) 0%, rgba(26,10,0,0.85) 100%)' }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:1240, margin:'0 auto', width:'100%', padding:'0 clamp(16px,4vw,48px) 40px' }}>
          <div className="badge" style={{ background:'rgba(138,100,146,0.25)', color:'var(--amber)', display:'inline-flex', marginBottom:16 }}>
Medically reviewed by a registered Nigerian dietitian
          </div>
          <h1 className="display-xl" style={{ color:'white', maxWidth:700 }}>The Nigerian Pregnancy Food Guide</h1>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'1.0625rem', marginTop:12, maxWidth:560 }}>
            What to eat, what to avoid, and everything in between — written for Nigerian kitchens.
          </p>
        </div>
      </section>

      {/* Disclaimer banner */}
      <div style={{ background:'#FFFBEB', borderBottom:'1px solid #FDE68A', padding:'8px clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', gap:10, alignItems:'center' }}>
          <span style={{ flexShrink:0, display:'flex', alignItems:'center' }}><Stethoscope size={16} stroke="#92400E" strokeWidth="1.8" /></span>
          <p style={{ fontSize:'0.8125rem', color:'#92400E', lineHeight:1.55 }}>
            <strong>This guide is for general information only.</strong> Every pregnancy is different. Always check with your doctor, midwife, or a registered dietitian before making changes to your diet during pregnancy.
          </p>
        </div>
      </div>

      {/* Section Quick Navigation */}
      <div style={{ background:'var(--crimson-pale)', borderBottom:'1px solid rgba(62,20,68,0.1)', padding:'10px clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontSize:'0.75rem', fontWeight:700, color:'var(--crimson)', textTransform:'uppercase', letterSpacing:'0.08em', marginRight:4, whiteSpace:'nowrap' }}>Jump to:</span>
          {[
            { label:'Foods', href:'#foods-section' },
            { label:'Products to Avoid', href:'#avoid-section' },
            { label:'Glossary', href:'#glossary-section' },
            { label:'Herbs Warning', href:'#herbs-section' },
            { label:'Symptoms', href:'#symptoms-section' },
          ].map(({ label, href }) => (
            <a key={href} href={href} style={{
              fontSize:'0.8rem', fontWeight:600, color:'var(--crimson)',
              background:'white', padding:'5px 12px', borderRadius:'var(--radius-full)',
              border:'1.5px solid rgba(62,20,68,0.2)', textDecoration:'none',
              transition:'all var(--dur-fast)', whiteSpace:'nowrap',
            }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--crimson)'; e.currentTarget.style.color='white'; }}
              onMouseLeave={e => { e.currentTarget.style.background='white'; e.currentTarget.style.color='var(--crimson)'; }}
            >{label}</a>
          ))}
        </div>
      </div>

      {/* Safety Legend */}
      <div style={{ background:'var(--white)', padding:'12px clamp(16px,4vw,48px)', borderBottom:'1px solid rgba(62,20,68,0.08)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {Object.entries(safetyCfg).map(([k,v]) => (
              <span key={k} className="badge" style={{ background:v.bg, color:v.color, border:`1px solid ${v.border}` }}>{v.label}</span>
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
      <section id="foods-section" ref={r2} className="reveal" style={{ background:'var(--ivory)', padding:'clamp(12px,2vw,24px) clamp(16px,4vw,48px)', scrollMarginTop:80 }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          {/* Search + safety filter */}
          <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
            <div style={{ position:'relative', flex:'1 1 280px' }}>
              <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--earth-light)' }}>
                <Search size={16} strokeWidth="1.8" />
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
              <p style={{ fontSize:'0.8125rem', color:'var(--earth-light)', marginBottom:12 }}>Showing {filtered.length} foods</p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))', gap:12 }}>
                {filtered.map(food => <FoodCardNew key={food.id} food={food} cfg={safetyCfg[food.safety]}/>)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Products to Avoid + Vitamins */}
      <section id="avoid-section" ref={r3} className="reveal" style={{ background:'var(--ivory)', padding:'clamp(20px,3vw,36px) clamp(16px,4vw,48px)', borderTop:'1px solid var(--earth-pale)', scrollMarginTop:80 }}>
        <div style={{ maxWidth:1240, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,340px),1fr))', gap:24 }}>
          <div className="card" style={{ padding:'22px 20px' }}>
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

          <div className="card" style={{ padding:'22px 20px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', color:'var(--ink)' }}>Good Vitamins</h3>
              <span className="badge badge-amber">Ask your doctor</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {VITAMINS.map(v => (
                <div key={v.name} style={{ display:'flex', gap:12, padding:'12px 14px', borderRadius:12, background:'var(--amber-pale)', border:'1.5px solid rgba(138,100,146,0.18)' }}>
                  <div style={{ width:8, borderRadius:10, background:'var(--amber)' }}/>
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
      <section id="glossary-section" ref={r4} className="reveal" style={{ background:'var(--cream)', padding:'clamp(20px,2.5vw,32px) clamp(16px,4vw,48px)', scrollMarginTop:80 }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:14 }}>
            <p className="badge badge-crimson" style={{ display:'inline-flex', marginBottom:8 }}>Pregnancy Glossary</p>
            <h2 className="display-sm">Common words, simple meanings</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:12 }}>
            {GLOSSARY.map(g => (
              <div key={g.term} className="card" style={{ padding:'20px 18px' }}>
                <p style={{ fontWeight:700, color:'var(--ink)', marginBottom:6 }}>{g.term}</p>
                <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', lineHeight:1.6 }}>{g.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Herbs Warning */}
      <section id="herbs-section" ref={r5} className="reveal" style={{ background:'linear-gradient(150deg, #1C0A0E 0%, var(--crimson-deep) 100%)', padding:'clamp(20px,3vw,32px) clamp(16px,4vw,48px)', scrollMarginTop:80 }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:20 }}>
            <div className="badge" style={{ background:'rgba(255,100,100,0.2)', color:'#EF9A9A', display:'inline-flex', marginBottom:14 }}>Important Safety Information</div>
            <h2 className="display-md" style={{ color:'white', marginBottom:16 }}>Local Herbs — Know What's Safe</h2>
            <p style={{ color:'rgba(255,255,255,0.65)', maxWidth:580, margin:'0 auto', lineHeight:1.75 }}>
              Our mothers have deep herbal wisdom. But pregnancy changes everything. These herbs need serious caution.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))', gap:12 }}>
            {herbs.map(h => (
              <div key={h.id} style={{ background:'rgba(255,255,255,0.05)', borderRadius:16, padding:'20px', border:`1px solid ${h.dangerLevel==='high'?'rgba(239,154,154,0.3)':'rgba(255,204,128,0.3)'}`, transition:'all var(--dur-mid)' }}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.09)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                  <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'1rem', fontWeight:600, color:'white' }}>{h.name}</h3>
                  <span className="badge" style={{ background: h.dangerLevel==='high'?'rgba(239,154,154,0.2)':'rgba(255,204,128,0.2)', color: h.dangerLevel==='high'?'#EF9A9A':'#FFCC80', whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:6 }}>
                    <AlertTriangle size={14} color={h.dangerLevel==='high'?'#EF9A9A':'#FFCC80'} strokeWidth="1.8" />
                    {h.dangerLevel==='high'?'High Risk':'Caution'}
                  </span>
                </div>
                <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.4)', marginBottom:10 }}>{h.localName}</p>
                <p style={{ fontSize:'0.8125rem', color:'rgba(255,255,255,0.72)', lineHeight:1.65 }}>{h.reason}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:24, background:'rgba(255,255,255,0.06)', borderRadius:16, padding:'18px 20px', border:'1px solid rgba(255,255,255,0.08)', textAlign:'center' }}>
            <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.9375rem', lineHeight:1.7 }}>
              <strong style={{ color:'white' }}>Always tell your doctor or midwife</strong> about any herbs, supplements, or local remedies you're taking during pregnancy.
            </p>
          </div>
        </div>
      </section>

      {/* Common Pregnancy Symptoms & Bodily Changes */}
      <section id="symptoms-section" ref={r7} className="reveal" style={{ background:'var(--cream)', padding:'clamp(20px,3vw,32px) clamp(16px,4vw,48px)', scrollMarginTop:80 }}>
        <div style={{ maxWidth:1240, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:18 }}>
            <p className="badge badge-crimson" style={{ display:'inline-flex', marginBottom:12 }}>What to Expect</p>
            <h2 className="display-md">Common Symptoms &amp; Bodily Changes</h2>
            <p style={{ color:'var(--earth-mid)', fontSize:'0.875rem', lineHeight:1.65, maxWidth:560, margin:'10px auto 0' }}>
              Every pregnancy is different, but these are symptoms many Nigerian mamas experience. <strong>Always speak to your doctor</strong> if something feels severe or worrying.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%,260px),1fr))', gap:12 }}>
            {[
              { title:'Morning Sickness', desc:'Nausea and vomiting, especially in the first trimester. Ginger tea, small frequent meals, and dry crackers can help. Severe cases (hyperemesis) need medical attention.' },
              { title:'Extreme Fatigue', desc:'Your body is doing enormous work building a new life. Rest without guilt. Iron-rich foods like ugu and liver can help combat pregnancy anaemia.' },
              { title:'Back & Pelvic Pain', desc:'The pregnancy hormone relaxin loosens your joints. Gentle walking, sleeping with a pillow between your knees, and avoiding heavy lifting helps.' },
              { title:'Swollen Feet & Ankles', desc:'Very common from the second trimester. Elevate your feet when resting, stay hydrated, and reduce salt. Sudden severe swelling needs doctor review.' },
              { title:'Heartburn & Acid Reflux', desc:'Your growing uterus pushes stomach acid up. Eat smaller meals, avoid spicy food late at night, and sit upright after eating.' },
              { title:'Frequent Urination', desc:'Normal throughout pregnancy as your uterus presses on the bladder. Do not reduce water intake — staying hydrated is important for you and baby.' },
              { title:'Shortness of Breath', desc:'Especially in the third trimester as baby takes up more space. Rest, avoid lying flat on your back, and sleep propped up with pillows.' },
              { title:'Pregnancy Brain / Forgetfulness', desc:'Hormonal changes affect memory and concentration. Write things down, set reminders, and be gentle with yourself — it is temporary.' },
              { title:'Leg Cramps', desc:'Common especially at night. Stay hydrated, stretch your calves before bed, and try gentle massage. Magnesium-rich foods like nuts can help.' },
              { title:'Constipation', desc:'Pregnancy hormones slow digestion. Drink plenty of water, eat fibre-rich Nigerian foods like beans, garden eggs, and ugu leaves, and stay active.' },
              { title:'Mood Swings', desc:'Hormonal shifts affect emotions significantly. This is completely normal. Reach out to the Mama Village community or speak to a professional if you feel overwhelmed.' },
              { title:'Stretch Marks', desc:'As skin stretches, marks may appear on the belly, thighs, or breasts. Shea butter and coconut oil keep skin moisturised and supple.' },
            ].map(s => (
              <div key={s.title} style={{ background:'white', borderRadius:16, padding:'20px 18px', border:'1px solid var(--earth-pale)', transition:'box-shadow var(--dur-fast)' }}
                onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.07)'}
                onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}
              >
                <p style={{ fontWeight:700, fontSize:'0.9375rem', color:'var(--ink)', marginBottom:6 }}>{s.title}</p>
                <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:24, background:'var(--crimson-pale)', borderRadius:16, padding:'16px 20px', border:'1px solid rgba(123,45,62,0.15)', display:'flex', gap:12, alignItems:'flex-start' }}>
            <span style={{ fontSize:20, flexShrink:0 }}>⚕️</span>
            <p style={{ fontSize:'0.85rem', color:'var(--ink-soft)', lineHeight:1.65 }}>
              <strong>When to call your doctor immediately:</strong> Heavy bleeding, severe abdominal pain, sudden severe headache, blurred vision, fever above 38°C, reduced or absent baby movements, or waters breaking before 37 weeks. When in doubt — call.
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
    <div onClick={()=>setOpen(o=>!o)} style={{
      padding:'14px 16px', cursor:'pointer',
      borderRadius:14, border:`1px solid ${cfg.border}`,
      borderLeft:`4px solid ${cfg.color}`,
      background: open ? cfg.bg : 'white',
      transition:'background var(--dur-fast)',
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:8, marginBottom:8 }}>
        <h3 style={{ fontFamily:'var(--font-sans)', fontSize:'0.9375rem', fontWeight:700, color:'var(--ink)', lineHeight:1.3, flex:1 }}>{food.name}</h3>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
          <span className="badge" style={{ background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, fontSize:'0.7rem' }}>{cfg.label}</span>
          <span style={{ fontSize:11, color:'var(--earth-light)' }}>{open?'▲':'▼'}</span>
        </div>
      </div>
      <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom: open ? 10 : 0 }}>
        {food.trimesters.map(t=>(
          <span key={t} style={{ fontSize:'0.7rem', fontWeight:600, padding:'2px 8px', borderRadius:'var(--radius-full)', background:'var(--amber-pale)', color:'var(--amber-deep)' }}>{tLabels[t]} Trim</span>
        ))}
      </div>
      {open && (
        <>
          <p style={{ fontSize:'0.8125rem', color:'var(--earth-mid)', lineHeight:1.65, marginBottom:10 }}>
            {food.explanation}
          </p>
          <div style={{ padding:'10px 12px', background:'white', borderRadius:10, border:`1px solid ${cfg.border}` }}>
            <p style={{ fontSize:'0.75rem', fontWeight:700, color:cfg.color, marginBottom:4, display:'flex', alignItems:'center', gap:6 }}>
              {food.safety==='safe' ? <Check size={13} color={cfg.color} strokeWidth="1.8" /> : <AlertTriangle size={13} color={cfg.color} strokeWidth="1.8" />}
              {food.safety==='safe'?'Nutritional benefit:':'Risk to note:'}
            </p>
            <p style={{ fontSize:'0.8125rem', color:'var(--ink)', lineHeight:1.55 }}>{food.benefit||food.risk}</p>
          </div>
        </>
      )}
    </div>
  );
}
