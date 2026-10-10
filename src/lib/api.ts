const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export class ApiError extends Error {
  status: number;
  errors: any[];
  constructor(message: string, status: number = 400, errors: any[] = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

async function request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('rt_admin_token');
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = json.message || `Request failed with status ${response.status}`;
    throw new ApiError(errorMsg, response.status, json.errors || []);
  }

  return json;
}

export const api = {
  // ── Auth ──
  auth: {
    async login(email: string, password: string) {
      const res = await request<{ success: boolean; data: { token: string; admin: any } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res.data?.token) {
        localStorage.setItem('rt_admin_token', res.data.token);
      }
      return res.data;
    },
    async logout() {
      try {
        await request('/auth/logout', { method: 'POST' });
      } finally {
        localStorage.removeItem('rt_admin_token');
      }
    },
    async me() {
      const res = await request<{ success: boolean; data: any }>('/auth/me');
      return res.data;
    },
    async changePassword(currentPassword: string, newPassword: string) {
      return request('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    },
    async updateProfile(data: { name: string; email: string }) {
      const res = await request<{ success: boolean; data: any }>('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return res.data;
    },
  },

  // ── Dashboard ──
  dashboard: {
    async getStats() {
      const res = await request<{ success: boolean; data: any }>('/admin/dashboard/stats');
      return res.data;
    },
    async getRecentInquiries(limit = 5) {
      const res = await request<{ success: boolean; data: any[] }>(`/admin/dashboard/recent-inquiries?limit=${limit}`);
      return res.data;
    },
    async getRecentProjects(limit = 5) {
      const res = await request<{ success: boolean; data: any[] }>(`/admin/dashboard/recent-projects?limit=${limit}`);
      return res.data;
    },
  },

  // ── Projects ──
  projects: {
    async getPublic(params: Record<string, string | number | boolean | undefined> = {}) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) query.set(k, String(v));
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      return request<{ success: boolean; data: any[]; pagination: any }>(`/projects${qs}`);
    },
    async getBySlug(slug: string) {
      const res = await request<{ success: boolean; data: any }>(`/projects/${slug}`);
      return res.data;
    },
    async getFeatured() {
      const res = await request<{ success: boolean; data: any[] }>('/projects/featured');
      return res.data;
    },
    async getAdminAll(params: Record<string, string | number | boolean | undefined> = {}) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) query.set(k, String(v));
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      return request<{ success: boolean; data: any[]; pagination: any }>(`/admin/projects${qs}`);
    },
    async getAdminById(id: string | number) {
      const res = await request<{ success: boolean; data: any }>(`/admin/projects/${id}`);
      return res.data;
    },
    async create(data: any) {
      const res = await request<{ success: boolean; data: any }>('/admin/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.data;
    },
    async update(id: string | number, data: any) {
      const res = await request<{ success: boolean; data: any }>(`/admin/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return res.data;
    },
    async updateStatus(id: string | number, status: string) {
      const res = await request<{ success: boolean; data: any }>(`/admin/projects/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      return res.data;
    },
    async delete(id: string | number) {
      return request(`/admin/projects/${id}`, { method: 'DELETE' });
    },
    // Updates / Timeline
    async getUpdates(projectId: string | number) {
      const res = await request<{ success: boolean; data: any[] }>(`/admin/projects/${projectId}/updates`);
      return res.data;
    },
    async addUpdate(projectId: string | number, data: any) {
      const res = await request<{ success: boolean; data: any }>(`/admin/projects/${projectId}/updates`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.data;
    },
    async deleteUpdate(updateId: string | number) {
      return request(`/admin/projects/updates/${updateId}`, { method: 'DELETE' });
    },
  },

  // ── Services ──
  services: {
    async getPublic() {
      const res = await request<{ success: boolean; data: any[] }>('/services');
      return res.data;
    },
    async getAdminAll() {
      const res = await request<{ success: boolean; data: any[] }>('/admin/services');
      return res.data;
    },
    async create(data: any) {
      const res = await request<{ success: boolean; data: any }>('/admin/services', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.data;
    },
    async update(id: string | number, data: any) {
      const res = await request<{ success: boolean; data: any }>(`/admin/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return res.data;
    },
    async updateStatus(id: string | number, isActive: boolean) {
      const res = await request<{ success: boolean; data: any }>(`/admin/services/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: isActive }),
      });
      return res.data;
    },
    async delete(id: string | number) {
      return request(`/admin/services/${id}`, { method: 'DELETE' });
    },
  },

  // ── Inquiries ──
  inquiries: {
    async submit(data: any) {
      const res = await request<{ success: boolean; message: string; data: any }>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res;
    },
    async getAdminAll(params: Record<string, string | number | undefined> = {}) {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined) query.set(k, String(v));
      });
      const qs = query.toString() ? `?${query.toString()}` : '';
      return request<{ success: boolean; data: any[]; pagination: any }>(`/admin/inquiries${qs}`);
    },
    async updateStatus(id: string | number, status: string) {
      const res = await request<{ success: boolean; data: any }>(`/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      return res.data;
    },
    async updatePriority(id: string | number, priority: string) {
      const res = await request<{ success: boolean; data: any }>(`/admin/inquiries/${id}/priority`, {
        method: 'PATCH',
        body: JSON.stringify({ priority }),
      });
      return res.data;
    },
    async updateNotes(id: string | number, notes: string) {
      const res = await request<{ success: boolean; data: any }>(`/admin/inquiries/${id}/notes`, {
        method: 'PATCH',
        body: JSON.stringify({ admin_notes: notes }),
      });
      return res.data;
    },
    async delete(id: string | number) {
      return request(`/admin/inquiries/${id}`, { method: 'DELETE' });
    },
  },

  // ── Settings ──
  settings: {
    async getPublic() {
      const res = await request<{ success: boolean; data: any }>('/settings');
      return res.data;
    },
    async getAdmin() {
      const res = await request<{ success: boolean; data: any }>('/admin/settings');
      return res.data;
    },
    async update(settings: Record<string, any>) {
      const res = await request<{ success: boolean; data: any }>('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({ settings }),
      });
      return res.data;
    },
  },

  // ── Content ──
  content: {
    async getPage(pageKey: string) {
      const res = await request<{ success: boolean; data: any[] }>(`/content/pages/${pageKey}`);
      return res.data;
    },
    async getProcessSteps() {
      const res = await request<{ success: boolean; data: any[] }>('/process-steps');
      return res.data;
    },
  },

  // ── Media ──
  media: {
    async upload(file: File, altText?: string, caption?: string) {
      const formData = new FormData();
      formData.append('file', file);
      if (altText) formData.append('alt_text', altText);
      if (caption) formData.append('caption', caption);

      const res = await request<{ success: boolean; data: any }>('/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      return res.data;
    },
    async getAll() {
      const res = await request<{ success: boolean; data: any[]; pagination: any }>('/admin/media');
      return res.data;
    },
    async delete(id: string | number) {
      return request(`/admin/media/${id}`, { method: 'DELETE' });
    },
  },
};
