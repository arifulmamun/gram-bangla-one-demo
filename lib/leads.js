// Demo fallback: localStorage when Supabase not configured
export const SAMPLE_LEADS = [
  {id:1, name:'Rahim Uddin', mobile:'+8801712-456789', district:'Tangail', interest:'Dealership', source:'Facebook Ads', status:'New', created_at: new Date().toISOString()},
  {id:2, name:'Kamal Hossain', mobile:'+8801865-223344', district:'Dhaka', interest:'Food Package', source:'Website', status:'Called', created_at: new Date().toISOString()},
  {id:3, name:'Fatima Akter', mobile:'+8801922-778899', district:'Chattogram', interest:'Dealership', source:'Facebook Ads', status:'Confirmed', created_at: new Date().toISOString()},
];
export function getLocalLeads(){ if(typeof window==='undefined') return SAMPLE_LEADS; try{ const v=JSON.parse(localStorage.getItem('gbo_leads')||'null'); if(v) return v; localStorage.setItem('gbo_leads', JSON.stringify(SAMPLE_LEADS)); return SAMPLE_LEADS;}catch{return SAMPLE_LEADS} }
export function saveLocalLead(lead){ const all=getLocalLeads(); const next=[{...lead, id: Date.now()}, ...all]; localStorage.setItem('gbo_leads', JSON.stringify(next)); return next; }
export function updateLocalLead(id, status){ const all=getLocalLeads().map(l=>l.id===id?{...l,status}:l); localStorage.setItem('gbo_leads', JSON.stringify(all)); return all; }
