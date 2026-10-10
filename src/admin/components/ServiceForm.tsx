import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { AdminService } from '../context/AdminDataContext';

interface Props {
  service: AdminService | null;
  onSave: (data: Partial<AdminService>, isEdit: boolean) => void;
  onClose: () => void;
}

const ServiceForm: React.FC<Props> = ({ service, onSave, onClose }) => {
  const isEdit = !!service;
  const [form, setForm] = useState<Partial<AdminService>>(
    isEdit ? { ...service } : { title: '', description: '', details: [], image: '', published: true }
  );
  const [detailInput, setDetailInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof AdminService, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title?.trim()) e.title = 'Title is required';
    if (!form.description?.trim()) e.description = 'Description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSave(form, isEdit);
  };

  const addDetail = () => {
    if (detailInput.trim()) {
      set('details', [...(form.details ?? []), detailInput.trim()]);
      setDetailInput('');
    }
  };

  return (
    <div className="admin-modal-overlay" role="dialog" aria-modal="true">
      <div className="admin-form-modal admin-form-modal--sm">
        <div className="admin-form-header">
          <h2 className="admin-form-title">{isEdit ? 'Edit Service' : 'Add New Service'}</h2>
          <button onClick={onClose} className="admin-modal-close"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-form-body">
            <div className="admin-form-grid">
              <div className="admin-form-col-2">
                <div className="admin-field">
                  <label className="admin-field-label">Service Title *</label>
                  <input type="text" value={form.title ?? ''} onChange={(e) => set('title', e.target.value)}
                    className={`admin-field-input ${errors.title ? 'admin-field-input--error' : ''}`}
                    placeholder="e.g. Interior Design" id="service-title-input"
                  />
                  {errors.title && <p className="admin-field-error">{errors.title}</p>}
                </div>
              </div>
              <div className="admin-form-col-2">
                <div className="admin-field">
                  <label className="admin-field-label">Description *</label>
                  <textarea value={form.description ?? ''} onChange={(e) => set('description', e.target.value)}
                    className={`admin-field-input resize-none ${errors.description ? 'admin-field-input--error' : ''}`}
                    rows={3} placeholder="Service description…"
                  />
                  {errors.description && <p className="admin-field-error">{errors.description}</p>}
                </div>
              </div>
              <div className="admin-form-col-2">
                <div className="admin-field">
                  <label className="admin-field-label">Image URL</label>
                  <input type="url" value={form.image ?? ''} onChange={(e) => set('image', e.target.value)}
                    className="admin-field-input" placeholder="https://…"
                  />
                  {form.image && <img src={form.image} alt="Service" className="admin-image-preview" />}
                </div>
              </div>
              <div className="admin-form-col-2">
                <div className="admin-field">
                  <label className="admin-field-label">Service Details</label>
                  <div className="admin-field-addrow">
                    <input type="text" value={detailInput} onChange={(e) => setDetailInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDetail())}
                      className="admin-field-input" placeholder="e.g. Space planning and layout"
                    />
                    <button type="button" onClick={addDetail} className="admin-add-btn"><Plus size={14} /></button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {(form.details ?? []).map((d, i) => (
                      <div key={i} className="admin-detail-row">
                        <span className="admin-detail-text">{d}</span>
                        <button type="button" onClick={() => set('details', (form.details ?? []).filter((_, idx) => idx !== i))}
                          className="admin-icon-btn admin-icon-btn--danger shrink-0">
                          <Minus size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-form-col-2">
                <div className="admin-field admin-field--inline">
                  <label className="admin-toggle">
                    <input type="checkbox" checked={form.published ?? true} onChange={(e) => set('published', e.target.checked)} />
                    <span className="admin-toggle-slider" />
                  </label>
                  <span className="admin-field-label mb-0">Published</span>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-form-footer">
            <div />
            <div className="admin-form-actions">
              <button type="button" className="admin-btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="admin-btn-primary" id="save-service-btn">
                {isEdit ? 'Save Changes' : 'Create Service'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
