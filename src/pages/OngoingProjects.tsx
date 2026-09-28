import React, { useEffect } from 'react';
import { ONGOING_PROJECTS } from '../data/ongoingProjects';
import { OngoingProjectCard } from '../components/OngoingProjectCard';
import { PageHero } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import { PHASE_ORDER } from '../data/ongoingProjects';

const OngoingProjects: React.FC = () => {
  useEffect(() => {
    document.title = 'Ongoing Projects | Royal Touch — Currently Building';
  }, []);

  // Group by phase for display
  const activePhases = Array.from(new Set(ONGOING_PROJECTS.map((p) => p.phase)));

  return (
    <main>
      <PageHero
        eyebrow="Currently Building"
        title="What We're Building"
        subtitle="Follow the spaces currently taking shape with Royal Touch — from concept to construction."
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format"
      />

      {/* Phase explanation */}
      <section className="bg-[#141210] py-10 border-b border-white/5" aria-label="Project phases">
        <div className="container-royal">
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40">
              Project Phases:
            </p>
            {PHASE_ORDER.map((phase, i) => (
              <div key={phase} className="flex items-center gap-3">
                <span
                  className={`text-xs tracking-wide ${
                    activePhases.includes(phase as any) ? 'text-[#d4a53a]' : 'text-white/25'
                  }`}
                  style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
                >
                  {phase}
                </span>
                {i < PHASE_ORDER.length - 1 && (
                  <span className="text-white/15 text-xs">›</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-[#0c0b0a]" aria-label="Ongoing projects">
        <div className="container-royal">
          <div className="mb-10">
            <p style={{ fontFamily: 'var(--font-serif)' }} className="text-white/40 text-base italic mb-1">
              {ONGOING_PROJECTS.length} project{ONGOING_PROJECTS.length !== 1 ? 's' : ''} currently in progress
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ONGOING_PROJECTS.map((project) => (
              <OngoingProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Upcoming Projects"
        headline="Planning Something New?"
        subtext="If you have a project in mind, we'd love to hear about it. Every exceptional space starts with a conversation."
        ctaLabel="Start a Conversation →"
        ctaTo="/contact"
        backgroundImage="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&auto=format"
      />
    </main>
  );
};

export default OngoingProjects;
