'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { getLocalLeads, updateLocalLead } from '../../lib/leads';

export default function Admin(){
  const [leads,setLeads]=useState([]);
  const [filter,setFilter]=useState('All');
  const [search, setSearch] = useState('');

  const load=async()=>{
    if(isSupabaseConfigured){
      const {data}=await supabase.from('leads').select('*').order('created_at',{ascending:false});
      setLeads(data||[]);
    } else setLeads(getLocalLeads());
  };
  
  useEffect(()=>{load()},[]);

  const changeStatus=async(id,status)=>{
    if(isSupabaseConfigured){ await supabase.from('leads').update({status}).eq('id',id); load(); }
    else setLeads(updateLocalLead(id,status));
  };

  // ফিল্টার এবং সার্চ লজিক
  const filtered = leads
    .filter(l => filter === 'All' || l.interest === filter)
    .filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.mobile.includes(search));

  const count=(s)=>leads.filter(l=>l.status===s).length;

  return(
    <div style={{display:'flex', minHeight:'100vh', background:'#F4F6F5', fontFamily:'system-ui, sans-serif'}}>
      
      {/* ================= SIDEBAR ================= */}
      <aside style={{width:240, background:'#0B3D1C', color:'#fff', display:'flex', flexDirection:'column'}}>
        <div style={{padding:'20px', fontSize:20, fontWeight:'bold', borderBottom:'1px solid #1A5A2A', display:'flex', alignItems:'center', gap:10}}>
          <div style={{background:'#E67E22', padding:5, borderRadius:8}}>🌿</div> GBO
        </div>
        <div style={{padding:'20px 10px', display:'flex', flexDirection:'column', gap:5}}>
          <div style={{background:'#E67E22', padding:'12px 15px', borderRadius:8, fontWeight:'bold', cursor:'pointer'}}>📊 Dashboard</div>
          <div style={{cursor:'pointer', padding:'12px 15px', color:'#ccc'}}>👥 All Leads</div>
          <div style={{cursor:'pointer', padding:'12px 15px', color:'#ccc'}}>🤝 Dealership Leads</div>
          <div style={{cursor:'pointer', padding:'12px 15px', color:'#ccc'}}>📦 Food Package Leads</div>
          <div style={{cursor:'pointer', padding:'12px 15px', color:'#ccc'}}>🛒 Amar Bazar</div>
          <div style={{cursor:'pointer', padding:'12px 15px', color:'#ccc', marginTop:20}}>⚙️ Settings</div>
        </div>
        <div style={{marginTop:'auto', padding:'20px'}}>
          <Link href='/' style={{color:'#ccc', textDecoration:'none', fontSize:14}}>← Logout</Link>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main style={{flex:1, display:'flex', flexDirection:'column', height: '100vh', overflow: 'hidden'}}>
        
        {/* TOP NAVBAR */}
        <header style={{background:'#fff', padding:'15px 30px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #ddd', flexShrink: 0}}>
          <h2 style={{margin:0, color:'#333', fontSize: 22}}>Dashboard</h2>
          <div style={{display:'flex', alignItems:'center', gap:20}}>
             <div style={{position: 'relative'}}>
               <input 
                  type="text" 
                  placeholder="Search leads, customers..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{padding:'10px 15px', borderRadius:8, border:'1px solid #ddd', width:300, outline:'none', background:'#f9f9f9', margin: 0}} 
                />
             </div>
             <div style={{display:'flex', alignItems:'center', gap:10}}>
                <div style={{background:'#0B5D2A', color:'#fff', width:40, height:40, borderRadius:'50%', display:'flex', justifyContent:'center', alignItems:'center', fontWeight:'bold'}}>AD</div>
                <div><div style={{fontSize:14, fontWeight:'bold'}}>Admin</div><div style={{fontSize:12, color:'#888'}}>Administrator</div></div>
                <div style={{fontSize: 20, cursor: 'pointer', position: 'relative'}}>
                  🔔
                  <span style={{position: 'absolute', top: 0, right: 0, background: '#E67E22', width: 10, height: 10, borderRadius: '50%'}}></span>
                </div>
             </div>
          </div>
        </header>

        {/* DASHBOARD BODY (Scrollable) */}
        <div style={{padding:'30px', overflowY: 'auto', display: 'flex', gap: 20}}>
          
          {/* LEFT COLUMN (Cards + Table) */}
          <div style={{flex: 1, minWidth: 0}}>
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
              <h2 style={{margin: 0, color:'#333'}}>Dashboard</h2>
              <span style={{background:'#fff', padding:'5px 12px', borderRadius:20, fontSize:13, border:'1px solid #ddd'}}>🗓️ Today • {new Date().toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
            </div>

            {/* KPI CARDS */}
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:15, marginBottom: 24}}>
              <div className='card' style={{padding: 20, borderLeft:'4px solid #2ECC71'}}>
                <div style={{fontSize:13, color:'#666', marginBottom:10, display:'flex', justifyContent:'space-between'}}>📈 Total Leads <span style={{background:'#E8F5E9', color:'green', padding:'2px 6px', borderRadius:4, fontSize:10}}>↑</span></div>
                <h2 style={{margin:0, fontSize:32, color:'#111'}}>{leads.length}</h2>
              </div>
              <div className='card' style={{padding: 20, borderLeft:'4px solid #E67E22'}}>
                <div style={{fontSize:13, color:'#666', marginBottom:10, display:'flex', justifyContent:'space-between'}}>🆕 New Leads <span style={{background:'#FFF3E0', color:'#E65100', padding:'2px 6px', borderRadius:4, fontSize:10}}>↑</span></div>
                <h2 style={{margin:0, fontSize:32, color:'#111'}}>{count('New')}</h2>
              </div>
              <div className='card' style={{padding: 20, borderLeft:'4px solid #3498DB'}}>
                <div style={{fontSize:13, color:'#666', marginBottom:10}}>📞 Called</div>
                <h2 style={{margin:0, fontSize:32, color:'#111'}}>{count('Called')}</h2>
              </div>
              <div className='card' style={{padding: 20, borderLeft:'4px solid #27AE60'}}>
                <div style={{fontSize:13, color:'#666', marginBottom:10}}>✅ Confirmed</div>
                <h2 style={{margin:0, fontSize:32, color:'#111'}}>{count('Confirmed')}</h2>
              </div>
            </div>

            {/* TABLE SECTION */}
            <div className='card' style={{padding: 0, overflow: 'hidden'}}>
              <div style={{padding:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid #eee'}}>
                  <h3 style={{margin:0, fontSize: 18}}>Recent Leads</h3>
                  <div style={{display: 'flex', gap: 10}}>
                    <select value={filter} onChange={e=>setFilter(e.target.value)} style={{padding:'8px 12px', borderRadius:6, border:'1px solid #ccc', width: 150, margin: 0}}>
                      <option>All</option><option>Dealership</option><option>Food Package</option><option>Amar Bazar</option><option>Housing</option><option>Cashback</option>
                    </select>
                    <button onClick={load} className="btn btn-orange" style={{padding:'8px 16px', fontSize: 14}}>+ Add Lead</button>
                  </div>
              </div>

              <div style={{overflowX: 'auto'}}>
                <table style={{margin: 0}}>
                  <thead>
                    <tr style={{background:'#f9f9f9', borderBottom:'1px solid #eee'}}>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>District</th>
                      <th>Interest</th>
                      <th>Source</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(l=>(
                      <tr key={l.id}>
                        <td style={{fontWeight:'600', color:'#333'}}>{l.name}</td>
                        <td>{l.mobile}</td>
                        <td>{l.district}</td>
                        <td>{l.interest}</td>
                        <td><span style={{background:'#E3F2FD', color:'#1565C0', padding:'4px 8px', borderRadius:4, fontSize:12}}>🌐 {l.source}</span></td>
                        <td><span className={'badge '+l.status}>{l.status}</span></td>
                        <td>
                          <select value={l.status} onChange={e=>changeStatus(l.id,e.target.value)} style={{padding:'6px', borderRadius:6, border:'1px solid #ccc', margin:0, fontSize: 12, width: 100}}>
                            <option>New</option><option>Called</option><option>Confirmed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length===0 && <p style={{textAlign:'center', padding:30, color:'#888'}}>No leads found.</p>}
              </div>
            </div>
            
            <p style={{fontSize:12, marginTop:20, color:'#888', textAlign:'center'}}>Mode: {isSupabaseConfigured?'Supabase Live 🟢':'Local Demo (localStorage) 🟡'}</p>
          </div>

          {/* RIGHT COLUMN (Chart + WhatsApp) */}
          <div style={{width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 20}}>
            
            {/* CHART */}
            <div className='card' style={{padding: 20}}>
              <h3 style={{margin:'0 0 20px 0', fontSize:16}}>Lead by District</h3>
              <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 150, paddingBottom: 20, borderBottom: '1px solid #eee'}}>
                 {/* Hardcoded chart bars for demo UI */}
                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: '20%'}}>
                    <span style={{fontSize: 12, fontWeight: 'bold'}}>7</span>
                    <div style={{background: '#2ECC71', width: '100%', height: 100, borderRadius: '4px 4px 0 0'}}></div>
                    <span style={{fontSize: 11, color: '#666'}}>Tangail</span>
                 </div>
                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: '20%'}}>
                    <span style={{fontSize: 12, fontWeight: 'bold'}}>5</span>
                    <div style={{background: '#E67E22', width: '100%', height: 70, borderRadius: '4px 4px 0 0'}}></div>
                    <span style={{fontSize: 11, color: '#666'}}>Dhaka</span>
                 </div>
                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: '20%'}}>
                    <span style={{fontSize: 12, fontWeight: 'bold'}}>4</span>
                    <div style={{background: '#2ECC71', width: '100%', height: 50, borderRadius: '4px 4px 0 0'}}></div>
                    <span style={{fontSize: 11, color: '#666'}}>Ctg</span>
                 </div>
                 <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: '20%'}}>
                    <span style={{fontSize: 12, fontWeight: 'bold'}}>3</span>
                    <div style={{background: '#E67E22', width: '100%', height: 35, borderRadius: '4px 4px 0 0'}}></div>
                    <span style={{fontSize: 11, color: '#666'}}>Sylhet</span>
                 </div>
              </div>
              <p style={{fontSize: 12, color: '#888', margin: '10px 0 0 0'}}>Last 7 days</p>
            </div>

            {/* WHATSAPP NOTIFICATION PREVIEW */}
            <div className='card' style={{padding: 20, background: '#E7F8ED', border: '1px solid #C2EBD0'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15}}>
                <div style={{background: '#25D366', color: '#fff', padding: 8, borderRadius: '50%'}}>💬</div>
                <div style={{fontWeight: 'bold', color: '#0B5D2A'}}>WhatsApp Notification Preview</div>
              </div>
              <div style={{background: '#fff', padding: 15, borderRadius: 8, borderLeft: '4px solid #25D366', fontSize: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                 <div style={{fontWeight: 'bold', marginBottom: 5}}>WhatsApp Business</div>
                 <div style={{color: '#666', fontSize: 12, marginBottom: 10}}>Just now • 10:32 AM</div>
                 <div style={{background: '#f0f0f0', padding: 10, borderRadius: 8, color: '#333'}}>
                   🔔 <b>New lead received!</b><br/>
                   {leads[0]?.name || 'Rahim Uddin'} just submitted a {leads[0]?.interest || 'Dealership'} request from {leads[0]?.district || 'Tangail'}.<br/>
                   Contact: {leads[0]?.mobile || '+880 1712-XXXXXX'}
                 </div>
                 <button className="btn btn-green" style={{width: '100%', marginTop: 10, padding: '10px', fontSize: 14}}>Open in WhatsApp</button>
              </div>
              <p style={{fontSize: 11, color: '#666', textAlign: 'center', marginTop: 10, marginBottom: 0}}>Auto-message sent to sales team</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}