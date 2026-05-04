import { Service } from '@/types';

export const servicesData: Service[] = [
  // INDUSTRIAL EPC

  {
    id: 'stp',
    name: 'Sewage Treatment Plants (STP)',
    description:
      'Complete design, procurement, and construction of STP systems using advanced biological treatment technologies. Our solutions ensure efficient wastewater management, regulatory compliance, and sustainable water reuse for industrial, residential, and commercial applications.',
    color: 'text-blue-500',
    icon: 'Droplets',
    category: 'Industrial EPC',
    benefits: [
      'Meets environmental compliance standards',
      'Advanced biological treatment processes',
      'Automated operation and monitoring',
      'Treated water reuse capability',
    ],
  },

  {
    id: 'wtp',
    name: 'Water Treatment Plants (WTP)',
    description:
      'End-to-end water purification solutions including pre-treatment, filtration, reverse osmosis (RO), and UV disinfection systems. Designed for industrial and hospitality sectors, our WTP systems deliver high-quality water with efficient and scalable operations.',
    color: 'text-green-500',
    icon: 'Leaf',
    category: 'Industrial EPC',
    benefits: [
      'Multi-stage purification process',
      'International water quality standards',
      'Scalable solutions for any capacity',
      'Low operational costs',
    ],
  },

  {
    id: 'electromechanical',
    name: 'Electromechanical Solutions',
    description:
      'Integrated mechanical and electrical system design and installation for industrial and commercial facilities. Our solutions ensure efficient operation, energy optimization, and reliable performance across all project phases.',
    color: 'text-yellow-500',
    icon: 'Cog',
    category: 'MEP',
    benefits: [
      'Integrated system design',
      'Energy-efficient operations',
      'Reliable performance',
    ],
  },

  {
    id: 'civil',
    name: 'Civil Work',
    description:
      'Execution of civil infrastructure including foundations, structural works, and site development with a focus on durability, safety, and engineering precision. We ensure seamless integration with overall project execution under EPC frameworks.',
    color: 'text-pink-500',
    icon: 'Building',
    category: 'MEP',
    benefits: [
      'Robust structural execution',
      'High-quality construction standards',
      'Seamless EPC integration',
    ],
  },



  {
    id: 'fire-fighting',
    name: 'Fire Fighting Systems',
    description:
      'Comprehensive fire protection systems including hydrants, sprinklers, and suppression systems designed to meet safety standards and regulatory requirements across industrial and commercial facilities.',
    color: 'text-amber-500',
    icon: 'Flame',
    category: 'MEP',
    benefits: [
      'Compliance with safety regulations',
      'Advanced protection systems',
      'Reliable emergency response',
    ],
  },

  {
    id: 'fire-alarm',
    name: 'Fire Alarm Systems',
    description:
      'Advanced fire detection and alarm systems designed for early warning and rapid response. Our solutions integrate seamlessly with building safety systems to enhance protection and minimize risk.',
    color: 'text-red-500',
    icon: 'Bell',
    category: 'MEP',
    benefits: [
      'Early fire detection',
      'Automated alert systems',
      'Integrated safety solutions',
    ],
  },

  {
    id: 'instrumentation',
    name: 'Instrumentation & Control',
    description:
      'Automation and control systems for industrial processes, including sensors, control panels, and monitoring solutions. Designed to improve efficiency, accuracy, and operational control across facilities.',
    color: 'text-teal-500',
    icon: 'Cpu',
    category: 'MEP',
    benefits: [
      'Process automation',
      'Real-time monitoring',
      'Improved operational efficiency',
    ],
  },

  // INTERIOR

  {
    id: 'offices',
    name: 'Office Interiors',
    description:
      'Modern office interior solutions focusing on functionality, productivity, and aesthetics. We provide complete turnkey execution including space planning, material selection, and finishing.',
    color: 'text-purple-500',
    icon: 'Building2',
    category: 'Interior',
    benefits: [
      'Optimized workspace design',
      'Premium finishes',
      'Efficient execution',
    ],
  },

  {
    id: 'hotels',
    name: 'Hotel Interiors',
    description:
      'Luxury and functional interior solutions for hospitality projects, ensuring high-end design, comfort, and durability while maintaining brand identity and guest experience.',
    color: 'text-indigo-500',
    icon: 'Hotel',
    category: 'Interior',
    benefits: [
      'Luxury design standards',
      'Durable materials',
      'Enhanced guest experience',
    ],
  },

  {
    id: 'cafes',
    name: 'Cafe Interiors',
    description:
      'Creative and aesthetic interior designs for cafes that enhance customer experience and brand identity. We focus on ambiance, layout, and efficient utilization of space.',
    color: 'text-amber-800',
    icon: 'Coffee',
    category: 'Interior',
    benefits: [
      'Unique ambiance design',
      'Brand-focused interiors',
      'Efficient space utilization',
    ],
  },
];