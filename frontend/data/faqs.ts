export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: 'general' | 'services' | 'process' | 'technical';
}

export const faqsData: FAQ[] = [
  {
    id: 'faq-1',
    question: 'What services does Engineering Plus provide?',
    answer: 'Engineering Plus is a comprehensive EPC (Engineering, Procurement & Construction) company specializing in STP (Sewage Treatment Plants), WTP (Water Treatment Plants), MEP (Mechanical, Electrical & Plumbing) works, and Interior solutions. We handle complete project execution from design to commissioning.',
    category: 'services',
  },
  {
    id: 'faq-2',
    question: 'What is the typical project timeline?',
    answer: 'Project timelines vary based on scope and complexity. Small to medium projects typically take 3-6 months, while larger infrastructure projects may take 6-12 months or more. We provide detailed timelines during the consultation phase and maintain transparent communication throughout the project lifecycle.',
    category: 'process',
  },
  {
    id: 'faq-3',
    question: 'Do you provide maintenance services after project completion?',
    answer: 'Yes, we offer comprehensive post-installation maintenance and support services. Our team provides regular maintenance schedules, emergency support, and annual maintenance contracts (AMC) to ensure optimal performance of all installed systems.',
    category: 'services',
  },
  {
    id: 'faq-4',
    question: 'What certifications does Engineering Plus hold?',
    answer: 'Engineering Plus is certified with ISO 9001:2015 for Quality Management, ISO 14001:2015 for Environmental Management, and ISO 45001:2018 for Occupational Health & Safety. We also hold CPCB approval and comply with all relevant environmental and safety standards.',
    category: 'general',
  },
  {
    id: 'faq-5',
    question: 'How do you ensure project quality?',
    answer: 'We follow strict quality control protocols at every project stage - from material procurement to final commissioning. Our team conducts regular inspections, uses certified materials, follows international standards, and maintains detailed documentation throughout the project lifecycle.',
    category: 'technical',
  },
  {
    id: 'faq-6',
    question: 'What areas do you serve?',
    answer: 'Engineering Plus serves clients across India, with a strong presence in major metros and tier-2 cities. We have successfully completed projects in commercial, residential, industrial, and institutional sectors nationwide.',
    category: 'general',
  },
  {
    id: 'faq-7',
    question: 'How can I get a project quote?',
    answer: 'You can request a project quote by filling out our contact form, calling our office, or emailing us directly. Our team will schedule a site visit, understand your requirements, and provide a detailed quotation within 5-7 business days.',
    category: 'process',
  },
  {
    id: 'faq-8',
    question: 'Do you handle government and institutional projects?',
    answer: 'Yes, we have extensive experience working with government bodies, educational institutions, hospitals, and large commercial establishments. We are well-versed with public procurement processes and regulatory compliance requirements.',
    category: 'general',
  },
];
