---
description: Repository Information Overview
alwaysApply: true
---

# X-Store Information

## Summary
X-Store is a Next.js project bootstrapped with `create-next-app`. It's a web application built using React and Next.js with TypeScript support. The project uses Tailwind CSS for styling and follows the App Router pattern introduced in Next.js 13+.

## Structure
- **src/app**: Contains the main application components using Next.js App Router
- **src/utils**: Utility functions for the application
- **public**: Static assets like SVG images
- **.next**: Build output directory (generated)

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.x
**Build System**: Next.js with Turbopack
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- Next.js 15.5.4
- React 19.1.0
- React DOM 19.1.0
- @next/env 15.5.4

**Development Dependencies**:
- TypeScript 5.x
- ESLint 9.x
- Tailwind CSS 4.x
- Various TypeScript type definitions (@types/*)

## Build & Installation
```bash
# Install dependencies
npm install

# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Configuration
**Environment**: Development (from .env file)
**TypeScript**: ES2017 target with Next.js plugin
**Module Resolution**: "bundler" with path aliases (@/* -> ./src/*)
**Styling**: Tailwind CSS via PostCSS

## Entry Points
**Main Page**: src/app/page.tsx
**App Layout**: src/app/layout.tsx
**Global Styles**: src/app/globals.css
