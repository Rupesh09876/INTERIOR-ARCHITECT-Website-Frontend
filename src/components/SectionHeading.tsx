import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}) => {
  const textAlign = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  const textColor = light ? 'text-white' : 'text-[#141210]';
  const subtitleColor = light ? 'text-white/55' : 'text-[#6a6258]';

  return (
    <div className={`flex flex-col ${textAlign} ${className}`}>
      {eyebrow && (
        <p className={`${light ? 'eyebrow-light' : 'eyebrow'} mb-4 flex items-center gap-2`}>
          <span
            className="inline-block w-6 h-px"
            style={{ background: light ? 'var(--gold-400)' : 'var(--gold-500)' }}
          />
          {eyebrow}
        </p>
      )}
      <h2
        style={{ fontFamily: 'var(--font-serif)' }}
        className={`text-display-lg ${textColor} leading-tight`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed max-w-xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  overlay = true,
}) => {
  return (
    <section className="relative h-[50vh] min-h-[380px] flex items-end pb-16 overflow-hidden">
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {overlay && <div className="absolute inset-0 bg-[#0c0b0a]/65" />}
        </>
      ) : (
        <div className="absolute inset-0 bg-[#0c0b0a]" />
      )}

      <div className="container-royal relative z-10">
        {eyebrow && (
          <p className="eyebrow-light mb-4">
            <span className="inline-block w-6 h-px bg-[#d4a53a] mr-2 align-middle" />
            {eyebrow}
          </p>
        )}
        <h1
          style={{ fontFamily: 'var(--font-serif)' }}
          className="text-display-xl text-white font-light max-w-3xl leading-tight"
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/55 mt-4 text-base max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
