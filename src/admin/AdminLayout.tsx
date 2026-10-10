import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAdminAuth } from './context/AdminAuthContext';
import { AdminSidebar } from './components/AdminSidebar';

const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main
        className={`admin-main ${collapsed ? 'admin-main--collapsed' : ''}`}
        id="admin-content"
      >
        <Outlet context={{ setMobileOpen }} />
      </main>
    </div>
  );
};

export default AdminLayout;
