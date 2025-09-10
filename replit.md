# Dell Laptop E-commerce Platform

## Overview

This is a modern full-stack e-commerce application built for selling Dell laptops. The platform features a React frontend with TypeScript, an Express.js backend, and PostgreSQL database with Drizzle ORM. The application provides a complete shopping experience with product browsing, search functionality, filtering capabilities, and shopping cart management. It's designed with a clean, responsive interface using Tailwind CSS and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built with React 18 and TypeScript, utilizing modern React patterns with functional components and hooks. The application uses Wouter for lightweight client-side routing and TanStack Query for efficient server state management and caching. The UI is built with shadcn/ui components on top of Radix UI primitives, styled with Tailwind CSS for a consistent and responsive design system.

### Backend Architecture
The server follows a RESTful API design using Express.js with TypeScript. The application implements a layered architecture with clear separation between route handlers and business logic through a storage abstraction layer. Currently uses an in-memory storage implementation for development, but is designed to easily switch to database persistence through the IStorage interface.

### Data Storage
The application uses Drizzle ORM configured for PostgreSQL with three main entities: users, laptops, and cart items. The schema includes comprehensive laptop specifications stored as JSON, user authentication data, and session-based cart functionality. Database migrations are managed through Drizzle Kit with the schema defined in TypeScript for type safety.

### State Management
Client-side state is managed through TanStack Query for server state and React's built-in useState/useContext for local component state. Session-based cart management is implemented using localStorage for anonymous users, with the ability to associate carts with user accounts upon authentication.

### Styling and UI System
The application uses a design system built on Tailwind CSS with CSS custom properties for theming. The component library is based on shadcn/ui, providing consistent, accessible, and customizable UI components. The styling supports both light and dark themes through CSS variables.

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database configured through @neondatabase/serverless driver
- **Drizzle ORM**: Type-safe database access layer with PostgreSQL dialect
- **Drizzle Kit**: Database migration and introspection tools

### UI Framework
- **React**: Frontend framework with TypeScript support
- **Radix UI**: Headless UI component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Component library built on Radix UI and Tailwind CSS

### Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast bundling for production builds

### State Management
- **TanStack Query**: Server state management, caching, and synchronization
- **Wouter**: Lightweight client-side routing library

### Form Handling
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation and type inference

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **nanoid**: Unique ID generation for sessions and entities

### Image and Asset Handling
- Uses external image URLs (Unsplash) for product images
- Static assets served through Vite in development and Express in production