// Project types
export interface Project {
  id: string;
  name: string;
  category: 'STP' | 'WTP' | 'MEP' | 'Interior';
  client: string;
  location: string;
  description: string;
  image: string;
  /** Extra images for project detail card (e.g. Vedanta gallery). */
  gallery?: string[];
  /** When true, projects page and gallery may show folder images; otherwise gradient only. */
  showGalleryImages: boolean;
  completionDate: string;
  budget: string;
  scope: string[];
  featured: boolean;
}

// Service types
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  benefits: string[];
  color: string;
  category: 'Industrial EPC' | 'MEP' | 'Interior'
}

// Client types
export interface Client {
  id: string;
  name: string;
  industry: string;
  logo: string;
  description: string;
  projectsCompleted: number;
}

// Team member types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  email: string;
  phone?: string;
  expertise: string[];
  experience: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
