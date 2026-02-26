# Boarding Student Platform (Frontend)

Student-facing Next.js app for onboarding, profile management, matching, journey tracking, appointments, messaging, and student resources.

## What this app includes

- Landing page (`/`)
- Auth flow (`/login`, `/register`)
- Onboarding flow (`/welcome`, `/profile-setup`, `/cv-upload`)
- Student area (`/dashboard`, `/profile`, `/matching`, `/journey`, `/appointments`, `/messages`, `/resources`)

## Tech stack

- Next.js (App Router) + TypeScript
- React 19
- Tailwind CSS + shadcn/ui components
- TanStack Query (+ React Query Devtools in development)
- Zustand
- Axios
- React Hook Form + Zod
- Socket.io client (optional realtime)
- Recharts

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Install dependencies:

	```bash
	npm install
	```

2. Create `.env.local` from `.env.example` and set values:

	```bash
	NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
	NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
	NEXT_PUBLIC_APP_NAME=Boarding Student Platform
	NEXT_PUBLIC_APP_URL=http://localhost:3000
	NEXT_PUBLIC_ENABLE_REALTIME=true
	NEXT_PUBLIC_USE_MOCK_API=false
	NEXT_PUBLIC_MAX_CV_SIZE=5242880
	NEXT_PUBLIC_ALLOWED_CV_TYPES=.pdf,.doc,.docx
	```

3. Start development server:

	```bash
	npm run dev
	```

Open `http://localhost:3000`.

## Available scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Mock mode

To run without backend services:

```bash
NEXT_PUBLIC_USE_MOCK_API=true
```

Mock login credentials:

- Email: `demo@student.com`
- Password: `Demo@1234`

Currently mocked APIs:

- Auth: `login`, `register`, `refresh`
- Profile: `getProfile`
- Matching: `getMatches`
- Journey: `getJourneyStatus`

Not mocked by default (backend required):

- Appointments
- Messaging
- Resources
- Profile update/upload/score endpoints
- Match details/explanation endpoints

## Authentication and route protection

- Auth tokens are stored in localStorage using app-specific keys.
- Axios attaches bearer tokens and performs automatic token refresh on `401`.
- Middleware checks `auth_token` cookie for protected student routes and redirects unauthenticated users to `/login`.

## Project structure (high level)

```text
src/
  app/                 # App Router pages and route-group layouts
  features/            # Feature modules (api, hooks, types, components)
  shared/              # Shared UI, hooks, and utilities
  lib/                 # Axios, query client, socket setup
  constants/           # Routes, API endpoints, storage keys
  store/               # Zustand stores
  mocks/               # Mock API implementations
```

## API reference

API endpoints are centralized in `src/constants/api-endpoints.ts`.

See:

- `docs/API_INTEGRATION.md`

## Architecture notes

- Frontend consumes backend-calculated results (scores, ranking, journey state).
- Typical flow: page/component → hook → feature API function → Axios client.
- Feature-first organization is used under `src/features`.
