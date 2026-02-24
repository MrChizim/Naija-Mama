import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const HERO_IMG = 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1400&q=80&auto=format&fit=crop';
const COMMUNITY_IMG = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop';

const PLANS = [
  {
    name:'Free', price:'₦0', period:'forever', icon:'leaf', highlighted:false, cta:'Get Started Free',
    color: 'var(--earth-mid)',
    features:['Browse all articles','Access food guide','Read community posts','Basic week tracker','Hospital directory access'],
  },
  {
    name:'Mama Premium', price:'₦2,500', priceYear:'₦20,000', period:'/month', periodYear:'/year', icon:'heart', highlighted:true, badge:'Most Popular', cta:'Join Premium Today',
    color: 'var(--crimson)',
    features:['Everything in Free','Personalized week-by-week plan','Full Nigerian meal plans + shopping lists','Join trimester community groups','Post in community & ask questions','Download all checklists','Ad-free experience','Hospital bag checklist PDF'],
  },
  {
    name:'VIP Mama', price:'₦5,000', priceYear:'₦45,000', period:'/month', periodYear:'/year', icon:'crown', highlighted:false, cta:'Go VIP',
    color: 'var(--amber-deep)',
    features:['Everything in Premium','Monthly live Q&A with Nigerian OB-GYN','Private VIP community group','Ask-a-midwife (48hr responses)','Exclusive partner discounts','Early access to new content','Full birth plan + postpartum guide'],
  },
];

const FAQS = [
  { q:'Is my payment secure?', a:'Yes. All payments are processed through Paystack, Nigeria\'s leading payment processor with bank-grade encryption.' },
  { q:'Can I cancel anytime?', a:'Absolutely. Cancel from your account settings at any time. No cancellation fees — you keep access until end of billing period.' },
  { q:'Is this available outside Nigeria?', a:'Yes. We have members in the UK, USA, Canada, and Europe. All content is written for Nigerian women wherever you are.' },
  { q:'Do you accept bank transfer?', a:'Yes. We accept bank transfer, card payments, USSD, and mobile money. Account activated within 24 hours of confirmed payment.' },
  { q:'What currency do diaspora members pay in?', a:'Diaspora members can pay in USD, GBP, EUR, or CAD — converted from Naira at current rate via Paystack international.' },
];

const TESTIMONIALS = [
  { name:'Amara O.', city:'Lagos', week:'32 weeks', text:'The Nigerian meal plans alone are worth it. I finally know what to eat and what to avoid at every stage.' },
  { name:'Fatima K.', city:'Abuja', week:'New mama', text:'I used NaijaMama all through my pregnancy. The community kept me sane on the tough days. Worth every naira.' },
  { name:'Chisom E.', city:'Port Harcourt', week:'18 weeks', text:'My doctor was impressed I knew so much at my antenatal visits. It all came from the week tracker.' },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="page-wrap" style={{ paddingTop:72, background:'var(--white)', minHeight:'100vh' }}>

      {/* ── Hero ── */}
      <section style={{ position:'relative', minHeight:'clamp(500px,65vh,700px)', display:'flex', alignItems:'center', overflow:'hidden' }}>
        <img src={HERO_IMG} alt="Nigerian mama" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 25%' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(110deg, rgba(17,24,39,0.92) 0%, rgba(17,24,39,0.7) 55%, rgba(17,24,39,0.3) 100%)' }}/>

        <div style={{ position:'relative', zIndex:1, maxWidth:1240, margin:'0 auto', width:'100%', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,80px)', alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(217,43,58,0.9)', color:'white', padding:'6px 16px', borderRadius:'var(--radius-full)', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:24 }}>
              <Icon name="heart" size={13} color="white" />
              Join 14,000+ Nigerian Mamas
            </div>
            <h1 className="display-xl" style={{ color:'white', marginBottom:20, lineHeight:1.05 }}>
              Your pregnancy,<br/>your way — the<br/><span style={{ color:'var(--amber)' }}>Nigerian way</span>
            </h1>
            <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'1.0625rem', lineHeight:1.75, marginBottom:36, maxWidth:440 }}>
              Guidance that actually fits your life, your kitchen, and your culture. Start free. Upgrade when you're ready.
            </p>
            {/* Billing toggle */}
            <div style={{ display:'inline-flex', alignItems:'center', background:'rgba(255,255,255,0.12)', borderRadius:'var(--radius-full)', padding:4, gap:0, backdropFilter:'blur(8px)' }}>
              <button onClick={()=>setYearly(false)} style={{ background: !yearly?'white':'transparent', color: !yearly?'var(--crimson)':'rgba(255,255,255,0.7)', padding:'10px 24px', borderRadius:'var(--radius-full)', fontFamily:'var(--font-sans)', fontWeight:600, fontSize:'0.875rem', border:'none', cursor:'pointer', transition:'all var(--dur-mid)' }}>Monthly</button>
              <button onClick={()=>setYearly(true)} style={{ background: yearly?'white':'transparent', color: yearly?'var(--crimson)':'rgba(255,255,255,0.7)', padding:'10px 24px', borderRadius:'var(--radius-full)', fontFamily:'var(--font-sans)', fontWeight:600, fontSize:'0.875rem', border:'none', cursor:'pointer', transition:'all var(--dur-mid)', display:'flex', alignItems:'center', gap:6 }}>
                Yearly
                <span style={{ background:'var(--amber)', color:'white', fontSize:'0.65rem', fontWeight:800, padding:'2px 7px', borderRadius:8 }}>SAVE 33%</span>
              </button>
            </div>
            {yearly && <p style={{ marginTop:12, fontSize:'0.875rem', color:'var(--amber)', fontWeight:600 }}>4 months free with annual billing</p>}
          </div>

          {/* Right — floating preview card */}
          <div className="hide-mobile animate-float" style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:24, padding:'28px 24px' }}>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.6875rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:16 }}>What you unlock with Premium</p>
            {['Personalized week-by-week plan','Full Nigerian meal plans','Trimester community groups','Hospital bag checklist PDF','Ad-free experience'].map((item, i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background:'var(--crimson)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon name="check" size={11} color="white" />
                </div>
                <span style={{ fontSize:'0.875rem', color:'rgba(255,255,255,0.85)', fontWeight:500 }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop:20, padding:'14px', background:'var(--crimson)', borderRadius:14, textAlign:'center' }}>
              <p style={{ color:'white', fontWeight:700, fontSize:'0.875rem' }}>From ₦2,500/month</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section style={{ background:'var(--cream)', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <p className="eyebrow" style={{ marginBottom:14 }}>Simple, honest pricing</p>
            <h2 className="display-md">Choose your plan</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, alignItems:'stretch' }}>
            {PLANS.map(plan => {
              const price = yearly && plan.priceYear ? plan.priceYear : plan.price;
              const period = yearly && plan.periodYear ? plan.periodYear : plan.period;
              return (
                <div key={plan.name} style={{
                  background:'var(--white)',
                  borderRadius:24,
                  padding:'36px 28px',
                  border: plan.highlighted ? '2px solid var(--crimson)' : '1.5px solid var(--earth-pale)',
                  boxShadow: plan.highlighted ? '0 20px 60px rgba(217,43,58,0.18)' : 'var(--shadow-sm)',
                  transform: plan.highlighted ? 'scale(1.04)' : 'scale(1)',
                  position:'relative',
                  display:'flex', flexDirection:'column',
                  transition:'all var(--dur-mid)',
                }}>
                  {plan.badge && (
                    <div style={{ position:'absolute', top:-16, left:'50%', transform:'translateX(-50%)', background:'var(--crimson)', color:'white', padding:'6px 20px', borderRadius:'var(--radius-full)', fontSize:'0.8125rem', fontWeight:700, whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:6 }}>
                      <Icon name="star" size={12} color="white" />
                      {plan.badge}
                    </div>
                  )}

                  <div style={{ width:48, height:48, borderRadius:14, background: plan.highlighted ? 'var(--crimson-pale)' : 'var(--cream-dark)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18 }}>
                    <Icon name={plan.icon} size={24} color={plan.color} />
                  </div>

                  <h3 style={{ fontFamily:'var(--font-sans)', fontSize:'1.1rem', fontWeight:700, marginBottom:6, color:'var(--ink)' }}>{plan.name}</h3>
                  <div style={{ marginBottom:24 }}>
                    <span style={{ fontFamily:'var(--font-sans)', fontSize:'2.4rem', fontWeight:800, color: plan.highlighted ? 'var(--crimson)' : 'var(--ink)', lineHeight:1 }}>{price}</span>
                    <span style={{ fontSize:'0.875rem', color:'var(--earth-light)', marginLeft:4 }}>{period}</span>
                  </div>

                  <ul style={{ listStyle:'none', flex:1, marginBottom:28, display:'flex', flexDirection:'column', gap:10 }}>
                    {plan.features.map((f,i)=>(
                      <li key={i} style={{ fontSize:'0.875rem', color:'var(--ink-soft)', lineHeight:1.5, display:'flex', gap:10, alignItems:'flex-start' }}>
                        <span style={{ flexShrink:0, marginTop:1 }}><Icon name="check" size={14} color={plan.highlighted ? 'var(--crimson)' : 'var(--earth-mid)'} /></span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`} style={{ width:'100%', padding:'14px' }}>{plan.cta}</button>
                </div>
              );
            })}
          </div>

          {/* Trust badges */}
          <div style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap', marginTop:40, padding:'20px 24px', background:'var(--white)', borderRadius:16, boxShadow:'var(--shadow-sm)', border:'1px solid var(--earth-pale)' }}>
            {[['shield','Secure via Paystack'],['refresh','Cancel Anytime'],['globe','Worldwide Access'],['bank','Bank Transfer OK']].map(([i,l])=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <Icon name={i} size={16} color="var(--crimson)" />
                <span style={{ fontSize:'0.8125rem', fontWeight:500, color:'var(--earth-mid)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ position:'relative', overflow:'hidden', minHeight:500, display:'flex', alignItems:'center' }}>
        <img src={COMMUNITY_IMG} alt="Nigerian mamas community" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>
        <div style={{ position:'absolute', inset:0, background:'rgba(17,24,39,0.85)' }}/>
        <div style={{ position:'relative', zIndex:1, maxWidth:1240, margin:'0 auto', width:'100%', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p className="eyebrow" style={{ color:'rgba(240,108,53,0.9)', marginBottom:14 }}>Mama voices</p>
            <h2 className="display-md" style={{ color:'white' }}>What Nigerian mamas are saying</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:20 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, padding:'24px' }}>
                <div style={{ display:'flex', gap:4, marginBottom:14 }}>
                  {[1,2,3,4,5].map(s=><span key={s} style={{ color:'var(--amber)', fontSize:14 }}>★</span>)}
                </div>
                <p style={{ fontSize:'0.9375rem', color:'rgba(255,255,255,0.85)', lineHeight:1.7, marginBottom:20, fontStyle:'italic' }}>"{t.text}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:'50%', background:'var(--crimson)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ color:'white', fontWeight:700, fontSize:'1rem' }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight:700, color:'white', fontSize:'0.875rem' }}>{t.name}</p>
                    <p style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>{t.city} · {t.week}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background:'var(--white)', padding:'clamp(60px,8vw,100px) clamp(16px,4vw,48px)' }}>
        <div style={{ maxWidth:720, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p className="eyebrow" style={{ marginBottom:14 }}>Got questions?</p>
            <h2 className="display-md">Frequently Asked Questions</h2>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {FAQS.map((faq,i)=>(
              <div key={i} style={{ borderRadius:16, border:'1.5px solid var(--earth-pale)', overflow:'hidden', boxShadow:'var(--shadow-sm)' }}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:'100%', padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', textAlign:'left', background: openFaq===i ? 'var(--crimson-pale)' : 'var(--white)', border:'none', cursor:'pointer', transition:'background var(--dur-mid)' }}>
                  <span style={{ fontFamily:'var(--font-sans)', fontSize:'0.9375rem', fontWeight:600, color:'var(--ink)', paddingRight:16 }}>{faq.q}</span>
                  <span style={{ width:28, height:28, borderRadius:'50%', background: openFaq===i ? 'var(--crimson)' : 'var(--cream-dark)', color: openFaq===i ? 'white' : 'var(--crimson)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontWeight:700, fontSize:18, transition:'all var(--dur-mid)' }}>
                    {openFaq===i ? '−' : '+'}
                  </span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:'4px 24px 20px', background:'var(--crimson-pale)' }}>
                    <p style={{ fontSize:'0.875rem', color:'var(--ink-soft)', lineHeight:1.8 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background:'var(--ink)', padding:'clamp(80px,10vw,120px) clamp(16px,4vw,48px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:800, height:400, background:'radial-gradient(ellipse, rgba(217,43,58,0.2) 0%, transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:580, margin:'0 auto', position:'relative', zIndex:1 }}>
          <img src="/Mama.png?v=4" alt="" style={{ height:68, margin:'0 auto 24px', filter:'brightness(0) invert(1)', opacity:0.7 }}/>
          <h2 className="display-lg" style={{ color:'white', marginBottom:16 }}>Your village is waiting</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'1rem', lineHeight:1.8, marginBottom:32 }}>
            Join 14,000+ Nigerian mamas getting the guidance, food advice, and community support they deserve. Start free — upgrade whenever you're ready.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/join" className="btn btn-amber btn-lg">Join Free Today</Link>
            <Link to="/community" className="btn btn-ghost btn-lg">Explore Community</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media(max-width:860px){ .pricing-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
