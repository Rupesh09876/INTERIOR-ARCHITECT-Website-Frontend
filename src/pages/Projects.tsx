import React, { useState, useEffect } from 'react';
import { PROJECTS, type ProjectCategory } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { PageHero } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';

const CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'Residential', 'Commercial', 'Hospitality', 'Office', 'Renovation'];

const Projects: React.FC = () => {
  const [active, setActive] = useState<string>('All');

  useEffect(() => {
    document.title = 'Our Work | Royal Touch — Interior & Architecture';
  }, []);

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <main>
      <PageHero
        eyebrow="Our Work"
        title="Spaces We've Created"
        subtitle="An archive of residential, commercial, and hospitality projects shaped by our commitment to design, craft, and lasting quality."
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&auto=format"
      />

      <section className="section-py bg-white" aria-label="Projects archive">
        <div className="container-royal">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`filter-tab ${active === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="body-sm mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            {filtered.length} {filtered.length === 1 ? 'Project' : 'Projects'}
          </p>

          {/* Grid — editorial asymmetric */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={
                  // Every 5th project spans full width for variety
                  i % 5 === 0 && filtered.length > 3
                    ? 'sm:col-span-2 lg:col-span-2'
                    : ''
                }
              >
                <ProjectCard
                  project={project}
                  variant={i % 5 === 0 && filtered.length > 3 ? 'large' : 'default'}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="body-lg">No projects found in this category.</p>
              <button onClick={() => setActive('All')} className="btn btn-outline-dark mt-4">
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Start Your Project"
        headline="Ready to Build Something Exceptional?"
        subtext="Tell us about your project and let's begin the conversation."
        ctaLabel="Contact Royal Touch →"
        ctaTo="/contact"
      />
    </main>
  );
};

export default Projects;
