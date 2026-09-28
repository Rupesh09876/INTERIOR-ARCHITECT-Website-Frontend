import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { PageHero } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';

const Services: React.FC = () => {
  useEffect(() => {
    document.title = 'Services | Royal Touch — Interior Design & Architecture';
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="What We Do"
        title="From Vision to Reality."
        subtitle="Eight disciplines. One unified approach to design, architecture, and space-making."
        backgroundImage="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1600&q=85&auto=format"
      />

      {/* Services — Editorial large sections */}
      <div className="bg-[#faf7f2]">
        {SERVICES.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            className={`section-py border-b border-[#e8e5e0] ${i % 2 === 0 ? 'bg-[#faf7f2]' : 'bg-white'}`}
            aria-label={`Service: ${service.title}`}
          >
            <div className="container-royal">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:direction-rtl' : ''}`}>
                {/* Content — alternates sides */}
                <div className={i % 2 !== 0 ? 'lg:order-2' : ''}>
                  <span
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)' }}
                    className="text-6xl font-light leading-none mb-4 block"
                  >
                    {service.number}
                  </span>
                  <h2
                    style={{ fontFamily: 'var(--font-serif)' }}
                    className="text-display-md text-[#141210] font-light mb-5"
                  >
                    {service.title}
                  </h2>
                  <p className="body-lg mb-8">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3">
                        <span className="w-4 h-px bg-[#d4a53a] mt-3 flex-shrink-0" />
                        <span className="body-md">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="btn btn-outline-dark">
                    Discuss Your Project
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Image */}
                <div className={`aspect-[4/3] overflow-hidden ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <img
                    src={service.image}
                    alt={`${service.title} — Royal Touch service`}
                    className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <CTASection
        eyebrow="Ready to Start?"
        headline="Tell Us About Your Project."
        subtext="Whether you have a clear vision or you're just beginning to explore ideas, we're here to help you shape something exceptional."
        ctaLabel="Start a Project →"
        ctaTo="/contact"
        backgroundImage="https://images.unsplash.com/photo-1600073472550-8090b5e0745e?w=1800&q=85&auto=format"
      />
    </main>
  );
};

export default Services;
