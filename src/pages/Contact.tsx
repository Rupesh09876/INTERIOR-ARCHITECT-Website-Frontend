import React, { useEffect, useState } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { SITE_CONFIG } from '../data/site';
import { PageHero } from '../components/SectionHeading';

type ProjectType = 'Residential' | 'Commercial' | 'Hospitality' | 'Office' | 'Renovation' | 'Architecture' | 'Interior Design' | 'Other';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: ProjectType | '';
  location: string;
  budget: string;
  timeline: string;
  message: string;
}

const INITIAL_FORM: FormData = {
  fullName: '',
  email: '',
  phone: '',
  projectType: '',
  location: '',
  budget: '',
  timeline: '',
  message: '',
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact Royal Touch | Let's Create Something Exceptional";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: Connect to backend API endpoint when available
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's Create Something Exceptional."
        subtitle="Tell us about your project. We'd love to hear about your vision and explore how we can bring it to life."
        backgroundImage="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=85&auto=format"
      />

      <section className="section-py bg-[#faf7f2]" aria-label="Contact form and information">
        <div className="container-royal">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form — takes 3 columns */}
            <div className="lg:col-span-3">
              <p className="eyebrow mb-6">Project Inquiry</p>

              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 bg-[#141210] flex items-center justify-center mx-auto mb-6">
                    <ArrowRight size={20} className="text-[#d4a53a]" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)' }} className="text-display-md text-[#141210] font-light mb-4">
                    Thank You
                  </h3>
                  <p className="body-lg max-w-sm mx-auto mb-6">
                    Your inquiry has been received. We will be in touch within 1-2 business days.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline-dark">
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                    <div>
                      <label htmlFor="fullName" className="eyebrow block mb-2">Full Name *</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="eyebrow block mb-2">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="eyebrow block mb-2">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="projectType" className="eyebrow block mb-2">Project Type *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={form.projectType}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="" disabled>Select project type</option>
                        {['Residential', 'Commercial', 'Hospitality', 'Office', 'Renovation', 'Architecture', 'Interior Design', 'Other'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="eyebrow block mb-2">Project Location</label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="eyebrow block mb-2">Estimated Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="" disabled>Select range</option>
                        {[
                          'Under ₹ 10 Lakh',
                          '₹ 10 – 25 Lakh',
                          '₹ 25 – 50 Lakh',
                          '₹ 50 Lakh – 1 Crore',
                          'Above ₹ 1 Crore',
                          'To be discussed',
                        ].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="timeline" className="eyebrow block mb-2">Project Timeline</label>
                      <input
                        id="timeline"
                        name="timeline"
                        type="text"
                        value={form.timeline}
                        onChange={handleChange}
                        placeholder="e.g. Starting Q1 2026"
                        className="form-input"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="eyebrow block mb-2">Tell Us About Your Project *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your project, inspiration, and anything else we should know..."
                        className="form-input resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn btn-primary disabled:opacity-60"
                      id="submit-inquiry-btn"
                    >
                      {submitting ? 'Sending...' : 'Send Project Inquiry'}
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact info — 2 columns */}
            <div className="lg:col-span-2">
              <p className="eyebrow mb-6">Get in Touch</p>

              <div className="space-y-8 mb-10">
                {[
                  { label: 'Phone', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                  { label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                  { label: 'Location', value: SITE_CONFIG.location, href: undefined },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.65rem] tracking-[0.18em] uppercase text-[#8a5f1c] mb-1">
                      {label}
                    </p>
                    {href ? (
                      <a href={href} className="text-[#141210] text-base hover:text-[#8a5f1c] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-[#141210] text-base">{value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div>
                <p style={{ fontFamily: 'var(--font-display)' }} className="text-[0.65rem] tracking-[0.18em] uppercase text-[#8a5f1c] mb-4">
                  Follow Our Work
                </p>
                <div className="flex gap-3">
                  {[
                    { label: 'Instagram', href: SITE_CONFIG.instagram },
                    { label: 'Facebook', href: SITE_CONFIG.facebook },
                    { label: 'WhatsApp', href: SITE_CONFIG.whatsapp },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={`Royal Touch ${label}`}
                      className="px-4 py-2 border border-[#e8e5e0] text-xs text-[#6a6258] hover:border-[#d4a53a] hover:text-[#8a5f1c] transition-all duration-300"
                      style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="mt-10 p-7 bg-[#141210]">
                <p
                  style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
                  className="text-white text-lg font-light leading-relaxed mb-4"
                >
                  "We believe every exceptional space begins with an honest conversation."
                </p>
                <p className="eyebrow-light">— Royal Touch</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
