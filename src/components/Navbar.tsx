import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import { SITE_CONFIG } from '../data/site';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Work', to: '/projects' },
  { label: 'Ongoing', to: '/ongoing-projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
];

export const Navbar: React.FC = () => {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-[#0c0b0a]/95 backdrop-blur-sm border-b border-white/5 shadow-xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-royal flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Royal Touch — Home">
            <img
              src="/logo.png"
              alt="Royal Touch Interior & Architect Logo"
              className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <p
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-xs font-bold tracking-[0.18em] text-white uppercase leading-none"
              >
                Royal Touch
              </p>
              <p
                style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
                className="text-[0.6rem] tracking-[0.15em] uppercase leading-none mt-0.5"
              >
                Interior &amp; Architect
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.slice(0, -1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-display text-xs font-medium tracking-[0.12em] uppercase transition-all duration-300 relative pb-0.5 ${
                    isActive
                      ? 'text-[#d4a53a]'
                      : 'text-white/70 hover:text-white'
                  }`
                }
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-[#d4a53a] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden lg:inline-flex btn btn-gold text-xs py-2.5 px-5"
            >
              Start a Project
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white transition-colors hover:text-[#d4a53a]"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Royal Touch Logo" className="w-10 h-10 object-contain" />
            <div>
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-xs font-bold tracking-[0.18em] text-white uppercase">
                Royal Touch
              </p>
              <p style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }} className="text-[0.6rem] tracking-[0.15em] uppercase">
                Interior &amp; Architect
              </p>
            </div>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-[#d4a53a] transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {NAV_LINKS.map((link, i) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block py-3 border-b border-white/5 transition-all duration-300 ${
                      isActive ? 'text-[#d4a53a]' : 'text-white/80 hover:text-white hover:pl-2'
                    }`
                  }
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 300,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Contact */}
        <div className="mt-auto pt-8 border-t border-white/10">
          <p style={{ fontFamily: 'var(--font-display)' }} className="eyebrow-light mb-4">Get in Touch</p>
          <p className="text-white/60 text-sm mb-1">{SITE_CONFIG.email}</p>
          <p className="text-white/60 text-sm mb-4">{SITE_CONFIG.phone}</p>
          <Link
            to="/contact"
            className="btn btn-gold w-full justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Start a Project
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </>
  );
};
