import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = '404 — Page Not Found | Royal Touch';
  }, []);

  return (
    <main className="min-h-screen bg-[#0c0b0a] flex items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=85&auto=format"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[#0c0b0a]/60" />

      <div className="relative z-10 text-center px-6">
        <span
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-700)' }}
          className="text-[8rem] md:text-[12rem] font-light leading-none select-none"
        >
          404
        </span>
        <h1
          style={{ fontFamily: 'var(--font-serif)' }}
          className="text-display-md text-white font-light mt-4 mb-4"
        >
          Page Not Found
        </h1>
        <p className="text-white/50 text-base mb-10 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            Return Home
            <ArrowRight size={14} />
          </Link>
          <Link to="/projects" className="btn btn-outline">
            View Our Work
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
