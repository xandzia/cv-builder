# CV Builder

A single-page app for building and exporting a frontend developer CV as a PDF.

**Demo:** https://xandzia.github.io/cv-builder/

## Stack

- React 19 + TypeScript
- Vite + Tailwind CSS v4
- html2pdf.js for PDF export

## What it does

Fill in the form on the left, see the result on the right. When you're happy with it, click Download PDF — it exports exactly what you see, as an A4 page.

Sections: personal info, skills, experience, projects, education, languages, extras.

Other things: undo/redo, accent color picker, photo upload, i18n (EN/DE/UK/RU), mobile layout.

## Running locally

```bash
npm install
npm run dev
```
