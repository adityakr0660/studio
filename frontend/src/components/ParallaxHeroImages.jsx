import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ParallaxHeroImages = () => {
  const shouldReduce = useReducedMotion();
  const BASE = 'http://localhost:5000/images';

  const defaultEase = [0.16, 1, 0.3, 1];

  return (
    <section className="relative min-h-[100dvh] pt-24 pb-16 flex items-center bg-transparent overflow-hidden">
      {/* Ambient background light gradients - Champagne Gold & Bridal Blush */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/6 left-1/6 w-[420px] h-[420px] bg-gradient-to-br from-amber-300/30 to-amber-100/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 right-1/10 w-[520px] h-[520px] bg-gradient-to-bl from-rose-200/35 via-orange-100/20 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition (Max 4 text elements) */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: defaultEase }}
            className="lg:col-span-6 space-y-6"
          >
            {/* 1. Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-600/30 text-gold-700 text-xs font-semibold uppercase tracking-widest font-mono shadow-sm">
              Fine Art & Cinematic Photography
            </div>

            {/* 2. Headline (Max 2 lines) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.08]">
              Capturing Soul. <br />
              <span className="gold-gradient-text">Preserving Legacy.</span>
            </h1>

            {/* 3. Subtext (Max 20 words, max 4 lines) */}
            <p className="text-base sm:text-lg text-stone-600 max-w-[48ch] leading-relaxed">
              Documenting weddings, portraits, and celebrations with timeless artistry and emotional depth across Bihar and beyond since 2000.
            </p>

            {/* 4. CTAs (1 primary + 1 secondary) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/booking"
                className="btn-gold"
              >
                <span>Book a Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="btn-outline-gold"
              >
                View Selected Work
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Composition */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: defaultEase }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Featured Portrait */}
              <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] shadow-[0_20px_50px_rgba(28,25,23,0.12)] aspect-[4/5] bg-stone-100 group">
                <img
                  src={`${BASE}/wedding1.jpg`}
                  alt="Royal Wedding Photography"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                  <div>
                    <div className="text-xs font-mono text-gold-300 uppercase tracking-wider">
                      Selected Commission
                    </div>
                    <div className="text-lg font-semibold text-white">
                      Royal Indian Wedding
                    </div>
                  </div>
                  <div className="text-xs text-white/70 font-mono">
                    Majhaulia, Bihar
                  </div>
                </div>
              </div>

              {/* Secondary Overlapping Asset Card */}
              <motion.div
                initial={shouldReduce ? false : { opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: defaultEase }}
                className="hidden sm:block absolute -bottom-6 -left-8 w-48 rounded-xl overflow-hidden border border-black/[0.08] shadow-xl studio-glass p-2 bg-white/95"
              >
                <div className="rounded-lg overflow-hidden aspect-[4/3] bg-stone-100">
                  <img
                    src={`${BASE}/wedding5.jpg`}
                    alt="Celebration Moments"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 px-1 text-[11px] text-stone-700 font-medium truncate">
                  Candid Ceremony
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ParallaxHeroImages;

