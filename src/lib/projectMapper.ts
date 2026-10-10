import type { Project, ProjectCategory } from '../data/projects';
import type { OngoingProject, ProjectPhase, OngoingCategory } from '../data/ongoingProjects';
import type { Service } from '../data/services';
import { getImageUrl } from './imageUrl';

const DEFAULT_COVER = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&auto=format';

export function mapProjectFromApi(p: any): Project {
  let galleryUrls: string[] = [];
  if (Array.isArray(p.gallery)) {
    galleryUrls = p.gallery.map((g: any) => getImageUrl(typeof g === 'string' ? g : g.file_url || g.image_url)).filter(Boolean);
  } else if (Array.isArray(p.images)) {
    galleryUrls = p.images.map((g: any) => getImageUrl(typeof g === 'string' ? g : g.file_url || g.image_url)).filter(Boolean);
  }

  const category = (p.category || 'Residential') as ProjectCategory;
  const year = p.completion_date
    ? new Date(p.completion_date).getFullYear()
    : p.start_date
    ? new Date(p.start_date).getFullYear()
    : new Date().getFullYear();

  return {
    id: String(p.id),
    slug: p.slug || `project-${p.id}`,
    title: p.title || 'Untitled Project',
    location: p.location || '',
    category,
    year: isNaN(year) ? new Date().getFullYear() : year,
    status: p.status || 'completed',
    description: p.short_description || p.description || '',
    overview: p.description || p.short_description || '',
    concept: p.concept || '',
    designApproach: p.design_approach || '',
    materials: p.materials || '',
    execution: p.execution || '',
    coverImage: getImageUrl(p.cover_image_url),
    gallery: galleryUrls.length > 0 ? galleryUrls : [getImageUrl(p.cover_image_url)],
    services: Array.isArray(p.services) ? p.services : [],
    featured: !!p.featured,
  };
}

export function mapOngoingProjectFromApi(p: any): OngoingProject {
  let galleryUrls: string[] = [];
  if (Array.isArray(p.gallery)) {
    galleryUrls = p.gallery.map((g: any) => getImageUrl(typeof g === 'string' ? g : g.file_url || g.image_url)).filter(Boolean);
  } else if (Array.isArray(p.images)) {
    galleryUrls = p.images.map((g: any) => getImageUrl(typeof g === 'string' ? g : g.file_url || g.image_url)).filter(Boolean);
  }

  const updates = (p.updates || []).map((u: any) => ({
    date: u.update_date ? new Date(u.update_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
    title: u.title || 'Project Update',
    description: u.description || '',
    images: u.image_url ? [getImageUrl(u.image_url)] : [],
  }));

  const progress = typeof p.progress === 'number' ? p.progress : parseInt(p.progress || '0', 10) || 0;
  let phase: ProjectPhase = 'Construction';
  if (p.phase && ['Concept', 'Design', 'Approval', 'Construction', 'Finishing', 'Completed'].includes(p.phase)) {
    phase = p.phase;
  } else if (progress < 20) phase = 'Concept';
  else if (progress < 40) phase = 'Design';
  else if (progress < 60) phase = 'Approval';
  else if (progress < 85) phase = 'Construction';
  else if (progress < 100) phase = 'Finishing';
  else phase = 'Completed';

  return {
    id: String(p.id),
    slug: p.slug || `ongoing-${p.id}`,
    title: p.title || 'Ongoing Project',
    location: p.location || '',
    category: (p.category || 'Residential') as OngoingCategory,
    phase,
    progress,
    estimatedCompletion: p.completion_date
      ? new Date(p.completion_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      : undefined,
    description: p.short_description || p.description || '',
    overview: p.description || p.short_description || '',
    coverImage: getImageUrl(p.cover_image_url),
    gallery: galleryUrls.length > 0 ? galleryUrls : [getImageUrl(p.cover_image_url)],
    updates,
  };
}

export function mapServiceFromApi(s: any, index: number): Service {
  let details: string[] = [];
  if (Array.isArray(s.details)) {
    details = s.details;
  } else if (typeof s.details === 'string') {
    try {
      details = JSON.parse(s.details);
    } catch {
      details = s.details.split('\n').filter(Boolean);
    }
  }

  return {
    id: s.slug || String(s.id),
    number: String(index + 1).padStart(2, '0'),
    title: s.title || 'Specialized Service',
    description: s.description || s.short_description || '',
    details,
    image: getImageUrl(s.image_url, 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=900&q=85&auto=format'),
  };
}
