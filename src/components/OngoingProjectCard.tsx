import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { OngoingProject } from '../data/ongoingProjects';
import { PHASE_ORDER } from '../data/ongoingProjects';

interface OngoingProjectCardProps {
  project: OngoingProject;
}

export const OngoingProjectCard: React.FC<OngoingProjectCardProps> = ({ project }) => {
  const phaseIndex = PHASE_ORDER.indexOf(project.phase);

  return (
    <Link
      to={`/ongoing-projects/${project.slug}`}
      className="block bg-[#141210] border border-white/8 group overflow-hidden transition-all duration-300 hover:border-[#d4a53a]/30"
      aria-label={`View ongoing project: ${project.title}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="overlay-bottom" />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {project.phase === 'Finishing' || project.phase === 'Construction' ? (
            <span className="badge badge-progress">In Progress</span>
          ) : project.phase === 'Design' || project.phase === 'Concept' ? (
            <span className="badge badge-soon">Design Phase</span>
          ) : (
            <span className="badge badge-soon">Coming Soon</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p
          style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
          className="text-[0.6rem] tracking-[0.14em] uppercase mb-1.5"
        >
          {project.category}
        </p>
        <h3
          style={{ fontFamily: 'var(--font-serif)' }}
          className="text-white text-lg font-light mb-0.5 leading-snug"
        >
          {project.title}
        </h3>
        <p className="text-white/40 text-xs mb-4">{project.location}</p>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[0.6rem] tracking-[0.12em] uppercase text-white/50"
          >
            {project.phase}
          </span>
          <span
            style={{ fontFamily: 'var(--font-display)' }}
            className="text-[0.7rem] font-semibold text-[#d4a53a]"
          >
            {project.progress}%
          </span>
        </div>
        <div className="progress-bar mb-4">
          <div className="progress-fill" style={{ width: `${project.progress}%` }} />
        </div>

        {/* Phase dots */}
        <div className="flex items-center gap-1.5">
          {PHASE_ORDER.slice(0, 5).map((phase, i) => (
            <div
              key={phase}
              className={`flex-1 h-px transition-all duration-500 ${
                i < phaseIndex
                  ? 'bg-[#d4a53a]'
                  : i === phaseIndex
                  ? 'bg-[#d4a53a]/60'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-white/30 text-[0.55rem]">Concept</span>
          <span className="text-white/30 text-[0.55rem]">Complete</span>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-1.5 mt-4 text-[#d4a53a]/60 group-hover:text-[#d4a53a] transition-colors duration-300">
          <span style={{ fontFamily: 'var(--font-display)' }} className="text-[0.65rem] tracking-[0.12em] uppercase">
            View Project
          </span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};
