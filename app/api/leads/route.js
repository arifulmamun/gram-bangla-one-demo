import { NextResponse } from 'next/server';
// Optional API route - frontend already inserts directly to Supabase.
// Keep for future WhatsApp / Email notification webhook.
export async function POST(req){ const body=await req.json(); console.log('New Lead', body); return NextResponse.json({ok:true, lead:body}); }
