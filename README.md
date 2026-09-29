# LegalEase – AI-Powered Legal Document Generator

A student project prototype inspired by the supplied project brief.

## Features
- Modern responsive web interface
- Select document type
- Enter user details
- Generate a legal-document draft
- Preview generated document
- Print / Save as PDF from the browser
- Demo mode works without an API key
- Optional Gemini API backend integration

## Project structure
- `index.html` – main page
- `style.css` – design
- `script.js` – document generation logic
- `server.js` – optional Gemini API backend
- `.env.example` – API key configuration example
- `package.json` – Node.js dependencies

## Run the demo
Open `index.html` directly in a browser.

## Run with Node.js
1. Install Node.js.
2. Open terminal in this folder.
3. Run:
   `npm install`
4. Run:
   `npm start`
5. Open:
   `http://localhost:3000`

The frontend automatically uses demo generation unless the backend endpoint is available.

## Optional Gemini AI
Create a `.env` file:
`GEMINI_API_KEY=your_key_here`

Then start the server:
`npm start`

Never upload `.env` or your API key to GitHub.

## GitHub
Create a repository, upload these files, then connect the repository to a hosting service such as Render/Vercel for the full Node.js version.

For a simple frontend-only demo, GitHub Pages can host `index.html`, `style.css`, and `script.js`.
