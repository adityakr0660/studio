import { motion } from 'framer-motion';
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer } from '../components/ScrollAnimation';
import { Camera, ShieldCheck, HeartHandshake, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const B = 'http://localhost:5000/images';

const pillars = [
  {
    icon: Camera,
    title: 'Cinematic Precision',
    description: 'Equipped with dual full-frame cameras, prime lenses, and discreet low-light optics to capture every fleeting emotion without interrupting sacred rituals.'
  },
  {
    icon: HeartHandshake,
    title: 'Emotion-First Narrative',
    description: 'We believe weddings are not fashion shoots. Our lens seeks unscripted laughter, joyous tears, and intimate connections between generations.'
  },
  {
    icon: ShieldCheck,
    title: 'Archival Redundancy',
    description: 'Every sacred moment is recorded across dual memory cards and archived to multi-tier encrypted cloud storage before editing commences.'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-transparent text-stone-800 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header (Single eyebrow on page) */}
        <FadeInUp>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="text-xs font-mono uppercase tracking-widest text-gold-700 mb-3 font-semibold">
              Studio Heritage
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Preserving Life's Sacred Celebrations Since 2000
            </h1>
            <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
              For over twenty-four years, Hariom Studio has been trusted by families across Bihar to document their most cherished wedding milestones.
            </p>
          </div>
        </FadeInUp>

        {/* Story Split Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <FadeInLeft className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                From a Humble Darkroom to Cinematic Storytelling
              </h2>
              <p className="text-stone-700 text-base leading-relaxed">
                Hariom Studio was established in 2000 in Majhaulia, Bihar, out of a profound reverence for personal history. Long before modern digital sensors existed, our team learned the craft on manual film, where each shutter release required intention, patience, and impeccable timing.
              </p>
              <p className="text-stone-700 text-base leading-relaxed">
                That foundational discipline shapes everything we produce today. Whether documenting elaborate multi-day wedding ceremonies, candid pre-wedding portraits, or bespoke digital invitation art, we treat every assignment as a sacred family archive.
              </p>
              <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-amber-200/60 text-stone-900 italic text-base shadow-sm">
                "We do not merely create photographs. We craft family heirlooms that future generations will hold and remember."
              </div>
            </FadeInLeft>

            <FadeInRight className="lg:col-span-6">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] border border-black/[0.08] shadow-2xl bg-stone-100">
                  <img
                    src={`${B}/wedding2.jpg`}
                    alt="Hariom Studio Wedding Photography"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl studio-glass border border-amber-200/60 shadow-2xl hidden sm:block bg-white/95">
                  <div className="text-4xl font-extrabold text-gold-700 font-mono">
                    2000
                  </div>
                  <div className="text-xs text-stone-600 uppercase tracking-widest font-mono mt-0.5 font-medium">
                    Established in Majhaulia
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </section>

        {/* Pillars of Craft */}
        <section className="mb-24">
          <FadeInUp>
            <div className="max-w-2xl mb-12">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight mb-3">
                Our Pillars of Craftsmanship
              </h2>
              <p className="text-stone-600 text-sm">
                The technical and artistic principles guiding every wedding we document.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className="studio-glass-card rounded-2xl p-8 flex flex-col justify-between bg-white/90 backdrop-blur-sm border border-amber-200/60 shadow-sm hover:shadow-lg transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-stone-100 border border-gold-600/30 flex items-center justify-center text-gold-700 mb-6">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">
                    {p.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </section>

        {/* Booking Callout */}
        <FadeInUp>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-amber-200/60 text-center max-w-3xl mx-auto shadow-md">
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
              Let Us Document Your Celebration
            </h3>
            <p className="text-stone-600 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              We accept a limited number of wedding commissions annually to guarantee individual creative dedication to each client.
            </p>
            <Link
              to="/booking"
              className="btn-gold"
            >
              <span>Inquire for Your Date</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default About;

