import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Tag,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { ONGOING_PROJECTS, PHASE_ORDER } from '../data/ongoingProjects';
import type { ProjectPhase } from '../data/ongoingProjects';
import { CTASection } from '../components/CTASection';

// ─── Phase colour map ───────────────────────────────────────────────────────
const PHASE_COLORS: Record<ProjectPhase, { bg: string; text: string; dot: string }> = {
  Concept:      { bg: 'bg-purple-50',   text: 'text-purple-700',   dot: 'bg-purple-400' },
  Design:       { bg: 'bg-blue-50',     text: 'text-blue-700',     dot: 'bg-blue-400' },
  Approval:     { bg: 'bg-amber-50',    text: 'text-amber-700',    dot: 'bg-amber-400' },
  Construction: { bg: 'bg-orange-50',   text: 'text-orange-700',   dot: 'bg-orange-500' },
  Finishing:    { bg: 'bg-emerald-50',  text: 'text-emerald-700',  dot: 'bg-emerald-500' },
  Completed:    { bg: 'bg-green-50',    text: 'text-green-700',    dot: 'bg-green-500' },
};

// ─── Lightbox ───────────────────────────────────────────────────────────────
const Lightbox: React.FC<{
  images: string[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ images, current, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <p
        className="absolute top-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {current + 1} / {images.length}
      </p>

      {/* Image */}
      <div className="max-w-5xl w-full px-16" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[current]}
          alt={`Gallery image ${current + 1}`}
          className="w-full max-h-[80vh] object-contain"
        />
      </div>

      {/* Nav buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 sm:left-6 text-white/50 hover:text-white transition-colors
                       w-10 h-10 border border-white/20 flex items-center justify-center
                       hover:border-white/60"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 sm:right-6 text-white/50 hover:text-white transition-colors
                       w-10 h-10 border border-white/20 flex items-center justify-center
                       hover:border-white/60"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
};

// ─── Main component ─────────────────────────────────────────────────────────
const OngoingProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = ONGOING_PROJECTS.find((p) => p.slug === slug);
  const projectIdx = ONGOING_PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = projectIdx > 0 ? ONGOING_PROJECTS[projectIdx - 1] : null;
  const nextProject = projectIdx < ONGOING_PROJECTS.length - 1 ? ONGOING_PROJECTS[projectIdx + 1] : null;
  const phaseIndex = project ? PHASE_ORDER.indexOf(project.phase) : -1;

  // Gallery lightbox
  const allGalleryImages = project
    ? [project.coverImage, ...project.gallery, ...project.updates.flatMap((u) => u.images)]
    : [];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  useEffect(() => {
    if (project) document.title = `${project.title} (In Progress) | Royal Touch`;
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
        <div className="text-center px-6">
          <h1
            className="text-[#141210] text-4xl font-light mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Project Not Found
          </h1>
          <p className="text-[#6b6560] mb-8">
            This project doesn't exist or has been removed.
          </p>
          <Link to="/ongoing-projects" className="btn btn-primary">
            Back to Ongoing Projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    );
  }

  const phaseColor = PHASE_COLORS[project.phase];

  return (
    <main className="bg-[#faf7f2]">
      {/* ── Hero ── */}
      <section
        className="relative h-[70vh] min-h-[500px] max-h-[750px] overflow-hidden"
        aria-label={`${project.title} hero`}
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/90 via-[#0c0b0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/60 to-transparent" />

        {/* Back link */}
        <Link
          to="/ongoing-projects"
          className="absolute top-20 sm:top-24 left-4 sm:left-8 z-10 flex items-center gap-2
                     text-white/70 hover:text-white transition-colors text-xs sm:text-sm
                     bg-black/40 backdrop-blur-md px-3 py-1.5"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
        >
          <ArrowLeft size={13} />
          Ongoing Projects
        </Link>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 container-royal pb-10 sm:pb-14">
          {/* Phase badge */}
          <div className="mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-[0.62rem] font-semibold
                           tracking-[0.14em] uppercase rounded-sm ${phaseColor.bg} ${phaseColor.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${phaseColor.dot} animate-pulse`} />
              {project.phase}
            </span>
          </div>

          <p className="eyebrow-light mb-3 flex items-center gap-2 text-[0.65rem]">
            <span className="w-5 h-px bg-[#d4a53a]" />
            {project.category}
          </p>
          <h1
            className="text-display-xl text-white font-light leading-tight mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {project.title}
          </h1>
          <div className="flex items-center gap-1.5 text-white/50 text-sm">
            <MapPin size={13} className="text-[#d4a53a]" />
            {project.location}
          </div>
        </div>
      </section>

      {/* ── Progress strip ── */}
      <div className="bg-white border-b border-[#e8e5e0]">
        <div className="container-royal py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
            {/* Percentage */}
            <div className="flex items-baseline gap-2 flex-shrink-0">
              <span
                className="text-4xl text-[#141210] font-light"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {project.progress}
              </span>
              <span
                className="text-lg font-semibold"
                style={{ color: 'var(--gold-400)', fontFamily: 'var(--font-display)' }}
              >
                %
              </span>
              <span
                className="text-[0.62rem] tracking-[0.14em] uppercase text-[#9a948f] ml-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Complete
              </span>
            </div>

            {/* Bar */}
            <div className="flex-1 h-1.5 bg-[#ece9e4] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#d4a53a] to-[#e8c060] rounded-full"
                style={{ width: `${project.progress}%`, transition: 'width 1s ease' }}
              />
            </div>

            {/* Est. completion */}
            {project.estimatedCompletion && (
              <div className="flex items-center gap-2 text-[#6b6560] flex-shrink-0">
                <Calendar size={14} className="text-[#d4a53a]" />
                <span className="text-sm">
                  Est. {project.estimatedCompletion}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <section className="section-py" aria-label="Project details">
        <div className="container-royal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">

            {/* ── Left: Overview + Updates ── */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <div>
                <p
                  className="text-[0.62rem] tracking-[0.16em] uppercase text-[#d4a53a] mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  About This Project
                </p>
                <p
                  className="text-[#141210] text-xl sm:text-2xl font-light leading-relaxed mb-5"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {project.overview}
                </p>
                <p className="text-[#6b6560] text-sm sm:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Updates */}
              {project.updates.length > 0 && (
                <div>
                  <p
                    className="text-[0.62rem] tracking-[0.16em] uppercase text-[#d4a53a] mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Latest Site Updates
                  </p>

                  <div className="space-y-8">
                    {project.updates.map((update, i) => (
                      <article
                        key={i}
                        className="bg-white border border-[#e8e5e0] p-6 sm:p-8
                                   hover:border-[#d4a53a]/40 transition-colors duration-300"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <p
                              className="text-[0.6rem] tracking-[0.14em] uppercase text-[#d4a53a] mb-1"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {update.date}
                            </p>
                            <h3
                              className="text-[#141210] text-lg font-light"
                              style={{ fontFamily: 'var(--font-serif)' }}
                            >
                              {update.title}
                            </h3>
                          </div>
                          <span
                            className="text-[0.6rem] tracking-[0.1em] uppercase text-[#9a948f] bg-[#f0ede8]
                                       px-2.5 py-1 flex-shrink-0 mt-1"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            Update #{i + 1}
                          </span>
                        </div>

                        <p className="text-[#6b6560] text-sm leading-relaxed mb-5">
                          {update.description}
                        </p>

                        {update.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {update.images.map((img, j) => {
                              const lbIdx = allGalleryImages.indexOf(img);
                              return (
                                <button
                                  key={j}
                                  className="block aspect-[4/3] overflow-hidden group/img cursor-zoom-in"
                                  onClick={() => lbIdx >= 0 && setLightboxIdx(lbIdx)}
                                  aria-label={`View image ${j + 1} of update: ${update.title}`}
                                >
                                  <img
                                    src={img}
                                    alt={`${update.title} — image ${j + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700
                                               group-hover/img:scale-[1.05]"
                                  />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6 sticky top-24">
              <div className="bg-white border border-[#e8e5e0] shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                {/* Top Gold Accent Bar */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#d4a53a] via-[#efd898] to-[#8a5f1c]" />

                <div className="p-6 sm:p-7">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#f0ede6] mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-4 bg-[#d4a53a] rounded-sm" />
                      <h3
                        className="text-[0.75rem] font-bold tracking-[0.18em] uppercase text-[#141210]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        Project Details
                      </h3>
                    </div>
                    <span
                      className={`text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 font-semibold rounded-sm ${phaseColor.bg} ${phaseColor.text} border border-current/20`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.phase}
                    </span>
                  </div>

                  {/* Details List */}
                  <div className="space-y-3">
                    {[
                      { icon: MapPin, label: 'Location', value: project.location },
                      { icon: Tag, label: 'Category', value: project.category },
                      { icon: Calendar, label: 'Est. Completion', value: project.estimatedCompletion || 'To be confirmed' },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3.5 p-2.5 rounded-sm bg-[#faf7f2]/70 border border-[#f0ede6] hover:border-[#d4a53a]/40 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-sm bg-white border border-[#e8e5e0] flex items-center justify-center text-[#8a5f1c] flex-shrink-0 shadow-2xs">
                          <Icon size={16} strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="text-[0.58rem] font-semibold tracking-[0.14em] uppercase text-[#8c8279] mb-0.5"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {label}
                          </p>
                          <p className="text-[#141210] text-[0.875rem] font-medium truncate">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Project Journey / Timeline */}
                  <div className="mt-7 pt-6 border-t border-[#f0ede6]">
                    <div className="flex items-center justify-between mb-4">
                      <p
                        className="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-[#8a5f1c] flex items-center gap-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <span className="w-3 h-px bg-[#d4a53a]" />
                        Project Journey
                      </p>
                      <span
                        className="text-[0.625rem] font-semibold text-[#8a5f1c]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {project.progress}% Complete
                      </span>
                    </div>

                    <div className="relative pl-2 space-y-3">
                      {/* Vertical connecting line */}
                      <div className="absolute left-[17px] top-3 bottom-3 w-[1.5px] bg-[#e8e5e0] -z-0" />

                      {PHASE_ORDER.map((phase, i) => {
                        const done = i < phaseIndex;
                        const active = i === phaseIndex;
                        const c = PHASE_COLORS[phase];

                        return (
                          <div
                            key={phase}
                            className={`relative z-10 flex items-center justify-between gap-3 p-2 rounded-sm transition-colors ${
                              active ? 'bg-[#fdf9f0] border border-[#d4a53a]/30' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Step circle */}
                              <div
                                className={`w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 text-[0.6rem] font-bold transition-all ${
                                  done
                                    ? 'bg-[#d4a53a] text-white shadow-xs'
                                    : active
                                    ? 'bg-[#8a5f1c] text-white ring-4 ring-[#d4a53a]/20'
                                    : 'bg-white border border-[#d5d0c8] text-[#aaa399]'
                                }`}
                              >
                                {done ? (
                                  <CheckCircle size={11} strokeWidth={2.5} />
                                ) : (
                                  <span>{i + 1}</span>
                                )}
                              </div>

                              {/* Label */}
                              <span
                                className={`text-xs uppercase tracking-[0.08em] ${
                                  done
                                    ? 'text-[#6a6258] font-medium'
                                    : active
                                    ? 'text-[#141210] font-bold'
                                    : 'text-[#aaa399]'
                                }`}
                                style={{ fontFamily: 'var(--font-display)' }}
                              >
                                {phase}
                              </span>
                            </div>

                            {active && (
                              <span
                                className={`text-[0.55rem] tracking-[0.12em] uppercase px-2 py-0.5 font-bold rounded-xs ${c.bg} ${c.text}`}
                                style={{ fontFamily: 'var(--font-display)' }}
                              >
                                Current
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className="mt-7 pt-5 border-t border-[#f0ede6]">
                    <Link
                      to="/contact"
                      className="w-full py-3.5 px-4 bg-[#141210] text-white hover:text-white active:text-white focus:text-white text-[0.68rem] font-semibold tracking-[0.16em] uppercase flex items-center justify-center gap-2 group transition-opacity hover:opacity-95"
                      style={{ fontFamily: 'var(--font-display)', color: '#ffffff' }}
                    >
                      <span className="text-white" style={{ color: '#ffffff' }}>Inquire About Similar Project</span>
                      <ArrowRight size={13} className="text-white group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#ffffff' }} />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {project.gallery.length > 0 && (
        <section className="py-16 bg-white border-t border-[#e8e5e0]" aria-label="Project gallery">
          <div className="container-royal">
            <p
              className="text-[0.62rem] tracking-[0.16em] uppercase text-[#d4a53a] mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Project Gallery
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img, i) => {
                const lbIdx = allGalleryImages.indexOf(img);
                return (
                  <button
                    key={i}
                    className={`overflow-hidden group/gal cursor-zoom-in ${
                      i === 0 ? 'sm:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                    }`}
                    onClick={() => lbIdx >= 0 && setLightboxIdx(lbIdx)}
                    aria-label={`Gallery image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${project.title} — gallery ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700
                                 group-hover/gal:scale-[1.04]"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Prev / Next navigation ── */}
      {(prevProject || nextProject) && (
        <div className="bg-[#faf7f2] border-t border-[#e8e5e0]">
          <div className="container-royal py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevProject ? (
                <Link
                  to={`/ongoing-projects/${prevProject.slug}`}
                  className="group flex items-center gap-4 p-5 bg-white border border-[#e8e5e0]
                             hover:border-[#d4a53a] transition-all duration-300"
                >
                  <ArrowLeft
                    size={18}
                    className="text-[#d4a53a] flex-shrink-0 group-hover:-translate-x-1 transition-transform duration-300"
                  />
                  <div className="min-w-0">
                    <p
                      className="text-[0.58rem] tracking-[0.14em] uppercase text-[#9a948f] mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Previous Project
                    </p>
                    <p
                      className="text-[#141210] text-sm font-light truncate"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {prevProject.title}
                    </p>
                  </div>
                </Link>
              ) : <div />}

              {nextProject && (
                <Link
                  to={`/ongoing-projects/${nextProject.slug}`}
                  className="group flex items-center justify-end gap-4 p-5 bg-white border border-[#e8e5e0]
                             hover:border-[#d4a53a] transition-all duration-300 text-right"
                >
                  <div className="min-w-0">
                    <p
                      className="text-[0.58rem] tracking-[0.14em] uppercase text-[#9a948f] mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      Next Project
                    </p>
                    <p
                      className="text-[#141210] text-sm font-light truncate"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {nextProject.title}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-[#d4a53a] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <CTASection
        eyebrow="Your Project"
        headline="Want to See Your Space Come to Life?"
        subtext="Start the conversation today. We'd love to hear about your project."
        ctaLabel="Start a Project →"
        ctaTo="/contact"
      />

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <Lightbox
          images={allGalleryImages}
          current={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((i) => (i! - 1 + allGalleryImages.length) % allGalleryImages.length)}
          onNext={() => setLightboxIdx((i) => (i! + 1) % allGalleryImages.length)}
        />
      )}
    </main>
  );
};

export default OngoingProjectDetail;
