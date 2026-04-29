export type PhotoFilterType = 'none' | 'grayscale' | 'accent'

export interface PersonalInfo {
  photo: string
  fullName: string
  jobTitle: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  portfolio: string
  summary: string
}

export interface SkillGroup {
  label: string
  skills: string[]
}

export interface WorkExperience {
  id: string
  position: string
  company: string
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  bullets: string[]
}

export interface Project {
  id: string
  name: string
  techStack: string
  link: string
  bullets: string[]
}

export interface Education {
  degree: string
  institution: string
  startDate: string
  endDate: string
  description: string
}

export interface Language {
  id: string
  language: string
  level: string
}

export interface SectionVisibility {
  experience: boolean
  projects: boolean
  education: boolean
  skills: boolean
  languages: boolean
  certifications: boolean
  interests: boolean
  contact: boolean
  summary: boolean
}

export interface CVData {
  personal: PersonalInfo
  skillGroups: SkillGroup[]
  experience: WorkExperience[]
  projects: Project[]
  education: Education
  languages: Language[]
  certifications: string[]
  interests: string[]
}
