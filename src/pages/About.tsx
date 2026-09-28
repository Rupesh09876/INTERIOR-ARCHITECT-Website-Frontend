import React, { useEffect } from 'react';

import { PageHero } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About Royal Touch | Interior & Architecture Studio';
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="About Royal Touch"
        title="Creating spaces with character."
        subtitle="A premium interior design and architecture studio rooted in craftsmanship, intention, and client collaboration."
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85&auto=format"
      />

      {/* Introduction */}
      <section className="section-py bg-[#faf7f2]" aria-label="Company introduction">
        <div className="container-royal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="eyebrow mb-5">Who We Are</p>
              <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-lg text-[#141210] font-light mb-6 leading-tight">
                A studio defined by
                <br />
                <em className="italic text-[#8a5f1c]">curiosity and craft.</em>
              </h2>
              <p className="body-lg mb-5">
                Royal Touch is a premium interior design and architecture studio dedicated to creating spaces that are beautiful, purposeful, and enduring. We bring together a deep love of design, technical excellence, and an unwavering commitment to our clients.
              </p>
              <p className="body-lg mb-5">
                Our work spans residential homes, commercial spaces, hospitality environments, and everything in between. Whatever the project, our approach remains constant: listen carefully, think deeply, and build with precision.
              </p>
              <p className="body-lg">
                The name Royal Touch reflects what we aspire to bring to every project — a level of quality, care, and refinement that transforms the ordinary into the extraordinary.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 aspect-[16/9] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=85&auto=format"
                  alt="Royal Touch studio interior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=85&auto=format"
                  alt="Premium kitchen design"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=85&auto=format"
                  alt="Contemporary living space"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-py bg-[#141210]" aria-label="Design philosophy">
        <div className="container-royal">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow-light mb-6">Our Philosophy</p>
            <h2
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              className="text-display-xl text-white font-light mb-8 leading-tight"
            >
              "Every space has a story.
              <br />Our job is to help you tell it."
            </h2>
            <div className="w-12 h-px bg-[#d4a53a] mx-auto mb-8" />
            <p className="text-white/55 text-base leading-relaxed mb-4 max-w-xl mx-auto">
              We believe that great design is never about following trends. It is about understanding people — how they live, how they work, how they want to feel — and creating environments that respond to those needs with honesty and beauty.
            </p>
            <p className="text-white/55 text-base leading-relaxed max-w-xl mx-auto">
              At Royal Touch, we approach every project with deep curiosity and genuine care. We are not interested in surface-level solutions. We are interested in creating spaces that genuinely matter.
            </p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-py bg-white" aria-label="Our approach">
        <div className="container-royal">
          <p className="eyebrow mb-5">Our Approach</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-[#141210] font-light leading-tight">
              Design that begins with listening.
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Deep Listening',
                  text: 'Every project begins with understanding. We invest significant time learning about our clients — their lifestyle, their aspirations, and what they truly want from their space.',
                },
                {
                  title: 'Thoughtful Design',
                  text: 'Our designs are never arbitrary. Every decision — from the overall spatial layout to the smallest material detail — is made with purpose.',
                },
                {
                  title: 'Craftsmanship',
                  text: 'We hold quality to the highest standard throughout construction and execution, ensuring that the finished space matches the vision in every detail.',
                },
                {
                  title: 'Client Partnership',
                  text: 'We believe in genuine collaboration with our clients throughout the entire process. Your input is not just welcome — it is essential.',
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-[#d4a53a] pl-6">
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-2">
                    {item.title}
                  </h3>
                  <p className="body-md">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed image */}
      <section className="h-[50vh] min-h-[320px] overflow-hidden" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1800&q=85&auto=format"
          alt="Royal Touch architectural detail"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </section>

      {/* What sets us apart */}
      <section className="section-py bg-[#faf7f2]" aria-label="What sets Royal Touch apart">
        <div className="container-royal">
          <p className="eyebrow mb-5">What Sets Us Apart</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e8e5e0]">
            {[
              {
                title: 'Local Expertise,\nGlobal Standards',
                text: 'We understand the local context — culture, climate, materials, and craftsmanship — while designing to international standards of quality and refinement.',
              },
              {
                title: 'End-to-End\nDelivery',
                text: 'From the initial concept to the final handover, we manage every aspect of the project. You deal with one team throughout.',
              },
              {
                title: 'Integrity in\nEvery Decision',
                text: 'We are transparent about costs, timelines, and decisions. We never cut corners, and we never compromise on quality.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#faf7f2] p-10">
                <h3
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-xl font-light text-[#141210] mb-4 leading-snug whitespace-pre-line"
                >
                  {item.title}
                </h3>
                <p className="body-md">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Work With Us"
        headline="Let's Create Something Exceptional Together."
        subtext="We take on a select number of projects each year to ensure every client receives our full attention and commitment."
        ctaLabel="Start a Project →"
        ctaTo="/contact"
        backgroundImage="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1800&q=85&auto=format"
      />
    </main>
  );
};

export default About;
