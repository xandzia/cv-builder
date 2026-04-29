let counter = 1000

export function nextId(): string {
  return String(++counter)
}
