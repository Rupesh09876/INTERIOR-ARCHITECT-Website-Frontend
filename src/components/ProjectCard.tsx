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
    variant === 'large' ? 'h-[480px]' :
    variant === 'portrait' ? 'h-[420px]' :
    'h-[320px]';

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`project-card block ${heightClass} group`}
      aria-label={`View project: ${project.title}`}
    >
      <img
        src={project.coverImage}
        alt={project.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      <div className="project-card-overlay">
        <div className="flex items-end justify-between">
          <div>
            <p
              style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
              className="text-[0.6rem] tracking-[0.14em] uppercase mb-1 opacity-80"
            >
              {project.category}
            </p>
            <h3
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-white text-xl font-light mb-1 leading-tight"
            >
              {project.title}
            </h3>
            <p className="text-white/50 text-xs tracking-wide">
              {project.location} &nbsp;·&nbsp; {project.year}
            </p>
          </div>
          <div className="w-9 h-9 border border-white/30 flex items-center justify-center text-white/50 group-hover:border-[#d4a53a] group-hover:text-[#d4a53a] transition-all duration-300 flex-shrink-0 ml-4">
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
};
