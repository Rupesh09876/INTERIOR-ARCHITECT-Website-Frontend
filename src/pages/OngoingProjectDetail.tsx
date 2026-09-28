import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag, CheckCircle, Circle } from 'lucide-react';
import { ONGOING_PROJECTS, PHASE_ORDER } from '../data/ongoingProjects';
import { CTASection } from '../components/CTASection';

const OngoingProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = ONGOING_PROJECTS.find((p) => p.slug === slug);
  const phaseIndex = project ? PHASE_ORDER.indexOf(project.phase) : -1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} (In Progress) | Royal Touch`;
    }
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0c0b0a]">
        <div className="text-center">
          <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-white mb-4">Project Not Found</h1>
          <Link to="/ongoing-projects" className="btn btn-outline">
            Back to Ongoing Projects <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0c0b0a]">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[480px] overflow-hidden" aria-label={`${project.title} — in progress`}>
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/30 to-[#0c0b0a]/20" />

        <Link
          to="/ongoing-projects"
          className="absolute top-20 sm:top-24 left-4 sm:left-8 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs sm:text-sm bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-sm"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
        >
          <ArrowLeft size={14} />
          Ongoing Projects
        </Link>

        <div className="absolute bottom-0 left-0 right-0 container-royal pb-8 sm:pb-12">
          {/* IN PROGRESS badge */}
          <div className="mb-3 sm:mb-4">
            <span className="badge badge-progress">In Progress</span>
          </div>
          <p className="eyebrow-light mb-3">
            <span className="w-5 h-px bg-[#d4a53a] inline-block mr-2 align-middle" />
            {project.category}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-xl text-white font-light">
            {project.title}
          </h1>
          <p className="text-white/50 text-xs sm:text-sm mt-2">{project.location}</p>
        </div>
      </section>

      {/* Project info + Phase timeline */}
      <section className="section-py" aria-label="Project progress">
        <div className="container-royal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Overview */}
            <div className="lg:col-span-2">
              <p className="eyebrow-light mb-4">About This Project</p>
              <p style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-white font-light mb-6 leading-relaxed">
                {project.overview}
              </p>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">{project.description}</p>

              {/* Updates */}
              {project.updates.length > 0 && (
                <div className="mt-10 sm:mt-12">
                  <p className="eyebrow-light mb-6 sm:mb-8">Latest Updates</p>
                  <div className="space-y-8 sm:space-y-10">
                    {project.updates.map((update, i) => (
                      <div key={i} className="border-l border-[#d4a53a]/30 pl-4 sm:pl-6">
                        <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.65rem] tracking-[0.12em] uppercase text-[#d4a53a] mb-2">
                          {update.date}
                        </p>
                        <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-base sm:text-lg font-light text-white mb-3">
                          {update.title}
                        </h3>
                        <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                          {update.description}
                        </p>
                        {update.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {update.images.map((img, j) => (
                              <div key={j} className="aspect-[4/3] overflow-hidden">
                                <img
                                  src={img}
                                  alt={`Update ${i + 1} — ${update.title}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Details panel */}
              <div className="bg-[#141210] border border-white/8 p-8 mb-6">
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-[0.7rem] tracking-[0.15em] uppercase text-[#d4a53a] mb-6">
                  Project Details
                </h3>
                <ul className="space-y-5">
                  {[
                    { icon: MapPin, label: 'Location', value: project.location },
                    { icon: Tag, label: 'Category', value: project.category },
                    { icon: Calendar, label: 'Est. Completion', value: project.estimatedCompletion || 'To be confirmed' },
                  ].map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon size={15} className="text-[#d4a53a] mt-0.5 flex-shrink-0" />
                      <div>
                        <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#d4a53a]/70 mb-0.5">
                          {label}
                        </p>
                        <p className="text-white text-sm">{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress panel */}
              <div className="bg-[#141210] border border-white/8 p-8">
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-[0.7rem] tracking-[0.15em] uppercase text-[#d4a53a] mb-6">
                  Construction Progress
                </h3>

                {/* Percentage */}
                <div className="flex items-end justify-between mb-3">
                  <span style={{ fontFamily: 'var(--font-serif)' }} className="text-4xl text-white font-light">
                    {project.progress}
                    <span className="text-lg text-[#d4a53a]">%</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)' }} className="text-xs tracking-[0.1em] uppercase text-white/40 pb-1">
                    Complete
                  </span>
                </div>
                <div className="progress-bar mb-8">
                  <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                </div>

                {/* Phase timeline */}
                <div className="space-y-3">
                  {PHASE_ORDER.map((phase, i) => {
                    const done = i < phaseIndex;
                    const active = i === phaseIndex;
                    return (
                      <div key={phase} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 flex items-center justify-center flex-shrink-0 ${
                            done ? 'text-[#d4a53a]' : active ? 'text-[#d4a53a]' : 'text-white/20'
                          }`}
                        >
                          {done ? (
                            <CheckCircle size={16} />
                          ) : active ? (
                            <Circle size={16} className="animate-pulse" />
                          ) : (
                            <Circle size={16} />
                          )}
                        </div>
                        <div className="flex-1">
                          <span
                            style={{ fontFamily: 'var(--font-display)' }}
                            className={`text-xs tracking-[0.08em] uppercase ${
                              done ? 'text-[#d4a53a]/60' :
                              active ? 'text-[#d4a53a] font-semibold' :
                              'text-white/20'
                            }`}
                          >
                            {String(i + 1).padStart(2, '0')}. {phase}
                          </span>
                        </div>
                        {active && (
                          <span className="badge badge-progress text-[0.55rem]">Current</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="section-py border-t border-white/5" aria-label="Project gallery">
          <div className="container-royal">
            <p className="eyebrow-light mb-8">Project Gallery</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((img, i) => (
                <div key={i} className={`overflow-hidden ${i === 0 ? 'sm:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'}`}>
                  <img
                    src={img}
                    alt={`${project.title} — gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Your Project"
        headline="Want to See Your Space Come to Life?"
        subtext="Start the conversation today. We'd love to hear about your project."
        ctaLabel="Start a Project →"
        ctaTo="/contact"
      />
    </main>
  );
};

export default OngoingProjectDetail;
