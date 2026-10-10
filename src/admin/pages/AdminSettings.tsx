import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, Globe, Phone, Mail, MapPin, Share2, Link2, MessageCircle, Pin } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import type { SiteSettings } from '../context/AdminDataContext';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

const AdminSettings: React.FC = () => {
  const { state, dispatch, logActivity } = useAdminData();
  const { setMobileOpen } = useOutletContext<OutletCtx>();
  const [form, setForm] = useState<SiteSettings>({ ...state.settings });
  const [saved, setSaved] = useState(false);

  const set = (k: keyof SiteSettings, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_SETTINGS', payload: form });
    logActivity('Updated website settings', 'Site Configuration', 'Settings');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const FIELDS: { key: keyof SiteSettings; label: string; icon: React.ReactNode; type?: string; placeholder?: string }[] = [
    { key: 'name', label: 'Company Name', icon: <Globe size={16} />, placeholder: 'Royal Touch' },
    { key: 'tagline', label: 'Tagline', icon: <Globe size={16} />, placeholder: 'Interior & Architect' },
    { key: 'slogan', label: 'Slogan', icon: <Globe size={16} />, placeholder: 'Dream. Design. Build.' },
    { key: 'phone', label: 'Phone Number', icon: <Phone size={16} />, type: 'tel', placeholder: '+977 98XXXXXXXX' },
    { key: 'email', label: 'Email Address', icon: <Mail size={16} />, type: 'email', placeholder: 'hello@royaltouch.com' },
    { key: 'location', label: 'Office Location', icon: <MapPin size={16} />, placeholder: 'City, Country' },
    { key: 'instagram', label: 'Instagram URL', icon: <Share2 size={16} />, type: 'url', placeholder: 'https://instagram.com/…' },
    { key: 'facebook', label: 'Facebook URL', icon: <Link2 size={16} />, type: 'url', placeholder: 'https://facebook.com/…' },
    { key: 'whatsapp', label: 'WhatsApp URL', icon: <MessageCircle size={16} />, type: 'url', placeholder: 'https://wa.me/977…' },
    { key: 'pinterest', label: 'Pinterest URL', icon: <Pin size={16} />, type: 'url', placeholder: 'https://pinterest.com/…' },
    { key: 'copyright', label: 'Copyright Text', icon: <Globe size={16} />, placeholder: '© 2026 Royal Touch. All Rights Reserved.' },
  ];

  return (
    <>
      <AdminTopBar title="Website Settings" breadcrumbs={[{ label: 'Settings' }]} onMenuClick={() => setMobileOpen(true)} />

      <div className="admin-page-content">
        <div className="admin-settings-layout">
          <form onSubmit={handleSave} className="admin-settings-form">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">General Information</h2>
                <p className="admin-card-sub">Update company details displayed across the website</p>
              </div>

              <div className="admin-settings-grid">
                {FIELDS.map(({ key, label, icon, type, placeholder }) => (
                  <div key={key} className="admin-field">
                    <label htmlFor={`setting-${key}`} className="admin-field-label">
                      {label}
                    </label>
                    <div className="admin-settings-input-wrap">
                      <span className="admin-settings-input-icon">{icon}</span>
                      <input
                        id={`setting-${key}`}
                        type={type ?? 'text'}
                        value={form[key]}
                        onChange={(e) => set(key, e.target.value)}
                        className="admin-field-input admin-settings-input"
                        placeholder={placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-settings-footer">
                {saved && (
                  <span className="admin-settings-saved">
                    ✓ Settings saved successfully
                  </span>
                )}
                <button type="submit" className="admin-btn-primary" id="save-settings-btn">
                  <Save size={15} />
                  Save Settings
                </button>
              </div>
            </div>
          </form>

          {/* Preview Panel */}
          <div className="admin-settings-preview">
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Live Preview</h3>
              </div>
              <div className="admin-settings-preview-body">
                <div className="admin-preview-logo">
                  <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                  <div>
                    <p className="admin-preview-name">{form.name}</p>
                    <p className="admin-preview-tagline">{form.tagline}</p>
                  </div>
                </div>
                <blockquote className="admin-preview-slogan">"{form.slogan}"</blockquote>
                <div className="admin-preview-contacts">
                  {form.phone && <p><span className="font-medium">Phone:</span> {form.phone}</p>}
                  {form.email && <p><span className="font-medium">Email:</span> {form.email}</p>}
                  {form.location && <p><span className="font-medium">Location:</span> {form.location}</p>}
                </div>
                <p className="admin-preview-copyright">{form.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
