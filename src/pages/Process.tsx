import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/services';
import { PageHero } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';

const Process: React.FC = () => {
  useEffect(() => {
    document.title = 'Our Process | Royal Touch — How We Work';
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="How We Work"
        title="A Process Built on Precision."
        subtitle="Five carefully considered stages, designed to take your project from first conversation to final handover with clarity and confidence."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format"
      />

      {/* Process overview intro */}
      <section className="section-py bg-[#faf7f2]" aria-label="Process introduction">
        <div className="container-royal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <p className="eyebrow mb-5">Our Process</p>
              <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-lg text-[#141210] font-light mb-6 leading-tight">
                Clarity at every stage.
              </h2>
              <p className="body-lg mb-5">
                Our process is designed to give you complete confidence — at every stage of your project. We believe that great design requires great communication, and we invest deeply in keeping you informed, involved, and excited throughout.
              </p>
              <p className="body-lg">
                From our first conversation to the final handover, you will know exactly where your project stands and what comes next.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600073472550-8090b5e0745e?w=900&q=85&auto=format"
                alt="Royal Touch process — architectural detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps — editorial alternating */}
      <section className="bg-white" aria-label="Process steps">
        {PROCESS_STEPS.map((step, i) => (
          <div
            key={step.number}
            className={`section-py border-b border-[#e8e5e0] ${i % 2 !== 0 ? 'bg-[#faf7f2]' : 'bg-white'}`}
          >
            <div className="container-royal">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`}>
                {/* Large number */}
                <div className={`lg:col-span-2 ${i % 2 !== 0 ? 'lg:order-3' : ''}`}>
                  <span
                    style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-200)' }}
                    className="text-[6rem] font-light leading-none select-none"
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className={`lg:col-span-5 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <p className="eyebrow mb-4">
                    <span className="w-4 h-px bg-[#d4a53a] inline-block mr-2 align-middle" />
                    Stage {step.number}
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-[#141210] font-light mb-5">
                    {step.title}
                  </h2>
                  <p className="body-lg">{step.description}</p>
                </div>

                {/* Decorative / image */}
                <div className={`lg:col-span-5 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-[#e8e5e0]">
                    <img
                      src={[
                        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&auto=format',
                        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format',
                        'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80&auto=format',
                        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format',
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format',
                      ][i]}
                      alt={`Stage ${step.number} — ${step.title}`}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Process summary timeline */}
      <section className="section-py bg-[#141210]" aria-label="Process summary">
        <div className="container-royal">
          <p className="eyebrow-light mb-12 text-center">
            <span className="w-5 h-px bg-[#d4a53a] inline-block mr-2 align-middle" />
            At a Glance
          </p>
          <div className="flex flex-col lg:flex-row items-stretch gap-0">
            {PROCESS_STEPS.map((step, i) => (
              <React.Fragment key={step.number}>
                <div className="flex-1 flex flex-col items-center text-center p-6 border border-white/8 hover:border-[#d4a53a]/30 transition-colors duration-300">
                  <span
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
                    className="text-xs tracking-[0.1em] mb-3"
                  >
                    {step.number}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-xl font-light text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">{step.description}</p>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:flex items-center px-0">
                    <ArrowRight size={16} className="text-[#d4a53a]/30" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Begin Your Project"
        headline="Ready to Start the Conversation?"
        subtext="The first step is simply reaching out. Tell us about your project and we'll guide you through the rest."
        ctaLabel="Get in Touch →"
        ctaTo="/contact"
        backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85&auto=format"
      />
    </main>
  );
};

export default Process;
