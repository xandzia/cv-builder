# CV Builder

Single-page web application for generating a professional frontend developer CV as a downloadable PDF.

## Tech Stack

- **React 19** with TypeScript
- **Vite 8** for build tooling
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **html2pdf.js** for PDF export (wraps jsPDF + html2canvas)

## Project Structure

```
src/
├── types/          # TypeScript interfaces (cv.ts, html2pdf.d.ts)
├── data/           # Default CV content (defaultCV.ts)
├── hooks/          # Custom hooks (usePdfExport.ts)
├── components/
│   ├── form/       # Form input components
│   │   ├── FormSection.tsx   # Collapsible section wrapper
│   │   ├── Input.tsx         # Reusable text input
│   │   ├── TextArea.tsx      # Reusable textarea
│   │   ├── PersonalInfoForm.tsx
│   │   ├── SkillsForm.tsx
│   │   ├── ExperienceForm.tsx
│   │   ├── ProjectsForm.tsx
│   │   ├── EducationForm.tsx
│   │   ├── LanguagesForm.tsx
│   │   └── ExtrasForm.tsx
│   └── preview/
│       └── CVPreview.tsx     # A4 CV preview (rendered for PDF)
├── App.tsx         # Main layout: form (left) + preview (right)
├── main.tsx        # Entry point
└── index.css       # Tailwind imports + CV print styles
```

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Architecture Notes

- All CV data flows through a single `CVData` state in `App.tsx`
- Form components receive data + onChange props (controlled)
- `CVPreview` uses inline styles for PDF fidelity (Tailwind classes don't survive html2canvas)
- PDF export targets `#cv-preview` element only
- The preview is styled as an A4 page (210mm × 297mm)
- Accent color: `#5b6abf` (muted blue-purple)

## Conventions

- Functional components with hooks only
- TypeScript strict mode
- Tailwind for form/layout styling, inline styles for CV preview (PDF accuracy)
- Each form section is a collapsible `<details>` element
- Dynamic list items (experience, projects, languages) use `id` fields for React keys

## Claude Working Rules

Always follow these rules when modifying this project:

### General
- This project is a React 19 + TypeScript + Tailwind CSS v4 CV Builder.
- Do not rewrite the whole app or large components unless explicitly asked.
- Make minimal, targeted changes.
- Preserve the current architecture and data flow.
- Keep all CV data inside the existing `CVData` state structure.
- Keep form components controlled via props.
- Do not introduce unnecessary state libraries or routing.

### CV Preview
- `CVPreview.tsx` is the source of truth for the exported PDF layout.
- The CV preview must remain A4-sized: 210mm × 297mm.
- Preserve the clean, professional European CV style.
- Keep the accent color consistent: `#5b6abf`.
- Use inline styles inside `CVPreview.tsx` when visual fidelity in PDF matters.
- Avoid decorative clutter, icons, gradients, skill bars, or overly creative layout choices.

### PDF Export
- PDF export must target only the `#cv-preview` element.
- Exported PDF must be exactly one A4 page whenever possible.
- Prevent accidental extra pages.
- Avoid external margins or wrappers being included in the export.
- Use PDF-safe styles:
    - `break-inside: avoid`
    - `page-break-inside: avoid`
    - controlled height/overflow
- Preview and exported PDF should look visually identical.
- Do not export the form panel.

### Styling
- Use Tailwind CSS for app layout and form UI.
- Use inline styles for CV preview elements that must render correctly in html2canvas.
- Avoid default browser styles in the CV preview.
- Use consistent spacing, typography, and alignment.
- Prefer readable layout over visual experiments.

### Lists and Bullets
- Do not use default black round bullets in the CV preview.
- Use custom square bullets:
    - small square
    - purple border using `#5b6abf`
    - white or very light fill
    - aligned correctly with multi-line text
- Apply the custom bullet style consistently to:
    - work experience descriptions
    - project descriptions
    - education descriptions
    - any other preview bullet lists

### Layout Fixes
- Fix alignment with flexbox or grid where possible.
- Avoid absolute positioning unless there is a clear reason.
- Keep section content vertically balanced.
- Keep the Interests block content centered inside its container.
- Avoid layout shifts between browser preview and PDF export.

### Response Style
- First explain briefly what will change.
- Then provide only the relevant code changes.
- Do not output unrelated files.
- Do not over-engineer.
