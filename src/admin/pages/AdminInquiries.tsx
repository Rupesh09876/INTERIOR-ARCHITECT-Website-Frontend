import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Filter, Trash2, X, Mail, Phone, MapPin, Calendar, Eye } from 'lucide-react';
import { useAdminData, type Inquiry } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import { formatDate, formatDateTime } from '../utils/dateUtils';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

const STATUS_OPTIONS: Inquiry['status'][] = ['New', 'Reviewed', 'Replied', 'Archived'];

const STATUS_STYLES: Record<Inquiry['status'], string> = {
  New: 'admin-badge--new',
  Reviewed: 'admin-badge--reviewed',
  Replied: 'admin-badge--replied',
  Archived: 'admin-badge--archived',
};

const AdminInquiries: React.FC = () => {
  const { state, dispatch, logActivity } = useAdminData();
  const { setMobileOpen } = useOutletContext<OutletCtx>();

  const [statusFilter, setStatusFilter] = useState<Inquiry['status'] | 'All'>('All');
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...state.inquiries].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    if (statusFilter !== 'All') list = list.filter((i) => i.status === statusFilter);
    return list;
  }, [state.inquiries, statusFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: state.inquiries.length };
    STATUS_OPTIONS.forEach((s) => {
      c[s] = state.inquiries.filter((i) => i.status === s).length;
    });
    return c;
  }, [state.inquiries]);

  const handleStatusChange = (id: string, status: Inquiry['status']) => {
    const inq = state.inquiries.find((i) => i.id === id)!;
    dispatch({ type: 'UPDATE_INQUIRY_STATUS', payload: { id, status } });
    logActivity(`Marked inquiry as ${status}`, inq.fullName, 'Inquiry');
  };

  const handleDelete = (id: string) => {
    const inq = state.inquiries.find((i) => i.id === id)!;
    dispatch({ type: 'DELETE_INQUIRY', payload: id });
    logActivity('Deleted inquiry from', inq.fullName, 'Inquiry');
    setDeleteConfirm(null);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <>
      <AdminTopBar title="Inquiries" breadcrumbs={[{ label: 'Inquiries' }]} onMenuClick={() => setMobileOpen(true)} />

      <div className="admin-page-content">
        {/* Status Filter Tabs */}
        <div className="admin-inquiry-tabs">
          {(['All', ...STATUS_OPTIONS] as const).map((s) => (
            <button
              key={s}
              className={`admin-inquiry-tab ${statusFilter === s ? 'admin-inquiry-tab--active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
              <span className={`admin-inquiry-count ${statusFilter === s ? 'admin-inquiry-count--active' : ''}`}>
                {counts[s] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="admin-inquiry-layout">
          {/* List */}
          <div className="admin-inquiry-list">
            {filtered.length === 0 ? (
              <div className="admin-empty-state">
                <Mail size={36} className="mb-2 opacity-40" />
                <p>{state.inquiries.length === 0 ? 'No inquiries received yet' : 'No inquiries in this category'}</p>
              </div>
            ) : (
              filtered.map((inq) => (
                <button
                  key={inq.id}
                  className={`admin-inquiry-row ${selected?.id === inq.id ? 'admin-inquiry-row--active' : ''} ${inq.status === 'New' ? 'admin-inquiry-row--unread' : ''}`}
                  onClick={() => setSelected(inq)}
                  id={`inquiry-row-${inq.id}`}
                >
                  <div className="admin-inquiry-avatar-sm">
                    {inq.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </div>
                  <div className="admin-inquiry-row-info">
                    <div className="admin-inquiry-row-top">
                      <p className="admin-inquiry-name">{inq.fullName}</p>
                      <span className={`admin-inquiry-badge ${STATUS_STYLES[inq.status]}`}>{inq.status}</span>
                    </div>
                    <p className="admin-inquiry-preview">{inq.projectType} · {inq.location}</p>
                    <p className="admin-inquiry-date">{formatDate(inq.submittedAt)}</p>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Detail Panel */}
          <div className={`admin-inquiry-detail ${selected ? 'admin-inquiry-detail--open' : ''}`}>
            {selected ? (
              <>
                <div className="admin-inquiry-detail-header">
                  <div>
                    <h2 className="admin-inquiry-detail-name">{selected.fullName}</h2>
                    <p className="admin-inquiry-detail-sub">Submitted {formatDateTime(selected.submittedAt)}</p>
                  </div>
                  <button className="admin-modal-close lg:hidden" onClick={() => setSelected(null)}><X size={18} /></button>
                </div>

                {/* Status changer */}
                <div className="admin-inquiry-status-row">
                  <span className="admin-field-label mb-0">Status:</span>
                  <div className="relative">
                    <select
                      value={selected.status}
                      onChange={(e) => {
                        handleStatusChange(selected.id, e.target.value as Inquiry['status']);
                        setSelected((s) => s ? { ...s, status: e.target.value as Inquiry['status'] } : s);
                      }}
                      className={`admin-status-select admin-inquiry-badge ${STATUS_STYLES[selected.status]}`}
                      id={`status-select-${selected.id}`}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <button
                    className="admin-icon-btn admin-icon-btn--danger ml-auto"
                    onClick={() => setDeleteConfirm(selected.id)}
                    title="Delete inquiry"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Info Grid */}
                <div className="admin-inquiry-info-grid">
                  {[
                    { icon: Mail, label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
                    { icon: Phone, label: 'Phone', value: selected.phone || '—', href: selected.phone ? `tel:${selected.phone}` : undefined },
                    { icon: MapPin, label: 'Location', value: selected.location || '—' },
                    { icon: Calendar, label: 'Timeline', value: selected.timeline || '—' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="admin-inquiry-info-item">
                      <Icon size={14} className="admin-inquiry-info-icon" />
                      <div>
                        <p className="admin-inquiry-info-label">{label}</p>
                        {href ? (
                          <a href={href} className="admin-inquiry-info-value admin-inquiry-info-link">{value}</a>
                        ) : (
                          <p className="admin-inquiry-info-value">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="admin-inquiry-info-item">
                    <Eye size={14} className="admin-inquiry-info-icon" />
                    <div>
                      <p className="admin-inquiry-info-label">Project Type</p>
                      <p className="admin-inquiry-info-value">{selected.projectType}</p>
                    </div>
                  </div>
                  <div className="admin-inquiry-info-item">
                    <Filter size={14} className="admin-inquiry-info-icon" />
                    <div>
                      <p className="admin-inquiry-info-label">Budget</p>
                      <p className="admin-inquiry-info-value">{selected.budget || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="admin-inquiry-message">
                  <p className="admin-field-label mb-2">Message</p>
                  <p className="admin-inquiry-message-text">{selected.message}</p>
                </div>

                {/* Quick Reply */}
                <div className="admin-inquiry-reply">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your Inquiry to Royal Touch Interior & Architecture`}
                    className="admin-btn-primary w-full justify-center"
                  >
                    <Mail size={14} />
                    Reply via Email
                  </a>
                </div>
              </>
            ) : (
              <div className="admin-inquiry-detail-empty">
                <Mail size={40} className="opacity-30 mb-3" />
                <p className="text-sm opacity-50">Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {deleteConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-confirm-modal">
            <div className="admin-confirm-icon"><Trash2 size={24} /></div>
            <h3 className="admin-confirm-title">Delete Inquiry?</h3>
            <p className="admin-confirm-text">
              This will permanently delete the inquiry from{' '}
              <strong>{state.inquiries.find((i) => i.id === deleteConfirm)?.fullName}</strong>.
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

export default AdminInquiries;
