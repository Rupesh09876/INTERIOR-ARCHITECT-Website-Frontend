import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, User, Mail, Shield } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

const AdminProfile: React.FC = () => {
  const { state, dispatch, logActivity } = useAdminData();
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const { setMobileOpen } = useOutletContext<OutletCtx>();

  const [form, setForm] = useState({ ...state.currentUser });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_PROFILE', payload: form });
    logActivity('Updated profile', form.name, 'Auth');
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.current !== 'royaltouch2026') {
      setPasswordMsg('error:Current password is incorrect');
      return;
    }
    if (passwordForm.newPass.length < 8) {
      setPasswordMsg('error:New password must be at least 8 characters');
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      setPasswordMsg('error:New passwords do not match');
      return;
    }
    setPasswordMsg('success:Password updated successfully');
    setPasswordForm({ current: '', newPass: '', confirm: '' });
    logActivity('Changed admin password', 'Admin Account', 'Auth');
    setTimeout(() => setPasswordMsg(''), 4000);
  };

  const initials = form.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const [msgType, msgText] = passwordMsg.split(':');

  return (
    <>
      <AdminTopBar title="Admin Profile" breadcrumbs={[{ label: 'Profile' }]} onMenuClick={() => setMobileOpen(true)} />

      <div className="admin-page-content">
        <div className="admin-profile-layout">
          {/* Profile Card */}
          <div className="admin-card admin-profile-card">
            <div className="admin-profile-avatar-lg">{initials}</div>
            <h2 className="admin-profile-name">{state.currentUser.name}</h2>
            <p className="admin-profile-role">{state.currentUser.role}</p>
            <p className="admin-profile-email">{state.currentUser.email}</p>
            <div className="admin-profile-stats">
              <div className="admin-profile-stat">
                <p className="admin-stat-value">{state.projects.length}</p>
                <p className="admin-stat-label">Projects</p>
              </div>
              <div className="admin-profile-stat">
                <p className="admin-stat-value">{state.ongoingProjects.length}</p>
                <p className="admin-stat-label">Ongoing</p>
              </div>
              <div className="admin-profile-stat">
                <p className="admin-stat-value">{state.activity.length}</p>
                <p className="admin-stat-label">Activities</p>
              </div>
            </div>
            <button
              className="admin-btn-danger w-full mt-4 justify-center"
              onClick={() => { logout(); navigate('/admin/login'); }}
            >
              Logout
            </button>
          </div>

          <div className="admin-profile-forms">
            {/* Edit Profile */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Edit Profile</h3>
              </div>
              <form onSubmit={handleProfileSave} className="admin-form-body">
                <div className="admin-form-grid">
                  <div className="admin-form-col-2">
                    <div className="admin-field">
                      <label htmlFor="profile-name" className="admin-field-label">
                        <User size={13} className="inline mr-1" /> Full Name
                      </label>
                      <input
                        id="profile-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        className="admin-field-input"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  <div className="admin-form-col-2">
                    <div className="admin-field">
                      <label htmlFor="profile-email" className="admin-field-label">
                        <Mail size={13} className="inline mr-1" /> Email Address
                      </label>
                      <input
                        id="profile-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        className="admin-field-input"
                        placeholder="admin@royaltouch.com"
                      />
                    </div>
                  </div>
                  <div className="admin-form-col-2">
                    <div className="admin-field">
                      <label htmlFor="profile-role" className="admin-field-label">
                        <Shield size={13} className="inline mr-1" /> Role
                      </label>
                      <input
                        id="profile-role"
                        type="text"
                        value={form.role}
                        onChange={(e) => set('role', e.target.value)}
                        className="admin-field-input"
                        placeholder="Super Admin"
                      />
                    </div>
                  </div>
                </div>
                <div className="admin-settings-footer">
                  {profileSaved && <span className="admin-settings-saved">✓ Profile saved</span>}
                  <button type="submit" className="admin-btn-primary" id="save-profile-btn">
                    <Save size={14} /> Save Profile
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Change Password</h3>
              </div>
              <form onSubmit={handlePasswordChange} className="admin-form-body">
                <div className="admin-form-grid">
                  {[
                    { key: 'current' as const, label: 'Current Password', id: 'pass-current' },
                    { key: 'newPass' as const, label: 'New Password', id: 'pass-new' },
                    { key: 'confirm' as const, label: 'Confirm New Password', id: 'pass-confirm' },
                  ].map(({ key, label, id }) => (
                    <div key={key} className="admin-form-col-2">
                      <div className="admin-field">
                        <label htmlFor={id} className="admin-field-label">{label}</label>
                        <input
                          id={id}
                          type="password"
                          value={passwordForm[key]}
                          onChange={(e) => setPasswordForm((f) => ({ ...f, [key]: e.target.value }))}
                          className="admin-field-input"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {passwordMsg && (
                  <p className={`mt-2 text-sm ${msgType === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {msgText}
                  </p>
                )}
                <div className="admin-settings-footer">
                  <button type="submit" className="admin-btn-primary" id="change-password-btn">
                    <Shield size={14} /> Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
