import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, RotateCcw } from 'lucide-react';
import type { AdminProject } from '../context/AdminDataContext';
import type { ProjectCategory } from '../../data/projects';
import { slugify } from '../utils/dateUtils';

interface ProjectFormProps {
  project: AdminProject | null;
  onSave: (data: Partial<AdminProject>, isEdit: boolean) => void;
  onClose: () => void;
}

const CATEGORIES: ProjectCategory[] = ['Residential', 'Commercial', 'Hospitality', 'Office', 'Renovation'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 15 }, (_, i) => CURRENT_YEAR - i);

const EMPTY_FORM: Partial<AdminProject> = {
  title: '', slug: '', location: '', category: 'Residential',
  year: CURRENT_YEAR, description: '', overview: '', concept: '',
  designApproach: '', materials: '', execution: '', coverImage: '',
  gallery: [], services: [], featured: false, published: false,
};

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onClose }) => {
  const isEdit = !!project;
  const [form, setForm] = useState<Partial<AdminProject>>(
    isEdit ? { ...project } : { ...EMPTY_FORM }
  );
  const [galleryInput, setGalleryInput] = useState('');
  const [serviceInput, setServiceInput] = useState('');
  const [slugManual, setSlugManual] = useState(isEdit);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'media'>('basic');

  useEffect(() => {
    if (!slugManual && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title ?? '') }));
    }
  }, [form.title, slugManual]);

  const set = (k: keyof AdminProject, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.title?.trim()) e.title = 'Title is required';
    if (!form.slug?.trim()) e.slug = 'Slug is required';
    if (!form.location?.trim()) e.location = 'Location is required';
    if (!form.description?.trim()) e.description = 'Short description is required';
    if (!form.coverImage?.trim()) e.coverImage = 'Cover image URL is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form, isEdit);
  };

  const addGalleryImage = () => {
    if (galleryInput.trim()) {
      set('gallery', [...(form.gallery ?? []), galleryInput.trim()]);
      setGalleryInput('');
    }
  };

  const removeGalleryImage = (i: number) => {
    set('gallery', (form.gallery ?? []).filter((_, idx) => idx !== i));
  };

  const addService = () => {
    if (serviceInput.trim()) {
      set('services', [...(form.services ?? []), serviceInput.trim()]);
      setServiceInput('');
    }
  };

  const removeService = (i: number) => {
    set('services', (form.services ?? []).filter((_, idx) => idx !== i));
  };

  const TABS = [
    { id: 'basic' as const, label: 'Basic Info' },
    { id: 'content' as const, label: 'Content' },
    { id: 'media' as const, label: 'Media & Services' },
  ];

  return (
    <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit project' : 'Add project'}>
      <div className="admin-form-modal">
        {/* Header */}
        <div className="admin-form-header">
          <h2 className="admin-form-title">{isEdit ? 'Edit Project' : 'Add New Project'}</h2>
          <button onClick={onClose} className="admin-modal-close" aria-label="Close form">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="admin-form-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`admin-form-tab ${activeTab === t.id ? 'admin-form-tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-body">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="admin-form-grid">
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Project Title *</label>
                    <input
                      type="text"
                      value={form.title ?? ''}
                      onChange={(e) => set('title', e.target.value)}
                      className={`admin-field-input ${errors.title ? 'admin-field-input--error' : ''}`}
                      placeholder="e.g. Modern Family Residence"
                      id="project-title-input"
                    />
                    {errors.title && <p className="admin-field-error">{errors.title}</p>}
                  </div>
                </div>

                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">
                      URL Slug *
                      <button
                        type="button"
                        className="admin-field-label-btn"
                        onClick={() => {
                          setSlugManual(false);
                          set('slug', slugify(form.title ?? ''));
                        }}
                        title="Auto-generate from title"
                      >
                        <RotateCcw size={11} /> Auto
                      </button>
                    </label>
                    <input
                      type="text"
                      value={form.slug ?? ''}
                      onChange={(e) => { set('slug', e.target.value); setSlugManual(true); }}
                      className={`admin-field-input admin-field-mono ${errors.slug ? 'admin-field-input--error' : ''}`}
                      placeholder="modern-family-residence"
                    />
                    {errors.slug && <p className="admin-field-error">{errors.slug}</p>}
                  </div>
                </div>

                <div>
                  <div className="admin-field">
                    <label className="admin-field-label">Category</label>
                    <select
                      value={form.category ?? 'Residential'}
                      onChange={(e) => set('category', e.target.value as ProjectCategory)}
                      className="admin-field-input"
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="admin-field">
                    <label className="admin-field-label">Year</label>
                    <select
                      value={form.year ?? CURRENT_YEAR}
                      onChange={(e) => set('year', Number(e.target.value))}
                      className="admin-field-input"
                    >
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Location *</label>
                    <input
                      type="text"
                      value={form.location ?? ''}
                      onChange={(e) => set('location', e.target.value)}
                      className={`admin-field-input ${errors.location ? 'admin-field-input--error' : ''}`}
                      placeholder="City, Country"
                    />
                    {errors.location && <p className="admin-field-error">{errors.location}</p>}
                  </div>
                </div>

                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Short Description *</label>
                    <textarea
                      value={form.description ?? ''}
                      onChange={(e) => set('description', e.target.value)}
                      className={`admin-field-input resize-none ${errors.description ? 'admin-field-input--error' : ''}`}
                      rows={3}
                      placeholder="Brief description shown in project cards…"
                    />
                    {errors.description && <p className="admin-field-error">{errors.description}</p>}
                  </div>
                </div>

                <div className="admin-form-col-2">
                  <div className="admin-field admin-field--inline">
                    <label className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={form.featured ?? false}
                        onChange={(e) => set('featured', e.target.checked)}
                        id="featured-toggle"
                      />
                      <span className="admin-toggle-slider" />
                    </label>
                    <span className="admin-field-label mb-0">Featured project</span>
                  </div>
                  <div className="admin-field admin-field--inline">
                    <label className="admin-toggle">
                      <input
                        type="checkbox"
                        checked={form.published ?? false}
                        onChange={(e) => set('published', e.target.checked)}
                        id="published-toggle"
                      />
                      <span className="admin-toggle-slider" />
                    </label>
                    <span className="admin-field-label mb-0">Published (visible on site)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="admin-form-grid">
                {[
                  { key: 'overview' as const, label: 'Project Overview', placeholder: 'Detailed project overview…' },
                  { key: 'concept' as const, label: 'Design Concept', placeholder: 'The central design idea…' },
                  { key: 'designApproach' as const, label: 'Design Approach', placeholder: 'How the design was approached…' },
                  { key: 'materials' as const, label: 'Materials Used', placeholder: 'List of materials…' },
                  { key: 'execution' as const, label: 'Execution Details', placeholder: 'How the project was executed…' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="admin-form-col-2">
                    <div className="admin-field">
                      <label className="admin-field-label">{label}</label>
                      <textarea
                        value={(form[key] as string) ?? ''}
                        onChange={(e) => set(key, e.target.value)}
                        className="admin-field-input resize-y"
                        rows={3}
                        placeholder={placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Media & Services Tab */}
            {activeTab === 'media' && (
              <div className="admin-form-grid">
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Cover Image URL *</label>
                    <input
                      type="url"
                      value={form.coverImage ?? ''}
                      onChange={(e) => set('coverImage', e.target.value)}
                      className={`admin-field-input ${errors.coverImage ? 'admin-field-input--error' : ''}`}
                      placeholder="https://…"
                    />
                    {errors.coverImage && <p className="admin-field-error">{errors.coverImage}</p>}
                    {form.coverImage && (
                      <img src={form.coverImage} alt="Cover preview" className="admin-image-preview" />
                    )}
                  </div>
                </div>

                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Gallery Images</label>
                    <div className="admin-field-addrow">
                      <input
                        type="url"
                        value={galleryInput}
                        onChange={(e) => setGalleryInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                        className="admin-field-input"
                        placeholder="https://… (press Enter to add)"
                      />
                      <button type="button" onClick={addGalleryImage} className="admin-add-btn">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="admin-gallery-list">
                      {(form.gallery ?? []).map((url, i) => (
                        <div key={i} className="admin-gallery-item">
                          <img src={url} alt={`Gallery ${i + 1}`} className="admin-gallery-thumb" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(i)}
                            className="admin-gallery-remove"
                            aria-label={`Remove gallery image ${i + 1}`}
                          >
                            <Minus size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Services Provided</label>
                    <div className="admin-field-addrow">
                      <input
                        type="text"
                        value={serviceInput}
                        onChange={(e) => setServiceInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                        className="admin-field-input"
                        placeholder="e.g. Interior Design"
                      />
                      <button type="button" onClick={addService} className="admin-add-btn">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="admin-tag-list">
                      {(form.services ?? []).map((s, i) => (
                        <span key={i} className="admin-tag">
                          {s}
                          <button
                            type="button"
                            onClick={() => removeService(i)}
                            aria-label={`Remove ${s}`}
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="admin-form-footer">
            <div className="admin-form-tab-nav">
              {activeTab !== 'basic' && (
                <button
                  type="button"
                  className="admin-btn-ghost"
                  onClick={() => setActiveTab(activeTab === 'media' ? 'content' : 'basic')}
                >
                  ← Back
                </button>
              )}
              {activeTab !== 'media' && (
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setActiveTab(activeTab === 'basic' ? 'content' : 'media')}
                >
                  Next →
                </button>
              )}
            </div>
            <div className="admin-form-actions">
              <button type="button" className="admin-btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="admin-btn-primary" id="save-project-btn">
                {isEdit ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
