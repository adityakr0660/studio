import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Booking', href: '/booking' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-stone-100 border-t border-stone-200/80 text-stone-600 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-white border border-gold-500/40 shadow-sm flex items-center justify-center">
                <img 
                  src="/images/logo.png" 
                  alt="Hariom Studio" 
                  className="h-7 w-7 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <span className="text-xl font-bold text-stone-900 tracking-tight">
                Hariom Studio
              </span>
            </Link>
            <p className="text-sm text-stone-600 max-w-sm leading-relaxed">
              Capturing life's most heartfelt celebrations with cinematic depth, authentic emotion, and timeless elegance since 2000.
            </p>
            <div className="pt-2">
              <Link 
                to="/booking" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-700 hover:text-gold-800 transition-colors uppercase tracking-wider"
              >
                Reserve Your Date <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-900 font-semibold mb-4">
              Navigation
            </div>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest text-stone-900 font-semibold mb-4">
              Studio Details
            </div>
            <div className="space-y-3 text-sm text-stone-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>Block Road Majhaulia, West Champaran, Bihar 845454</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <a href="tel:+919931482128" className="hover:text-stone-900 transition-colors">
                  +91 9931482128
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <a href="mailto:hariomstudiomjl@gmail.com" className="hover:text-stone-900 transition-colors">
                  hariomstudiomjl@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2024 Hariom Studio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-stone-800 transition-colors">
              About the Studio
            </Link>
            <Link to="/contact" className="hover:text-stone-800 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

