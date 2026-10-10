import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { PROJECTS, type Project } from '../../data/projects';
import { ONGOING_PROJECTS, type OngoingProject } from '../../data/ongoingProjects';
import { SERVICES, type Service } from '../../data/services';
import { SITE_CONFIG } from '../../data/site';
import { api } from '../../lib/api';

// ─── Inquiry ─────────────────────────────────────────────────
export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  timeline: string;
  message: string;
  status: 'New' | 'Reviewed' | 'Replied' | 'Archived';
  submittedAt: string;
}

// ─── Activity ────────────────────────────────────────────────
export interface ActivityEntry {
  id: string;
  action: string;
  entity: string;
  entityType: 'Project' | 'Ongoing' | 'Service' | 'Inquiry' | 'Settings' | 'Auth';
  timestamp: string;
  user: string;
}

// ─── Admin User ──────────────────────────────────────────────
export interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// ─── Site Settings ───────────────────────────────────────────
export interface SiteSettings {
  name: string;
  tagline: string;
  slogan: string;
  phone: string;
  email: string;
  location: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  pinterest: string;
  copyright: string;
}

// ─── Extended Project for Admin ──────────────────────────────
export interface AdminProject extends Project {
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminOngoingProject extends OngoingProject {
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminService extends Service {
  published: boolean;
  updatedAt: string;
}

// ─── State ───────────────────────────────────────────────────
interface AdminState {
  projects: AdminProject[];
  ongoingProjects: AdminOngoingProject[];
  services: AdminService[];
  inquiries: Inquiry[];
  activity: ActivityEntry[];
  settings: SiteSettings;
  currentUser: AdminUser;
}

// ─── Actions ─────────────────────────────────────────────────
type Action =
  | { type: 'ADD_PROJECT'; payload: AdminProject }
  | { type: 'UPDATE_PROJECT'; payload: AdminProject }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'TOGGLE_PROJECT_PUBLISHED'; payload: string }
  | { type: 'ADD_ONGOING'; payload: AdminOngoingProject }
  | { type: 'UPDATE_ONGOING'; payload: AdminOngoingProject }
  | { type: 'DELETE_ONGOING'; payload: string }
  | { type: 'TOGGLE_ONGOING_PUBLISHED'; payload: string }
  | { type: 'ADD_SERVICE'; payload: AdminService }
  | { type: 'UPDATE_SERVICE'; payload: AdminService }
  | { type: 'DELETE_SERVICE'; payload: string }
  | { type: 'TOGGLE_SERVICE_PUBLISHED'; payload: string }
  | { type: 'UPDATE_INQUIRY_STATUS'; payload: { id: string; status: Inquiry['status'] } }
  | { type: 'DELETE_INQUIRY'; payload: string }
  | { type: 'ADD_INQUIRY'; payload: Inquiry }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SiteSettings> }
  | { type: 'UPDATE_PROFILE'; payload: Partial<AdminUser> }
  | { type: 'ADD_ACTIVITY'; payload: ActivityEntry }
  | { type: 'SET_INITIAL_DATA'; payload: Partial<AdminState> };

const now = () => new Date().toISOString();
const makeActivity = (action: string, entity: string, entityType: ActivityEntry['entityType']): ActivityEntry => ({
  id: `act-${Date.now()}`,
  action,
  entity,
  entityType,
  timestamp: now(),
  user: 'Admin',
});

// ─── Seed initial data ────────────────────────────────────────
const SEED_PROJECTS: AdminProject[] = PROJECTS.map((p, i) => ({
  ...p,
  published: true,
  createdAt: new Date(Date.now() - (PROJECTS.length - i) * 86400000 * 10).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
}));

const SEED_ONGOING: AdminOngoingProject[] = ONGOING_PROJECTS.map((p, i) => ({
  ...p,
  published: true,
  createdAt: new Date(Date.now() - (ONGOING_PROJECTS.length - i) * 86400000 * 7).toISOString(),
  updatedAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}));

const SEED_SERVICES: AdminService[] = SERVICES.map((s, i) => ({
  ...s,
  published: true,
  updatedAt: new Date(Date.now() - i * 86400000 * 5).toISOString(),
}));

const SEED_INQUIRIES: Inquiry[] = [];
const SEED_ACTIVITY: ActivityEntry[] = [];

const INITIAL_STATE: AdminState = {
  projects: SEED_PROJECTS,
  ongoingProjects: SEED_ONGOING,
  services: SEED_SERVICES,
  inquiries: SEED_INQUIRIES,
  activity: SEED_ACTIVITY,
  settings: { ...SITE_CONFIG },
  currentUser: {
    name: 'Admin User',
    email: 'admin@royaltouch.com',
    role: 'Super Admin',
  },
};

// ─── Reducer ─────────────────────────────────────────────────
function reducer(state: AdminState, action: Action): AdminState {
  switch (action.type) {
    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_PROJECT':
      return { ...state, projects: state.projects.filter((p) => p.id !== action.payload) };
    case 'TOGGLE_PROJECT_PUBLISHED':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload ? { ...p, published: !p.published, updatedAt: now() } : p
        ),
      };
    case 'ADD_ONGOING':
      return { ...state, ongoingProjects: [action.payload, ...state.ongoingProjects] };
    case 'UPDATE_ONGOING':
      return {
        ...state,
        ongoingProjects: state.ongoingProjects.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_ONGOING':
      return { ...state, ongoingProjects: state.ongoingProjects.filter((p) => p.id !== action.payload) };
    case 'TOGGLE_ONGOING_PUBLISHED':
      return {
        ...state,
        ongoingProjects: state.ongoingProjects.map((p) =>
          p.id === action.payload ? { ...p, published: !p.published, updatedAt: now() } : p
        ),
      };
    case 'ADD_SERVICE':
      return { ...state, services: [action.payload, ...state.services] };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map((s) => (s.id === action.payload.id ? action.payload : s)),
      };
    case 'DELETE_SERVICE':
      return { ...state, services: state.services.filter((s) => s.id !== action.payload) };
    case 'TOGGLE_SERVICE_PUBLISHED':
      return {
        ...state,
        services: state.services.map((s) =>
          s.id === action.payload ? { ...s, published: !s.published, updatedAt: now() } : s
        ),
      };
    case 'UPDATE_INQUIRY_STATUS':
      return {
        ...state,
        inquiries: state.inquiries.map((i) =>
          i.id === action.payload.id ? { ...i, status: action.payload.status } : i
        ),
      };
    case 'DELETE_INQUIRY':
      return { ...state, inquiries: state.inquiries.filter((i) => i.id !== action.payload) };
    case 'ADD_INQUIRY':
      return { ...state, inquiries: [action.payload, ...state.inquiries] };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'UPDATE_PROFILE':
      return { ...state, currentUser: { ...state.currentUser, ...action.payload } };
    case 'ADD_ACTIVITY':
      return { ...state, activity: [action.payload, ...state.activity].slice(0, 100) };
    case 'SET_INITIAL_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────
interface AdminContextValue {
  state: AdminState;
  dispatch: React.Dispatch<Action>;
  logActivity: (action: string, entity: string, entityType: ActivityEntry['entityType']) => void;
}

const AdminDataContext = createContext<AdminContextValue | null>(null);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Fetch live database records from backend on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [projRes, servRes, inqRes, settRes] = await Promise.allSettled([
          api.projects.getAdminAll({ limit: 100 }),
          api.services.getAdminAll(),
          api.inquiries.getAdminAll({ limit: 100 }),
          api.settings.getAdmin(),
        ]);

        const updates: Partial<AdminState> = {};

        if (projRes.status === 'fulfilled' && projRes.value?.data) {
          const allProjects = projRes.value.data;
          updates.projects = allProjects
            .filter((p: any) => p.status !== 'ongoing')
            .map((p: any) => ({
              id: String(p.id),
              slug: p.slug,
              title: p.title,
              location: p.location || '',
              category: (p.category as any) || 'Residential',
              year: p.completion_date ? new Date(p.completion_date).getFullYear() : 2025,
              status: 'Completed',
              description: p.short_description || p.description || '',
              overview: p.description || '',
              concept: '',
              designApproach: '',
              materials: '',
              execution: '',
              coverImage: p.cover_image_url || '',
              gallery: Array.isArray(p.gallery) ? p.gallery : [],
              services: [],
              featured: !!p.featured,
              published: p.status !== 'draft',
              createdAt: p.created_at,
              updatedAt: p.updated_at,
            }));

          updates.ongoingProjects = allProjects
            .filter((p: any) => p.status === 'ongoing')
            .map((p: any) => ({
              id: String(p.id),
              slug: p.slug,
              title: p.title,
              location: p.location || '',
              category: (p.category as any) || 'Residential',
              phase: 'Construction',
              progress: p.progress || 0,
              estimatedCompletion: p.completion_date || '',
              description: p.short_description || p.description || '',
              overview: p.description || '',
              coverImage: p.cover_image_url || '',
              gallery: Array.isArray(p.gallery) ? p.gallery : [],
              updates: (p.updates || []).map((u: any) => ({
                date: u.update_date,
                title: u.title,
                description: u.description || '',
                images: u.image_url ? [u.image_url] : [],
              })),
              published: true,
              createdAt: p.created_at,
              updatedAt: p.updated_at,
            }));
        }

        if (servRes.status === 'fulfilled' && servRes.value) {
          const rawServices = Array.isArray(servRes.value) ? servRes.value : (servRes.value as any).data || [];
          updates.services = rawServices.map((s: any, idx: number) => ({
            id: String(s.id),
            number: String(idx + 1).padStart(2, '0'),
            title: s.title,
            description: s.description || s.short_description || '',
            details: [],
            image: s.image_url || '',
            published: !!s.is_active,
            updatedAt: s.updated_at,
          }));
        }

        if (inqRes.status === 'fulfilled' && inqRes.value?.data) {
          updates.inquiries = inqRes.value.data.map((i: any) => ({
            id: String(i.id),
            fullName: i.name,
            email: i.email,
            phone: i.phone || '',
            projectType: i.project_type || 'General',
            location: i.location || '',
            budget: i.budget_text || (i.budget ? `₹ ${i.budget}` : ''),
            timeline: i.timeline || '',
            message: i.message,
            status:
              i.status === 'new'
                ? 'New'
                : i.status === 'in_progress'
                ? 'Reviewed'
                : i.status === 'contacted'
                ? 'Replied'
                : 'Archived',
            submittedAt: i.submitted_at,
          }));
        }

        if (settRes.status === 'fulfilled' && settRes.value?.settings) {
          const s = settRes.value.settings;
          updates.settings = {
            name: s.company_name || SITE_CONFIG.name,
            tagline: s.company_tagline || SITE_CONFIG.tagline,
            slogan: s.company_tagline || SITE_CONFIG.slogan,
            phone: s.company_phone || SITE_CONFIG.phone,
            email: s.company_email || SITE_CONFIG.email,
            location: s.company_address || SITE_CONFIG.location,
            instagram: s.instagram_url || SITE_CONFIG.instagram,
            facebook: s.facebook_url || SITE_CONFIG.facebook,
            whatsapp: s.company_phone || SITE_CONFIG.whatsapp,
            pinterest: SITE_CONFIG.pinterest,
            copyright: s.footer_text || SITE_CONFIG.copyright,
          };
        }

        if (isMounted && Object.keys(updates).length > 0) {
          dispatch({ type: 'SET_INITIAL_DATA', payload: updates });
        }
      } catch (err) {
        console.warn('Backend data could not be loaded into admin context:', err);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Enhanced dispatch that also persists changes to MySQL backend
  const enhancedDispatch = useCallback((action: Action) => {
    // 1. Optimistic local state update
    dispatch(action);

    // 2. Synchronize to MySQL Backend asynchronously
    try {
      switch (action.type) {
        case 'ADD_PROJECT': {
          const p = action.payload;
          api.projects.create({
            title: p.title,
            slug: p.slug,
            category: p.category,
            location: p.location,
            status: p.published ? 'completed' : 'draft',
            progress: 100,
            short_description: p.description,
            description: p.overview || p.description,
            cover_image_url: p.coverImage,
            gallery: p.gallery,
            featured: p.featured,
          }).catch(console.error);
          break;
        }
        case 'UPDATE_PROJECT': {
          const p = action.payload;
          api.projects.update(p.id, {
            title: p.title,
            category: p.category,
            location: p.location,
            status: p.published ? 'completed' : 'draft',
            short_description: p.description,
            description: p.overview || p.description,
            cover_image_url: p.coverImage,
            gallery: p.gallery,
            featured: p.featured,
          }).catch(console.error);
          break;
        }
        case 'DELETE_PROJECT':
          api.projects.delete(action.payload).catch(console.error);
          break;
        case 'TOGGLE_PROJECT_PUBLISHED': {
          const id = action.payload;
          const proj = state.projects.find((item) => item.id === id);
          if (proj) {
            const nextStatus = proj.published ? 'draft' : 'completed';
            api.projects.updateStatus(id, nextStatus).catch(console.error);
          }
          break;
        }
        case 'ADD_ONGOING': {
          const p = action.payload;
          api.projects.create({
            title: p.title,
            slug: p.slug,
            category: p.category,
            location: p.location,
            status: 'ongoing',
            progress: p.progress,
            short_description: p.description,
            description: p.overview || p.description,
            cover_image_url: p.coverImage,
            gallery: p.gallery,
          }).catch(console.error);
          break;
        }
        case 'UPDATE_ONGOING': {
          const p = action.payload;
          api.projects.update(p.id, {
            title: p.title,
            category: p.category,
            location: p.location,
            progress: p.progress,
            short_description: p.description,
            description: p.overview || p.description,
            cover_image_url: p.coverImage,
            gallery: p.gallery,
          }).catch(console.error);
          break;
        }
        case 'DELETE_ONGOING':
          api.projects.delete(action.payload).catch(console.error);
          break;
        case 'TOGGLE_ONGOING_PUBLISHED': {
          const id = action.payload;
          const proj = state.ongoingProjects.find((item) => item.id === id);
          if (proj) {
            const nextStatus = proj.published ? 'draft' : 'ongoing';
            api.projects.updateStatus(id, nextStatus).catch(console.error);
          }
          break;
        }
        case 'ADD_SERVICE': {
          const s = action.payload;
          api.services.create({
            title: s.title,
            short_description: s.description,
            description: s.description,
            image_url: s.image,
            is_active: s.published,
          }).catch(console.error);
          break;
        }
        case 'UPDATE_SERVICE': {
          const s = action.payload;
          api.services.update(s.id, {
            title: s.title,
            description: s.description,
            image_url: s.image,
          }).catch(console.error);
          break;
        }
        case 'DELETE_SERVICE':
          api.services.delete(action.payload).catch(console.error);
          break;
        case 'TOGGLE_SERVICE_PUBLISHED': {
          const id = action.payload;
          const s = state.services.find((item) => item.id === id);
          if (s) {
            api.services.updateStatus(id, !s.published).catch(console.error);
          }
          break;
        }
        case 'UPDATE_INQUIRY_STATUS': {
          const { id, status } = action.payload;
          const dbStatus =
            status === 'New'
              ? 'new'
              : status === 'Reviewed'
              ? 'in_progress'
              : status === 'Replied'
              ? 'contacted'
              : 'closed';
          api.inquiries.updateStatus(id, dbStatus).catch(console.error);
          break;
        }
        case 'DELETE_INQUIRY':
          api.inquiries.delete(action.payload).catch(console.error);
          break;
        case 'UPDATE_SETTINGS': {
          const s = action.payload;
          const dbSettings: Record<string, any> = {};
          if (s.name) dbSettings.company_name = s.name;
          if (s.tagline) dbSettings.company_tagline = s.tagline;
          if (s.phone) dbSettings.company_phone = s.phone;
          if (s.email) dbSettings.company_email = s.email;
          if (s.location) dbSettings.company_address = s.location;
          if (s.facebook) dbSettings.facebook_url = s.facebook;
          if (s.instagram) dbSettings.instagram_url = s.instagram;
          if (s.copyright) dbSettings.footer_text = s.copyright;
          api.settings.update(dbSettings).catch(console.error);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error('Error synchronizing with backend:', err);
    }
  }, [state]);

  const logActivity = useCallback(
    (action: string, entity: string, entityType: ActivityEntry['entityType']) => {
      dispatch({ type: 'ADD_ACTIVITY', payload: makeActivity(action, entity, entityType) });
    },
    []
  );

  return (
    <AdminDataContext.Provider value={{ state, dispatch: enhancedDispatch, logActivity }}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider');
  return ctx;
};
