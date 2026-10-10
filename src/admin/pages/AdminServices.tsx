import React, { useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Plus, Pencil, Trash2, Globe, EyeOff } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import type { AdminService } from '../context/AdminDataContext';
import { generateId } from '../utils/dateUtils';
import ServiceForm from '../components/ServiceForm';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

const AdminServices: React.FC = () => {
  const { state, dispatch, logActivity } = useAdminData();
  const { setMobileOpen } = useOutletContext<OutletCtx>();
  const [searchParams] = useSearchParams();

  const [formOpen, setFormOpen] = useState(searchParams.get('action') === 'new');
  const [editService, setEditService] = useState<AdminService | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleTogglePublish = (s: AdminService) => {
    dispatch({ type: 'TOGGLE_SERVICE_PUBLISHED', payload: s.id });
    logActivity(s.published ? 'Unpublished service' : 'Published service', s.title, 'Service');
  };

  const handleDelete = (id: string) => {
    const s = state.services.find((x) => x.id === id)!;
    dispatch({ type: 'DELETE_SERVICE', payload: id });
    logActivity('Deleted service', s.title, 'Service');
    setDeleteConfirm(null);
  };

  const handleSave = (data: Partial<AdminService>, isEdit: boolean) => {
    const now = new Date().toISOString();
    if (isEdit && editService) {
      const updated: AdminService = { ...editService, ...data, updatedAt: now };
      dispatch({ type: 'UPDATE_SERVICE', payload: updated });
      logActivity('Updated service', updated.title, 'Service');
    } else {
      const newSvc: AdminService = {
        id: generateId('svc'),
        number: String(state.services.length + 1).padStart(2, '0'),
        published: true,
        updatedAt: now,
        title: '', description: '', details: [], image: '',
        ...data,
      };
      dispatch({ type: 'ADD_SERVICE', payload: newSvc });
      logActivity('Created service', newSvc.title, 'Service');
    }
    setFormOpen(false);
    setEditService(null);
  };

  return (
    <>
      <AdminTopBar title="Services" breadcrumbs={[{ label: 'Services' }]} onMenuClick={() => setMobileOpen(true)} />

      <div className="admin-page-content">
        <div className="admin-toolbar">
          <p className="admin-results-count">{state.services.length} service{state.services.length !== 1 ? 's' : ''}</p>
          <button className="admin-btn-primary" onClick={() => { setEditService(null); setFormOpen(true); }} id="add-service-btn">
            <Plus size={15} /> Add Service
          </button>
        </div>

        <div className="admin-services-grid">
          {state.services.map((s) => (
            <div key={s.id} className="admin-service-card">
              <div className="admin-service-cover">
                <img src={s.image || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&q=80'} alt={s.title} className="admin-service-img" loading="lazy" />
                <div className="admin-service-overlay">
                  <span className="admin-service-number">{s.number}</span>
                </div>
              </div>
              <div className="admin-service-body">
                <div className="admin-service-header">
                  <p className="admin-service-title">{s.title}</p>
                  <span className={`admin-status-pill ${s.published ? 'admin-status-pill--pub' : 'admin-status-pill--draft'}`}>
                    {s.published ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="admin-service-desc">{s.description}</p>
                <ul className="admin-service-details">
                  {s.details.slice(0, 3).map((d, i) => (
                    <li key={i} className="admin-service-detail-item">· {d}</li>
                  ))}
                  {s.details.length > 3 && (
                    <li className="admin-service-detail-item text-amber-600">+{s.details.length - 3} more</li>
                  )}
                </ul>
              </div>
              <div className="admin-service-actions">
                <button className="admin-icon-btn" onClick={() => { setEditService(s); setFormOpen(true); }} title="Edit" id={`edit-service-${s.id}`}>
                  <Pencil size={14} />
                </button>
                <button
                  className={`admin-icon-btn ${s.published ? 'text-amber-600' : 'text-emerald-600'}`}
                  onClick={() => handleTogglePublish(s)}
                  title={s.published ? 'Unpublish' : 'Publish'}
                >
                  {s.published ? <EyeOff size={14} /> : <Globe size={14} />}
                </button>
                <button className="admin-icon-btn admin-icon-btn--danger" onClick={() => setDeleteConfirm(s.id)} title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {formOpen && (
        <ServiceForm service={editService} onSave={handleSave} onClose={() => { setFormOpen(false); setEditService(null); }} />
      )}

      {deleteConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-confirm-modal">
            <div className="admin-confirm-icon"><Trash2 size={24} /></div>
            <h3 className="admin-confirm-title">Delete Service?</h3>
            <p className="admin-confirm-text">
              This will permanently delete <strong>{state.services.find((s) => s.id === deleteConfirm)?.title}</strong>.
            </p>
            <div className="admin-confirm-actions">
              <button className="admin-btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="admin-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminServices;
