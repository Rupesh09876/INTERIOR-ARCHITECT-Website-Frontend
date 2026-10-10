import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  FolderOpen, HardHat, Layers, MessageSquare,
  Star, FileCheck, FileMinus, ArrowRight, Clock,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import { formatDistanceToNow } from '../utils/dateUtils';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

const StatCard: React.FC<{
  label: string; value: number | string; icon: React.ReactNode;
  color: string; sub?: string;
}> = ({ label, value, icon, color, sub }) => (
  <div className="admin-stat-card">
    <div className={`admin-stat-icon ${color}`}>{icon}</div>
    <div className="admin-stat-body">
      <p className="admin-stat-value">{value}</p>
      <p className="admin-stat-label">{label}</p>
      {sub && <p className="admin-stat-sub">{sub}</p>}
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { state } = useAdminData();
  const navigate = useNavigate();
  const { setMobileOpen } = useOutletContext<OutletCtx>();

  const { projects, ongoingProjects, services, inquiries, activity } = state;

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.published).length;
  const draftProjects = projects.filter((p) => !p.published).length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const totalOngoing = ongoingProjects.length;
  const totalServices = services.length;
  const newInquiries = inquiries.filter((i) => i.status === 'New').length;

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  const recentOngoing = [...ongoingProjects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const recentInquiries = [...inquiries]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 4);

  const recentActivity = activity.slice(0, 6);

  const QUICK_ACTIONS = [
    { label: 'Add Project', icon: FolderOpen, to: '/admin/projects?action=new', color: 'var(--admin-gold)' },
    { label: 'Add Ongoing Project', icon: HardHat, to: '/admin/ongoing-projects?action=new', color: '#059669' },
    { label: 'Add Service', icon: Layers, to: '/admin/services?action=new', color: '#7c3aed' },
    { label: 'View Inquiries', icon: MessageSquare, to: '/admin/inquiries', color: '#dc2626' },
  ];

  const STATUS_COLORS: Record<string, string> = {
    New: 'admin-badge--new',
    Reviewed: 'admin-badge--reviewed',
    Replied: 'admin-badge--replied',
    Archived: 'admin-badge--archived',
  };

  return (
    <>
      <AdminTopBar
        title="Dashboard"
        onMenuClick={() => setMobileOpen(true)}
      />

      <div className="admin-page-content">
        {/* Stats Grid */}
        <section aria-label="Dashboard statistics">
          <div className="admin-stats-grid">
            <StatCard label="Completed Projects" value={totalProjects} icon={<FolderOpen size={20} />} color="admin-stat-icon--gold" sub={`${featuredProjects} featured`} />
            <StatCard label="Ongoing Projects" value={totalOngoing} icon={<HardHat size={20} />} color="admin-stat-icon--green" />
            <StatCard label="Services" value={totalServices} icon={<Layers size={20} />} color="admin-stat-icon--purple" />
            <StatCard label="New Inquiries" value={newInquiries} icon={<MessageSquare size={20} />} color="admin-stat-icon--red" sub={`${inquiries.length} total`} />
            <StatCard label="Published" value={publishedProjects} icon={<FileCheck size={20} />} color="admin-stat-icon--teal" />
            <StatCard label="Drafts" value={draftProjects} icon={<FileMinus size={20} />} color="admin-stat-icon--orange" />
          </div>
        </section>

        {/* Quick Actions */}
        <section aria-label="Quick actions" className="mt-6">
          <h2 className="admin-section-title">Quick Actions</h2>
          <div className="admin-quick-actions">
            {QUICK_ACTIONS.map((qa) => {
              const Icon = qa.icon;
              return (
                <button
                  key={qa.label}
                  className="admin-quick-action-btn"
                  onClick={() => navigate(qa.to)}
                  style={{ '--qa-color': qa.color } as React.CSSProperties}
                >
                  <div className="admin-quick-action-icon">
                    <Icon size={18} />
                  </div>
                  <span>{qa.label}</span>
                  <ArrowRight size={14} className="admin-quick-action-arrow" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="admin-dashboard-grid">
          {/* Recent Projects */}
          <section className="admin-card" aria-label="Recent completed projects">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Recent Projects</h2>
              <button className="admin-card-link" onClick={() => navigate('/admin/projects')}>
                View all <ArrowRight size={13} />
              </button>
            </div>
            {recentProjects.length === 0 ? (
              <div className="admin-empty-state">
                <FolderOpen size={32} />
                <p>No projects yet</p>
              </div>
            ) : (
              <div className="admin-recent-list">
                {recentProjects.map((p) => (
                  <div key={p.id} className="admin-recent-item">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="admin-recent-thumb"
                      loading="lazy"
                    />
                    <div className="admin-recent-info">
                      <p className="admin-recent-name">{p.title}</p>
                      <p className="admin-recent-meta">{p.category} · {p.location}</p>
                    </div>
                    <div className="admin-recent-badges">
                      {p.featured && <Star size={12} className="admin-featured-star" />}
                      <span className={`admin-status-pill ${p.published ? 'admin-status-pill--pub' : 'admin-status-pill--draft'}`}>
                        {p.published ? 'Live' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Inquiries */}
          <section className="admin-card" aria-label="Recent inquiries">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Recent Inquiries</h2>
              <button className="admin-card-link" onClick={() => navigate('/admin/inquiries')}>
                View all <ArrowRight size={13} />
              </button>
            </div>
            {recentInquiries.length === 0 ? (
              <div className="admin-empty-state">
                <MessageSquare size={32} />
                <p>No inquiries yet</p>
              </div>
            ) : (
              <div className="admin-recent-list">
                {recentInquiries.map((inq) => (
                  <div key={inq.id} className="admin-recent-item">
                    <div className="admin-inquiry-avatar">
                      {inq.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div className="admin-recent-info">
                      <p className="admin-recent-name">{inq.fullName}</p>
                      <p className="admin-recent-meta">{inq.projectType} · {formatDistanceToNow(inq.submittedAt)}</p>
                    </div>
                    <span className={`admin-inquiry-badge ${STATUS_COLORS[inq.status]}`}>
                      {inq.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Ongoing Projects */}
          <section className="admin-card" aria-label="Ongoing projects">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Ongoing Projects</h2>
              <button className="admin-card-link" onClick={() => navigate('/admin/ongoing-projects')}>
                View all <ArrowRight size={13} />
              </button>
            </div>
            {recentOngoing.length === 0 ? (
              <div className="admin-empty-state">
                <HardHat size={32} />
                <p>No ongoing projects</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOngoing.map((p) => (
                  <div key={p.id} className="admin-ongoing-item">
                    <div className="admin-ongoing-header">
                      <p className="admin-recent-name">{p.title}</p>
                      <span className="admin-ongoing-phase">{p.phase}</span>
                    </div>
                    <p className="admin-recent-meta">{p.location}</p>
                    <div className="admin-progress-bar">
                      <div
                        className="admin-progress-fill"
                        style={{ width: `${p.progress}%` }}
                        role="progressbar"
                        aria-valuenow={p.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <p className="admin-progress-label">{p.progress}% Complete</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Activity Log */}
          <section className="admin-card" aria-label="Recent activity">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Recent Activity</h2>
              <button className="admin-card-link" onClick={() => navigate('/admin/activity')}>
                View all <ArrowRight size={13} />
              </button>
            </div>
            {recentActivity.length === 0 ? (
              <div className="admin-empty-state">
                <Clock size={32} />
                <p>No activity yet</p>
              </div>
            ) : (
              <div className="admin-activity-list">
                {recentActivity.map((entry) => (
                  <div key={entry.id} className="admin-activity-item">
                    <div className="admin-activity-dot" />
                    <div className="admin-activity-content">
                      <p className="admin-activity-text">
                        <strong>{entry.action}</strong> {entry.entity}
                      </p>
                      <p className="admin-activity-time">{formatDistanceToNow(entry.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
