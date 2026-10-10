import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useAdminData, type ActivityEntry } from '../context/AdminDataContext';
import { AdminTopBar } from '../components/AdminTopBar';
import { formatDateTime } from '../utils/dateUtils';

interface OutletCtx { setMobileOpen: (v: boolean) => void }

const ENTITY_COLORS: Record<ActivityEntry['entityType'], string> = {
  Project: 'admin-activity-dot--project',
  Ongoing: 'admin-activity-dot--ongoing',
  Service: 'admin-activity-dot--service',
  Inquiry: 'admin-activity-dot--inquiry',
  Settings: 'admin-activity-dot--settings',
  Auth: 'admin-activity-dot--auth',
};

const ENTITY_LABELS: Record<ActivityEntry['entityType'], string> = {
  Project: 'Project',
  Ongoing: 'Ongoing',
  Service: 'Service',
  Inquiry: 'Inquiry',
  Settings: 'Settings',
  Auth: 'Auth',
};

const AdminActivity: React.FC = () => {
  const { state } = useAdminData();
  const { setMobileOpen } = useOutletContext<OutletCtx>();
  const [filter, setFilter] = useState<ActivityEntry['entityType'] | 'All'>('All');

  const filtered = filter === 'All'
    ? state.activity
    : state.activity.filter((a) => a.entityType === filter);

  const TYPES: (ActivityEntry['entityType'] | 'All')[] = ['All', 'Project', 'Ongoing', 'Service', 'Inquiry', 'Settings', 'Auth'];

  return (
    <>
      <AdminTopBar title="Activity Log" breadcrumbs={[{ label: 'Activity' }]} onMenuClick={() => setMobileOpen(true)} />

      <div className="admin-page-content">
        {/* Filter */}
        <div className="admin-toolbar">
          <div className="admin-filter-group">
            <Filter size={14} className="admin-filter-icon" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as ActivityEntry['entityType'] | 'All')}
              className="admin-select"
              aria-label="Filter activity by type"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Activity' : `${ENTITY_LABELS[t as ActivityEntry['entityType']]} only`}</option>
              ))}
            </select>
          </div>
          <p className="admin-results-count">{filtered.length} entr{filtered.length !== 1 ? 'ies' : 'y'}</p>
        </div>

        {/* Timeline */}
        <div className="admin-card">
          {filtered.length === 0 ? (
            <div className="admin-empty-state">
              <p>No activity recorded yet</p>
            </div>
          ) : (
            <div className="admin-activity-timeline">
              {filtered.map((entry, idx) => (
                <div key={entry.id} className={`admin-timeline-item ${idx === filtered.length - 1 ? 'admin-timeline-item--last' : ''}`}>
                  <div className={`admin-timeline-dot ${ENTITY_COLORS[entry.entityType]}`} />
                  <div className="admin-timeline-content">
                    <div className="admin-timeline-header">
                      <p className="admin-timeline-text">
                        <strong>{entry.action}</strong> {entry.entity}
                      </p>
                      <span className={`admin-entity-badge admin-entity-badge--${entry.entityType.toLowerCase()}`}>
                        {ENTITY_LABELS[entry.entityType]}
                      </span>
                    </div>
                    <div className="admin-timeline-meta">
                      <span>By {entry.user}</span>
                      <span>·</span>
                      <time dateTime={entry.timestamp}>{formatDateTime(entry.timestamp)}</time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminActivity;
