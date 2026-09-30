import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { ONGOING_PROJECTS } from '../data/ongoingProjects';
import { SERVICES, PROCESS_STEPS } from '../data/services';
import { COMPANY_STATS } from '../data/site';
import { ProjectCard } from '../components/ProjectCard';
import { OngoingProjectCard } from '../components/OngoingProjectCard';
import { CTASection } from '../components/CTASection';
import { useReveal } from '../hooks/useReveal';

// -----------------------------------------------
// HERO SLIDES
// -----------------------------------------------
const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=90&auto=format',
    eyebrow: 'Timeless Spaces, Better Living',
    title: 'Spaces That Define\nThe Way You Live.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=90&auto=format',
    eyebrow: 'Interior & Architecture',
    title: 'Crafted With\nIntention & Precision.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=90&auto=format',
    eyebrow: 'From Concept to Reality',
    title: 'Your Vision,\nBuilt to Last.',
  },
];

// -----------------------------------------------
// HERO SECTION
// -----------------------------------------------
const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % HERO_SLIDES.length);
        setAnimating(false);
      }, 600);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section
      className="relative w-full h-[380px] md:h-screen md:min-h-[600px] overflow-hidden"
      aria-label="Hero"
    >      {/* Background images */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-x-0 top-4 bottom-0 md:inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/80 via-[#0c0b0a]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/60 via-transparent to-transparent" />

      {/* Content */}
      <div
        className="relative z-10 container-royal w-full h-full px-5 pt-32 pb-20 flex flex-col justify-center md:px-8 md:py-0">
        <div
          className="max-w-3xl"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(20px)' : 'translateY(0)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="eyebrow-light mb-3 sm:mb-5 flex items-center gap-2 sm:gap-3 text-[9px] sm:text-xs">
            <span className="w-8 h-px bg-[#d4a53a]" />
            {slide.eyebrow}
          </p>
          <h1
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-[2rem] sm:text-5xl md:text-display-2xl text-white font-light leading-[1.05] mb-4 sm:mb-6 whitespace-pre-line"
          >
            {slide.title}
          </h1>
          <p className="text-white/65 text-[0.8125rem] sm:text-base md:text-lg leading-relaxed max-w-lg mb-6 sm:mb-10">
            Royal Touch creates refined interiors and architectural spaces where thoughtful design, craftsmanship, and functionality come together.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Link to="/projects" className="btn btn-primary text-[10px] sm:text-xs px-4 py-2.5 sm:px-6 sm:py-3">
              Explore Our Work
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
            <Link to="/contact" className="btn btn-outline text-[10px] sm:text-xs px-4 py-2.5 sm:px-6 sm:py-3">            Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 z-10 flex items-center gap-2 sm:gap-3">
        <span className="text-white/40 text-[0.7rem] sm:text-xs tracking-widest" style={{ fontFamily: 'var(--font-display)' }}>
          {String(current + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
        </span>
        <div className="flex gap-1.5 sm:gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 600); }}
              className={`h-px transition-all duration-500 ${i === current ? 'w-6 sm:w-8 bg-[#d4a53a]' : 'w-3 sm:w-4 bg-white/30'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator — visible on tablet & desktop */}
      <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2">
        <ChevronDown size={18} className="text-white/40 animate-bounce" />
        <span
          style={{ fontFamily: 'var(--font-display)' }}
          className="text-white/30 text-[0.6rem] tracking-[0.2em] uppercase"
        >
          Scroll
        </span>
      </div>
    </section>
  );
};

// -----------------------------------------------
// INTRO SECTION
// -----------------------------------------------
const IntroSection: React.FC = () => {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="reveal section-py bg-[#faf7f2]" aria-label="Introduction">
      <div className="container-royal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow mb-5">Royal Touch</p>
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-display-lg text-[#141210] font-light leading-tight mb-6"
            >
              Designing spaces with intention,
              <br />
              <em className="italic text-[#8a5f1c]">building them with precision.</em>
            </h2>
            <p className="body-lg mb-6">
              Royal Touch is a premium interior design and architecture studio committed to creating spaces that are beautiful, purposeful, and enduring. We work closely with our clients to translate their vision into environments that inspire.
            </p>
            <p className="body-lg mb-8">
              Whether it is a private residence, a hospitality project, or a commercial environment, our process is rooted in deep listening, careful craftsmanship, and unwavering attention to detail.
            </p>
            <Link
              to="/about"
              className="btn btn-ghost inline-flex items-center gap-2 text-[#8a5f1c]"
            >
              Discover Royal Touch
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=85&auto=format"
                alt="Premium interior design showcase"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            {/* Gold accent frame */}
            <div
              className="hidden sm:block absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-[#d4a53a]/25 -z-10"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------
// OUR WORK SECTION
// -----------------------------------------------
const CATEGORIES = ['All', 'Residential', 'Commercial', 'Hospitality', 'Office', 'Renovation'] as const;

const OurWorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const ref = useReveal() as React.RefObject<HTMLElement>;

  const filtered = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section ref={ref} className="reveal py-20 sm:py-28 bg-white" aria-label="Our Work">
      <div className="container-royal px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="eyebrow mb-3">Our Work</p>
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-lg text-[#141210] font-light">
              What We've Built
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="body-md max-w-sm text-right hidden md:block">
              From cozy homes to modern commercial spaces, our projects reflect a commitment to quality, creativity, and detail.
            </p>
            <Link to="/projects" className="btn btn-outline-dark text-xs py-2.5 px-5">
              View All Projects
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 sm:mb-12 overflow-x-auto pb-2 max-w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-tab whitespace-nowrap px-5 py-2.5 text-xs font-medium tracking-[0.1em] transition-all duration-300 ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid — matches UI reference 4-column grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom row cards */}
        {filtered.length > 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
            {filtered.slice(4, 7).map((project, i) => (
              <ProjectCard key={project.id} project={project} variant={i === 1 ? 'large' : 'default'} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// -----------------------------------------------
// FEATURED PROJECT
// -----------------------------------------------
const FeaturedProjectSection: React.FC = () => {
  const featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];

  return (
    <section className="relative h-[60vh] sm:h-[70vh] min-h-[400px] sm:min-h-[480px] overflow-hidden group" aria-label="Featured project">
      <img
        src={featured.coverImage}
        alt={featured.title}
        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c0b0a]/90 via-[#0c0b0a]/50 to-transparent" />

      <div className="absolute inset-0 flex items-end pb-10 sm:pb-16 container-royal">
        <div className="max-w-xl">
          <p className="eyebrow-light mb-3 sm:mb-4">Featured Project</p>
          <h2
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-display-xl text-white font-light mb-2 leading-tight"
          >
            {featured.title}
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mb-6">{featured.location} &nbsp;·&nbsp; {featured.category} &nbsp;·&nbsp; {featured.year}</p>
          <Link
            to={`/projects/${featured.slug}`}
            className="btn btn-outline inline-flex items-center gap-2"
          >
            View Project
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------
// ONGOING PROJECTS SECTION
// -----------------------------------------------
const OngoingSection: React.FC = () => {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="reveal section-py bg-[#0c0b0a]" aria-label="Ongoing Projects">
      <div className="container-royal">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div>
            <p className="eyebrow-light mb-3">
              <span className="w-5 h-px bg-[#d4a53a] inline-block mr-2 align-middle" />
              On Going Projects
            </p>
            <h2
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-display-lg text-white font-light"
            >
              What We're Building
            </h2>
            <p className="text-white/45 mt-3 text-sm sm:text-base max-w-sm leading-relaxed">
              These are the spaces currently in progress — where ideas, plans and craftsmanship come together to create something extraordinary.
            </p>
          </div>
          <Link to="/ongoing-projects" className="btn btn-outline self-start md:self-end">
            View All Ongoing Projects
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ONGOING_PROJECTS.slice(0, 3).map((project) => (
            <OngoingProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------
// WHY CHOOSE US / STATS
// -----------------------------------------------
const TrustSection: React.FC = () => {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="reveal section-py bg-[#faf7f2]" aria-label="Why Choose Royal Touch">
      <div className="container-royal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">Why Choose Us</p>
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-lg text-[#141210] font-light mb-5">
              Designing Spaces,
              <br />Building Trust
            </h2>
            <p className="body-lg mb-8 max-w-md">
              We combine creativity, technical expertise, and local insight to deliver spaces that are not just beautiful, but built for real life.
            </p>
            <Link to="/about" className="btn btn-primary">
              Learn More
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {COMPANY_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-5 sm:p-6 border-t-2 border-[#d4a53a]"
              >
                <p
                  style={{ fontFamily: 'var(--font-serif)' }}
                  className="text-2xl sm:text-3xl text-[#141210] font-light mb-1"
                >
                  {stat.value}
                </p>
                <p style={{ fontFamily: 'var(--font-display)' }} className="text-xs tracking-[0.1em] uppercase text-[#8a5f1c] font-semibold mb-1">
                  {stat.label}
                </p>
                <p className="text-[#6a6258] text-xs leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------
// DESIGN PHILOSOPHY
// -----------------------------------------------
const PhilosophySection: React.FC = () => {
  return (
    <section className="section-py bg-[#141210]" aria-label="Design philosophy">
      <div className="container-royal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=900&q=85&auto=format"
              alt="Royal Touch design philosophy — architectural staircase"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div>
            <p className="eyebrow-light mb-4 sm:mb-6">Our Approach</p>
            <h2
              style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
              className="text-display-lg text-white font-light mb-6 sm:mb-8 leading-tight"
            >
              "Design is not decoration.
              <br />It is how a space makes you feel,
              <br />function, and live."
            </h2>
            <div className="w-12 h-px bg-[#d4a53a] mb-6 sm:mb-8" />
            <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
              At Royal Touch, we approach every project as an opportunity to create something genuinely meaningful — spaces that go beyond the surface to create environments that resonate on a deeper level.
            </p>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed">
              Our work is guided by a belief that great design is rooted in understanding — of people, of place, of purpose. We bring this understanding to every decision we make.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------
// PROCESS PREVIEW
// -----------------------------------------------
const ProcessSection: React.FC = () => {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="reveal section-py bg-[#faf7f2]" aria-label="Our process">
      <div className="container-royal">
        <div className="mb-10 sm:mb-12">
          <p className="eyebrow mb-3">How We Work</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-lg text-[#141210] font-light">
              Our Process
            </h2>
            <Link to="/process" className="btn btn-outline-dark text-xs py-2.5 px-5 self-start">
              See Full Process
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#e8e5e0]">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.number} className="bg-[#faf7f2] p-5 sm:p-7 group hover:bg-[#141210] transition-colors duration-400">
              <span
                style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-500)' }}
                className="text-2xl font-light mb-4 block group-hover:text-[#d4a53a]"
              >
                {step.number}
              </span>
              <h3
                style={{ fontFamily: 'var(--font-serif)' }}
                className="text-lg font-light text-[#141210] mb-3 group-hover:text-white"
              >
                {step.title}
              </h3>
              <p className="text-[#6a6258] text-xs sm:text-sm leading-relaxed group-hover:text-white/50">
                {step.description}
              </p>
              {i < PROCESS_STEPS.length - 1 && (
                <div className="mt-6 hidden lg:block">
                  <ArrowRight size={16} className="text-[#c8bfb0] group-hover:text-[#d4a53a] transition-colors" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------
// SERVICES PREVIEW
// -----------------------------------------------
const ServicesPreview: React.FC = () => {
  const ref = useReveal() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className="reveal section-py bg-white" aria-label="Services overview">
      <div className="container-royal">
        <div className="mb-10 sm:mb-12">
          <p className="eyebrow mb-3">What We Do</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-lg text-[#141210] font-light">
              From Vision to Reality.
            </h2>
            <Link to="/services" className="btn btn-outline-dark text-xs py-2.5 px-5 self-start">
              All Services
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8e5e0]">
          {SERVICES.slice(0, 8).map((service) => (
            <div
              key={service.id}
              className="bg-white p-5 sm:p-7 group hover:bg-[#141210] transition-colors duration-400 cursor-pointer"
            >
              <span
                style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
                className="text-xs tracking-[0.1em] mb-3 block"
              >
                {service.number}
              </span>
              <h3
                style={{ fontFamily: 'var(--font-serif)' }}
                className="text-lg sm:text-xl font-light text-[#141210] mb-3 group-hover:text-white leading-snug"
              >
                {service.title}
              </h3>
              <p className="text-[#6a6258] text-xs sm:text-sm leading-relaxed group-hover:text-white/50 line-clamp-3">
                {service.description}
              </p>
              <div className="mt-5 flex items-center gap-2 text-[#d4a53a] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span style={{ fontFamily: 'var(--font-display)' }} className="text-[0.65rem] tracking-[0.1em] uppercase">
                  Learn More
                </span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------
// HOME PAGE
// -----------------------------------------------
const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Royal Touch | Interior & Architecture — Dream. Design. Build.';
  }, []);

  return (
    <main>
      <HeroSection />
      <IntroSection />
      <OurWorkSection />
      <FeaturedProjectSection />
      <OngoingSection />
      <TrustSection />
      <PhilosophySection />
      <ProcessSection />
      <ServicesPreview />
      <CTASection
        eyebrow="Let's Create Something Great"
        headline="Have a Space in Mind?"
        subtext="Let's turn your vision into a space worth experiencing. Get in touch with our team today."
        ctaLabel="Start a Project →"
        ctaTo="/contact"
        backgroundImage="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1800&q=85&auto=format"
      />
    </main>
  );
};

export default Home;