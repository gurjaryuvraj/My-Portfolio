export type PortfolioMode = 'design' | 'dev';

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

export interface ProjectItem {
  number: string;
  name: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  deliverables: string[];
  liveUrl: string;
  liveLabel: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

export interface AboutDecorationSet {
  topLeft: string;
  bottomLeft: string;
  topRight: string;
  bottomRight: string;
}

export const INSTAGRAM_URL = 'https://www.instagram.com/creatiing';
export const GITHUB_URL = 'https://github.com/gurjaryuvraj';
export const NODE_IMAGE_PROCESSOR_URL =
  'https://github.com/gurjaryuvraj/node-based-image-processor';
export const IASIFY_URL = 'https://iasify.in';

export function isVideoAsset(src: string): boolean {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

export const DESIGN_ABOUT_DECORATIONS: AboutDecorationSet = {
  topLeft:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  bottomLeft:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  topRight:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  bottomRight:
    'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

export const DEV_ABOUT_DECORATIONS: AboutDecorationSet = {
  topLeft: '/src/assets/images/dev_icon_code_1795406820868.jpg',
  bottomLeft: '/src/assets/images/dev_icon_terminal_1795406822122.jpg',
  topRight: '/src/assets/images/dev_icon_chip_1795406821057.jpg',
  bottomRight: '/src/assets/images/dev_icon_server_1795406822896.jpg',
};

export const DESIGN_SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '3D Modeling',
    description:
      'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.',
  },
  {
    number: '02',
    name: 'Rendering',
    description:
      'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.',
  },
  {
    number: '03',
    name: 'Motion Design',
    description:
      'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.',
  },
  {
    number: '04',
    name: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    name: 'Web Design',
    description:
      'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.',
  },
];

export const DEV_SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: 'Full-Stack Web Apps',
    description:
      'End-to-end architecture and engineering of fast, scalable web applications with TypeScript, React, Node.js, and modern cloud databases.',
  },
  {
    number: '02',
    name: 'Machine Learning',
    description:
      'Building end-to-end ML pipelines, biological sequence feature engineering, transformer embeddings, Random Forest, and neural network models.',
  },
  {
    number: '03',
    name: 'Image Processing',
    description:
      'Designing modular node-based visual pipelines, real-time convolution filters, graph execution engines, and interactive graphics tooling.',
  },
  {
    number: '04',
    name: 'Backend & APIs',
    description:
      'Architecting resilient REST and WebSocket backends, secure authentication flows, real-time matchmaking engines, and low-latency data pipelines.',
  },
  {
    number: '05',
    name: 'Real-Time Platforms',
    description:
      'Shipping gamified assessment products like IASify.in with live 1v1 competitive queues, Elo rating systems, and granular analytics dashboards.',
  },
];

export const DESIGN_PROJECTS: ProjectItem[] = [
  {
    number: '01',
    name: 'Cozy Winter Attic',
    category: 'Instagram · @creatiing',
    year: '2025',
    role: '3D Interior & Lighting',
    summary:
      'A warm A-frame wooden attic scene rendered in 3D for @creatiing, pairing exposed timber rafters, draped fairy string lights, snowy skylight glass, soft cloth bedding, and a glowing decorated Christmas tree.',
    deliverables: ['3D Interior Modeling', 'Warm Practical Lighting', 'Cloth & Wood Lookdev'],
    liveUrl: INSTAGRAM_URL,
    liveLabel: 'View on Instagram',
    col1Image1: '/assets/aistudio/cozy_main.jpg',
    col1Image2: '/assets/aistudio/cozy_bed_angle.jpg',
    col2Image: '/assets/aistudio/cozy_tree_tall.jpg',
  },
  {
    number: '02',
    name: 'Storm Jet Flight',
    category: 'Instagram · @creatiing',
    year: '2025',
    role: '3D Aviation & Volumetrics',
    summary:
      'A dramatic 3D aviation study from @creatiing featuring a custom hard-surface silver T-tail business jet cutting through overcast volumetric storm clouds with crimson navigation beacons and cool rim highlights.',
    deliverables: ['Hard-Surface Aircraft', 'Volumetric Clouds', 'Multi-Angle Renders'],
    liveUrl: INSTAGRAM_URL,
    liveLabel: 'View on Instagram',
    col1Image1: '/assets/aistudio/jet_main.jpg',
    col1Image2: '/src/assets/images/design_jet_angle2_1795408727410.jpg',
    col2Image: '/src/assets/images/design_jet_angle3_1795408726180.jpg',
  },
  {
    number: '03',
    name: 'Twilight Horizon',
    category: 'Instagram · @creatiing',
    year: '2025',
    role: '3D Ocean & Atmosphere',
    summary:
      'An atmospheric 3D seascape posted on @creatiing capturing dark jagged mountain peaks silhouetted against a golden-rose twilight sky, rippling ocean reflections, and a lone crimson buoy adrift in calm waters.',
    deliverables: ['Ocean Shader & Ripples', 'Atmospheric Sunset Sky', 'Environment Framing'],
    liveUrl: INSTAGRAM_URL,
    liveLabel: 'View on Instagram',
    col1Image1: '/assets/aistudio/ocean_main.jpg',
    col1Image2: '/src/assets/images/design_ocean_angle3_1795408727579.jpg',
    col2Image:
      '/assets/aistudio/AQPVf4i2Z1DFGAB9NkB7K4MpBfco_sQ1bHqTkG0S5yJnyh6f-KIPjpRmJ4XqlD0sYnYtaqCDPRgTimyMuoObfz5VUtWYplbDVaXzIVI_033058b8.mp4',
  },
];

export const DEV_PROJECTS: ProjectItem[] = [
  {
    number: '01',
    name: 'IASify.in',
    category: 'Live Product · Full-Stack',
    year: '2026',
    role: 'Founder & Full-Stack Engineer',
    summary:
      'A gamified, ad-free UPSC Civil Services preparation platform featuring real-pattern 100-question Prelims simulations, live 1v1 competitive MCQ battles with Elo ratings, global leaderboards, and granular subject performance analytics.',
    deliverables: ['UPSC Prelims Simulator', 'Live 1v1 Elo Battles', 'Analytics Dashboard'],
    liveUrl: IASIFY_URL,
    liveLabel: 'Visit iasify.in',
    col1Image1: '/src/assets/images/dev_iasify_dashboard_1795406826843.jpg',
    col1Image2: '/src/assets/images/dev_iasify_battle_1795406829481.jpg',
    col2Image: '/src/assets/images/dev_iasify_analytics_1795406822676.jpg',
  },
  {
    number: '02',
    name: 'Node-Based Image Processor',
    category: 'Open Source · GitHub',
    year: '2025',
    role: 'Graphics & Systems Developer',
    summary:
      'A visual node-graph image processing engine enabling non-destructive chaining of filters, color adjustments, convolution kernels, and real-time split previews through a modular directed acyclic graph pipeline.',
    deliverables: ['DAG Node Execution Engine', 'Custom Filter Kernels', 'Live Preview Workspace'],
    liveUrl: NODE_IMAGE_PROCESSOR_URL,
    liveLabel: 'View on GitHub',
    col1Image1: '/src/assets/images/dev_nodeproc_graph_1795408723127.jpg',
    col1Image2: '/src/assets/images/dev_nodeproc_filters_1795408725476.jpg',
    col2Image: '/src/assets/images/dev_nodeproc_tall_1795408725643.jpg',
  },
  {
    number: '03',
    name: 'DNA Sequence Data Analytics',
    category: 'Machine Learning · Research',
    year: 'Aug – Nov 2025',
    role: 'ML Research · Molecular Dynamics',
    summary:
      'Built a data pipeline from molecular dynamics simulations and engineered numerical features from biological sequences. Applied ML models (Random Forest, Neural Networks) using transformer-based embeddings for prediction tasks, achieving R² ≈ 0.46 and lowest MSE with Random Forest, outperforming baseline models through comparative analysis.',
    deliverables: ['MD Simulation Pipeline', 'Transformer Embeddings', 'Random Forest · R² ≈ 0.46'],
    liveUrl: GITHUB_URL,
    liveLabel: 'View on GitHub',
    col1Image1: '/src/assets/images/dev_dna_helix_1795408724647.jpg',
    col1Image2: '/src/assets/images/dev_dna_ml_dashboard_1795408725076.jpg',
    col2Image: '/src/assets/images/dev_dna_tall_1795408726596.jpg',
  },
];
