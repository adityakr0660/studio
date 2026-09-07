import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createBooking, getServices } from '../services/api';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const BookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    service: state?.selectedService || '',
    eventType: '',
    eventDate: '',
    name: '',
    phone: '',
    email: '',
    location: '',
    message: '',
    weddingDate: '',
    invitationDeadline: '',
    cardStyle: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      if (response.data && response.data.length > 0) {
        setServices(response.data);
      } else {
        setServices([
          { _id: '1', title: 'Royal Wedding Coverage' },
          { _id: '2', title: 'Cinematic Pre-Wedding' },
          { _id: '3', title: 'Digital Wedding Invitations' },
          { _id: '4', title: 'Portraits & Family Heritage' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([
        { _id: '1', title: 'Royal Wedding Coverage' },
        { _id: '2', title: 'Cinematic Pre-Wedding' },
        { _id: '3', title: 'Digital Wedding Invitations' },
        { _id: '4', title: 'Portraits & Family Heritage' }
      ]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await createBooking(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Unable to submit booking. Please check details and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center space-y-4 max-w-xl mx-auto border border-gold-600/30 shadow-lg">
        <CheckCircle2 className="w-16 h-16 text-gold-600 mx-auto" />
        <h2 className="text-2xl font-bold text-stone-900">Inquiry Submitted Successfully</h2>
        <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
          Thank you for reaching out to Hariom Studio. Our team will review date availability and contact you promptly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-amber-200/70 shadow-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Desired Service *
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
          >
            <option value="" className="bg-white text-stone-500">Select photography service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id} className="bg-white text-stone-900">
                {service.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Event Category *
          </label>
          <input
            type="text"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            placeholder="e.g. Wedding Ceremony, Pre-Wedding"
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Event Date *
          </label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors [color-scheme:light]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Your Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 9931482128"
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Event Location & Venue *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Venue name, City, State"
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
          />
        </div>

        {formData.service && services.find(s => s._id === formData.service)?.title?.includes('Invitation') && (
          <div className="md:col-span-2 p-5 bg-stone-50 rounded-xl border border-gold-600/30 space-y-4">
            <div className="text-xs uppercase tracking-widest text-gold-700 font-mono font-semibold">
              Digital Invitation Specifications
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-stone-700 mb-1">Target Delivery Date *</label>
                <input
                  type="date"
                  name="invitationDeadline"
                  value={formData.invitationDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 text-sm [color-scheme:light]"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-700 mb-1">Aesthetic Preference</label>
                <select
                  name="cardStyle"
                  value={formData.cardStyle}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-stone-900 text-sm"
                >
                  <option value="">Select style</option>
                  <option value="Traditional">Royal Traditional</option>
                  <option value="Modern">Minimalist Editorial</option>
                  <option value="Animated">Cinematic Animated</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
            Celebration Vision & Notes
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about ceremonies planned, guest size, or any specific moments you wish prioritized..."
            className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full text-sm font-semibold uppercase tracking-wider py-4 mt-2 disabled:opacity-50"
      >
        <span>{loading ? 'Submitting Reservation...' : 'Submit Booking Request'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

export default BookingForm;

