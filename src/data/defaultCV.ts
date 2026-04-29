import type { CVData } from '../types/cv'

let idCounter = 0
const uid = () => String(++idCounter)

export const defaultCV: CVData = {
  personal: {
    photo: '',
    fullName: 'Anna Stepashko',
    jobTitle: 'Frontend Developer',
    location: 'Vienna, Austria',
    email: 'anna.stepashko@example.com',
    phone: '+43 660 123 4567',
    linkedin: 'linkedin.com/in/anna-stepashko',
    github: 'github.com/anna-stepashko',
    portfolio: 'anna-stepashko.dev',
    summary:
      'Frontend developer with 4+ years of experience building performant, accessible web applications. Proficient in Vue 3, React, and TypeScript with a focus on clean architecture, component-driven development, and seamless user experiences. Experienced in REST API integration, state management, and modern build tooling.',
  },
  skillGroups: [
    {
      label: 'Frontend',
      skills: [
        'Vue 3',
        'React',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5',
        'CSS3 / SCSS',
        'Tailwind CSS',
      ],
    },
    {
      label: 'State & Data',
      skills: [
        'Pinia',
        'Vuex',
        'REST API',
        'Async Data Handling',
      ],
    },
    {
      label: 'Backend & Integration',
      skills: [
        'Node.js (Express)',
        'API Integration',
        'E-signature Workflows',
        'Token-based Auth',
      ],
    },
    {
      label: 'Tools & Other',
      skills: [
        'Git',
        'Vite',
        'Webpack',
        'D3.js',
        'Decap CMS',
        'Vitest / Jest',
      ],
    },
  ],
  experience: [
    {
      id: uid(),
      position: 'Frontend Developer',
      company: 'TechVision GmbH',
      location: 'Vienna, Austria',
      startDate: '2022-03',
      endDate: '',
      isCurrent: true,
      bullets: [
        'Built and maintained a Vue 3 + TypeScript SPA serving 50k+ monthly users with Pinia state management and REST API integration',
        'Developed an e-signature flow with token-based verification, reducing document processing time by 40%',
        'Implemented D3.js data visualizations for real-time analytics dashboards',
        'Created a Node.js Express proxy layer for secure third-party API communication',
        'Set up CI/CD pipelines and introduced Vitest unit testing, achieving 85% code coverage',
      ],
    },
    {
      id: uid(),
      position: 'Junior Frontend Developer',
      company: 'WebCraft Solutions',
      location: 'Graz, Austria',
      startDate: '2020-06',
      endDate: '2022-02',
      isCurrent: false,
      bullets: [
        'Developed responsive UI components using Vue 2 and SCSS following atomic design principles',
        'Migrated legacy jQuery modules to Vue, improving load times by 30%',
        'Integrated Decap CMS (Netlify CMS) for a content-managed marketing site',
        'Collaborated with UX designers to implement pixel-perfect designs from Figma mockups',
      ],
    },
  ],
  projects: [
    {
      id: uid(),
      name: 'CV Builder App',
      techStack: 'React, TypeScript, Tailwind CSS, html2pdf.js',
      link: 'github.com/anna-stepashko/cv-builder',
      bullets: [
        'Built a single-page CV builder with real-time preview and one-click A4 PDF export',
        'Implemented reactive form architecture with instant visual feedback across all sections',
      ],
    },
    {
      id: uid(),
      name: 'Analytics Dashboard',
      techStack: 'Vue 3, D3.js, TypeScript, Pinia',
      link: '',
      bullets: [
        'Designed interactive D3.js charts for internal KPI tracking across 5 departments',
        'Optimized real-time data pipeline via WebSocket, reducing dashboard latency by 60%',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Technische Universität Graz',
    startDate: '2016',
    endDate: '2020',
    description:
      'Focus on web technologies and human-computer interaction. Thesis on optimizing SPA performance.',
  },
  languages: [
    { id: uid(), language: 'Ukrainian', level: 'Native' },
    { id: uid(), language: 'English', level: 'Fluent (C1)' },
    { id: uid(), language: 'German', level: 'Professional (B2)' },
  ],
  certifications: [
    'AWS Certified Cloud Practitioner (2024)',
    'Meta Frontend Developer Professional Certificate (2023)',
  ],
  interests: [
    'Open-source contribution',
    'Tech meetups & conferences',
    'Hiking in the Alps',
    'Photography',
  ],
}
