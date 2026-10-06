import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { OngoingProject } from '../data/ongoingProjects';

interface OngoingProjectCardProps {
  project: OngoingProject;
}

export const OngoingProjectCard: React.FC<OngoingProjectCardProps> = ({ project }) => {

  return (
    <Link
      to={`/ongoing-projects/${project.slug}`}
      className="block bg-white border border-[#e8e5e0] group overflow-hidden transition-all duration-300 hover:border-[#d4a53a] hover:shadow-[0_10px_30px_rgba(212,165,58,0.12)] flex flex-col h-full"
      aria-label={`View ongoing project: ${project.title}`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden flex-shrink-0">
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
            <span className="badge badge-progress bg-[#d4a53a]/20 text-[#8a5f1c] border border-[#d4a53a]/40 backdrop-blur-md">
              In Progress
            </span>
          ) : project.phase === 'Design' || project.phase === 'Concept' ? (
            <span className="badge badge-soon bg-black/40 text-white/90 border border-white/20 backdrop-blur-md">
              Design Phase
            </span>
          ) : (
            <span className="badge badge-soon bg-black/40 text-white/90 border border-white/20 backdrop-blur-md">
              Coming Soon
            </span>
          )}
        </div>

        {/* Category tag */}
        <div className="absolute bottom-3 right-3">
          <span
            className="text-[0.6rem] tracking-[0.14em] uppercase text-white/90 bg-black/60 backdrop-blur-sm px-2.5 py-1 font-medium"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-[#141210] text-xl font-light mb-1.5 leading-snug group-hover:text-[#8a5f1c] transition-colors"
          >
            {project.title}
          </h3>
          <p className="text-[#6a6258] text-xs mb-3">{project.location}</p>
          <p className="text-[#6a6258] text-xs leading-relaxed line-clamp-2 mb-4">
            {project.description}
          </p>
        </div>

        {/* Progress bar */}
        <div className="pt-3 border-t border-[#f0ede6]">
          <div className="flex items-center justify-between mb-2">
            <span
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-[0.625rem] tracking-[0.12em] uppercase text-[#8c8279] font-medium"
            >
              Phase: {project.phase}
            </span>
            <span
              style={{ fontFamily: 'var(--font-display)' }}
              className="text-xs font-semibold text-[#8a5f1c]"
            >
              {project.progress}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#e8e5e0] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4a53a] to-[#8a5f1c] rounded-full transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>

          {/* Arrow */}
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-[#f0ede6] text-[#8a5f1c] group-hover:text-[#d4a53a] transition-colors duration-300 font-medium">
            <span style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6875rem] tracking-[0.12em] uppercase">
              View Project
            </span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};
