import BookingForm from '../components/BookingForm';
import { FadeInUp, StaggerContainer } from '../components/ScrollAnimation';
import { Check, HelpCircle } from 'lucide-react';

const pricingPackages = [
  {
    name: 'Essential Collection',
    price: '₹25,000',
    subtitle: 'Ideal for intimate ceremonies and half-day coverage',
    features: [
      'Up to 5 Hours Event Coverage',
      '150+ Color-Graded High-Resolution Photographs',
      'Single Lead Master Photographer',
      'Private Encrypted Cloud Gallery',
      'Personal Printing Rights Included'
    ],
    popular: false
  },
  {
    name: 'Royal Wedding Experience',
    price: '₹55,000',
    subtitle: 'Comprehensive multi-ceremony documentation',
    features: [
      'Full Day Coverage (Candid & Traditional)',
      '400+ Handcrafted Edited Photographs',
      'Dual Photographers (Lead + Candid Specialist)',
      'Handcrafted Leather Heirloom Photo Album',
      'Pre-Wedding Studio or Outdoor Session',
      'Express Sneak-Peek Delivery within 48 Hours'
    ],
    popular: true
  },
  {
    name: 'Signature Grand Celebration',
    price: '₹95,000',
    subtitle: 'The ultimate royal coverage for multi-day weddings',
    features: [
      'Complete Multi-Day Celebration Coverage',
      'Unlimited Curated & Retouched Photographs',
      'Three Photographers including Drone Aerials',
      'Two Deluxe Velvet Heirloom Albums for Parents',
      'Cinematic Video Teaser & 4K Highlights Reel',
      'Dedicated Studio Coordinator On-Site'
    ],
    popular: false
  }
];

const faqs = [
  {
    question: "When will our edited wedding gallery be ready?",
    answer: "Initial sneak-peek photographs are delivered within 48 hours. The complete retouched digital gallery is delivered within 3 to 4 weeks, with printed albums following approval."
  },
  {
    question: "Do you travel for weddings outside Majhaulia?",
    answer: "Yes. We frequently travel across Bihar and neighboring states. Travel and lodging arrangements are coordinated transparently during booking."
  },
  {
    question: "How do we secure our wedding date?",
    answer: "A date is officially reserved upon submission of the inquiry form, mutual confirmation of package deliverables, and a standard 25% reservation deposit."
  },
  {
    question: "Do we receive the original unedited RAW files?",
    answer: "We deliver fully color-graded, high-resolution JPEG files ready for printing and sharing. RAW archive files can be requested under select packages."
  }
];

const Booking = () => {
  return (
    <div className="min-h-screen bg-transparent text-stone-800 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Page Header (Single eyebrow on page) */}
        <FadeInUp>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="text-xs font-mono uppercase tracking-widest text-gold-700 mb-3 font-semibold">
              Investment & Booking
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Reserve Your Celebration
            </h1>
            <p className="text-stone-600 text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Transparent collections tailored to the scale, traditions, and distinct moments of your wedding.
            </p>
          </div>
        </FadeInUp>

        {/* Investment Packages */}
        <section className="mb-24">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {pricingPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 bg-white/95 backdrop-blur-sm ${
                  pkg.popular
                    ? 'border-2 border-amber-500 shadow-[0_12px_40px_rgba(212,163,89,0.2)]'
                    : 'border border-amber-200/70 shadow-sm hover:shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-[11px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      Most Requested
                    </span>
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gold-700 mb-1 font-semibold">
                    {pkg.name}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-mono mt-2 mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">
                    {pkg.subtitle}
                  </p>

                  <div className="h-px bg-stone-100 mb-6" />

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#inquiry-form"
                  className={`w-full text-center text-xs uppercase tracking-wider py-3 rounded-full font-semibold transition-all duration-200 block ${
                    pkg.popular
                      ? 'bg-stone-900 text-white hover:bg-gold-600 shadow-md'
                      : 'bg-stone-100 border border-stone-300 text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  Select Package
                </a>
              </div>
            ))}
          </StaggerContainer>
        </section>

        {/* Reservation Form Section */}
        <section id="inquiry-form" className="mb-24 scroll-mt-28">
          <FadeInUp>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight mb-3">
                Send a Booking Inquiry
              </h2>
              <p className="text-stone-600 text-sm">
                Provide celebration details below and our studio director will reach out with date confirmation.
              </p>
            </div>
          </FadeInUp>

          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <FadeInUp>
            <div className="max-w-2xl mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-3">
                Frequently Addressed Inquiries
              </h2>
              <p className="text-stone-600 text-sm">
                Essential details regarding scheduling, delivery standards, and coverage protocols.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/60 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-stone-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Booking;
