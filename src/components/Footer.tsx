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
    <footer
      className="bg-[#0c0b0a] text-white"
      aria-label="Site footer"
    >
      {/* =========================================================
          MAIN FOOTER
      ========================================================== */}
      <div className="container-royal">

        {/* =======================================================
            BRAND + NAVIGATION
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 lg:gap-20 pt-20 md:pt-24 lg:pt-28 pb-16 md:pb-20 lg:pb-24">

          {/* -----------------------------------------------------
              BRAND
          ------------------------------------------------------ */}
          <div className="md:col-span-6 lg:col-span-7">

            {/* Logo */}
            <Link
              to="/"
              className="inline-flex items-center gap-4 group"
              aria-label="Royal Touch Home"
            >
              <img
                src="/logo.png"
                alt="Royal Touch Logo"
                className="
                  w-14 h-14
                  md:w-16 md:h-16
                  object-contain
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              <div>
                <p
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="
                    text-sm
                    md:text-[0.95rem]
                    font-bold
                    tracking-[0.2em]
                    uppercase
                    text-white
                  "
                >
                  Royal Touch
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--gold-400)',
                  }}
                  className="
                    text-[0.62rem]
                    md:text-[0.68rem]
                    tracking-[0.18em]
                    uppercase
                    mt-0.5
                  "
                >
                  Interior &amp; Architect
                </p>
              </div>
            </Link>

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--gold-400)',
              }}
              className="
                text-xl
                md:text-[1.35rem]
                font-light
                italic
                tracking-wide
                mt-8
                mb-4
              "
            >
              Dream. Design. Build.
            </p>

            {/* Description */}
            <p
              className="
                text-white/50
                text-sm
                md:text-[0.9rem]
                leading-7
                max-w-md
              "
            >
              Creating refined interiors and architectural spaces
              where thoughtful design, craftsmanship, and
              functionality come together.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">

              {/* Instagram */}
              <a
                href={SITE_CONFIG.instagram}
                aria-label="Royal Touch Instagram"
                className="
                  w-10 h-10
                  border border-white/15
                  flex items-center justify-center
                  text-white/50
                  hover:border-[#d4a53a]
                  hover:text-[#d4a53a]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                  />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={SITE_CONFIG.facebook}
                aria-label="Royal Touch Facebook"
                className="
                  w-10 h-10
                  border border-white/15
                  flex items-center justify-center
                  text-white/50
                  hover:border-[#d4a53a]
                  hover:text-[#d4a53a]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                aria-label="Royal Touch WhatsApp"
                className="
                  w-10 h-10
                  border border-white/15
                  flex items-center justify-center
                  text-white/50
                  hover:border-[#d4a53a]
                  hover:text-[#d4a53a]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.131.563 4.13 1.544 5.862L.057 23.998l6.293-1.648A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.59 9.59 0 01-4.888-1.336l-.352-.208-3.636.953.969-3.542-.229-.365A9.554 9.554 0 012.4 12C2.4 6.699 6.699 2.4 12 2.4S21.6 6.699 21.6 12 17.301 21.6 12 21.6z" />
                </svg>
              </a>

            </div>
          </div>

          {/* -----------------------------------------------------
              NAVIGATION
          ------------------------------------------------------ */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-10 md:gap-12">

            {NAV_COLUMNS.map((col) => (
              <div key={col.heading}>

                <h3
                  style={{ fontFamily: 'var(--font-display)' }}
                  className="
                    text-[0.65rem]
                    font-semibold
                    tracking-[0.22em]
                    uppercase
                    text-[#d4a53a]
                    mb-7
                  "
                >
                  {col.heading}
                </h3>

                <ul className="space-y-4">

                  {col.links.map((link) => (
                    <li key={link.to}>

                      <Link
                        to={link.to}
                        className="
                          group
                          inline-flex
                          items-center
                          gap-2
                          text-white/55
                          text-sm
                          leading-6
                          hover:text-white
                          transition-colors
                          duration-300
                        "
                      >
                        <span
                          className="
                            block
                            w-0
                            h-px
                            bg-[#d4a53a]
                            group-hover:w-4
                            transition-all
                            duration-300
                          "
                        />

                        <span>
                          {link.label}
                        </span>
                      </Link>

                    </li>
                  ))}

                </ul>

              </div>
            ))}

          </div>
        </div>

        {/* =======================================================
            CONTACT SECTION
        ======================================================== */}
        <div
          className="
            border-t
            border-white/10
            py-10
            md:py-12
            lg:py-14
          "
        >

          <div className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-10
            md:gap-8
            lg:gap-12
            items-end
          ">

            {/* Contact Label */}
            <div className="md:col-span-2">

              <p
                style={{ fontFamily: 'var(--font-display)' }}
                className="
                  text-[0.65rem]
                  font-semibold
                  tracking-[0.22em]
                  uppercase
                  text-[#d4a53a]
                "
              >
                Contact
              </p>

              <div className="w-8 h-px bg-[#d4a53a] mt-4 opacity-70" />

            </div>

            {/* Phone */}
            <div className="md:col-span-3">

              <p
                style={{ fontFamily: 'var(--font-display)' }}
                className="
                  text-[0.6rem]
                  tracking-[0.18em]
                  uppercase
                  text-white/35
                  mb-2
                "
              >
                Phone
              </p>

              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="
                  text-white/70
                  text-sm
                  hover:text-white
                  transition-colors
                  duration-300
                  break-words
                "
              >
                {SITE_CONFIG.phone}
              </a>

            </div>

            {/* Email */}
            <div className="md:col-span-3">

              <p
                style={{ fontFamily: 'var(--font-display)' }}
                className="
                  text-[0.6rem]
                  tracking-[0.18em]
                  uppercase
                  text-white/35
                  mb-2
                "
              >
                Email
              </p>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="
                  text-white/70
                  text-sm
                  hover:text-white
                  transition-colors
                  duration-300
                  break-all
                "
              >
                {SITE_CONFIG.email}
              </a>

            </div>

            {/* Location */}
            <div className="md:col-span-4">

              <p
                style={{ fontFamily: 'var(--font-display)' }}
                className="
                  text-[0.6rem]
                  tracking-[0.18em]
                  uppercase
                  text-white/35
                  mb-2
                "
              >
                Location
              </p>

              <p className="text-white/70 text-sm leading-6">
                {SITE_CONFIG.location}
              </p>

            </div>

          </div>

          {/* CTA */}
          <div
            className="
              mt-10
              md:mt-12
              pt-8
              border-t
              border-white/5
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-6
            "
          >

            <div>
              <p
                style={{ fontFamily: 'var(--font-serif)' }}
                className="
                  text-white/50
                  text-base
                  italic
                "
              >
                Have a space in mind?
              </p>

              <p className="text-white/30 text-xs mt-1">
                Let&apos;s turn your vision into something exceptional.
              </p>
            </div>

            <Link
              to="/contact"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                min-h-[54px]
                w-full
                sm:w-auto
                min-w-[190px]
                px-7
                border
                border-[#d4a53a]
                text-[#d4a53a]
                text-[0.68rem]
                font-semibold
                tracking-[0.2em]
                uppercase
                hover:bg-[#d4a53a]
                hover:text-[#0c0b0a]
                transition-all
                duration-400
              "
            >
              <span>Start a Project</span>

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================== */}
      <div className="border-t border-white/5">

        <div
          className="
            container-royal
            py-5
            md:py-6
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
            text-center
            sm:text-left
          "
        >

          <p
            className="
              text-white/30
              text-[0.68rem]
              tracking-wide
            "
          >
            {SITE_CONFIG.copyright}
          </p>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--gold-700)',
            }}
            className="
              text-[0.58rem]
              md:text-[0.6rem]
              tracking-[0.2em]
              uppercase
            "
          >
            Design / Build / Inspire
          </p>

        </div>

      </div>
    </footer>
  );
};