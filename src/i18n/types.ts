export type Locale = 'en' | 'uk' | 'de' | 'ru'

export interface Translations {
  // App
  'app.title': string
  'app.downloadPdf': string
  'app.generatingPdf': string
  'app.skipToPreview': string

  // Sections
  'section.style': string
  'section.personal': string
  'section.skills': string
  'section.experience': string
  'section.projects': string
  'section.education': string
  'section.languages': string
  'section.extras': string

  // Style panel
  'style.template': string
  'style.accentColor': string
  'style.photoFilter': string
  'style.sectionVisibility': string
  'style.filterOriginal': string
  'style.filterBW': string
  'style.filterTinted': string

  // Personal form
  'personal.title': string
  'personal.photo': string
  'personal.changePhoto': string
  'personal.uploadPhoto': string
  'personal.removePhoto': string
  'personal.fullName': string
  'personal.jobTitle': string
  'personal.location': string
  'personal.email': string
  'personal.phone': string
  'personal.linkedin': string
  'personal.github': string
  'personal.portfolio': string
  'personal.summary': string

  // Skills form
  'skills.title': string

  // Experience form
  'experience.title': string
  'experience.position': string
  'experience.company': string
  'experience.location': string
  'experience.startDate': string
  'experience.endDate': string
  'experience.current': string
  'experience.description': string
  'experience.add': string
  'experience.remove': string

  // Projects form
  'projects.title': string
  'projects.name': string
  'projects.techStack': string
  'projects.link': string
  'projects.description': string
  'projects.add': string

  // Education form
  'education.title': string
  'education.degree': string
  'education.institution': string
  'education.start': string
  'education.end': string
  'education.description': string

  // Languages form
  'languages.title': string
  'languages.language': string
  'languages.level': string
  'languages.add': string

  // Extras form
  'extras.title': string
  'extras.certifications': string
  'extras.interests': string

  // Visibility
  'visibility.summary': string
  'visibility.contact': string
  'visibility.skills': string
  'visibility.experience': string
  'visibility.projects': string
  'visibility.education': string
  'visibility.languages': string
  'visibility.certifications': string
  'visibility.interests': string

  // Validation
  'validation.fullNameRequired': string
  'validation.jobTitleRequired': string
  'validation.invalidEmail': string

  // Photo crop
  'crop.title': string
  'crop.size': string
  'crop.apply': string
  'crop.cancel': string
}
