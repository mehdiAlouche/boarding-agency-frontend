# Boarding Student Platform (Frontend)

Student-facing Next.js application for onboarding, profile management, company matching, journey tracking, appointments, messaging, and resources.

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query (server state)
- Zustand (client state)
- Axios (API client)
- React Hook Form + Zod (forms/validation)
- Socket.io client (real-time messaging)
- Recharts (match visualizations)

## Environment Variables

Create `.env.local` using `.env.example`:

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

To run without backend API docs/services, switch to mock auth in your `.env.local`:

```bash
NEXT_PUBLIC_USE_MOCK_API=true
```

Mock login credentials:

- Email: `demo@student.com`
- Password: `Demo@1234`

Mock mode currently covers:

- Authentication (`login`)
- Profile (`getProfile`)
- Matching (`getMatches`)
- Journey (`getJourneyStatus`)

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Production

```bash
npm run lint
npm run build
```

## Architecture Notes

- Frontend only: consume and present backend results
- Pattern: Component → Hook → API function → Axios instance
- Protected routes use middleware/proxy style cookie check (`auth_token`)
- API endpoints and routes are centralized in `src/constants`

## Additional Docs

- API integration guide: `docs/API_INTEGRATION.md`
