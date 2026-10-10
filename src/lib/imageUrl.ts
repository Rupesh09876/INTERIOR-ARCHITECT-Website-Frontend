const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format';

/**
 * Normalizes any image URL (relative /uploads, full URL, or undefined)
 * into a fully accessible URL for both local dev and production.
 */
export function getImageUrl(url?: string | null, fallback: string = DEFAULT_FALLBACK): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  const trimmed = url.trim();

  // If already full HTTP/HTTPS or data URL, return it
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // If relative path like /uploads/...
  if (trimmed.startsWith('/uploads/')) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
    const backendOrigin = apiUrl.replace(/\/api\/?$/, '');
    return `${backendOrigin}${trimmed}`;
  }

  return trimmed;
}

/**
 * Fallback handler for <img> elements on error
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallback: string = DEFAULT_FALLBACK) {
  const target = e.currentTarget;
  if (target.src !== fallback) {
    target.src = fallback;
  }
}
