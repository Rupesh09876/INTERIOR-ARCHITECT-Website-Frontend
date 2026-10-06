import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag, Layers } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { CTASection } from '../components/CTASection';
import { ProjectCard } from '../components/ProjectCard';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[projectIndex];
  const prevProject = PROJECTS[projectIndex - 1];
  const nextProject = PROJECTS[projectIndex + 1];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Royal Touch`;
    }
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-[#141210] mb-4">Project Not Found</h1>
          <Link to="/projects" className="btn btn-primary">
            Back to Our Work
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* HERO — Full width image */}
      <section className="relative h-[90vh] min-h-[500px] overflow-hidden" aria-label={`${project.title} hero`}>
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/20 to-transparent" />

        {/* Back button */}
        <Link
          to="/projects"
          className="absolute top-20 sm:top-24 left-4 sm:left-8 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs sm:text-sm bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-sm"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
        >
          <ArrowLeft size={14} />
          Our Work
        </Link>

        {/* Project title overlay */}
        <div className="absolute bottom-0 left-0 right-0 container-royal pb-8 sm:pb-12">
          <p className="eyebrow-light mb-3 sm:mb-4">
            <span className="w-5 h-px bg-[#d4a53a] inline-block mr-2 align-middle" />
            {project.category}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-xl text-white font-light leading-tight">
            {project.title}
          </h1>
          <p className="text-white/50 text-xs sm:text-sm mt-2">{project.location} &nbsp;·&nbsp; {project.year}</p>
        </div>
      </section>

      {/* PROJECT INFO */}
      <section className="section-py bg-[#faf7f2]" aria-label="Project information">
        <div className="container-royal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Overview */}
            <div className="lg:col-span-2">
              <p className="eyebrow mb-4">Project Overview</p>
              <p style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-[#141210] font-light mb-8 leading-relaxed">
                {project.overview}
              </p>
              <div className="divider-gold mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-2 sm:mb-3">Concept</h3>
                  <p className="body-md">{project.concept}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-2 sm:mb-3">Design Approach</h3>
                  <p className="body-md">{project.designApproach}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-2 sm:mb-3">Materials</h3>
                  <p className="body-md">{project.materials}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-2 sm:mb-3">Execution</h3>
                  <p className="body-md">{project.execution}</p>
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div>
              <div className="bg-white border border-[#e8e5e0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden sticky top-24">
                {/* Top Gold Accent Bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#d4a53a] via-[#efd898] to-[#8a5f1c]" />

                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#f0ede6] mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-4 bg-[#d4a53a] rounded-sm" />
                      <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-[0.75rem] font-bold tracking-[0.18em] uppercase text-[#141210]">
                        Project Details
                      </h3>
                    </div>
                    <span className="text-[0.625rem] tracking-[0.14em] uppercase px-2.5 py-1 bg-[#fdf9f0] border border-[#d4a53a]/30 text-[#8a5f1c] font-semibold rounded-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Details List */}
                  <div className="space-y-3.5">
                    {[
                      { icon: MapPin, label: 'Location', value: project.location },
                      { icon: Calendar, label: 'Year', value: String(project.year) },
                      { icon: Tag, label: 'Category', value: project.category },
                      { icon: Layers, label: 'Status', value: project.status },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3.5 p-2.5 rounded-sm bg-[#faf7f2]/70 border border-[#f0ede6] hover:border-[#d4a53a]/40 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-sm bg-white border border-[#e8e5e0] flex items-center justify-center text-[#8a5f1c] flex-shrink-0 shadow-2xs">
                          <Icon size={16} strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.58rem] font-semibold tracking-[0.14em] uppercase text-[#8c8279] mb-0.5">
                            {label}
                          </p>
                          <p className="text-[#141210] text-[0.875rem] font-medium truncate">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Services Provided */}
                  <div className="mt-6 pt-6 border-t border-[#f0ede6]">
                    <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-[#8a5f1c] mb-3 flex items-center gap-2">
                      <span className="w-3 h-px bg-[#d4a53a]" />
                      Services Provided
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#faf7f2] border border-[#e8e5e0] text-[#3a3530] text-xs rounded-sm hover:border-[#d4a53a] transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a53a]" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Inquiry CTA */}
                  <div className="mt-6 pt-5 border-t border-[#f0ede6]">
                    <Link
                      to="/contact"
                      className="w-full py-3.5 px-4 bg-[#141210] text-white hover:text-white active:text-white focus:text-white text-[0.68rem] font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 group transition-opacity hover:opacity-95"
                      style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}
                    >
                      <span className="text-white" style={{ color: '#ffffff' }}>Inquire About This Project</span>
                      <ArrowRight size={13} className="text-white group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#ffffff' }} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-py bg-white" aria-label="Project gallery">
        <div className="container-royal">
          <p className="eyebrow mb-6 sm:mb-8">Project Gallery</p>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {/* First image — full width */}
            {project.gallery[0] && (
              <div className="aspect-[16/9] sm:aspect-[16/7] overflow-hidden">
                <img
                  src={project.gallery[0]}
                  alt={`${project.title} — gallery image 1`}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            )}
            {/* Two column on sm+ */}
            {project.gallery.length > 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {project.gallery.slice(1, 3).map((img, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img}
                      alt={`${project.title} — gallery image ${i + 2}`}
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
            {/* Remaining */}
            {project.gallery.slice(3).map((img, i) => (
              <div key={i} className="aspect-[16/9] sm:aspect-[16/7] overflow-hidden">
                <img
                  src={img}
                  alt={`${project.title} — gallery image ${i + 4}`}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREV / NEXT NAV */}
      <section className="bg-[#faf7f2] border-t border-[#e8e5e0]" aria-label="Project navigation">
        <div className="container-royal">
          <div className="flex flex-col sm:flex-row sm:divide-x divide-y sm:divide-y-0 divide-[#e8e5e0]">
            {prevProject ? (
              <Link to={`/projects/${prevProject.slug}`} className="py-6 sm:py-10 sm:pr-8 flex-1 group flex items-center gap-4">
                <ArrowLeft size={18} className="text-[#c8bfb0] group-hover:text-[#d4a53a] transition-colors flex-shrink-0" />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#c8bfb0] mb-1">Previous</p>
                  <p style={{ fontFamily: 'var(--font-serif)' }} className="text-base sm:text-lg font-light text-[#141210] group-hover:text-[#8a5f1c] transition-colors">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {nextProject ? (
              <Link to={`/projects/${nextProject.slug}`} className="py-6 sm:py-10 sm:pl-8 flex-1 group flex items-center justify-end gap-4 text-right">
                <div>
                  <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#c8bfb0] mb-1">Next</p>
                  <p style={{ fontFamily: 'var(--font-serif)' }} className="text-base sm:text-lg font-light text-[#141210] group-hover:text-[#8a5f1c] transition-colors">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight size={18} className="text-[#c8bfb0] group-hover:text-[#d4a53a] transition-colors flex-shrink-0" />
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </section>

      {/* Related projects */}
      <section className="section-py bg-white" aria-label="More projects">
        <div className="container-royal">
          <p className="eyebrow mb-6">More Projects</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Start Your Project"
        subtext="Inspired? Let's talk about bringing your vision to life."
        ctaLabel="Contact Royal Touch →"
        ctaTo="/contact"
      />
    </main>
  );
};

export default ProjectDetail;
