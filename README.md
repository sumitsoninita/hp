# Fund for Future Initiative - HP India

A Next.js application for HP India's Fund for Future Initiative, empowering students from Tier 2 & 3 colleges to submit startup ideas and get funding support.

## Features

- Student registration and application submission
- Admin dashboard for reviewing applications
- Application status tracking
- Responsive design with HP branding
- Server-side rendering with Next.js App Router

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Local Storage (for demo purposes)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `page.tsx` - Home page
  - `login/page.tsx` - Login page
  - `register/page.tsx` - Registration page
  - `student/dashboard/page.tsx` - Student dashboard
  - `admin/dashboard/page.tsx` - Admin dashboard
- `components/` - Reusable UI components
- `contexts/` - React Context providers (Auth)
- `services/` - Business logic and data management
- `types.ts` - TypeScript type definitions
- `constants.ts` - Application constants

## Predefined Login Credentials

For testing purposes, you can use these predefined accounts:

### Admin Account:
- Email: `admin@test.com`
- Password: `admin123`
- Access: Admin Dashboard for reviewing student applications

### Student Account:
- Email: `student@test.com`
- Password: `student123`
- Access: Student Dashboard for submitting startup ideas

## Deployment

This application can be deployed to Vercel, Netlify, or any other platform that supports Next.js:

```bash
npm run build
npm start
```

## Environment Variables

No environment variables are required for the basic setup. The application uses localStorage for data persistence in the demo version.