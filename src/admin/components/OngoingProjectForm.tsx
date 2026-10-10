import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { AdminOngoingProject } from '../context/AdminDataContext';
import { type OngoingCategory, type ProjectPhase, PHASE_ORDER } from '../../data/ongoingProjects';
import { slugify } from '../utils/dateUtils';

interface Props {
  project: AdminOngoingProject | null;
  onSave: (data: Partial<AdminOngoingProject>, isEdit: boolean) => void;
  onClose: () => void;
}

const CATEGORIES: OngoingCategory[] = ['Residential', 'Commercial', 'Hospitality', 'Office', 'Renovation'];

const OngoingProjectForm: React.FC<Props> = ({ project, onSave, onClose }) => {
  const isEdit = !!project;
  const [form, setForm] = useState<Partial<AdminOngoingProject>>(
    isEdit ? { ...project } : {
      title: '', slug: '', location: '', category: 'Residential',
      phase: 'Concept', progress: 0, estimatedCompletion: '',
      description: '', overview: '', coverImage: '', gallery: [], updates: [],
      published: false,
    }
  );
  const [galleryInput, setGalleryInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'updates' | 'media'>('basic');

  useEffect(() => {
    if (!isEdit && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title ?? '') }));
    }
  }, [form.title, isEdit]);

  const set = (k: keyof AdminOngoingProject, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title?.trim()) e.title = 'Title is required';
    if (!form.location?.trim()) e.location = 'Location is required';
    if (!form.description?.trim()) e.description = 'Short description is required';
    if (form.progress === undefined || form.progress < 0 || form.progress > 100) {
      e.progress = 'Progress must be 0–100';
    }
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

  return (
    <div className="admin-modal-overlay" role="dialog" aria-modal="true">
      <div className="admin-form-modal">
        <div className="admin-form-header">
          <h2 className="admin-form-title">{isEdit ? 'Edit Ongoing Project' : 'Add Ongoing Project'}</h2>
          <button onClick={onClose} className="admin-modal-close"><X size={20} /></button>
        </div>

        <div className="admin-form-tabs">
          {[
            { id: 'basic' as const, label: 'Project Info' },
            { id: 'updates' as const, label: 'Updates & Progress' },
            { id: 'media' as const, label: 'Media' },
          ].map((t) => (
            <button key={t.id} type="button"
              className={`admin-form-tab ${activeTab === t.id ? 'admin-form-tab--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-body">
            {activeTab === 'basic' && (
              <div className="admin-form-grid">
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Project Title *</label>
                    <input type="text" value={form.title ?? ''} onChange={(e) => set('title', e.target.value)}
                      className={`admin-field-input ${errors.title ? 'admin-field-input--error' : ''}`}
                      placeholder="e.g. Riverside Residence" id="ongoing-title-input"
                    />
                    {errors.title && <p className="admin-field-error">{errors.title}</p>}
                  </div>
                </div>
                <div>
                  <div className="admin-field">
                    <label className="admin-field-label">Category</label>
                    <select value={form.category ?? 'Residential'} onChange={(e) => set('category', e.target.value as OngoingCategory)} className="admin-field-input">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <div className="admin-field">
                    <label className="admin-field-label">Current Phase</label>
                    <select value={form.phase ?? 'Concept'} onChange={(e) => set('phase', e.target.value as ProjectPhase)} className="admin-field-input">
                      {PHASE_ORDER.map((ph) => <option key={ph} value={ph}>{ph}</option>)}
                    </select>
                  </div>
                </div>
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Location *</label>
                    <input type="text" value={form.location ?? ''} onChange={(e) => set('location', e.target.value)}
                      className={`admin-field-input ${errors.location ? 'admin-field-input--error' : ''}`}
                      placeholder="City, Country"
                    />
                    {errors.location && <p className="admin-field-error">{errors.location}</p>}
                  </div>
                </div>
                <div>
                  <div className="admin-field">
                    <label className="admin-field-label">Estimated Completion</label>
                    <input type="text" value={form.estimatedCompletion ?? ''} onChange={(e) => set('estimatedCompletion', e.target.value)}
                      className="admin-field-input" placeholder="e.g. Q2 2027"
                    />
                  </div>
                </div>
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Short Description *</label>
                    <textarea value={form.description ?? ''} onChange={(e) => set('description', e.target.value)}
                      className={`admin-field-input resize-none ${errors.description ? 'admin-field-input--error' : ''}`}
                      rows={3} placeholder="Brief description…"
                    />
                    {errors.description && <p className="admin-field-error">{errors.description}</p>}
                  </div>
                </div>
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Overview</label>
                    <textarea value={form.overview ?? ''} onChange={(e) => set('overview', e.target.value)}
                      className="admin-field-input resize-y" rows={3} placeholder="Detailed overview…"
                    />
                  </div>
                </div>
                <div className="admin-form-col-2">
                  <div className="admin-field admin-field--inline">
                    <label className="admin-toggle">
                      <input type="checkbox" checked={form.published ?? false} onChange={(e) => set('published', e.target.checked)} />
                      <span className="admin-toggle-slider" />
                    </label>
                    <span className="admin-field-label mb-0">Published (visible on site)</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="admin-form-grid">
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Progress (%)</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range" min={0} max={100} step={5}
                        value={form.progress ?? 0}
                        onChange={(e) => set('progress', Number(e.target.value))}
                        className="flex-1 accent-amber-600"
                        id="progress-slider"
                      />
                      <span className="admin-progress-num">{form.progress ?? 0}%</span>
                    </div>
                    {errors.progress && <p className="admin-field-error">{errors.progress}</p>}
                  </div>
                </div>

                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Project Updates</label>
                    <div className="admin-updates-list">
                      {(form.updates ?? []).map((u, i) => (
                        <div key={i} className="admin-update-item">
                          <div className="admin-update-header">
                            <input
                              type="text"
                              value={u.title}
                              onChange={(e) => {
                                const updates = [...(form.updates ?? [])];
                                updates[i] = { ...u, title: e.target.value };
                                set('updates', updates);
                              }}
                              className="admin-field-input admin-update-title-input"
                              placeholder="Update title"
                            />
                            <input
                              type="text"
                              value={u.date}
                              onChange={(e) => {
                                const updates = [...(form.updates ?? [])];
                                updates[i] = { ...u, date: e.target.value };
                                set('updates', updates);
                              }}
                              className="admin-field-input admin-update-date-input"
                              placeholder="e.g. September 2026"
                            />
                            <button type="button" onClick={() => set('updates', (form.updates ?? []).filter((_, idx) => idx !== i))}
                              className="admin-icon-btn admin-icon-btn--danger shrink-0"
                            >
                              <Minus size={13} />
                            </button>
                          </div>
                          <textarea
                            value={u.description}
                            onChange={(e) => {
                              const updates = [...(form.updates ?? [])];
                              updates[i] = { ...u, description: e.target.value };
                              set('updates', updates);
                            }}
                            className="admin-field-input resize-none mt-2"
                            rows={2}
                            placeholder="Update description…"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        className="admin-add-update-btn"
                        onClick={() => set('updates', [...(form.updates ?? []), { date: '', title: '', description: '', images: [] }])}
                      >
                        <Plus size={13} /> Add Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="admin-form-grid">
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Cover Image URL</label>
                    <input type="url" value={form.coverImage ?? ''} onChange={(e) => set('coverImage', e.target.value)}
                      className="admin-field-input" placeholder="https://…"
                    />
                    {form.coverImage && <img src={form.coverImage} alt="Cover" className="admin-image-preview" />}
                  </div>
                </div>
                <div className="admin-form-col-2">
                  <div className="admin-field">
                    <label className="admin-field-label">Gallery Images</label>
                    <div className="admin-field-addrow">
                      <input type="url" value={galleryInput} onChange={(e) => setGalleryInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImage())}
                        className="admin-field-input" placeholder="https://… (Enter to add)"
                      />
                      <button type="button" onClick={addGalleryImage} className="admin-add-btn"><Plus size={14} /></button>
                    </div>
                    <div className="admin-gallery-list">
                      {(form.gallery ?? []).map((url, i) => (
                        <div key={i} className="admin-gallery-item">
                          <img src={url} alt={`Gallery ${i + 1}`} className="admin-gallery-thumb" />
                          <button type="button" onClick={() => set('gallery', (form.gallery ?? []).filter((_, idx) => idx !== i))}
                            className="admin-gallery-remove">
                            <Minus size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="admin-form-footer">
            <div className="admin-form-tab-nav" />
            <div className="admin-form-actions">
              <button type="button" className="admin-btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="admin-btn-primary" id="save-ongoing-btn">
                {isEdit ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OngoingProjectForm;
