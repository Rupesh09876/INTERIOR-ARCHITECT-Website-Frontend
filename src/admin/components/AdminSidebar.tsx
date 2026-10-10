import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  HardHat,
  Layers,
  MessageSquare,
  Settings,
  Activity,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Completed Projects', icon: FolderOpen },
  { to: '/admin/ongoing-projects', label: 'Ongoing Projects', icon: HardHat },
  { to: '/admin/services', label: 'Services', icon: Layers },
  { to: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { to: '/admin/settings', label: 'Website Settings', icon: Settings },
  { to: '/admin/activity', label: 'Activity Log', icon: Activity },
  { to: '/admin/profile', label: 'Admin Profile', icon: User },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="admin-sidebar-inner">
      {/* Logo */}
      <div className="admin-sidebar-logo">
        <img
          src="/logo.png"
          alt="Royal Touch Logo"
          className={`admin-logo-img ${collapsed ? 'admin-logo-collapsed' : ''}`}
        />
        {!collapsed && (
          <div className="admin-logo-text">
            <span className="admin-logo-name">Royal Touch</span>
            <span className="admin-logo-sub">Interior &amp; Architect</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="admin-sidebar-divider" />

      {/* Nav */}
      <nav className="admin-sidebar-nav" aria-label="Admin navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? 'admin-nav-item--active' : ''} ${collapsed ? 'admin-nav-item--collapsed' : ''}`
              }
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="admin-nav-icon" />
              {!collapsed && <span className="admin-nav-label">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-divider" />
        <button
          onClick={handleLogout}
          className={`admin-nav-item admin-nav-item--logout ${collapsed ? 'admin-nav-item--collapsed' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} className="admin-nav-icon" />
          {!collapsed && <span className="admin-nav-label">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`admin-sidebar-desktop ${collapsed ? 'admin-sidebar--collapsed' : ''}`}
        aria-label="Admin sidebar"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          className="admin-sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="admin-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <aside
            className="admin-sidebar-mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="admin-mobile-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};
