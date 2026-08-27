import { Service } from '@/types';

export const servicesData: Service[] = [
  // =========================================================
  // INDUSTRIAL EPC
  // =========================================================

  {
    id: 'stp',
    name: 'Sewage Treatment Plants (STP)',
    description:
      'Complete engineering, procurement, and construction solutions for sewage treatment plants. We deliver end-to-end STP systems including process design, civil coordination, mechanical and electrical installation, automation, testing, commissioning, and water reuse solutions.',
    color: 'text-blue-500',
    icon: 'Droplets',
    category: 'Industrial EPC',
    benefits: [
      'Complete EPC execution',
      'Advanced biological treatment systems',
      'Automated operation and monitoring',
      'Treated water reuse solutions',
    ],
  },

  {
    id: 'wtp',
    name: 'Water Treatment Plants (WTP)',
    description:
      'End-to-end water treatment solutions covering process design, filtration, reverse osmosis, UV disinfection, pumping, and associated mechanical and electrical systems. Our solutions are designed for reliable, efficient, and scalable water treatment.',
    color: 'text-green-500',
    icon: 'Leaf',
    category: 'Industrial EPC',
    benefits: [
      'Complete water treatment solutions',
      'Multi-stage purification systems',
      'Scalable plant capacities',
      'Efficient and reliable operation',
    ],
  },

  {
    id: 'design-engineering',
    name: 'Design & Engineering',
    description:
      'Comprehensive engineering and design services for industrial and infrastructure projects, covering process engineering, MEPF coordination, equipment selection, system layouts, technical documentation, and project-specific engineering solutions.',
    color: 'text-indigo-500',
    icon: 'PenTool',
    category: 'Industrial EPC',
    benefits: [
      'Integrated engineering approach',
      'Project-specific design solutions',
      'Technical documentation',
      'MEPF coordination',
    ],
  },

  {
    id: 'procurement',
    name: 'Procurement & Supply',
    description:
      'End-to-end procurement and material supply services for EPC projects. We manage vendor coordination, technical evaluation, material sourcing, quality checks, and timely delivery of equipment and project materials.',
    color: 'text-orange-500',
    icon: 'PackageSearch',
    category: 'Industrial EPC',
    benefits: [
      'Reliable vendor coordination',
      'Quality-focused sourcing',
      'Technical evaluation',
      'Timely material delivery',
    ],
  },

  {
    id: 'epc-execution',
    name: 'EPC Project Execution',
    description:
      'Integrated engineering, procurement, construction, installation, and project management services for industrial and commercial developments. We coordinate multidisciplinary teams to deliver projects efficiently from planning through completion.',
    color: 'text-yellow-500',
    icon: 'HardHat',
    category: 'Industrial EPC',
    benefits: [
      'Single-point project execution',
      'Multidisciplinary coordination',
      'Quality and schedule management',
      'End-to-end project delivery',
    ],
  },

  {
    id: 'testing-commissioning',
    name: 'Testing & Commissioning',
    description:
      'Systematic testing and commissioning services to verify the performance, safety, and reliability of installed systems before project handover. Our process includes inspections, functional testing, system integration, and performance verification.',
    color: 'text-teal-500',
    icon: 'ClipboardCheck',
    category: 'Industrial EPC',
    benefits: [
      'System performance verification',
      'Functional testing',
      'Integrated system checks',
      'Smooth project handover',
    ],
  },

  {
    id: 'operation-maintenance',
    name: 'Operation & Maintenance (O&M)',
    description:
      'Post-project operation and maintenance services designed to maintain system performance, reliability, and operational efficiency. We provide planned maintenance, troubleshooting, monitoring, and technical support.',
    color: 'text-cyan-500',
    icon: 'Cog',
    category: 'Industrial EPC',
    benefits: [
      'Planned preventive maintenance',
      'Technical support',
      'Performance monitoring',
      'Improved system reliability',
    ],
  },

  // =========================================================
  // MEPF
  // Mechanical, Electrical, Plumbing & Fire Protection
  // =========================================================

  // -------------------------
  // MECHANICAL
  // -------------------------

  {
    id: 'hvac',
    name: 'HVAC Systems',
    description:
      'Complete HVAC solutions for commercial, industrial, hospitality, and institutional facilities, including system design, equipment selection, installation, testing, and commissioning for efficient indoor climate control.',
    color: 'text-blue-500',
    icon: 'Wind',
    category: 'MEPF',
    benefits: [
      'Efficient climate control',
      'Energy-conscious system design',
      'Reliable equipment installation',
      'Complete HVAC execution',
    ],
  },

  {
    id: 'ventilation',
    name: 'Ventilation Systems',
    description:
      'Mechanical ventilation solutions designed to provide effective air circulation, fresh air supply, and exhaust management across commercial, industrial, and institutional facilities.',
    color: 'text-sky-500',
    icon: 'Fan',
    category: 'MEPF',
    benefits: [
      'Effective air circulation',
      'Fresh air management',
      'Efficient exhaust systems',
      'Improved indoor environment',
    ],
  },

  {
    id: 'mechanical-equipment',
    name: 'Mechanical Equipment Installation',
    description:
      'Installation and integration of mechanical equipment and systems for industrial and commercial facilities, ensuring proper alignment, connection, testing, and reliable operation.',
    color: 'text-slate-500',
    icon: 'Wrench',
    category: 'MEPF',
    benefits: [
      'Professional equipment installation',
      'System integration',
      'Performance testing',
      'Reliable operation',
    ],
  },

  // -------------------------
  // ELECTRICAL
  // -------------------------

  {
    id: 'electrical-systems',
    name: 'Electrical Systems',
    description:
      'Complete electrical infrastructure solutions covering power distribution, HT/LT systems, electrical panels, cabling, lighting, and associated installations for commercial and industrial facilities.',
    color: 'text-red-500',
    icon: 'Cable',
    category: 'MEPF',
    benefits: [
      'Reliable power distribution',
      'HT/LT electrical solutions',
      'Professional installation',
      'Safe and efficient systems',
    ],
  },

  {
    id: 'substation',
    name: 'HT/LT Substations & Power Distribution',
    description:
      'Design and installation of HT/LT substations and power distribution infrastructure, including transformers, panels, cabling, protection systems, and associated electrical equipment.',
    color: 'text-amber-500',
    icon: 'PlugZap',
    category: 'MEPF',
    benefits: [
      'Reliable power infrastructure',
      'HT/LT system integration',
      'Safe power distribution',
      'Professional commissioning',
    ],
  },

  {
    id: 'lighting',
    name: 'Lighting Systems',
    description:
      'Indoor, outdoor, architectural, and industrial lighting solutions designed for functional performance, energy efficiency, safety, and effective illumination across facilities.',
    color: 'text-orange-400',
    icon: 'Lightbulb',
    category: 'MEPF',
    benefits: [
      'Efficient lighting solutions',
      'Functional illumination',
      'Energy-conscious systems',
      'Complete installation',
    ],
  },

  {
    id: 'earthing-lightning',
    name: 'Earthing & Lightning Protection',
    description:
      'Electrical safety systems including earthing and lightning protection designed to safeguard buildings, equipment, and personnel from electrical faults and lightning-related risks.',
    color: 'text-blue-500',
    icon: 'CloudLightning',
    category: 'MEPF',
    benefits: [
      'Electrical safety protection',
      'Lightning protection',
      'Equipment protection',
      'Compliance-focused installation',
    ],
  },

  // -------------------------
  // PLUMBING
  // -------------------------

  {
    id: 'plumbing',
    name: 'Plumbing Systems',
    description:
      'Complete plumbing solutions for commercial, residential, industrial, and hospitality facilities covering water supply, drainage, piping, fixtures, pumps, and associated plumbing infrastructure.',
    color: 'text-cyan-500',
    icon: 'Faucet',
    category: 'MEPF',
    benefits: [
      'Complete plumbing installation',
      'Efficient water distribution',
      'Reliable drainage systems',
      'Quality piping solutions',
    ],
  },

  {
    id: 'water-supply',
    name: 'Water Supply & Distribution',
    description:
      'Design and installation of domestic and process water supply systems including piping networks, pumps, storage, distribution, and associated equipment.',
    color: 'text-blue-500',
    icon: 'GlassWater',
    category: 'MEPF',
    benefits: [
      'Reliable water distribution',
      'Efficient pumping systems',
      'Optimized piping networks',
      'Complete installation',
    ],
  },

  {
    id: 'drainage',
    name: 'Drainage & Sewerage Systems',
    description:
      'Comprehensive drainage and sewerage infrastructure for effective collection, conveyance, and disposal of wastewater across buildings and facilities.',
    color: 'text-slate-500',
    icon: 'Waves',
    category: 'MEPF',
    benefits: [
      'Efficient wastewater drainage',
      'Reliable piping networks',
      'Proper system integration',
      'Low-maintenance infrastructure',
    ],
  },

  // -------------------------
  // FIRE PROTECTION
  // -------------------------

  {
    id: 'fire-fighting',
    name: 'Fire Fighting Systems',
    description:
      'Complete fire fighting and fire protection systems including hydrants, sprinklers, pumps, piping networks, and suppression equipment designed to protect people, property, and critical infrastructure.',
    color: 'text-red-500',
    icon: 'Flame',
    category: 'MEPF',
    benefits: [
      'Comprehensive fire protection',
      'Hydrant and sprinkler systems',
      'Reliable emergency response',
      'Safety-focused installation',
    ],
  },

  {
    id: 'fire-hydrant',
    name: 'Fire Hydrant Systems',
    description:
      'Design and installation of fire hydrant networks including fire pumps, hydrant points, piping, valves, and associated fire-fighting infrastructure.',
    color: 'text-orange-600',
    icon: 'CircleGauge',
    category: 'MEPF',
    benefits: [
      'Reliable firefighting infrastructure',
      'Complete hydrant network',
      'Fire pump integration',
      'Safety-focused execution',
    ],
  },

  {
    id: 'fire-sprinkler',
    name: 'Fire Sprinkler Systems',
    description:
      'Automatic fire sprinkler systems designed to provide early-stage fire suppression and localized protection across commercial, industrial, hospitality, and institutional facilities.',
    color: 'text-cyan-500',
    icon: 'SprayCan',
    category: 'MEPF',
    benefits: [
      'Automatic fire suppression',
      'Early fire response',
      'Area-specific protection',
      'Reliable sprinkler networks',
    ],
  },

  {
    id: 'fire-alarm',
    name: 'Fire Alarm & Detection Systems',
    description:
      'Advanced fire detection and alarm systems providing early warning through detectors, manual call points, control panels, notification devices, and integrated safety systems.',
    color: 'text-red-500',
    icon: 'BellElectric',
    category: 'MEPF',
    benefits: [
      'Early fire detection',
      'Automated alarm systems',
      'Integrated safety solutions',
      'Rapid emergency notification',
    ],
  },

  // -------------------------
  // INSTRUMENTATION & CONTROL
  // -------------------------

  {
    id: 'instrumentation',
    name: 'Instrumentation & Control',
    description:
      'Industrial instrumentation and control solutions covering sensors, transmitters, control panels, monitoring systems, and process control infrastructure to improve operational accuracy and efficiency.',
    color: 'text-teal-500',
    icon: 'SlidersHorizontal',
    category: 'MEPF',
    benefits: [
      'Process monitoring',
      'Automation and control',
      'Real-time data acquisition',
      'Improved operational efficiency',
    ],
  },

  {
    id: 'bms-automation',
    name: 'Building Management & Automation',
    description:
      'Building management and automation solutions for monitoring and controlling building systems including HVAC, electrical systems, energy usage, and other critical facility services.',
    color: 'text-indigo-500',
    icon: 'Cpu',
    category: 'MEPF',
    benefits: [
      'Centralized system monitoring',
      'Building automation',
      'Energy management',
      'Improved operational control',
    ],
  },

  // =========================================================
  // CIVIL & INFRASTRUCTURE
  // =========================================================

  {
    id: 'civil',
    name: 'Civil Construction',
    description:
      'Civil construction and infrastructure execution covering foundations, structural works, RCC construction, site development, and associated civil works for industrial, commercial, and infrastructure projects.',
    color: 'text-pink-500',
    icon: 'Building',
    category: 'Civil & Infrastructure',
    benefits: [
      'Robust structural execution',
      'Quality construction standards',
      'Experienced site execution',
      'Integrated project coordination',
    ],
  },

  {
    id: 'structural-works',
    name: 'Structural & RCC Works',
    description:
      'Execution of structural and reinforced concrete works including foundations, slabs, columns, beams, equipment foundations, and associated structural construction.',
    color: 'text-slate-600',
    icon: 'Landmark',
    category: 'Civil & Infrastructure',
    benefits: [
      'Quality RCC execution',
      'Durable structural systems',
      'Engineering-focused construction',
      'Site quality control',
    ],
  },

  {
    id: 'site-development',
    name: 'Site Development & Infrastructure',
    description:
      'Complete site development works including grading, paving, pathways, underground utilities, drainage infrastructure, and supporting site works required for project development.',
    color: 'text-yellow-500',
    icon: 'Construction',
    category: 'Civil & Infrastructure',
    benefits: [
      'Complete site development',
      'Integrated infrastructure works',
      'Efficient site utilization',
      'Coordinated execution',
    ],
  },

  // =========================================================
  // INTERIOR SOLUTIONS
  // =========================================================

  {
    id: 'offices',
    name: 'Office Interiors',
    description:
      'Modern office interior solutions focused on functionality, productivity, aesthetics, and efficient space utilization. We provide complete turnkey execution from space planning through finishing.',
    color: 'text-purple-500',
    icon: 'Building2',
    category: 'Interior',
    benefits: [
      'Optimized workspace design',
      'Functional space planning',
      'Premium finishes',
      'Turnkey execution',
    ],
  },

  {
    id: 'hotels',
    name: 'Hotel Interiors',
    description:
      'Complete interior solutions for hotels and hospitality facilities, combining design, functionality, durability, and brand identity to create comfortable and high-quality guest environments.',
    color: 'text-indigo-500',
    icon: 'Hotel',
    category: 'Interior',
    benefits: [
      'Hospitality-focused design',
      'Premium finishes',
      'Durable materials',
      'Enhanced guest experience',
    ],
  },

  {
    id: 'cafes',
    name: 'Cafe & Restaurant Interiors',
    description:
      'Creative interior solutions for cafes and restaurants focused on customer experience, brand identity, efficient layouts, aesthetics, and practical day-to-day operations.',
    color: 'text-amber-800',
    icon: 'Coffee',
    category: 'Interior',
    benefits: [
      'Brand-focused interiors',
      'Unique ambiance design',
      'Efficient space utilization',
      'Complete execution',
    ],
  },

  {
    id: 'commercial-interiors',
    name: 'Commercial Interiors',
    description:
      'Turnkey interior solutions for commercial spaces including planning, design coordination, material selection, execution, finishing, and project handover.',
    color: 'text-violet-500',
    icon: 'Store',
    category: 'Interior',
    benefits: [
      'Turnkey execution',
      'Functional space planning',
      'Quality finishing',
      'Coordinated project delivery',
    ],
  },
];