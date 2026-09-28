import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';

const NAV_COLUMNS = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Our Work', to: '/projects' },
      { label: 'Ongoing Projects', to: '/ongoing-projects' },
      { label: 'Services', to: '/services' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Royal Touch', to: '/about' },
      { label: 'Our Process', to: '/process' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0c0b0a] text-white" aria-label="Site footer">
      {/* Main footer content */}
      <div className="container-royal pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-4 mb-6 group">
              <img
                src="/logo.png"
                alt="Royal Touch Logo"
                className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <p
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="text-sm font-bold tracking-[0.2em] uppercase text-white"
                >
                  Royal Touch
                </p>
                <p
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-400)' }}
                  className="text-[0.65rem] tracking-[0.18em] uppercase"
                >
                  Interior &amp; Architect
                </p>
              </div>
            </Link>

            <p
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-400)' }}
              className="text-lg font-light italic mb-4 tracking-wide"
            >
              Dream. Design. Build.
            </p>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Creating refined interiors and architectural spaces where thoughtful design, craftsmanship, and functionality come together.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagram}
                aria-label="Royal Touch Instagram"
                className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-[#d4a53a] hover:text-[#d4a53a] transition-all duration-300"
              >
                {/* Instagram icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href={SITE_CONFIG.facebook}
                aria-label="Royal Touch Facebook"
                className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-[#d4a53a] hover:text-[#d4a53a] transition-all duration-300"
              >
                {/* Facebook icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                aria-label="Royal Touch WhatsApp"
                className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/50 hover:border-[#d4a53a] hover:text-[#d4a53a] transition-all duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.131.563 4.13 1.544 5.862L.057 23.998l6.293-1.648A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.59 9.59 0 01-4.888-1.336l-.352-.208-3.636.953.969-3.542-.229-.365A9.554 9.554 0 012.4 12C2.4 6.699 6.699 2.4 12 2.4S21.6 6.699 21.6 12 17.301 21.6 12 21.6z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[#d4a53a] mb-5"
              >
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/50 text-sm hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-[#d4a53a] group-hover:w-4 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-6">
            <div>
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.15em] uppercase text-[#d4a53a] mb-1">Phone</p>
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-white/50 text-sm hover:text-white transition-colors">
                {SITE_CONFIG.phone}
              </a>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.15em] uppercase text-[#d4a53a] mb-1">Email</p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-white/50 text-sm hover:text-white transition-colors">
                {SITE_CONFIG.email}
              </a>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.6rem] tracking-[0.15em] uppercase text-[#d4a53a] mb-1">Location</p>
              <p className="text-white/50 text-sm">{SITE_CONFIG.location}</p>
            </div>
          </div>

          <Link to="/contact" className="btn btn-outline text-xs py-2.5 px-5 self-start md:self-auto">
            Start a Project
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-royal py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs tracking-wide">{SITE_CONFIG.copyright}</p>
          <p
            style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-700)' }}
            className="text-[0.6rem] tracking-[0.15em] uppercase"
          >
            Design / Build / Inspire
          </p>
        </div>
      </div>
    </footer>
  );
};
