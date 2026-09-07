import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeInUp, FadeInLeft, FadeInRight } from '../components/ScrollAnimation';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className="min-h-screen bg-transparent text-stone-800 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header (Single eyebrow on page) */}
        <FadeInUp>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-gold-700 mb-3 font-semibold">
              Direct Contact
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Connect With the Studio
            </h1>
            <p className="text-stone-600 text-base mt-3 leading-relaxed">
              We look forward to discussing your wedding, portrait session, or celebration.
            </p>
          </div>
        </FadeInUp>

        {/* Contact Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Inquiry Form */}
          <FadeInLeft className="lg:col-span-7">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-amber-200/70 shadow-lg">
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                Send a Message
              </h2>
              <p className="text-stone-600 text-sm mb-8">
                Fill in your details below and our team will get back to you within 24 hours.
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-stone-50 border border-gold-600/40 text-gold-700 flex items-center gap-3 mb-6"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">Thank you. Your message was received successfully.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
                      Your Name *
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Wedding Date Availability"
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="How can we assist you?"
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold w-full text-sm font-semibold uppercase tracking-wider py-3.5 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </FadeInLeft>

          {/* Details & Location */}
          <FadeInRight className="lg:col-span-5 space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-amber-200/70 shadow-lg space-y-6">
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                Studio Information
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 border border-gold-600/30 flex items-center justify-center flex-shrink-0 text-gold-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 uppercase font-mono tracking-wider font-medium">Address</div>
                    <div className="text-stone-900 font-medium mt-0.5">
                      Block Road Majhaulia, West Champaran, Bihar 845454
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 border border-gold-600/30 flex items-center justify-center flex-shrink-0 text-gold-700">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 uppercase font-mono tracking-wider font-medium">Phone</div>
                    <div className="text-stone-900 font-medium mt-0.5">
                      <a href="tel:+919931482128" className="hover:text-gold-700 transition-colors">
                        +91 9931482128
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 border border-gold-600/30 flex items-center justify-center flex-shrink-0 text-gold-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 uppercase font-mono tracking-wider font-medium">Email</div>
                    <div className="text-stone-900 font-medium mt-0.5">
                      <a href="mailto:hariomstudiomjl@gmail.com" className="hover:text-gold-700 transition-colors">
                        hariomstudiomjl@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 border border-gold-600/30 flex items-center justify-center flex-shrink-0 text-gold-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-stone-500 uppercase font-mono tracking-wider font-medium">Studio Hours</div>
                    <div className="text-stone-900 font-medium mt-0.5">
                      Monday to Sunday: 8:00 AM to 7:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame */}
            <div className="rounded-2xl overflow-hidden border border-stone-200/80 shadow-md bg-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14309.845863260462!2d84.5857216!3d26.7904077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399343ee0654ea23%3A0xa94fcebba60395cb!2sMajhaulia%2C%20Bihar%20845454!5e0!3m2!1sen!2sin!4v1710777123456!5m2!1sen!2sin" 
                width="100%" 
                height="220" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Hariom Studio Majhaulia Location"
              />
            </div>
          </FadeInRight>

        </div>

      </div>
    </div>
  );
};

export default Contact;

