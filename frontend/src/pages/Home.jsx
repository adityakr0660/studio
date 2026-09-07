import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParallaxHeroImages from '../components/ParallaxHeroImages';
import ServiceCard from '../components/ServiceCard';
import { useEffect, useState } from 'react';
import { getServices, getPortfolio } from '../services/api';
import { FadeInUp, StaggerContainer, FadeInLeft, FadeInRight } from '../components/ScrollAnimation';
import { ArrowRight, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

const B = 'http://localhost:5000/images';

const fallbackServices = [
  { _id: '1', title: 'Royal Wedding Coverage', category: 'Wedding', description: 'Comprehensive wedding documentation with full-day candid coverage, bridal portraits, and color-graded cinematic stills.', pricing: 45000, image: `${B}/wedding1.jpg` },
  { _id: '2', title: 'Cinematic Pre-Wedding', category: 'Pre-Wedding', description: 'Artfully directed romantic sessions in scenic outdoor locations with editorial styling and mood lighting.', pricing: 25000, image: `${B}/wedding2.jpg` },
  { _id: '3', title: 'Digital Wedding Invitations', category: 'Design', description: 'Bespoke animated digital wedding cards and interactive web invitations tailored to your celebration aesthetic.', pricing: 8000, image: `${B}/wedding3.jpg` },
  { _id: '4', title: 'Portraits & Family Heritage', category: 'Portrait', description: 'Studio and ambient light portrait sessions honoring family generations, traditions, and timeless milestones.', pricing: 15000, image: `${B}/portrait1.jpg` },
];

const fallbackPortfolio = [
  { _id: '1', title: 'Royal Indian Wedding', category: 'Wedding', image: `${B}/wedding1.jpg` },
  { _id: '2', title: 'Pre-Wedding Celebration', category: 'Wedding', image: `${B}/wedding2.jpg` },
  { _id: '3', title: 'Bridal Portraiture', category: 'Wedding', image: `${B}/wedding3.jpg` },
  { _id: '4', title: 'Haldi Ceremony Rituals', category: 'Wedding', image: `${B}/wedding4.jpg` },
  { _id: '5', title: 'Engagement Celebration', category: 'Wedding', image: `${B}/wedding5.jpg` },
  { _id: '6', title: 'Reception Evening', category: 'Wedding', image: `${B}/wedding6.jpg` },
];

const clientTestimonials = [
  {
    id: 1,
    quote: "Hariom Studio documented our wedding with rare artistry. Every photograph feels alive and brimming with genuine emotion.",
    client: "Priya and Rahul",
    event: "Wedding Celebration"
  },
  {
    id: 2,
    quote: "Their team was remarkably discreet during the ceremonies yet captured every heartfelt family interaction flawlessly.",
    client: "Amitabh and Sunita",
    event: "Silver Jubilee"
  },
  {
    id: 3,
    quote: "The digital invitations and portrait album exceeded every expectation. Our guests were genuinely mesmerized.",
    client: "Sneha and Vikram",
    event: "Pre-Wedding & Reception"
  }
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchPortfolio();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await getServices();
      if (response.data && response.data.length > 0) {
        setServices(response.data.slice(0, 4));
      } else {
        setServices(fallbackServices);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices(fallbackServices);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await getPortfolio();
      if (response.data && response.data.length > 0) {
        setPortfolio(response.data.slice(0, 6));
      } else {
        setPortfolio(fallbackPortfolio);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setPortfolio(fallbackPortfolio);
    }
  };

  return (
    <div className="bg-transparent text-stone-800">
      {/* 1. Asymmetric Split Hero */}
      <ParallaxHeroImages />

      {/* 2. Under-Hero Proof Strip */}
      <section className="border-y border-amber-200/60 bg-gradient-to-r from-white/90 via-[#fff8f0] to-white/90 py-10 shadow-sm backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-amber-200/60">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-mono">
                24+
              </div>
              <div className="text-xs text-stone-500 uppercase tracking-widest font-medium">
                Years of Craft
              </div>
            </div>
            <div className="space-y-1 pt-6 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-mono">
                3,500+
              </div>
              <div className="text-xs text-stone-500 uppercase tracking-widest font-medium">
                Ceremonies Documented
              </div>
            </div>
            <div className="space-y-1 pt-6 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-mono">
                100%
              </div>
              <div className="text-xs text-stone-500 uppercase tracking-widest font-medium">
                Client Dedication
              </div>
            </div>
            <div className="space-y-1 pt-6 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-mono">
                4K
              </div>
              <div className="text-xs text-stone-500 uppercase tracking-widest font-medium">
                Cinematic Color Grade
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curated Services */}
      <section className="py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInUp>
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
                Disciplined Photography & Digital Arts
              </h2>
              <p className="text-stone-600 text-base leading-relaxed">
                Specialized coverage designed around the cadence of Indian weddings, intimate family portraits, and modern celebrations.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. Heritage & Craft Story (Editorial 2-column layout) */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[#fdf6f0]/75 to-transparent border-y border-amber-200/50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <FadeInLeft className="lg:col-span-6 space-y-6">
              {/* Eyebrow #2 on the page */}
              <div className="text-xs text-gold-700 uppercase tracking-widest font-mono font-semibold">
                Studio Heritage
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                Two Decades of Storytelling Through the Lens
              </h2>

              <p className="text-stone-700 text-base leading-relaxed">
                Established in 2000 in Majhaulia, Bihar, Hariom Studio began with a single conviction: genuine human moments deserve timeless preservation. We do not stage forced postures. We document genuine laughter, heartfelt tears, and the intricate rituals that make your wedding distinct.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Experienced master photographers with over two decades of ceremony expertise</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Dual camera redundancies and secure multi-location raw backups</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-stone-700">
                  <HeartHandshake className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Meticulous handcrafted editing and authentic skin tone color grading</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-700 hover:text-gold-800 transition-colors uppercase tracking-wider"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInLeft>

            <FadeInRight className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-100 border border-black/[0.08] shadow-xl">
                  <img
                    src={`${B}/wedding4.jpg`}
                    alt="Haldi Ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-100 border border-black/[0.08] shadow-xl mt-8">
                  <img
                    src={`${B}/wedding2.jpg`}
                    alt="Couple Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* 5. Masterpieces Bento Grid */}
      <section className="py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                  Selected Masterpieces
                </h2>
                <p className="text-stone-600 text-sm mt-2 max-w-xl">
                  A visual archive of ceremonies, candid rituals, and timeless wedding stories.
                </p>
              </div>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gold-700 hover:text-gold-800 uppercase tracking-widest whitespace-nowrap"
              >
                <span>View All Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeInUp>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]">
            {/* Cell 1: Hero Tile */}
            <div className="lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden relative group border border-black/[0.08] bg-stone-100 shadow-xl">
              <img
                src={`${B}/wedding6.jpg`}
                alt="Reception Night"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-gold-300 text-xs font-mono uppercase tracking-widest mb-1">
                  Wedding Reception
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Grand Evening Celebrations
                </h3>
              </div>
            </div>

            {/* Cell 2 */}
            <div className="rounded-2xl overflow-hidden relative group border border-black/[0.08] bg-stone-100 shadow-md">
              <img
                src={`${B}/wedding3.jpg`}
                alt="Bride Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-gold-300 text-[11px] font-mono uppercase tracking-widest">
                  Bridal Portrait
                </span>
                <h4 className="text-lg font-semibold text-white">
                  Grace & Tradition
                </h4>
              </div>
            </div>

            {/* Cell 3 */}
            <div className="rounded-2xl overflow-hidden relative group border border-black/[0.08] bg-stone-100 shadow-md">
              <img
                src={`${B}/wedding4.jpg`}
                alt="Ceremony Ritual"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-gold-300 text-[11px] font-mono uppercase tracking-widest">
                  Rituals
                </span>
                <h4 className="text-lg font-semibold text-white">
                  Vibrant Haldi Moments
                </h4>
              </div>
            </div>

            {/* Cell 4 */}
            <div className="rounded-2xl overflow-hidden relative group border border-black/[0.08] bg-stone-100 shadow-md">
              <img
                src={`${B}/wedding2.jpg`}
                alt="Pre-Wedding Shoot"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-gold-300 text-[11px] font-mono uppercase tracking-widest">
                  Pre-Wedding
                </span>
                <h4 className="text-lg font-semibold text-white">
                  Sunset Romance
                </h4>
              </div>
            </div>

            {/* Cell 5 */}
            <div className="rounded-2xl overflow-hidden relative group border border-black/[0.08] bg-stone-100 shadow-md">
              <img
                src={`${B}/event1.jpg`}
                alt="Celebration Event"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-gold-300 text-[11px] font-mono uppercase tracking-widest">
                  Milestones
                </span>
                <h4 className="text-lg font-semibold text-white">
                  Family Heritage
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Client Stories */}
      <section className="py-24 bg-gradient-to-b from-white/80 via-[#fff5f2]/80 to-white/80 border-t border-amber-200/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInUp>
            <div className="max-w-xl mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
                Client Reflections
              </h2>
              <p className="text-stone-600 text-sm">
                Feedback from families and couples whose sacred celebrations we had the privilege to document.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clientTestimonials.map((t) => (
              <div
                key={t.id}
                className="studio-glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-white/90 border border-amber-200/60 shadow-sm hover:shadow-lg transition-all"
              >
                <p className="text-stone-700 text-base leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
                <div className="pt-4 border-t border-amber-100">
                  <div className="text-sm font-semibold text-stone-900">
                    {t.client}
                  </div>
                  <div className="text-xs text-gold-700 font-medium mt-0.5">
                    {t.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Focused Booking CTA Banner */}
      <section className="py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-gradient-to-br from-stone-950 via-[#1c1512] to-[#261914] text-white rounded-3xl p-8 sm:p-12 md:p-16 border border-amber-500/30 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Reserve Your Wedding Date
              </h2>
              <p className="text-stone-300 text-base leading-relaxed">
                Dates for the upcoming wedding season fill quickly. Inquire early to secure complete photo and cinematic coverage for your celebration.
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  to="/booking"
                  className="btn-gold"
                >
                  <span>Book a Session</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-stone-950 transition-all text-sm font-medium"
                >
                  Contact Studio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

