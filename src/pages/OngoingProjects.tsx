import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Filter, X } from 'lucide-react';
import { ONGOING_PROJECTS, PHASE_ORDER } from '../data/ongoingProjects';
import type { OngoingProject, ProjectPhase, OngoingCategory } from '../data/ongoingProjects';
import { CTASection } from '../components/CTASection';

// ─── Phase badge colours ───────────────────────────────────────────────────
const PHASE_COLORS: Record<ProjectPhase, { bg: string; text: string; dot: string }> = {
  Concept:      { bg: 'bg-purple-50',   text: 'text-purple-700',   dot: 'bg-purple-400' },
  Design:       { bg: 'bg-blue-50',     text: 'text-blue-700',     dot: 'bg-blue-400' },
  Approval:     { bg: 'bg-amber-50',    text: 'text-amber-700',    dot: 'bg-amber-400' },
  Construction: { bg: 'bg-orange-50',   text: 'text-orange-700',   dot: 'bg-orange-500' },
  Finishing:    { bg: 'bg-emerald-50',  text: 'text-emerald-700',  dot: 'bg-emerald-500' },
  Completed:    { bg: 'bg-green-50',    text: 'text-green-700',    dot: 'bg-green-500' },
};

// ─── Single project card (white-theme) ────────────────────────────────────
const ProjectCard: React.FC<{ project: OngoingProject }> = ({ project }) => {
  const phase = PHASE_COLORS[project.phase];

  return (
    <Link
      to={`/ongoing-projects/${project.slug}`}
      className="group flex flex-col bg-white border border-[#e8e5e0] overflow-hidden
                 hover:border-[#d4a53a] hover:shadow-[0_8px_40px_rgba(212,165,58,0.12)]
                 transition-all duration-400"
      aria-label={`View project: ${project.title}`}
    >
      {/* Cover image */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        {/* gradient bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Phase badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.6rem] font-semibold
                         tracking-[0.12em] uppercase rounded-sm ${phase.bg} ${phase.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${phase.dot} animate-pulse`} />
            {project.phase}
          </span>
        </div>

        {/* Category */}
        <div className="absolute bottom-3 right-3">
          <span
            className="text-[0.58rem] tracking-[0.14em] uppercase text-white/80 bg-black/50
                       backdrop-blur-sm px-2 py-0.5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3
          className="text-[#141210] text-xl font-light leading-snug mb-1"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {project.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-4">
          <MapPin size={12} className="text-[#d4a53a] flex-shrink-0" />
          <span className="text-[#6b6560] text-xs">{project.location}</span>
        </div>

        {/* Description */}
        <p className="text-[#6b6560] text-sm leading-relaxed mb-5 flex-1 line-clamp-2">
          {project.description}
        </p>

        {/* Progress bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[0.6rem] tracking-[0.12em] uppercase text-[#9a948f]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Overall Progress
            </span>
            <span
              className="text-sm font-semibold text-[#d4a53a]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.progress}%
            </span>
          </div>
          {/* Track */}
          <div className="h-1.5 bg-[#ece9e4] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4a53a] to-[#e8c060] rounded-full transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-[#f0ede8]">
          {project.estimatedCompletion && (
            <div className="flex items-center gap-1.5">
              <Calendar size={11} className="text-[#9a948f]" />
              <span className="text-[0.65rem] text-[#9a948f]">{project.estimatedCompletion}</span>
            </div>
          )}
          <span
            className="ml-auto flex items-center gap-1.5 text-[0.65rem] tracking-[0.1em] uppercase
                       text-[#d4a53a] group-hover:gap-2.5 transition-all duration-300"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            View Details
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
};

// ─── Stats bar ─────────────────────────────────────────────────────────────
const StatsBar: React.FC = () => {
  const total = ONGOING_PROJECTS.length;
  const inProgress = ONGOING_PROJECTS.filter(
    (p) => p.phase === 'Construction' || p.phase === 'Finishing',
  ).length;
  const avgProgress = Math.round(
    ONGOING_PROJECTS.reduce((s, p) => s + p.progress, 0) / total,
  );

  return (
    <div className="bg-white border-b border-[#e8e5e0]">
      <div className="container-royal py-8">
        <div className="grid grid-cols-3 divide-x divide-[#e8e5e0]">
          {[
            { label: 'Total Projects', value: total },
            { label: 'In Progress', value: inProgress },
            { label: 'Avg. Completion', value: `${avgProgress}%` },
          ].map(({ label, value }) => (
            <div key={label} className="px-6 first:pl-0 last:pr-0 text-center sm:text-left">
              <p
                className="text-2xl sm:text-3xl font-light text-[#141210] mb-1"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {value}
              </p>
              <p
                className="text-[0.62rem] tracking-[0.14em] uppercase text-[#9a948f]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main page ──────────────────────────────────────────────────────────────
const OngoingProjects: React.FC = () => {
  useEffect(() => {
    document.title = 'Ongoing Projects | Royal Touch — Currently Building';
  }, []);

  const [activePhase, setActivePhase] = useState<ProjectPhase | 'All'>('All');
  const [activeCategory, setActiveCategory] = useState<OngoingCategory | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);

  const allCategories: OngoingCategory[] = Array.from(
    new Set(ONGOING_PROJECTS.map((p) => p.category)),
  ) as OngoingCategory[];

  const filtered = useMemo(() => {
    return ONGOING_PROJECTS.filter((p) => {
      const phaseOk = activePhase === 'All' || p.phase === activePhase;
      const catOk = activeCategory === 'All' || p.category === activeCategory;
      return phaseOk && catOk;
    });
  }, [activePhase, activeCategory]);

  const hasFilters = activePhase !== 'All' || activeCategory !== 'All';

  const clearFilters = () => {
    setActivePhase('All');
    setActiveCategory('All');
  };

  return (
    <main className="bg-[#faf7f2]">
      {/* ── Hero ── */}
      <section
        className="relative h-[60vh] min-h-[420px] overflow-hidden"
        aria-label="Ongoing projects hero"
      >
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=90&auto=format"
          alt="Construction site"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/85 via-[#0c0b0a]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end container-royal pb-12 sm:pb-16">
          <p className="eyebrow-light mb-4 flex items-center gap-2 text-[0.65rem]">
            <span className="w-6 h-px bg-[#d4a53a]" />
            Currently Building
          </p>
          <h1
            className="text-white text-display-xl font-light leading-tight mb-4"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            What We're
            <br />
            <span style={{ color: 'var(--gold-400)' }}>Building Now.</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed">
            Follow the spaces currently taking shape with Royal Touch —
            from concept to construction.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsBar />

      {/* ── Phase timeline legend ── */}
      <div className="bg-white border-b border-[#e8e5e0]">
        <div className="container-royal py-5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <p
              className="text-[0.6rem] tracking-[0.14em] uppercase text-[#9a948f] mr-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Project Journey:
            </p>
            {PHASE_ORDER.map((phase, i) => {
              const c = PHASE_COLORS[phase];
              const active = ONGOING_PROJECTS.some((p) => p.phase === phase);
              return (
                <React.Fragment key={phase}>
                  <button
                    onClick={() => setActivePhase(activePhase === phase ? 'All' : phase)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.58rem] font-semibold
                               tracking-[0.1em] uppercase rounded-sm transition-all duration-200
                               ${activePhase === phase
                                  ? `${c.bg} ${c.text} ring-1 ring-current`
                                  : active
                                  ? `${c.bg} ${c.text} opacity-70 hover:opacity-100`
                                  : 'bg-[#f0ede8] text-[#9a948f] opacity-40 cursor-default'
                               }`}
                    disabled={!active}
                    aria-pressed={activePhase === phase}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                    {phase}
                  </button>
                  {i < PHASE_ORDER.length - 1 && (
                    <span className="text-[#c8c4bf] text-xs hidden sm:inline">›</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Filter + Grid ── */}
      <section className="section-py" aria-label="Ongoing projects grid">
        <div className="container-royal">

          {/* Filter bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e8e5e0]">
            {/* Count */}
            <div>
              <p
                className="text-[#141210] text-lg font-light"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {filtered.length === ONGOING_PROJECTS.length
                  ? `${ONGOING_PROJECTS.length} Projects in Progress`
                  : `${filtered.length} of ${ONGOING_PROJECTS.length} Projects`}
              </p>
              {hasFilters && (
                <p className="text-[#9a948f] text-xs mt-0.5">
                  Filtered by:{' '}
                  {[activePhase !== 'All' && activePhase, activeCategory !== 'All' && activeCategory]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              )}
            </div>

            {/* Filter toggle + clear */}
            <div className="flex items-center gap-3">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-[0.65rem] tracking-[0.1em] uppercase
                             text-[#d4a53a] hover:text-[#141210] transition-colors duration-200"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <X size={12} />
                  Clear filters
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 border text-[0.65rem] tracking-[0.12em]
                            uppercase transition-all duration-200
                            ${showFilters
                              ? 'border-[#d4a53a] bg-[#d4a53a] text-white'
                              : 'border-[#d0cdc8] text-[#6b6560] hover:border-[#d4a53a] hover:text-[#d4a53a]'
                            }`}
                style={{ fontFamily: 'var(--font-display)' }}
                aria-expanded={showFilters}
              >
                <Filter size={12} />
                {showFilters ? 'Hide Filters' : 'Filter Projects'}
              </button>
            </div>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="bg-white border border-[#e8e5e0] p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* By phase */}
              <div>
                <p
                  className="text-[0.62rem] tracking-[0.16em] uppercase text-[#9a948f] mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  By Phase
                </p>
                <div className="flex flex-wrap gap-2">
                  {(['All', ...PHASE_ORDER] as const).map((ph) => {
                    const c = ph !== 'All' ? PHASE_COLORS[ph] : null;
                    return (
                      <button
                        key={ph}
                        onClick={() => setActivePhase(ph as ProjectPhase | 'All')}
                        className={`px-3 py-1.5 text-[0.62rem] tracking-[0.1em] uppercase border
                                    transition-all duration-200 rounded-sm
                                    ${activePhase === ph
                                      ? 'bg-[#141210] text-white border-[#141210]'
                                      : 'border-[#e8e5e0] text-[#6b6560] hover:border-[#d4a53a] hover:text-[#d4a53a]'
                                    }`}
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {c && (
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${c.dot} mr-1.5`} />
                        )}
                        {ph}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* By category */}
              <div>
                <p
                  className="text-[0.62rem] tracking-[0.16em] uppercase text-[#9a948f] mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  By Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {(['All', ...allCategories] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat as OngoingCategory | 'All')}
                      className={`px-3 py-1.5 text-[0.62rem] tracking-[0.1em] uppercase border
                                  transition-all duration-200 rounded-sm
                                  ${activeCategory === cat
                                    ? 'bg-[#141210] text-white border-[#141210]'
                                    : 'border-[#e8e5e0] text-[#6b6560] hover:border-[#d4a53a] hover:text-[#d4a53a]'
                                  }`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <p
                className="text-[#141210] text-2xl font-light mb-3"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                No projects found
              </p>
              <p className="text-[#9a948f] text-sm mb-6">
                Try adjusting the filters to see more results.
              </p>
              <button
                onClick={clearFilters}
                className="btn btn-outline text-xs px-5 py-2.5"
              >
                Clear Filters
              </button>
            </div>
          )}
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
