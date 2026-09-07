import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ service }) => {
  return (
    <div className="studio-glass-card rounded-2xl overflow-hidden flex flex-col h-full group bg-white border border-black/[0.07] shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-stone-100">
        <img
          src={service?.image || 'http://localhost:5000/images/wedding1.jpg'}
          alt={service?.title || 'Service'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'http://localhost:5000/images/wedding1.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-black/[0.08] shadow-sm">
          <span className="text-gold-700 text-[11px] font-semibold tracking-wider uppercase">
            {service?.category || 'Photography'}
          </span>
        </div>
      </div>
      
      <div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-semibold text-stone-900 mb-2 group-hover:text-gold-700 transition-colors">
          {service?.title || 'Service Title'}
        </h3>
        <p className="text-stone-600 text-sm flex-grow mb-6 leading-relaxed">
          {service?.description || 'Professional photography and cinematic coverage.'}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-200/80">
          <div className="flex flex-col">
            <span className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">
              Investment from
            </span>
            <span className="text-stone-900 font-bold text-lg">
              ₹{Number(service?.pricing || service?.price || 15000).toLocaleString('en-IN')}
            </span>
          </div>
          
          <Link 
            to="/booking" 
            state={{ selectedService: service?._id }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-700 hover:text-gold-800 transition-colors uppercase tracking-wider group/link"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

