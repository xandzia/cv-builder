export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  if (dateStr.length === 4) return dateStr
  const [year, month] = dateStr.split('-')
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  return `${months[parseInt(month, 10) - 1]}/${year}`
}

export function toHref(url: string): string {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url
  if (url.includes('@')) return `mailto:${url}`
  return `https://${url}`
}
