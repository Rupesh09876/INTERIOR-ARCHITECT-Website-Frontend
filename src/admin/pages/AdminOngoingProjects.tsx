import React, { useState, useMemo } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import {
  Plus, Search, Filter, Eye, Pencil, Trash2, Globe, EyeOff, X,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import type { AdminOngoingProject } from '../context/AdminDataContext';
import { formatDate, generateId, slugify } from '../utils/dateUtils';
import { type OngoingCategory, type ProjectPhase, PHASE_ORDER } from '../../data/ongoingProjects';
import OngoingProjectForm from '../components/OngoingProjectForm';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

const CATEGORIES: OngoingCategory[] = ['Residential', 'Commercial', 'Hospitality', 'Office', 'Renovation'];

const AdminOngoingProjects: React.FC = () => {
  const { state, dispatch, logActivity } = useAdminData();
  const { setMobileOpen } = useOutletContext<OutletCtx>();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<ProjectPhase | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<OngoingCategory | 'All'>('All');
  const [formOpen, setFormOpen] = useState(searchParams.get('action') === 'new');
  const [editProject, setEditProject] = useState<AdminOngoingProject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...state.ongoingProjects];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
    }
    if (phaseFilter !== 'All') list = list.filter((p) => p.phase === phaseFilter);
    if (categoryFilter !== 'All') list = list.filter((p) => p.category === categoryFilter);
    return list;
  }, [state.ongoingProjects, search, phaseFilter, categoryFilter]);

  const handleDelete = (id: string) => {
    const p = state.ongoingProjects.find((x) => x.id === id)!;
    dispatch({ type: 'DELETE_ONGOING', payload: id });
    logActivity('Deleted ongoing project', p.title, 'Ongoing');
    setDeleteConfirm(null);
  };

  const handleTogglePublish = (p: AdminOngoingProject) => {
    dispatch({ type: 'TOGGLE_ONGOING_PUBLISHED', payload: p.id });
    logActivity(p.published ? 'Unpublished ongoing project' : 'Published ongoing project', p.title, 'Ongoing');
  };

  const handleSave = (data: Partial<AdminOngoingProject>, isEdit: boolean) => {
    if (isEdit && editProject) {
      const updated: AdminOngoingProject = { ...editProject, ...data, updatedAt: new Date().toISOString() };
      dispatch({ type: 'UPDATE_ONGOING', payload: updated });
      logActivity('Updated ongoing project', updated.title, 'Ongoing');
    } else {
      const newProj: AdminOngoingProject = {
        id: generateId('op'),
        slug: slugify(data.title ?? 'new-project'),
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: '', location: '', category: 'Residential', phase: 'Concept',
        progress: 0, description: '', overview: '', coverImage: '', gallery: [], updates: [],
        ...data,
      };
      dispatch({ type: 'ADD_ONGOING', payload: newProj });
      logActivity('Created ongoing project', newProj.title, 'Ongoing');
    }
    setFormOpen(false);
    setEditProject(null);
  };

  const PHASE_COLORS: Record<ProjectPhase, string> = {
    Concept: 'admin-phase--concept',
    Design: 'admin-phase--design',
    Approval: 'admin-phase--approval',
    Construction: 'admin-phase--construction',
    Finishing: 'admin-phase--finishing',
    Completed: 'admin-phase--completed',
  };

  return (
    <>
      <AdminTopBar
        title="Ongoing Projects"
        breadcrumbs={[{ label: 'Ongoing Projects' }]}
        onMenuClick={() => setMobileOpen(true)}
      />

      <div className="admin-page-content">
        {/* Toolbar */}
        <div className="admin-toolbar">
          <div className="admin-toolbar-left">
            <div className="admin-search-box">
              <Search size={15} />
              <input
                type="search"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="admin-search-input"
              />
              {search && (
                <button onClick={() => setSearch('')} className="admin-search-clear">
                  <X size={13} />
                </button>
              )}
            </div>
            <div className="admin-filter-group">
              <Filter size={14} className="admin-filter-icon" />
              <select value={phaseFilter} onChange={(e) => setPhaseFilter(e.target.value as ProjectPhase | 'All')} className="admin-select">
                <option value="All">All Phases</option>
                {PHASE_ORDER.map((ph) => <option key={ph} value={ph}>{ph}</option>)}
              </select>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value as OngoingCategory | 'All')} className="admin-select">
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button className="admin-btn-primary" onClick={() => { setEditProject(null); setFormOpen(true); }} id="add-ongoing-btn">
            <Plus size={15} /> Add Ongoing Project
          </button>
        </div>

        <p className="admin-results-count">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="admin-empty-state admin-empty-state--page">
            <Search size={40} className="mb-3 opacity-40" />
            <p className="text-lg font-medium">No projects found</p>
          </div>
        ) : (
          <div className="admin-ongoing-grid">
            {filtered.map((p) => (
              <div key={p.id} className="admin-ongoing-card">
                {/* Cover */}
                <div className="admin-ongoing-card-cover">
                  <img
                    src={p.coverImage || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80'}
                    alt={p.title}
                    className="admin-ongoing-card-img"
                    loading="lazy"
                  />
                  <div className="admin-ongoing-card-overlay">
                    <span className={`admin-phase-badge ${PHASE_COLORS[p.phase]}`}>{p.phase}</span>
                    <span className={`admin-status-pill ${p.published ? 'admin-status-pill--pub' : 'admin-status-pill--draft'} text-xs`}>
                      {p.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="admin-ongoing-card-body">
                  <p className="admin-ongoing-card-title">{p.title}</p>
                  <p className="admin-ongoing-card-loc">{p.category} · {p.location}</p>

                  {/* Progress */}
                  <div className="admin-progress-bar mt-2">
                    <div
                      className="admin-progress-fill"
                      style={{ width: `${p.progress}%` }}
                      role="progressbar"
                      aria-valuenow={p.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="admin-ongoing-card-foot">
                    <span className="admin-progress-label">{p.progress}% complete</span>
                    {p.estimatedCompletion && (
                      <span className="admin-ongoing-card-est">Est. {p.estimatedCompletion}</span>
                    )}
                  </div>
                  <p className="admin-ongoing-card-updates">{p.updates.length} update{p.updates.length !== 1 ? 's' : ''} · Last changed {formatDate(p.updatedAt)}</p>
                </div>

                {/* Actions */}
                <div className="admin-ongoing-card-actions">
                  <a
                    href={`/ongoing-projects/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-icon-btn"
                    title="View on site"
                  >
                    <Eye size={14} />
                  </a>
                  <button
                    className="admin-icon-btn"
                    onClick={() => { setEditProject(p); setFormOpen(true); }}
                    title="Edit"
                    id={`edit-ongoing-${p.id}`}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    className={`admin-icon-btn ${p.published ? 'text-amber-600' : 'text-emerald-600'}`}
                    onClick={() => handleTogglePublish(p)}
                    title={p.published ? 'Unpublish' : 'Publish'}
                  >
                    {p.published ? <EyeOff size={14} /> : <Globe size={14} />}
                  </button>
                  <button
                    className="admin-icon-btn admin-icon-btn--danger"
                    onClick={() => setDeleteConfirm(p.id)}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {formOpen && (
        <OngoingProjectForm
          project={editProject}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditProject(null); }}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-confirm-modal">
            <div className="admin-confirm-icon">
              <Trash2 size={24} />
            </div>
            <h3 className="admin-confirm-title">Delete Project?</h3>
            <p className="admin-confirm-text">
              This will permanently delete{' '}
              <strong>{state.ongoingProjects.find((p) => p.id === deleteConfirm)?.title}</strong>.
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

export default AdminOngoingProjects;
