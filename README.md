# Client - Portfolio Website

A responsive React.js portfolio website showcasing projects, skills, programming stats, and contact information.

## Features

- **Home Page** - Hero section with introduction and call-to-action
- **Projects Showcase** - Display of featured projects with descriptions
- **Programming Stats** - Competitive programming statistics and achievements
- **Skills Section** - Technical skills and expertise display
- **Contact Form** - Visitor contact form for inquiries
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dynamic Content** - Fetches data from backend API

## Tech Stack

- **React.js 18** - UI framework
- **React Router DOM 6** - Client-side routing
- **Tailwind CSS** - Styling and responsive design
- **PostCSS** - CSS processing
- **Axios** - HTTP client for API requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with backend API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

## Available Scripts

### `npm start`
Runs the app in development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `build` folder.
- Optimizes the build for the best performance.

### `npm test`
Launches the test runner in interactive watch mode.

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.js
│   ├── Hero.js
│   ├── Projects.js
│   ├── Skills.js
│   ├── ProgrammingStats.js
│   ├── Contact.js
│   ├── Footer.js
│   └── ...
├── pages/               # Page components
│   ├── Home.js
│   ├── HomeInOnePage.js
│   ├── Projects.js
│   ├── Contact.js
│   └── ...
├── styles/              # Global styles
├── App.js               # Main app component
└── index.js             # React DOM render
```

## API Integration

The client communicates with the backend API for:
- Fetching projects
- Fetching programming statistics
- Fetching skills
- Submitting contact forms

Ensure the backend server is running on the URL specified in `.env.local`.

## Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service (Vercel, Netlify, etc.)

## Notes

- Make sure the backend server is running before starting the client development server
- Update API endpoints in `.env.local` for production deployment

