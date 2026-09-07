import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryGrid from '../components/GalleryGrid';
import { FadeInUp } from '../components/ScrollAnimation';
import { getPortfolio } from '../services/api';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const B = 'http://localhost:5000/images';

const fallbackPortfolio = [
  { _id: '1', title: 'Royal Indian Wedding', category: 'Wedding', image: `${B}/wedding1.jpg` },
  { _id: '2', title: 'Pre-Wedding Celebration', category: 'Pre-Wedding', image: `${B}/wedding2.jpg` },
  { _id: '3', title: 'Bridal Portraiture', category: 'Portrait', image: `${B}/wedding3.jpg` },
  { _id: '4', title: 'Haldi Ceremony Rituals', category: 'Wedding', image: `${B}/wedding4.jpg` },
  { _id: '5', title: 'Engagement Celebration', category: 'Wedding', image: `${B}/wedding5.jpg` },
  { _id: '6', title: 'Reception Evening', category: 'Wedding', image: `${B}/wedding6.jpg` },
  { _id: '7', title: 'Corporate Summit', category: 'Event', image: `${B}/event1.jpg` },
  { _id: '8', title: 'Family Heritage', category: 'Portrait', image: `${B}/portrait1.jpg` },
];

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const fetchPortfolio = async () => {
    try {
      const response = await getPortfolio();
      if (response.data && response.data.length > 0) {
        setPortfolio(response.data);
      } else {
        setPortfolio(fallbackPortfolio);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setPortfolio(fallbackPortfolio);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const items = portfolio.length > 0 ? portfolio : fallbackPortfolio;
  const spotlightItems = items.slice(0, 5);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % spotlightItems.length);
  }, [spotlightItems.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + spotlightItems.length) % spotlightItems.length);
  };

  useEffect(() => {
    if (!loading && spotlightItems.length > 1) {
      slideInterval.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [loading, nextSlide, spotlightItems.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6] text-stone-600">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-gold-600/30 border-t-gold-600 rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-stone-500 font-mono font-medium">
            Loading Visual Archive
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-stone-800 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <FadeInUp>
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-gold-700 mb-3 font-semibold">
              Selected Works
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Visual Archive & Stories
            </h1>
            <p className="text-stone-600 text-base mt-3 leading-relaxed">
              A curated collection of sacred rituals, candid emotions, and royal ceremonies documented over two decades.
            </p>
          </div>
        </FadeInUp>

        {/* Spotlight Showcase Frame */}
        {spotlightItems.length > 0 && (
          <div className="mb-20">
            <div className="relative rounded-3xl overflow-hidden border border-black/[0.08] bg-stone-100 shadow-xl h-[420px] sm:h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={spotlightItems[currentSlide]?.image}
                    alt={spotlightItems[currentSlide]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-gold-300 block mb-1">
                        Featured • {spotlightItems[currentSlide]?.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        {spotlightItems[currentSlide]?.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full studio-glass border border-black/[0.08] flex items-center justify-center text-stone-900 hover:bg-stone-100 transition-colors shadow-sm"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full studio-glass border border-black/[0.08] flex items-center justify-center text-stone-900 hover:bg-stone-100 transition-colors shadow-sm"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <section className="mb-20">
          <GalleryGrid items={items} />
        </section>

        {/* Reserve Session Callout */}
        <FadeInUp>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-amber-200/60 text-center max-w-3xl mx-auto shadow-md">
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              Plan Your Photographic Journey
            </h3>
            <p className="text-stone-600 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Whether documenting a grand three-day wedding ceremony or an intimate portrait session, we bring devotion to every frame.
            </p>
            <Link
              to="/booking"
              className="btn-gold"
            >
              <span>Book a Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default Portfolio;

