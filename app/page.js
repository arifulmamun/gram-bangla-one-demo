'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { saveLocalLead } from '../lib/leads';

const GREEN = '#0B5D2A';
const DARK_GREEN = '#0B3D1C';
const ORANGE = '#FF7A00';

export default function Home() {
  const [form, setForm] = useState({ name: '', mobile: '', district: 'Tangail', interest: 'Dealership' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const lead = { ...form, source: 'Website', status: 'New', created_at: new Date().toISOString() };
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('leads').insert([lead]);
      if (error) { setMsg('Supabase error: ' + error.message); return; }
    } else {
      saveLocalLead(lead);
    }
    setMsg('ধন্যবাদ ' + form.name + '! ২৪ ঘণ্টার মধ্যে কল করা হবে।');
    setForm({ name: '', mobile: '', district: 'Tangail', interest: 'Dealership' });
  };

  const scrollToForm = (interest) => {
    setForm((f) => ({ ...f, interest }));
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#F8F9F8', minHeight: '100vh', fontFamily: "'Poppins','Segoe UI',sans-serif" }}>
      <style>{`
        .container{max-width:1180px;margin:0 auto;padding:0 18px;}
        .navItem{cursor:pointer;color:#333;font-weight:500;transition:color .15s;}
        .navItem:hover{color:${ORANGE};}
        .pill{border:none;padding:11px 22px;border-radius:30px;font-weight:600;font-size:14px;cursor:pointer;transition:transform .15s,box-shadow .15s;}
        .pill:hover{transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.18);}
        .card{background:#fff;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,.08);overflow:hidden;transition:transform .15s,box-shadow .15s;}
        .card:hover{transform:translateY(-4px);box-shadow:0 12px 26px rgba(0,0,0,.12);}
        .serviceCard{width:100%;min-height:218px;padding:22px 20px;border:1px solid #e7eee8;text-align:left;display:flex;flex-direction:column;align-items:flex-start;color:inherit;font:inherit;cursor:pointer;}
        .serviceCard:hover{border-color:#b9d8bf;}
        .serviceCard:focus-visible{outline:3px solid rgba(255,122,0,.45);outline-offset:3px;}
        .serviceIcon{width:58px;height:58px;border-radius:18px;display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:18px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.04);}
        .serviceLink{margin-top:auto;padding-top:16px;font-size:12px;font-weight:700;color:${GREEN};}
        .chip{background:#E8F5E9;color:#2E7D32;padding:7px 12px;border-radius:20px;font-size:12.5px;font-weight:500;display:flex;align-items:center;gap:6px;}
        .branchCard{border:1px solid #eee;border-radius:10px;overflow:hidden;background:#fff;transition:transform .15s,box-shadow .15s;}
        .branchCard:hover{transform:translateY(-3px);box-shadow:0 8px 18px rgba(0,0,0,.10);}
        input,select{transition:border-color .15s,box-shadow .15s;}
        input:focus,select:focus{outline:none;border-color:${ORANGE}!important;box-shadow:0 0 0 3px rgba(255,122,0,.15);}
        @media(max-width:980px){
          .grid-3{grid-template-columns:1fr!important;}
          .grid-4{grid-template-columns:repeat(2,1fr)!important;}
          .grid-branches{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr 1fr!important;}
          .nav-links{display:none!important;}
        }
        @media(max-width:640px){
          .grid-4{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr!important;}
          .hero-title{font-size:30px!important;}
          .hero-sub{font-size:22px!important;}
          .hero-buttons{flex-direction:column!important;width:100%!important;}
          .hero-buttons button{width:100%!important;}
        }
      `}</style>

      {/* HEADER */}
      <header style={{ background: '#fff', padding: '12px 0', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div className='container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ background: GREEN, color: '#fff', padding: '8px 12px', borderRadius: 8, fontWeight: 'bold', fontSize: 20 }}>GB</div>
            <div>
              <b style={{ color: GREEN, fontSize: 22, display: 'block', lineHeight: 1 }}>Gram Bangla One</b>
              <span style={{ color: ORANGE, fontSize: 10, letterSpacing: 2, fontWeight: 'bold' }}>LIMITED</span>
            </div>
          </div>
          <nav className='nav-links' style={{ display: 'flex', gap: 18, alignItems: 'center', fontSize: 14 }}>
            <span className='navItem' style={{ color: ORANGE, fontWeight: 'bold' }}>Home</span>
            <span className='navItem'>Food Packages</span>
            <span className='navItem'>Dealership</span>
            <span className='navItem'>Amar Bazar</span>
            <span className='navItem'>Housing</span>
            <span className='navItem'>Cashback</span>
            <span className='navItem'>Contact</span>
            <Link href='/admin' style={{ border: `1px solid ${ORANGE}`, color: ORANGE, padding: '6px 14px', borderRadius: 6, textDecoration: 'none', fontWeight: 'bold' }}>👤 Login</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', color: '#fff', padding: '60px 0 70px 0', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/hero-bg.jpg")',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        {/* photographic + green gradient overlay to unify the image */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,61,28,0.85) 0%, rgba(46,125,50,0.55) 60%, rgba(11,93,42,0.80) 100%)' }} />
        <div className='container' style={{ position: 'relative', zIndex: 1 }}>
          <h1 className='hero-title' style={{ fontSize: 42, margin: 0, fontWeight: 800, textShadow: '2px 2px 6px rgba(0,0,0,0.5)' }}>Amader Gram Amader Gorbo</h1>
          <h2 className='hero-sub' style={{ fontSize: 28, margin: '8px 0 14px 0', fontWeight: 600, textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>Our Village Our Pride</h2>
          <p style={{ fontSize: 14, maxWidth: 760, margin: '0 auto 22px auto', lineHeight: 1.7, color: '#f1f1f1' }}>Connecting Bangladeshi villages with modern commerce, food products, dealership opportunities & cashback rewards — empowering rural communities nationwide.</p>
          <div className='hero-buttons' style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className='pill' onClick={() => scrollToForm('Dealership')} style={{ background: ORANGE, color: '#fff' }}>🤝 Dealership Nin</button>
            <button className='pill' onClick={() => scrollToForm('Cashback')} style={{ background: '#4CAF50', color: '#fff' }}>💰 Cashback Janun</button>
            <button className='pill' onClick={() => scrollToForm('Food Package')} style={{ background: '#fff', color: GREEN }}>💬 WhatsApp Korun</button>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
      <br></br>
      
      {/* SERVICE CARDS */}
      <div className='container' style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginTop: -36, position: 'relative', zIndex: 10 }}>
        {[
          { icon: '📦', title: 'Package Food Products', desc: 'Quality rice, oil, spices & essential goods at village-friendly prices', iconBg: '#E8F5E9', interest: 'Food Package' },
          { icon: '🏬', title: 'Shopping Mall Dealership', desc: 'Partner with us to establish modern shopping malls in your district', iconBg: '#FFF3E0', interest: 'Dealership' },
          { icon: '💰', title: 'Cashback Benefits', desc: 'Earn cashback on every purchase, reward programs for loyal customers', iconBg: '#E8F5E9', interest: 'Cashback' },
          { icon: '🛒', title: 'Amar Bazar Supershop', desc: 'One-stop retail hub for groceries, daily essentials & more', iconBg: '#FFF3E0', interest: 'Amar Bazar' },
        ].map(({ icon, title, desc, iconBg, interest }) => (
          <button key={title} type='button' className='card serviceCard' onClick={() => scrollToForm(interest)}>
            <span className='serviceIcon' style={{ background: iconBg }}>{icon}</span>
            <h3 style={{ margin: '0 0 8px 0', color: GREEN, fontSize: 16, fontWeight: 700, lineHeight: 1.35 }}>{title}</h3>
            <p style={{ fontSize: 12.5, color: '#666', lineHeight: 1.6, margin: 0 }}>{desc}</p>
            <span className='serviceLink'>Explore service <span aria-hidden='true'>→</span></span>
          </button>
        ))}
      </div>

      {/* MAIN 3-COLUMN */}
      <div className='container grid-3' style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: 20, marginTop: 32, marginBottom: 36, alignItems: 'start' }}>

        {/* LEFT - Dealership Opportunity */}
        <div style={{ background: '#F0FDF4', border: '1px solid #D1FAE5', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: GREEN, fontSize: 20, marginTop: 0, display: 'inline-block', borderBottom: `3px solid ${ORANGE}`, paddingBottom: 4 }}>Dealership Opportunity</h2>
          <p style={{ fontSize: 13, color: '#555', marginTop: 12, marginBottom: 14 }}>Become a Gram Bangla One dealer and grow your business locally</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className='chip'>✅ Low investment • High returns</span>
            <span className='chip'>✅ Full training & support provided</span>
            <span className='chip'>✅ Marketing & branding assistance</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 14, fontSize: 13, lineHeight: 1.9, color: '#333' }}>
            <li>• Exclusive district dealership rights</li>
            <li>• Regular & reliable product supply chain</li>
            <li>• Dedicated support team for dealers</li>
          </ul>
          <button onClick={() => scrollToForm('Dealership')} style={{ background: ORANGE, color: '#fff', border: 'none', width: '100%', padding: 12, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', marginTop: 8 }}>Apply today • Grow with Gram Bangla One</button>
        </div>

        {/* MIDDLE - Amar Bazar Branches */}
        <div className='card' style={{ padding: 20 }}>
          <h2 style={{ color: GREEN, fontSize: 20, marginTop: 0, textAlign: 'center' }}>Amar Bazar Branches</h2>
          <p style={{ textAlign: 'center', fontSize: 12.5, color: '#666', marginBottom: 16 }}>Our supershop branches serving communities across Bangladesh</p>
          <div className='grid-branches' style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[
              { name: 'Dhaka • Mirpur Branch', img: '/branch-mirpur.jpg', desc: 'Address: Mirpur-10, Dhaka • Open: 9AM - 10PM', badge: '120+ Products • 500+ Customers Daily' },
              { name: 'Chattogram • Agrabad Branch', img: '/branch-chattogram.jpg', desc: 'Address: Agrabad, Chattogram • Open: 9AM - 10PM', badge: 'Franchise Outlet • Parking Available' },
              { name: 'Sylhet • Zindabazar Branch', img: '/branch-sylhet.jpg', desc: 'Address: Zindabazar, Sylhet • Open: 9AM - 10PM', badge: 'New Branch • Fresh Goods' },
            ].map((b) => (
              <div key={b.name} className='branchCard'>
                <img src={b.img} alt={b.name} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: 10 }}>
                  <div style={{ fontWeight: 'bold', fontSize: 13, color: GREEN, lineHeight: 1.3 }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 5, lineHeight: 1.4 }}>{b.desc}</div>
                  <div style={{ fontSize: 10, background: '#E8F5E9', color: '#2E7D32', padding: '5px 6px', borderRadius: 4, marginTop: 8, textAlign: 'center', fontWeight: 600 }}>{b.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - Apply Form */}
        <div id='lead-form' className='card' style={{ padding: 20 }}>
          <h2 style={{ textAlign: 'center', color: GREEN, marginTop: 0, fontSize: 20 }}>Apply Now</h2>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#666', marginTop: -8, marginBottom: 14 }}>Fill the form & our team will contact you</p>
          <form onSubmit={submit}>
            <label style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='Enter your full name' style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, margin: '5px 0 12px 0', boxSizing: 'border-box' }} />
            <label style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>Mobile</label>
            <input required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder='+880 1XXX-XXXXXX' style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, margin: '5px 0 12px 0', boxSizing: 'border-box' }} />
            <label style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>District</label>
            <select value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, margin: '5px 0 12px 0', boxSizing: 'border-box' }}>
              {['Dhaka', 'Tangail', 'Gazipur', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur'].map((d) => <option key={d}>{d}</option>)}
            </select>
            <label style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>Interest</label>
            <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, margin: '5px 0 14px 0', boxSizing: 'border-box' }}>
              {['Dealership', 'Food Package', 'Amar Bazar', 'Housing', 'Cashback'].map((d) => <option key={d}>{d}</option>)}
            </select>
            <button style={{ background: ORANGE, color: '#fff', border: 'none', width: '100%', padding: 12, borderRadius: 8, fontWeight: 'bold', cursor: 'pointer' }}>Submit Application</button>
          </form>
          {msg && (
            <div style={{ background: '#D9F5E0', padding: 10, borderRadius: 8, marginTop: 12, fontSize: 13, textAlign: 'center' }}>
              {msg}<br /><Link href='/admin' style={{ color: GREEN, fontWeight: 'bold', textDecoration: 'none' }}>Dashboard এ দেখুন →</Link>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: DARK_GREEN, color: '#fff', padding: '28px 0 0 0' }}>
        <div className='container footer-grid' style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 0.8fr', gap: 24, paddingBottom: 22 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#2E7D32,#FDD835)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 16 }}>GB</div>
              <b style={{ fontSize: 18 }}>Gram Bangla One <span style={{ color: '#FDD835', fontSize: 10 }}>LIMITED</span></b>
            </div>
            <p style={{ fontSize: 12, color: '#bbb', lineHeight: 1.6, margin: 0 }}>Empowering rural Bangladesh through modern retail, food products, dealership & cashback solutions.</p>
          </div>
          <div>
            <h4 style={{ color: ORANGE, margin: '0 0 10px 0', fontSize: 15 }}>Contact Us</h4>
            <p style={{ fontSize: 12, color: '#ccc', lineHeight: 1.9, margin: 0 }}>📞 +880 1700-123456<br />✉ info@grambanglaone.com<br />📍 82 Motijheel C/A, Dhaka, Bangladesh</p>
          </div>
          <div>
            <h4 style={{ color: ORANGE, margin: '0 0 10px 0', fontSize: 15 }}>Quick Links</h4>
            <p style={{ fontSize: 12, color: '#ccc', lineHeight: 1.9, margin: 0 }}>About Us<br />Food Packages<br />Dealership Program<br />Privacy Policy<br />Terms & Conditions</p>
          </div>
          <div>
            <h4 style={{ color: '#FDD835', margin: '0 0 10px 0', fontSize: 15 }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: 8 }}>
              <span title='Facebook' style={{ background: ORANGE, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>f</span>
              <span title='Instagram' style={{ background: ORANGE, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>◎</span>
              <span title='YouTube' style={{ background: ORANGE, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>▶</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #1A5A2A', textAlign: 'center', fontSize: 11, color: '#aaa', padding: '12px 0' }}>© 2026 Gram Bangla One Limited. All Rights Reserved. | Proudly serving Bangladeshi communities</div>
      </footer>
    </div>
  );
}