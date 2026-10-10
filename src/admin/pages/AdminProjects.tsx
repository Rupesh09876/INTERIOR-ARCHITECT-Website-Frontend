import React, { useState, useMemo } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import {
  Plus, Search, Filter, Eye, Pencil, Trash2, Copy, Globe, EyeOff,
  Star, ChevronUp, ChevronDown, X,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import type { AdminProject } from '../context/AdminDataContext';
import { formatDate, generateId, slugify } from '../utils/dateUtils';
import type { ProjectCategory } from '../../data/projects';
import ProjectForm from '../components/ProjectForm';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

type SortKey = 'title' | 'category' | 'year' | 'updatedAt';
type SortDir = 'asc' | 'desc';

const CATEGORIES: ProjectCategory[] = ['Residential', 'Commercial', 'Hospitality', 'Office', 'Renovation'];

const AdminProjects: React.FC = () => {
  const { state, dispatch, logActivity } = useAdminData();
  const { setMobileOpen } = useOutletContext<OutletCtx>();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<ProjectCategory | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(searchParams.get('action') === 'new');
  const [editProject, setEditProject] = useState<AdminProject | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const PAGE_SIZE = 8;

  const filtered = useMemo(() => {
    let list = [...state.projects];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== 'All') list = list.filter((p) => p.category === categoryFilter);
    if (statusFilter === 'Published') list = list.filter((p) => p.published);
    if (statusFilter === 'Draft') list = list.filter((p) => !p.published);
    list.sort((a, b) => {
      let av: string | number = a[sortKey] ?? '';
      let bv: string | number = b[sortKey] ?? '';
      if (sortKey === 'year') { av = a.year; bv = b.year; }
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [state.projects, search, categoryFilter, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ k }: { k: SortKey }) => (
    sortKey === k
      ? sortDir === 'asc'
        ? <ChevronUp size={13} />
        : <ChevronDown size={13} />
      : <ChevronDown size={13} className="opacity-30" />
  );

  const handleDelete = (id: string) => {
    const p = state.projects.find((x) => x.id === id)!;
    dispatch({ type: 'DELETE_PROJECT', payload: id });
    logActivity('Deleted project', p.title, 'Project');
    setDeleteConfirm(null);
  };

  const handleTogglePublish = (p: AdminProject) => {
    dispatch({ type: 'TOGGLE_PROJECT_PUBLISHED', payload: p.id });
    logActivity(p.published ? 'Unpublished project' : 'Published project', p.title, 'Project');
  };

  const handleDuplicate = (p: AdminProject) => {
    const copy: AdminProject = {
      ...p,
      id: generateId('proj'),
      slug: `${p.slug}-copy`,
      title: `${p.title} (Copy)`,
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_PROJECT', payload: copy });
    logActivity('Duplicated project', p.title, 'Project');
  };

  const handleSave = (data: Partial<AdminProject>, isEdit: boolean) => {
    if (isEdit && editProject) {
      const updated: AdminProject = { ...editProject, ...data, updatedAt: new Date().toISOString() };
      dispatch({ type: 'UPDATE_PROJECT', payload: updated });
      logActivity('Updated project', updated.title, 'Project');
    } else {
      const newProj: AdminProject = {
        id: generateId('proj'),
        slug: slugify(data.title ?? 'new-project'),
        status: 'Completed',
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: '', location: '', category: 'Residential', year: new Date().getFullYear(),
        description: '', overview: '', concept: '', designApproach: '', materials: '',
        execution: '', coverImage: '', gallery: [], services: [],
        ...data,
      };
      dispatch({ type: 'ADD_PROJECT', payload: newProj });
      logActivity('Created project', newProj.title, 'Project');
    }
    setFormOpen(false);
    setEditProject(null);
  };

  return (
    <>
      <AdminTopBar
        title="Completed Projects"
        breadcrumbs={[{ label: 'Completed Projects' }]}
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
                placeholder="Search projects…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="admin-search-input"
                id="projects-search"
              />
              {search && (
                <button onClick={() => setSearch('')} className="admin-search-clear">
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="admin-filter-group">
              <Filter size={14} className="admin-filter-icon" />
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value as ProjectCategory | 'All'); setPage(1); }}
                className="admin-select"
                aria-label="Filter by category"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value as 'All' | 'Published' | 'Draft'); setPage(1); }}
                className="admin-select"
                aria-label="Filter by status"
              >
                <option value="All">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <button
            className="admin-btn-primary"
            onClick={() => { setEditProject(null); setFormOpen(true); }}
            id="add-project-btn"
          >
            <Plus size={15} />
            Add Project
          </button>
        </div>

        {/* Results count */}
        <p className="admin-results-count">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {search && ` matching "${search}"`}
        </p>

        {/* Table */}
        {paginated.length === 0 ? (
          <div className="admin-empty-state admin-empty-state--page">
            <Search size={40} className="mb-3 opacity-40" />
            <p className="text-lg font-medium">No projects found</p>
            <p className="text-sm opacity-60">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table" aria-label="Projects table">
              <thead>
                <tr>
                  <th className="admin-th w-16">Image</th>
                  <th className="admin-th admin-th--sortable" onClick={() => handleSort('title')}>
                    Title <SortIcon k="title" />
                  </th>
                  <th className="admin-th admin-th--sortable hidden md:table-cell" onClick={() => handleSort('category')}>
                    Category <SortIcon k="category" />
                  </th>
                  <th className="admin-th hidden lg:table-cell">Location</th>
                  <th className="admin-th admin-th--sortable hidden lg:table-cell" onClick={() => handleSort('year')}>
                    Year <SortIcon k="year" />
                  </th>
                  <th className="admin-th">Status</th>
                  <th className="admin-th admin-th--sortable hidden xl:table-cell" onClick={() => handleSort('updatedAt')}>
                    Updated <SortIcon k="updatedAt" />
                  </th>
                  <th className="admin-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((p) => (
                  <tr key={p.id} className="admin-tr">
                    <td className="admin-td">
                      <img
                        src={p.coverImage || 'https://via.placeholder.com/80x60?text=No+Image'}
                        alt={p.title}
                        className="admin-table-thumb"
                        loading="lazy"
                      />
                    </td>
                    <td className="admin-td">
                      <div className="flex items-center gap-2">
                        <span className="admin-table-primary">{p.title}</span>
                        {p.featured && <Star size={12} className="text-amber-400 shrink-0" />}
                      </div>
                      <span className="admin-table-secondary md:hidden">{p.category}</span>
                    </td>
                    <td className="admin-td hidden md:table-cell">
                      <span className="admin-category-badge">{p.category}</span>
                    </td>
                    <td className="admin-td hidden lg:table-cell admin-table-secondary">{p.location}</td>
                    <td className="admin-td hidden lg:table-cell admin-table-secondary">{p.year}</td>
                    <td className="admin-td">
                      <span className={`admin-status-pill ${p.published ? 'admin-status-pill--pub' : 'admin-status-pill--draft'}`}>
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="admin-td hidden xl:table-cell admin-table-secondary">{formatDate(p.updatedAt)}</td>
                    <td className="admin-td">
                      <div className="admin-action-btns">
                        <a
                          href={`/projects/${p.slug}`}
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
                          id={`edit-project-${p.id}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="admin-icon-btn"
                          onClick={() => handleDuplicate(p)}
                          title="Duplicate"
                        >
                          <Copy size={14} />
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
                          id={`delete-project-${p.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-pagination">
            <button
              className="admin-page-btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="admin-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`admin-page-num ${page === i + 1 ? 'admin-page-num--active' : ''}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="admin-page-btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Project Form Modal */}
      {formOpen && (
        <ProjectForm
          project={editProject}
          onSave={handleSave}
          onClose={() => { setFormOpen(false); setEditProject(null); }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" role="dialog" aria-modal="true" aria-label="Confirm delete">
          <div className="admin-confirm-modal">
            <div className="admin-confirm-icon">
              <Trash2 size={24} />
            </div>
            <h3 className="admin-confirm-title">Delete Project?</h3>
            <p className="admin-confirm-text">
              This will permanently delete{' '}
              <strong>{state.projects.find((p) => p.id === deleteConfirm)?.title}</strong>.
              This action cannot be undone.
            </p>
            <div className="admin-confirm-actions">
              <button className="admin-btn-ghost" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button
                className="admin-btn-danger"
                onClick={() => handleDelete(deleteConfirm)}
                id="confirm-delete-btn"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProjects;
