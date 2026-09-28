// ============================================================
// ONGOING PROJECTS DATA MODEL
// Replace coverImage and gallery with actual construction photos
// ============================================================

export type ProjectPhase = 'Concept' | 'Design' | 'Approval' | 'Construction' | 'Finishing' | 'Completed';
export type OngoingCategory = 'Residential' | 'Commercial' | 'Hospitality' | 'Office' | 'Renovation';

export interface ProjectUpdate {
  date: string;
  title: string;
  description: string;
  images: string[];
}

export interface OngoingProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: OngoingCategory;
  phase: ProjectPhase;
  progress: number; // 0-100
  estimatedCompletion?: string;
  description: string;
  overview: string;
  coverImage: string;
  gallery: string[];
  updates: ProjectUpdate[];
}

const ALL_PHASES: ProjectPhase[] = ['Concept', 'Design', 'Approval', 'Construction', 'Finishing', 'Completed'];

export const PHASE_ORDER = ALL_PHASES;

export const ONGOING_PROJECTS: OngoingProject[] = [
  {
    id: 'op-1',
    slug: 'riverside-residence',
    title: 'Riverside Residence',
    location: 'Itahari, Nepal',
    category: 'Residential',
    phase: 'Construction',
    progress: 70,
    estimatedCompletion: 'Q1 2026',
    description: 'A contemporary riverside home designed around the rhythm of water, light, and the natural landscape.',
    overview: 'The Riverside Residence is a private family home situated on a generous plot beside a river. The design embraces its natural setting through generous glazing, natural materials, and a fluid spatial arrangement that connects indoor and outdoor living.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1565402170291-8491f1961454?w=1200&q=85&auto=format',
    ],
    updates: [
      {
        date: 'September 2026',
        title: 'Structural Frame Complete',
        description: 'The main structural frame has been completed and the roofing works are now underway. The first fix electrical and plumbing installations are progressing well across the ground floor.',
        images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80&auto=format'],
      },
      {
        date: 'July 2026',
        title: 'Foundation & Groundwork',
        description: 'Foundation works have been completed to a high standard. Site preparation and underground services installation is finished.',
        images: [],
      },
    ],
  },
  {
    id: 'op-2',
    slug: 'damak-business-hub',
    title: 'Damak Business Hub',
    location: 'Damak, Nepal',
    category: 'Commercial',
    phase: 'Construction',
    progress: 40,
    estimatedCompletion: 'Q3 2026',
    description: 'A mixed-use commercial complex designed to become the new business center of the city.',
    overview: 'The Damak Business Hub is a landmark commercial development that will house offices, retail, and co-working spaces within a refined architectural framework.',
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format',
    ],
    updates: [
      {
        date: 'September 2026',
        title: 'Core and Shell Structure',
        description: 'The core and shell structure is progressing on schedule. Curtain wall installation has commenced on levels 2 and 3.',
        images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80&auto=format'],
      },
    ],
  },
  {
    id: 'op-3',
    slug: 'himalayan-resort',
    title: 'Himalayan Resort',
    location: 'Chitwan, Nepal',
    category: 'Hospitality',
    phase: 'Design',
    progress: 20,
    estimatedCompletion: 'Q2 2027',
    description: 'A luxury eco-resort that merges contemporary hospitality design with the raw beauty of the natural landscape.',
    overview: 'The Himalayan Resort is being designed as a destination in its own right — a place where guests can experience the landscape in its fullest, most immersive form.',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85&auto=format',
    gallery: [],
    updates: [
      {
        date: 'August 2026',
        title: 'Concept Design Approved',
        description: 'The concept design has been approved by the client. We are now progressing into the detailed design phase.',
        images: [],
      },
    ],
  },
  {
    id: 'op-4',
    slug: 'valley-view-penthouse',
    title: 'Valley View Penthouse',
    location: 'Kathmandu, Nepal',
    category: 'Residential',
    phase: 'Finishing',
    progress: 88,
    estimatedCompletion: 'October 2026',
    description: 'A dramatic penthouse interior that commands panoramic valley views through floor-to-ceiling glazing.',
    overview: 'This penthouse was designed to be a personal sanctuary above the city — a space of quiet luxury, extraordinary views, and restrained refinement.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=85&auto=format',
    ],
    updates: [
      {
        date: 'September 2026',
        title: 'Finishing Works Underway',
        description: 'Interior finishing works are well advanced. Custom furniture deliveries are scheduled, and the kitchen installation is complete.',
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&q=80&auto=format'],
      },
    ],
  },
];
