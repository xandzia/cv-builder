import type { CVData } from '../types/cv'

let idCounter = 0
const uid = () => String(++idCounter)

export const defaultCV: CVData = {
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
  languages: [
    { id: uid(), language: '', level: '' },
  ],
  certifications: [],
  interests: [],
}
