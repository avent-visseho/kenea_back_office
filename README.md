# Kenea Back Office

> Enterprise Healthcare Management System - Vue.js Dashboard

Kenea Back Office is a comprehensive pharmaceutical and healthcare management platform designed for managing prescriptions, pharmacies, users, roles, and related healthcare business operations. Built with modern Vue 3 technologies and a focus on security and scalability.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Development](#development)
- [Authentication](#authentication)
- [Authorization & Roles](#authorization--roles)
- [Key Modules](#key-modules)
- [API Integration](#api-integration)
- [Build & Deployment](#build--deployment)
- [Version History](#version-history)
- [Contributing](#contributing)

## Features

### Core Functionality

- **Prescription Management (Ordonnances)** - Submit, track, and manage medical prescriptions
- **Pharmacy Operations** - Complete CRUD operations for pharmacy management
- **User Management** - User directory with role and entity assignment
- **Role & Privilege Management** - Granular role-based access control (RBAC)
- **Inbox/Messaging System** - Communication between users and pharmacies
- **Product Catalog** - Manage pharmaceutical products and categories
- **Geographic Management** - Country and city location management
- **Analytics Dashboard** - Real-time metrics and data visualization
- **Calendar Integration** - Event scheduling and management

### Security Features

- Two-step authentication (Username/Password + OTP)
- JWT token-based session management
- Role-based routing and access control
- Automatic token handling via HTTP interceptors
- Persistent authentication state

### User Experience

- Dark/Light theme support
- Responsive design for all screen sizes
- Real-time data updates
- Advanced filtering and search
- Drag-and-drop functionality
- CSV import/export capabilities
- Interactive charts and visualizations

## Technology Stack

### Core Framework

- **Vue.js 3.5.13** - Progressive JavaScript framework
- **TypeScript 5.7.3** - Type-safe development
- **Vite 6.0.11** - Next-generation frontend build tool

### State Management & Routing

- **Pinia 3.0.3** - Vue 3 state management
- **Vue Router 4.5** - Official routing solution

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS 8.5.1** - CSS transformations
- **Lucide Vue Next 0.474.0** - Icon library

### Data Visualization & UI Components

- **ApexCharts 4.4.0** - Modern charting library
- **FullCalendar 6** - Calendar component
- **JSVectorMap 1.6.0** - Interactive maps
- **Swiper 11.2.1** - Touch slider
- **Vuedraggable 4.1.0** - Drag and drop

### HTTP & API

- **Axios 1.11.0** - HTTP client with interceptors

### Development Tools

- **ESLint 9.18.0** - Code linting
- **Prettier 3.4.2** - Code formatting
- **Vue DevTools 7.7.0** - Debugging tools

## Project Structure

```
kenea_back_office/
├── src/
│   ├── api/                      # API integration layer
│   │   ├── axios.js              # Axios configuration
│   │   └── services/             # API service modules (15 services)
│   │       ├── authService.js
│   │       ├── ordonnance.js
│   │       ├── pharmacie.js
│   │       ├── users.js
│   │       ├── roles.js
│   │       ├── privileges.js
│   │       └── ...
│   │
│   ├── components/               # Reusable Vue components (114 total)
│   │   ├── layout/               # Layout components
│   │   ├── auth/                 # Authentication components
│   │   ├── ordonnance/           # Prescription components
│   │   ├── pharmacie/            # Pharmacy components
│   │   ├── users/                # User management components
│   │   ├── roles/                # Role management components
│   │   ├── privileges/           # Privilege components
│   │   ├── inbox/                # Messaging components
│   │   ├── charts/               # Chart components
│   │   ├── forms/                # Form components
│   │   ├── tables/               # Table components
│   │   └── ui/                   # Common UI elements
│   │
│   ├── composables/              # Vue 3 composition functions (12 composables)
│   │   ├── useAuth.js
│   │   ├── ordannance/
│   │   ├── pharmacie/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── privileges/
│   │   ├── inbox/
│   │   └── ...
│   │
│   ├── router/
│   │   └── index.ts              # Vue Router configuration (31 routes)
│   │
│   ├── store/                    # Pinia state management
│   │   └── auth/
│   │       └── auth.js           # Authentication store
│   │
│   ├── views/                    # Page components (31 views)
│   │   ├── Auth/                 # Authentication pages
│   │   ├── Dashboard.vue
│   │   ├── ordonnance/
│   │   ├── pharmacie/
│   │   ├── users/
│   │   ├── roles/
│   │   └── ...
│   │
│   ├── assets/                   # Static assets
│   ├── icons/                    # Icon library
│   ├── App.vue                   # Root component
│   └── main.ts                   # Application entry point
│
├── public/                       # Public static files
├── .env                          # Environment variables
├── .env.production               # Production environment
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── eslint.config.ts              # ESLint configuration
└── package.json                  # Project dependencies
```

## Getting Started

### Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher
- **Git**: For cloning the repository

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:avent-visseho/kenea_back_office.git
   cd kenea_back_office
   ```

   > **Windows Users**: Place the repository near the root of your drive if you face issues while cloning.

2. **Install dependencies**

   ```bash
   npm install
   ```

### Configuration

1. **Create environment file**

   Create a `.env` file in the root directory with the following variables:

   ```env
   VITE_API_BASE_URL=http://your-api-server:7070/
   VITE_APP_NAME=kenea
   VITE_API_TIMEOUT=120000
   ```

2. **API Configuration**

   The application connects to a backend API. Configure the base URL in `.env`:
   - Default development: `http://10.10.10.175:7070/`
   - API endpoint prefix: `/kenea/api/v3/`

### Development

1. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

2. **Run linter**

   ```bash
   npm run lint
   ```

3. **Format code**

   ```bash
   npm run format
   ```

4. **Type checking**

   ```bash
   npm run type-check
   ```

## Authentication

Kenea uses a two-step authentication process:

### Authentication Flow

1. **Step 1: Initial Login**
   - User submits username and password
   - Server validates credentials
   - OTP code sent to user (email/SMS)

2. **Step 2: OTP Verification**
   - User enters OTP code
   - Server validates OTP
   - JWT token returned
   - User info and roles fetched
   - Authentication state persisted

### Token Management

- JWT Bearer tokens stored in `localStorage` or `sessionStorage`
- Automatically attached to all API requests via Axios interceptor
- Included in `Authorization` header
- Manual re-login required when token expires

### API Integration

```javascript
// Example authentication flow
import { useAuthStore } from '@/store/auth/auth'

const authStore = useAuthStore()

// Step 1: Login
await authStore.login({ username, password })

// Step 2: Verify OTP
await authStore.verifyOtp({ username, otp })

// Check authentication status
if (authStore.isAuthenticated) {
  // User is logged in
}

// Logout
await authStore.logout()
```

## Authorization & Roles

### Role-Based Access Control (RBAC)

Kenea implements a comprehensive RBAC system with four main roles:

| Role | Description | Access Level |
|------|-------------|--------------|
| **SUPER_ADMIN** | Platform administrator | Full system access |
| **ADMIN** | Administrative operations | Users, roles, pharmacies management |
| **PHARMACIE** | Pharmacy staff | Pharmacy-specific operations |
| **USER** | End users/patients | Personal prescriptions, inbox |

### Privilege System

- Roles contain multiple privileges
- Privileges are granular permissions
- Dynamic privilege checking via composables
- Route-level access control

### Route Protection

```typescript
// Example protected route
{
  path: '/users',
  component: UsersView,
  meta: {
    requiresAuth: true,
    allowedRoles: ['ADMIN', 'SUPER_ADMIN']
  }
}
```

### Permission Checking

```javascript
import { useAuthStore } from '@/store/auth/auth'

const authStore = useAuthStore()

// Check if user has specific role
if (authStore.userRoles.includes('ADMIN')) {
  // Show admin features
}

// Check if user is authenticated
if (authStore.isAuthenticated) {
  // User is logged in
}
```

## Key Modules

### Prescription Management (Ordonnances)

- View and manage medical prescriptions
- Upload prescription files
- Track prescription status (PENDING, APPROVED, REJECTED)
- Filter by status and pharmacy
- Assign to specific pharmacies

**Key Files:**
- `src/views/ordonnance/OrdonnancesView.vue`
- `src/composables/ordannance/useOrdonnances.js`
- `src/api/services/ordonnance.js`

### Pharmacy Operations

- Complete CRUD operations for pharmacies
- Search by keyword
- Bulk CSV import
- Pharmacy metrics and analytics
- Entity assignment to users

**Key Files:**
- `src/views/pharmacie/Pharmacie.vue`
- `src/composables/pharmacie/usePharmacies.js`
- `src/api/services/pharmacie.js`

### User Management

- User directory with advanced filtering
- Role assignment
- Entity assignment (pharmacies, groups)
- User profile management
- Account creation and deletion

**Key Files:**
- `src/views/users/Userview.vue`
- `src/composables/users/useUsers.js`
- `src/api/services/users.js`

### Role & Privilege Management

- Create and manage roles
- Assign privileges to roles
- View and manage privilege list
- Dynamic permission checking

**Key Files:**
- `src/views/roles/RolesView.vue`
- `src/views/privileges/PrivilegesView.vue`
- `src/composables/roles/useRoles.js`

### Inbox/Messaging

- User notifications and messages
- Pharmacy-specific inbox
- Message status tracking (PENDING, RESOLVED)
- Global and filtered views

**Key Files:**
- `src/views/inbox/InboxView.vue`
- `src/composables/inbox/useInbox.js`
- `src/api/services/inboxService.js`

### Product Catalog

- Product management (CRUD)
- Category organization
- Product listing and search
- Pharmaceutical inventory

**Key Files:**
- `src/views/pharmacie/ProduitsView.vue`
- `src/views/pharmacie/CategorieView.vue`
- `src/composables/pharmacie/useProduits.js`

### Analytics Dashboard

- Prescription metrics
- Pharmacy statistics
- User distribution
- Interactive charts (line, bar, pie)
- Monthly sales tracking
- Customer demographics

**Key Files:**
- `src/views/Dashboard.vue`
- `src/components/ecommerce/`
- `src/components/charts/`

## API Integration

### Service Architecture

Each domain has a dedicated API service:

```javascript
// Example: Prescription service
import OrdonnanceServices from '@/api/services/ordonnance'

// Get all prescriptions
const ordonnances = await OrdonnanceServices.getAllOrdonnances()

// Get prescription by ID
const ordonnance = await OrdonnanceServices.getOrdonnanceById(id)

// Upload prescription
await OrdonnanceServices.uploadOrdonnance(pharmacieIds, file)

// Update status
await OrdonnanceServices.updateOrdonnanceStatus(id, etat)
```

### Available Services

- `authService.js` - Authentication & OTP
- `ordonnance.js` - Prescription management
- `pharmacie.js` - Pharmacy operations
- `users.js` - User management
- `roles.js` - Role management
- `privileges.js` - Privileges management
- `inboxService.js` - Messaging system
- `produit.js` - Product management
- `categorie.js` - Category management
- `pays_ville.js` - Geographic data
- `groupesService.js` - User groups
- `ordonnanceProgression.js` - Prescription tracking

### HTTP Interceptors

All API requests automatically include:
- JWT token in Authorization header
- Request/response logging
- Error handling
- 401 redirect to login

## Build & Deployment

### Development Build

```bash
npm run dev
```

Starts the development server at `http://localhost:5173`

### Production Build

```bash
# Build with type checking
npm run build

# Build only (skip type checking)
npm run build-only
```

Output directory: `dist/`

### Preview Production Build

```bash
npm run preview
```

### Environment Variables

Create `.env.production` for production environment:

```env
VITE_API_BASE_URL=https://your-production-api.com
VITE_APP_NAME=kenea
VITE_API_TIMEOUT=120000
```

### Build Output

- Minified JavaScript and CSS
- Optimized assets with cache busting
- Source maps for debugging
- Compressed bundle sizes

## Version History

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

- Upgraded to **Tailwind CSS v4** for better performance and efficiency
- Updated class usage to match the latest syntax and features
- Replaced deprecated classes and optimized styles
- Performance improvements across the application

#### Breaking Changes

- Tailwind CSS v3 syntax no longer supported
- Updated utility class naming conventions

#### Migration Steps

1. Run `npm install` to update dependencies
2. Review and update custom Tailwind configurations
3. Test all UI components for styling issues

### Previous Versions

- **2.0.0** - Major Vue 3 upgrade with Composition API
- **1.x** - Legacy Vue 2 version

## Contributing

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run linter and type checking
4. Test thoroughly
5. Submit a pull request

### Code Style

- Follow ESLint and Prettier configurations
- Use TypeScript for type safety
- Write clear, descriptive commit messages
- Comment complex logic
- Keep components focused and reusable

### Commit Message Format

```
type(scope): description

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## License

Copyright © 2025 Kenea. All rights reserved.

---

## Project Statistics

- **Total Components**: 114
- **Total Views**: 31
- **API Services**: 15
- **Routes**: 31
- **Composables**: 12

## Support

For issues, questions, or contributions, please contact the development team or create an issue in the repository.

---

**Built with Vue 3, Vite, and Tailwind CSS**
