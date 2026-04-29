import { describe, it, expect } from 'vitest'
import {
  hexToHsl,
  hslToHex,
  deriveColors,
  TEXT_DARK,
  TEXT_MED,
  TEXT_LIGHT,
} from '../color'

describe('hexToHsl', () => {
  it('converts black', () => {
    const [h, s, l] = hexToHsl('#000000')
    expect(h).toBe(0)
    expect(s).toBe(0)
    expect(l).toBe(0)
  })

  it('converts white', () => {
    const [h, s, l] = hexToHsl('#ffffff')
    expect(h).toBe(0)
    expect(s).toBe(0)
    expect(l).toBe(1)
  })

  it('converts pure red', () => {
    const [h, s, l] = hexToHsl('#ff0000')
    expect(h).toBe(0)
    expect(s).toBe(1)
    expect(l).toBeCloseTo(0.5, 2)
  })

  it('converts the accent color #5b6abf', () => {
    const [h, s, l] = hexToHsl('#5b6abf')
    expect(h).toBeGreaterThan(0.6)
    expect(h).toBeLessThan(0.7)
    expect(s).toBeGreaterThan(0.3)
    expect(l).toBeGreaterThan(0.4)
    expect(l).toBeLessThan(0.6)
  })
})

describe('hslToHex', () => {
  it('converts achromatic (grey)', () => {
    expect(hslToHex(0, 0, 0.5)).toBe('#808080')
  })

  it('converts black', () => {
    expect(hslToHex(0, 0, 0)).toBe('#000000')
  })

  it('converts white', () => {
    expect(hslToHex(0, 0, 1)).toBe('#ffffff')
  })

  it('round-trips hex -> hsl -> hex', () => {
    const inputs = ['#5b6abf', '#ff5733', '#33ff57', '#3357ff']
    for (const hex of inputs) {
      const [h, s, l] = hexToHsl(hex)
      const result = hslToHex(h, s, l)
      expect(result).toBe(hex)
    }
  })
})

describe('deriveColors', () => {
  it('returns ACCENT matching input', () => {
    const colors = deriveColors('#5b6abf')
    expect(colors.ACCENT).toBe('#5b6abf')
  })

  it('returns ACCENT_LIGHT lighter than ACCENT', () => {
    const colors = deriveColors('#5b6abf')
    const [, , accentL] = hexToHsl(colors.ACCENT)
    const [, , lightL] = hexToHsl(colors.ACCENT_LIGHT)
    expect(lightL).toBeGreaterThan(accentL)
  })

  it('returns SIDEBAR_BG as very light', () => {
    const colors = deriveColors('#5b6abf')
    const [, , sidebarL] = hexToHsl(colors.SIDEBAR_BG)
    expect(sidebarL).toBeGreaterThan(0.9)
  })

  it('returns all three keys', () => {
    const colors = deriveColors('#336699')
    expect(colors).toHaveProperty('ACCENT')
    expect(colors).toHaveProperty('ACCENT_LIGHT')
    expect(colors).toHaveProperty('SIDEBAR_BG')
  })
})

describe('color constants', () => {
  it('TEXT_DARK is a valid hex color', () => {
    expect(TEXT_DARK).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('TEXT_MED is a valid hex color', () => {
    expect(TEXT_MED).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('TEXT_LIGHT is a valid hex color', () => {
    expect(TEXT_LIGHT).toMatch(/^#[0-9a-f]{6}$/i)
  })
})
