import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://promboyujvfouuqikmzd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByb21ib3l1anZmb3V1cWlrbXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NDc3NTQsImV4cCI6MjA4OTIyMzc1NH0.7amPxL_zrqOW_g0qeVilqg-nOkjJt19LHRrU0v2JSQQ';

export const supabase = createClient(supabaseUrl, supabaseKey);

const mapResponse = (data) => {
  if (!data) return [];
  return data.map(item => ({ ...item, _id: item.id }));
};

// Services API
export const getServices = async () => {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return { data: mapResponse(data) };
};

export const getService = async (id) => {
  const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
  if (error) throw error;
  return { data: { ...data, _id: data.id } };
};

export const createService = async (service) => {
  const { data, error } = await supabase.from('services').insert([service]).select();
  if (error) throw error;
  return { data: mapResponse(data)[0] };
};

// Bookings API
export const createBooking = async (booking) => {
  const payload = {
    service_id: booking.service || null,
    event_type: booking.eventType,
    event_date: booking.eventDate,
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    location: booking.location,
    message: booking.message,
    wedding_date: booking.weddingDate || null,
    invitation_deadline: booking.invitationDeadline || null,
    card_style: booking.cardStyle || null,
    status: 'pending'
  };
  
  if (!payload.service_id) delete payload.service_id;
  if (!payload.wedding_date) delete payload.wedding_date;
  if (!payload.invitation_deadline) delete payload.invitation_deadline;
  
  const { data, error } = await supabase.from('bookings').insert([payload]).select();
  if (error) throw error;
  return { data };
};

export const getBookings = async () => {
  const { data, error } = await supabase.from('bookings').select(`
    *,
    service:services(id, title)
  `).order('created_at', { ascending: false });
  
  if (error) throw error;
  
  const mapped = data.map(b => ({
    _id: b.id,
    eventType: b.event_type,
    eventDate: b.event_date,
    name: b.name,
    phone: b.phone,
    email: b.email,
    location: b.location,
    message: b.message,
    weddingDate: b.wedding_date,
    invitationDeadline: b.invitation_deadline,
    cardStyle: b.card_style,
    status: b.status,
    service: Array.isArray(b.service) ? b.service[0] : b.service 
  }));
  return { data: mapped };
};

export const updateBookingStatus = async (id, status) => {
  const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select();
  if (error) throw error;
  return { data };
};

// Portfolio API
export const getPortfolio = async () => {
  const { data, error } = await supabase.from('portfolio').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return { data: mapResponse(data) };
};

export const createPortfolioItem = async (item) => {
  const { data, error } = await supabase.from('portfolio').insert([item]).select();
  if (error) throw error;
  return { data: mapResponse(data)[0] };
};

export default supabase;