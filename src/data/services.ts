// ============================================================
// SERVICES DATA
// ============================================================

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: 'interior-design',
    number: '01',
    title: 'Interior Design',
    description: 'We create interior environments that are as thoughtfully designed as they are beautiful — spaces that work for the way people actually live.',
    details: [
      'Space planning and layout',
      'Material and finish selection',
      'Furniture specification and procurement',
      'Lighting design',
      'Custom millwork and joinery',
      'Art and accessory curation',
    ],
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=85&auto=format',
  },
  {
    id: 'architecture',
    number: '02',
    title: 'Architecture',
    description: 'From the initial concept to the completed building, we design architecture that is grounded in its context, built with intention, and designed to endure.',
    details: [
      'Concept and schematic design',
      'Detailed architectural drawings',
      'Building permit documentation',
      'Construction administration',
      'Site supervision',
    ],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85&auto=format',
  },
  {
    id: 'residential-design',
    number: '03',
    title: 'Residential Design',
    description: 'Homes designed around the people who live in them — responsive to lifestyle, family, and a deep understanding of what makes a house feel like home.',
    details: [
      'Single and multi-family homes',
      'Apartment and penthouse interiors',
      'Villa and estate design',
      'Guest house and annexe design',
    ],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format',
  },
  {
    id: 'commercial-spaces',
    number: '04',
    title: 'Commercial Spaces',
    description: 'Retail, hospitality, and workplace environments designed to perform — environments that attract customers, retain talent, and elevate brands.',
    details: [
      'Retail and showroom design',
      'Restaurant and café interiors',
      'Corporate office design',
      'Mixed-use development',
    ],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85&auto=format',
  },
  {
    id: 'hospitality-design',
    number: '05',
    title: 'Hospitality Design',
    description: 'Hotel, resort, and restaurant spaces designed to create genuine guest experiences — environments that are remembered long after departure.',
    details: [
      'Hotel and resort interiors',
      'Restaurant and bar design',
      'Spa and wellness spaces',
      'Guest room design and FF&E',
    ],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85&auto=format',
  },
  {
    id: 'renovation',
    number: '06',
    title: 'Renovation & Remodeling',
    description: 'We transform existing spaces — breathing new life into homes, offices, and commercial environments while respecting their inherent character.',
    details: [
      'Full apartment and home renovation',
      'Heritage restoration',
      'Kitchen and bathroom redesign',
      'Commercial refurbishment',
    ],
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85&auto=format',
  },
  {
    id: '3d-visualization',
    number: '07',
    title: '3D Visualization',
    description: 'Photorealistic renders and walkthroughs that allow clients to experience their space before a single element is built.',
    details: [
      'Photorealistic still renders',
      'Animated 3D walkthroughs',
      'Virtual reality presentations',
      'Material and finish studies',
    ],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=85&auto=format',
  },
  {
    id: 'project-execution',
    number: '08',
    title: 'Project Execution',
    description: 'Comprehensive project management that ensures every design decision is translated into a perfectly built reality — on time and on budget.',
    details: [
      'Full project management',
      'Contractor coordination and supervision',
      'Quality control inspections',
      'Client reporting and communication',
      'Handover and aftercare',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85&auto=format',
  },
];

// ============================================================
// PROCESS STEPS
// ============================================================

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'We begin by listening. Understanding your lifestyle, aspirations, site conditions, functional requirements, and aesthetic sensibilities is the foundation of every project.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'From our understanding of you and your site, we develop a clear creative direction — a spatial concept that guides every decision that follows.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We refine the concept into a comprehensive design — materials, layouts, lighting, custom elements, furniture, and architectural details all resolved in precise detail.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'The approved design is translated into reality. We coordinate and supervise the construction process, ensuring the design is executed to the highest standard.',
  },
  {
    number: '05',
    title: 'Deliver',
    description: 'The final stage is about perfection — the last details, final finishing, snagging, and a handover that leaves you completely satisfied with your new space.',
  },
];
