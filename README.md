# CV Builder

CV Builder is a single-page application that allows users to create a clean, professional frontend developer CV and export it as a PDF.

## ✨ Features

- Dynamic form with multiple sections:
    - Personal Info
    - Skills
    - Experience
    - Projects
    - Education
    - Languages
    - Extras
- Live A4 preview that matches the exported PDF
- One-click PDF export
- Undo / redo support with debounced history
- Customizable accent color
- Responsive UI (desktop sidebar + mobile tabs)
- i18n support

## 🧠 How it works

- The app is split into two main parts:
    - **Editor (left panel)** — form inputs
    - **Preview (right panel)** — real-time CV rendering

- The preview is rendered inside a fixed A4 layout and exported directly to PDF using `html2pdf.js`.

- Only the `#cv-preview` element is included in the final PDF.

## 🏗 Architecture

- Global state (`CVData`) is managed in `App.tsx`
- All form components are **controlled**
- Preview uses **inline styles** to ensure correct rendering in `html2canvas`
- Undo/redo implemented via custom hook (`useUndoRedo`) with 500ms debounce
- Section navigation handled via `EditorSidebar`

## 🎨 Styling

- Tailwind CSS is used for the application UI
- Inline styles are used inside the CV preview (PDF consistency)
- Clean European CV design:
    - No gradients
    - No progress bars
    - Minimalistic layout
    - Custom square bullets

## ⚙️ Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- html2pdf.js (jsPDF + html2canvas)

## 🚀 Getting Started

```bash
npm install
npm run dev