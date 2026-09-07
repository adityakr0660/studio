import React, { useState, useEffect } from 'react';
import { getBookings, updateBookingStatus } from '../services/api';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappPopup, setWhatsappPopup] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppMessage = (booking, status) => {
    const formattedDate = booking.eventDate
      ? new Date(booking.eventDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      : 'Not specified';

    if (status === 'confirmed') {
      return `*BOOKING CONFIRMED*\n\n` +
        `Namaste *${booking.name}* ji,\n\n` +
        `Aapki booking *Hariom Studio* mein successfully confirm ho gayi hai.\n\n` +
        `---------------------------------------\n` +
        `*BOOKING DETAILS*\n` +
        `---------------------------------------\n` +
        `Event : ${booking.eventType || 'N/A'}\n` +
        `Date : ${formattedDate}\n` +
        `Location : ${booking.location || 'N/A'}\n` +
        `Status : CONFIRMED\n` +
        `---------------------------------------\n\n` +
        `Hum aapke khaas lamhon ko capture karne ke liye tayyaar hain.\n\n` +
        `Koi bhi sawal ho toh hume zaroor contact karein.\n\n` +
        `Dhanyavaad,\n` +
        `*Hariom Studio*\n` +
        `Professional Photography & Wedding Services`;
    } else if (status === 'cancelled') {
      return `*BOOKING CANCELLED*\n\n` +
        `Namaste *${booking.name}* ji,\n\n` +
        `Hume aapko yeh batate hue afsos ho raha hai ki aapki booking cancel kar di gayi hai.\n\n` +
        `---------------------------------------\n` +
        `*BOOKING DETAILS*\n` +
        `---------------------------------------\n` +
        `Event : ${booking.eventType || 'N/A'}\n` +
        `Date : ${formattedDate}\n` +
        `Status : CANCELLED\n` +
        `---------------------------------------\n\n` +
        `Agar aap dobara booking karna chahein toh hume contact karein.\n\n` +
        `Dhanyavaad,\n` +
        `*Hariom Studio*\n` +
        `Professional Photography & Wedding Services`;
    } else {
      return `*BOOKING UNDER REVIEW*\n\n` +
        `Namaste *${booking.name}* ji,\n\n` +
        `Aapki booking abhi review mein hai. Hum jaldi hi aapko update denge.\n\n` +
        `---------------------------------------\n` +
        `*BOOKING DETAILS*\n` +
        `---------------------------------------\n` +
        `Event : ${booking.eventType || 'N/A'}\n` +
        `Date : ${formattedDate}\n` +
        `Status : PENDING\n` +
        `---------------------------------------\n\n` +
        `Dhanyavaad,\n` +
        `*Hariom Studio*\n` +
        `Professional Photography & Wedding Services`;
    }
  };

  const getWhatsAppLink = (phone, message) => {
    // Remove spaces, dashes, brackets from phone number
    let cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
    // Add India country code if not present
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone;
    }
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const updateStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      const booking = bookings.find(b => b._id === id);
      setBookings(bookings.map(book => book._id === id ? { ...book, status } : book));
      
      // Show WhatsApp popup
      if (booking && booking.phone) {
        const message = getWhatsAppMessage(booking, status);
        const link = getWhatsAppLink(booking.phone, message);
        setWhatsappPopup({ booking, status, link });
      } else {
        alert(`✅ Booking status updated to: ${status}`);
      }
    } catch (e) {
      alert("Error updating status.");
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] text-stone-600">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gold-600/20 border-t-gold-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-800 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold-700 font-semibold font-mono">
              Management Portal
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mt-1">
              Studio Reservations
            </h1>
          </div>
          <span className="bg-white text-stone-800 border border-stone-200/80 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm">
            Total Bookings: {bookings.length}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200/80 p-12 text-center shadow-sm">
            <h2 className="text-base text-stone-600">No bookings recorded yet in the database.</h2>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-stone-200/80">
                <thead className="bg-stone-100/80 text-stone-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Date & Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Client Info</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Package</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Venue Location</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Client Notes</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-semibold text-stone-900">
                            {booking.eventDate ? new Date(booking.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Flexible'}
                          </span>
                          <span className="text-xs text-gold-700 font-medium">{booking.eventType || 'Celebration'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-stone-900">{booking.name}</span>
                          <span className="text-xs text-stone-600">{booking.phone}</span>
                          <span className="text-xs text-stone-400">{booking.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                          {booking.service?.title || 'Custom Session'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-stone-700 max-w-xs truncate" title={booking.location}>
                          {booking.location || 'Studio / Majhaulia'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-stone-600 max-w-xs break-words">
                          {booking.message ? `"${booking.message}"` : '-'}
                          {booking.weddingDate && (
                            <div className="text-xs text-gold-700 font-medium mt-1">
                              Wedding Date: {new Date(booking.weddingDate).toLocaleDateString()}
                            </div>
                          )}
                          {booking.cardStyle && (
                            <div className="text-xs text-gold-700 font-medium mt-1">
                              Design: {booking.cardStyle}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          className={`text-xs rounded-lg font-semibold px-3 py-1.5 border transition-colors focus:outline-none focus:ring-1 focus:ring-gold-500 ${
                            booking.status === 'pending' 
                              ? 'bg-amber-50 text-amber-800 border-amber-200' 
                              : booking.status === 'confirmed' 
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                          defaultValue={booking.status}
                          onChange={(e) => updateStatus(booking._id, e.target.value)}
                        >
                          <option value="pending" className="bg-white text-amber-800">Pending</option>
                          <option value="confirmed" className="bg-white text-emerald-800">Confirmed</option>
                          <option value="cancelled" className="bg-white text-rose-800">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={getWhatsAppLink(booking.phone, getWhatsAppMessage(booking, booking.status))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors shadow-sm"
                          title="Notify on WhatsApp"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Popup */}
      {whatsappPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-md w-full p-8 text-center shadow-2xl">
            <div className="text-5xl mb-4">
              {whatsappPopup.status === 'confirmed' ? '✨' : whatsappPopup.status === 'cancelled' ? '⚠️' : '⏳'}
            </div>
            <h3 className="text-lg font-heading font-bold text-stone-900 mb-2">
              Status Updated: <span className={`${
                whatsappPopup.status === 'confirmed' ? 'text-emerald-600' : 
                whatsappPopup.status === 'cancelled' ? 'text-rose-600' : 'text-amber-600'
              }`}>{whatsappPopup.status.toUpperCase()}</span>
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Send an instant notification to <strong className="text-stone-900">{whatsappPopup.booking.name}</strong> via WhatsApp?
            </p>
            <div className="flex gap-3 justify-center">
              <a
                href={whatsappPopup.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setWhatsappPopup(null)}
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-3 px-5 rounded-xl transition-all shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send on WhatsApp
              </a>
              <button
                onClick={() => setWhatsappPopup(null)}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs py-3 px-5 rounded-xl transition-colors border border-stone-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
