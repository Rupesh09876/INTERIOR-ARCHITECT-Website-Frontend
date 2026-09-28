// ============================================================
// PROJECT DATA MODEL
// Replace coverImage and gallery with actual project images
// ============================================================

export type ProjectCategory = 'Residential' | 'Commercial' | 'Hospitality' | 'Office' | 'Renovation';
export type ProjectStatus = 'Completed';

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  year: number;
  status: ProjectStatus;
  description: string;
  overview: string;
  concept: string;
  designApproach: string;
  materials: string;
  execution: string;
  coverImage: string;
  gallery: string[];
  services: string[];
  featured?: boolean;
}

// ============================================================
// UNSPLASH IMAGES — Curated architectural/interior photography
// Replace these with actual Royal Touch project images
// ============================================================

export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'modern-family-residence',
    title: 'Modern Family Residence',
    location: 'Damak, Nepal',
    category: 'Residential',
    year: 2025,
    status: 'Completed',
    featured: true,
    description: 'A refined family home where warm materials and generous proportions create a sense of calm and belonging.',
    overview: 'This residence was conceived as a retreat — a home that offers calm, warmth, and a deep connection to the surrounding landscape. The clients sought a space that would balance the energy of family life with moments of quiet and reflection.',
    concept: 'The concept centers on the idea of "grounded luxury" — spaces that feel generous but never excessive, refined but never cold.',
    designApproach: 'We organized the home around a central living volume with double-height ceilings, anchored by a stone feature wall. The material palette — warm walnut, stone, and white plaster — creates continuity through each room.',
    materials: 'Walnut timber, natural stone, white plaster, brushed brass fixtures, handmade ceramics.',
    execution: 'Full interior design, furniture specification, custom millwork, lighting design, and project coordination.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&auto=format',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?w=1600&q=85&auto=format',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85&auto=format',
    ],
    services: ['Interior Design', 'Furniture Specification', 'Custom Millwork', 'Lighting Design'],
  },
  {
    id: '2',
    slug: 'the-green-bean-cafe',
    title: 'The Green Bean Café',
    location: 'Biratnagar, Nepal',
    category: 'Commercial',
    year: 2025,
    status: 'Completed',
    description: 'An atmospheric café that marries lush botanicals with rich, warm interiors to create a destination experience.',
    overview: 'The Green Bean Café was designed to become a social anchor in the city — a space where the quality of the coffee is matched by the quality of the environment.',
    concept: 'We drew inspiration from tropical greenhouse architecture, creating a space that feels lush, warm, and full of life.',
    designApproach: 'Rattan, raw timber, exposed clay brick, and abundant plantings are layered together to create a rich sensory experience.',
    materials: 'Rattan, raw timber, clay brick, exposed concrete, terracotta planters.',
    execution: 'Full interior design, custom furniture, branding environment, kitchen planning.',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&q=85&auto=format',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=85&auto=format',
    ],
    services: ['Interior Design', 'Custom Furniture', 'Branding Environment'],
  },
  {
    id: '3',
    slug: 'skyline-office-tower',
    title: 'Skyline Office Tower',
    location: 'Kathmandu, Nepal',
    category: 'Office',
    year: 2024,
    status: 'Completed',
    description: 'A corporate workspace redesigned around collaboration, wellbeing, and the quality of light.',
    overview: 'This project transformed a conventional corporate floor into a dynamic, human-centered workspace.',
    concept: 'The concept was "the productive garden" — a workspace that feels alive, connected, and energizing.',
    designApproach: 'We replaced closed offices with a series of interconnected zones — focus areas, collaborative hubs, social spaces, and quiet rooms.',
    materials: 'White oak, white plaster, acoustic panels, biophilic elements, articulated steel frames.',
    execution: 'Space planning, interior design, furniture procurement, lighting design.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=85&auto=format',
      'https://images.unsplash.com/photo-1564069114751-6bb4f34783c8?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e23?w=1200&q=85&auto=format',
    ],
    services: ['Space Planning', 'Interior Design', 'Furniture Procurement', 'Lighting Design'],
  },
  {
    id: '4',
    slug: 'mountain-view-villa',
    title: 'Mountain View Villa',
    location: 'Pokhara, Nepal',
    category: 'Residential',
    year: 2024,
    status: 'Completed',
    featured: false,
    description: 'A villa perched in the foothills, designed to frame the dramatic Annapurna range in every view.',
    overview: 'This private villa sits in a dramatic hillside position. The design is an exercise in restraint — every decision guided by the desire to let the landscape become the primary artwork.',
    concept: 'Frame the mountain. Let the view breathe.',
    designApproach: 'Floor-to-ceiling glazing, deep overhanging eaves, and a material palette of stone and dark timber anchor the home to its site while opening it completely to the panorama.',
    materials: 'Local stone, dark timber, large-format concrete, handwoven textiles.',
    execution: 'Architecture, interior design, landscaping coordination.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=85&auto=format',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=85&auto=format',
    ],
    services: ['Architecture', 'Interior Design', 'Landscaping Coordination'],
  },
  {
    id: '5',
    slug: 'heritage-hotel-renovation',
    title: 'Heritage Hotel Renovation',
    location: 'Bhaktapur, Nepal',
    category: 'Hospitality',
    year: 2024,
    status: 'Completed',
    description: 'A historic building carefully restored and reimagined as a boutique hospitality experience.',
    overview: 'This project involved the careful restoration of a heritage building, transforming it into a boutique hotel that honors its history while meeting contemporary expectations of comfort and luxury.',
    concept: 'Preserve the soul, elevate the experience.',
    designApproach: 'Original timber beams, brick walls, and stone floors were carefully preserved and made the centerpiece of each space.',
    materials: 'Original heritage stone and brick, restored timber, hand-knotted rugs, antique brass.',
    execution: 'Heritage restoration, interior design, lighting design, FF&E specification.',
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=85&auto=format',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=85&auto=format',
    ],
    services: ['Heritage Restoration', 'Interior Design', 'Lighting Design', 'FF&E Specification'],
  },
  {
    id: '6',
    slug: 'contemporary-apartment-renovation',
    title: 'Contemporary Apartment',
    location: 'Lalitpur, Nepal',
    category: 'Renovation',
    year: 2025,
    status: 'Completed',
    description: 'A complete transformation of a dated apartment into a sleek, contemporary urban residence.',
    overview: 'This renovation project completely transformed an outdated apartment into a crisp, contemporary urban home for a young professional couple.',
    concept: 'Clean. Light. Lived-in luxury.',
    designApproach: 'A neutral base of white plaster and light oak is punctuated by carefully chosen objects, art, and a restrained material palette that rewards close attention.',
    materials: 'White plaster, light oak, Calacatta marble, black steel frames.',
    execution: 'Full renovation, interior design, custom joinery, kitchen redesign.',
    coverImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1600&q=85&auto=format',
    gallery: [
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=85&auto=format',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85&auto=format',
      'https://images.unsplash.com/photo-1617104678098-de229db51175?w=1200&q=85&auto=format',
    ],
    services: ['Full Renovation', 'Interior Design', 'Custom Joinery', 'Kitchen Redesign'],
  },
];
