import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'large' | 'portrait';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, variant = 'default' }) => {
  const heightClass =
    variant === 'large' ? 'h-[440px] sm:h-[480px]' :
    variant === 'portrait' ? 'h-[380px] sm:h-[420px]' :
    'h-[340px] sm:h-[380px]';

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`project-card block ${heightClass} group relative overflow-hidden`}
      aria-label={`View project: ${project.title}`}
    >
      <img
        src={project.coverImage}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      <div className="project-card-overlay">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p
              style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
              className="text-[0.65rem] tracking-[0.14em] uppercase mb-1.5 opacity-90 font-semibold"
            >
              {project.category}
            </p>
            <h3
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-white text-xl sm:text-2xl font-light mb-1 leading-tight"
            >
              {project.title}
            </h3>
            <p className="text-white/60 text-xs tracking-wide">
              {project.location} &nbsp;·&nbsp; {project.year}
            </p>
          </div>
          <div className="w-9 h-9 border border-white/30 flex items-center justify-center text-white/70 group-hover:border-[#d4a53a] group-hover:text-[#d4a53a] group-hover:bg-[#d4a53a]/10 transition-all duration-300 flex-shrink-0">
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
};
