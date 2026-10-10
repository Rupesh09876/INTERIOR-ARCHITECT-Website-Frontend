import React from 'react';
import { Menu, Bell, ChevronRight } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  title: string;
  breadcrumbs?: { label: string; to?: string }[];
  onMenuClick: () => void;
}

export const AdminTopBar: React.FC<TopBarProps> = ({ title, breadcrumbs, onMenuClick }) => {
  const { state } = useAdminData();
  const navigate = useNavigate();
  const newInquiries = state.inquiries.filter((i) => i.status === 'New').length;

  const initials = state.currentUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="admin-topbar">
      {/* Left */}
      <div className="admin-topbar-left">
        <button className="admin-topbar-hamburger" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className="admin-breadcrumbs">
              <span>Admin</span>
              {breadcrumbs.map((b, i) => (
                <React.Fragment key={i}>
                  <ChevronRight size={12} />
                  <span className={i === breadcrumbs.length - 1 ? 'admin-breadcrumb--active' : ''}>
                    {b.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
          <h1 className="admin-topbar-title">{title}</h1>
        </div>
      </div>

      {/* Right */}
      <div className="admin-topbar-right">
        {/* Notification bell */}
        <button
          className="admin-topbar-bell"
          onClick={() => navigate('/admin/inquiries')}
          aria-label={`${newInquiries} new inquiries`}
          title="View inquiries"
        >
          <Bell size={18} />
          {newInquiries > 0 && (
            <span className="admin-badge">{newInquiries}</span>
          )}
        </button>

        {/* Avatar */}
        <button
          className="admin-topbar-avatar"
          onClick={() => navigate('/admin/profile')}
          aria-label="Go to profile"
          title={state.currentUser.name}
        >
          <span>{initials}</span>
        </button>

        <div className="admin-topbar-user hidden sm:block">
          <p className="admin-topbar-username">{state.currentUser.name}</p>
          <p className="admin-topbar-role">{state.currentUser.role}</p>
        </div>
      </div>
    </header>
  );
};
