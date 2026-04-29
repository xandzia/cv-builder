import type { CVData } from '../types/cv'

let idCounter = 0
const uid = () => String(++idCounter)

export const emptyCV: CVData = {
  personal: {
    photo: '',
    fullName: '',
    jobTitle: '',
    location: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  skillGroups: [],
  experience: [],
  projects: [],
  education: {
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    description: '',
  },
  languages: [],
  certifications: [],
  interests: [],
}

export const sampleCV: CVData = {
  personal: {
    photo: 'https://i.pravatar.cc/300',
    fullName: 'John Doe',
    jobTitle: 'Frontend Developer',
    location: 'Berlin, Germany',
    email: 'john.doe@example.com',
    phone: '+49 170 123 4567',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
    portfolio: 'johndoe.dev',
    summary:
      'Frontend developer with 4+ years of experience building performant, accessible web applications. Proficient in React, Vue, and TypeScript with a focus on clean architecture, component-driven development, and seamless user experiences.',
  },
  skillGroups: [
    {
      label: 'Frontend',
      skills: [
        'React',
        'Vue 3',
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
        'Redux',
        'Pinia',
        'REST API',
        'GraphQL',
      ],
    },
    {
      label: 'Tools & Testing',
      skills: [
        'Git',
        'Vite',
        'Webpack',
        'Vitest / Jest',
        'Playwright',
        'Docker',
      ],
    },
  ],
  experience: [
    {
      id: uid(),
      position: 'Frontend Developer',
      company: 'TechCorp GmbH',
      location: 'Berlin, Germany',
      startDate: '2022-03',
      endDate: '',
      isCurrent: true,
      bullets: [
        'Built and maintained a React + TypeScript SPA serving 50k+ monthly users with Redux state management and REST API integration',
        'Implemented interactive data visualizations using D3.js for real-time analytics dashboards',
        'Set up CI/CD pipelines and introduced Vitest unit testing, achieving 85% code coverage',
        'Mentored two junior developers through code reviews and pair programming sessions',
      ],
    },
    {
      id: uid(),
      position: 'Junior Frontend Developer',
      company: 'WebStudio Solutions',
      location: 'Munich, Germany',
      startDate: '2020-06',
      endDate: '2022-02',
      isCurrent: false,
      bullets: [
        'Developed responsive UI components using Vue 2 and SCSS following atomic design principles',
        'Migrated legacy jQuery modules to Vue, improving load times by 30%',
        'Collaborated with UX designers to implement pixel-perfect designs from Figma mockups',
      ],
    },
  ],
  projects: [
    {
      id: uid(),
      name: 'CV Builder App',
      techStack: 'React, TypeScript, Tailwind CSS, jsPDF',
      link: 'github.com/johndoe/cv-builder',
      bullets: [
        'Built a single-page CV builder with real-time preview and one-click A4 PDF export',
        'Implemented reactive form architecture with instant visual feedback across all sections',
      ],
    },
    {
      id: uid(),
      name: 'Task Tracker',
      techStack: 'Vue 3, TypeScript, Pinia, Firebase',
      link: 'github.com/johndoe/task-tracker',
      bullets: [
        'Designed a Kanban-style task manager with drag-and-drop and real-time sync via Firestore',
        'Added offline support with service workers and IndexedDB caching',
      ],
    },
  ],
  education: {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Technical University of Munich',
    startDate: '2016',
    endDate: '2020',
    description:
      'Focus on web technologies and human-computer interaction. Thesis on optimizing SPA performance.',
  },
  languages: [
    { id: uid(), language: 'English', level: 'Native' },
    { id: uid(), language: 'German', level: 'Fluent (C1)' },
    { id: uid(), language: 'French', level: 'Intermediate (B1)' },
  ],
  certifications: [
    'AWS Certified Cloud Practitioner (2024)',
    'Meta Frontend Developer Professional Certificate (2023)',
  ],
  interests: [
    'Open-source contribution',
    'Tech meetups & conferences',
    'Hiking',
    'Photography',
  ],
}

/** Default CV used on first launch (empty form) */
export const defaultCV = emptyCV
