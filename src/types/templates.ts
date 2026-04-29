export type TemplateId = 'two-column' | 'single-column' | 'minimal'

export interface TemplateConfig {
  id: TemplateId
  label: string
  description: string
}

export const TEMPLATES: TemplateConfig[] = [
  { id: 'two-column', label: 'Two Column', description: 'Sidebar + main content' },
  { id: 'single-column', label: 'Single Column', description: 'Full-width stacked' },
  { id: 'minimal', label: 'Minimal', description: 'Clean, no sidebar' },
]
