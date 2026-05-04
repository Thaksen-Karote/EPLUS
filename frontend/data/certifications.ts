export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  icon: string;
  category: 'ISO' | 'Safety' | 'Quality' | 'Environment';
}

export const certificationsData: Certification[] = [
  {
    id: 'iso-9001',
    name: 'ISO 9001:2015',
    issuer: 'Quality Management System',
    year: '2022',
    icon: 'ShieldCheck',
    category: 'ISO',
  },
  {
    id: 'iso-14001',
    name: 'ISO 14001:2015',
    issuer: 'Environmental Management',
    year: '2022',
    icon: 'Leaf',
  category: 'ISO',
  },
  {
    id: 'iso-45001',
    name: 'ISO 45001:2018',
    issuer: 'Occupational Health & Safety',
    year: '2023',
    icon: 'Heart',
    category: 'Safety',
  },
  {
    id: 'cpcb',
    name: 'CPCB Approval',
    issuer: 'Central Pollution Control Board',
    year: '2023',
    icon: 'FileCheck',
    category: 'Environment',
  },
];
