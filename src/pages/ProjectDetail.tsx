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
          className="absolute top-24 left-8 z-10 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
        >
          <ArrowLeft size={16} />
          Our Work
        </Link>

        {/* Project title overlay */}
        <div className="absolute bottom-0 left-0 right-0 container-royal pb-12">
          <p className="eyebrow-light mb-4">
            <span className="w-5 h-px bg-[#d4a53a] inline-block mr-2 align-middle" />
            {project.category}
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-xl text-white font-light leading-tight">
            {project.title}
          </h1>
          <p className="text-white/50 mt-2">{project.location} &nbsp;·&nbsp; {project.year}</p>
        </div>
      </section>

      {/* PROJECT INFO */}
      <section className="section-py bg-[#faf7f2]" aria-label="Project information">
        <div className="container-royal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Overview */}
            <div className="lg:col-span-2">
              <p className="eyebrow mb-4">Project Overview</p>
              <p style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-[#141210] font-light mb-8 leading-relaxed">
                {project.overview}
              </p>
              <div className="divider-gold mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-3">Concept</h3>
                  <p className="body-md">{project.concept}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-3">Design Approach</h3>
                  <p className="body-md">{project.designApproach}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-3">Materials</h3>
                  <p className="body-md">{project.materials}</p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] mb-3">Execution</h3>
                  <p className="body-md">{project.execution}</p>
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div>
              <div className="bg-white p-8 border-t-2 border-[#d4a53a]">
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-[0.7rem] tracking-[0.15em] uppercase text-[#8a5f1c] mb-6">
                  Project Details
                </h3>
                <ul className="space-y-5">
                  {[
                    { icon: MapPin, label: 'Location', value: project.location },
                    { icon: Calendar, label: 'Year', value: String(project.year) },
                    { icon: Tag, label: 'Category', value: project.category },
                    { icon: Layers, label: 'Status', value: project.status },
                  ].map(({ icon: Icon, label, value }) => (
                    <li key={label} className="flex items-start gap-3">
                      <Icon size={15} className="text-[#d4a53a] mt-0.5 flex-shrink-0" />
                      <div>
                        <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#8a5f1c] mb-0.5">
                          {label}
                        </p>
                        <p className="text-[#141210] text-sm">{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-[#e8e5e0]">
                  <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#8a5f1c] mb-3">
                    Services Provided
                  </p>
                  <ul className="space-y-2">
                    {project.services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-[#6a6258]">
                        <span className="w-3 h-px bg-[#d4a53a]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-py bg-white" aria-label="Project gallery">
        <div className="container-royal">
          <p className="eyebrow mb-8">Project Gallery</p>
          <div className="grid grid-cols-1 gap-4">
            {/* First image — full width */}
            {project.gallery[0] && (
              <div className="aspect-[16/7] overflow-hidden">
                <img
                  src={project.gallery[0]}
                  alt={`${project.title} — gallery image 1`}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            )}
            {/* Two column */}
            {project.gallery.length > 2 && (
              <div className="grid grid-cols-2 gap-4">
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
              <div key={i} className="aspect-[16/7] overflow-hidden">
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
          <div className="grid grid-cols-2 divide-x divide-[#e8e5e0]">
            {prevProject ? (
              <Link to={`/projects/${prevProject.slug}`} className="py-10 pr-8 group flex items-center gap-4">
                <ArrowLeft size={20} className="text-[#c8bfb0] group-hover:text-[#d4a53a] transition-colors flex-shrink-0" />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#c8bfb0] mb-1">Previous</p>
                  <p style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] group-hover:text-[#8a5f1c] transition-colors">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link to={`/projects/${nextProject.slug}`} className="py-10 pl-8 group flex items-center justify-end gap-4 text-right">
                <div>
                  <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.12em] uppercase text-[#c8bfb0] mb-1">Next</p>
                  <p style={{ fontFamily: 'var(--font-serif)' }} className="text-lg font-light text-[#141210] group-hover:text-[#8a5f1c] transition-colors">
                    {nextProject.title}
                  </p>
                </div>
                <ArrowRight size={20} className="text-[#c8bfb0] group-hover:text-[#d4a53a] transition-colors flex-shrink-0" />
              </Link>
            ) : <div />}
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
