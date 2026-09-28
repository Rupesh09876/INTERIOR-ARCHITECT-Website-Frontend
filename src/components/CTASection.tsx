import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  eyebrow?: string;
  headline: string;
  subtext: string;
  ctaLabel?: string;
  ctaTo?: string;
  backgroundImage?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  eyebrow = "Let's Create Something Great",
  headline,
  subtext,
  ctaLabel = 'Start a Project',
  ctaTo = '/contact',
  backgroundImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=85&auto=format',
}) => {
  return (
    <section
      className="relative py-32 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0c0b0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/60 to-transparent" />
      </div>

      <div className="container-royal relative z-10">
        <div className="max-w-2xl">
          <p className="eyebrow-light mb-5">
            <span className="gold-line-sm" />
            {eyebrow}
          </p>
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-display-lg text-white mb-5"
          >
            {headline}
          </h2>
          <p className="text-white/60 text-base mb-10 leading-relaxed max-w-md">
            {subtext}
          </p>
          <Link to={ctaTo} className="btn btn-gold">
            {ctaLabel}
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
};
