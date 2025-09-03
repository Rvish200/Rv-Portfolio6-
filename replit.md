# Overview

This is a full-stack portfolio website for Rishabh Vishwakarma, a full stack developer. The application showcases skills across multiple technology stacks including MERN (MongoDB, Express, React, Node.js), Java Spring Boot, Python, PHP, and Swift iOS development. The website features a modern, responsive design with pages for Home, About, Services, Portfolio, and Contact. It includes a contact form that stores submissions in a PostgreSQL database and provides an admin interface to view all contact submissions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming and Poppins font family
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Design System**: Component-based architecture with reusable UI components in `/components/ui/`

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with route handlers in `/server/routes.ts`
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development Setup**: Vite integration for hot module replacement in development

## Data Storage
- **Database**: PostgreSQL with Neon Database serverless driver
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Schema Management**: Shared schema definitions in `/shared/schema.ts` with Zod validation
- **Current Storage**: In-memory storage implementation (`MemStorage`) with interface for easy database integration
- **Tables**: Users table (id, username, password) and Contacts table (contact form submissions with project details)

## Development and Build
- **Build System**: Vite for frontend, esbuild for backend bundling
- **TypeScript**: Strict type checking with path mapping for clean imports
- **Development Server**: Hot reload with Vite middleware integration
- **Production Build**: Static assets served from Express with bundled backend

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form with Zod resolvers
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and caching

### UI and Styling
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling Framework**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Utilities**: class-variance-authority and clsx for conditional styling

### Backend Infrastructure
- **Server Framework**: Express.js with TypeScript support
- **Database**: Neon Database serverless PostgreSQL with Drizzle ORM
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Validation**: Zod for runtime type validation and schema generation

### Development Tools
- **Build Tools**: Vite with React plugin, esbuild for production bundling
- **TypeScript**: Full type safety across frontend, backend, and shared modules
- **Development Enhancements**: Replit-specific plugins for error handling and cartographer
- **Date Handling**: date-fns for date formatting and manipulation

### Database and ORM
- **Drizzle Kit**: Database migrations and schema management
- **Drizzle Zod**: Automatic Zod schema generation from database schema
- **PostgreSQL Driver**: @neondatabase/serverless for edge-compatible database connections