# Boarding Student App - Frontend Architecture

## 🎯 Project Overview

**Your Role:** Frontend Developer  
**Your Responsibility:** Building the **student-facing UI/UX** that consumes the AI Backoffice APIs

**What You Own:**
- 👁 **Visual Experience** - How students see and interact with their journey
- 🏗 **Frontend Architecture** - Clean, scalable SPA structure
- 🔌 **API Integration** - Correctly consuming backend endpoints
- ⚡ **Performance** - Fast, responsive, smooth UX
- 🛡 **Client Security** - Route protection, token management
- 📦 **Delivery** - Documentation, build process, deployment

**What You DON'T Own:**
- ❌ CV parsing, skill extraction, scoring logic
- ❌ Matching algorithms, ranking calculations
- ❌ Risk prediction models
- ❌ AI decision-making
- ❌ Database operations
- ❌ Business rules

---

## 🧠 Mental Model

```
AI Backoffice (Backend)          Student App (Frontend - YOU)
─────────────────────            ────────────────────────────
🧠 Brain                         👁 Face + Experience
├─ CV parsing                    ├─ Upload UI
├─ Skill extraction              ├─ Display extracted skills
├─ Profile scoring               ├─ Show score visually
├─ Matching algorithm            ├─ Visualize matches
├─ Risk prediction               ├─ Display recommendations
├─ Company ranking               ├─ Show ranked list
└─ Database                      └─ Present data clearly

Backend THINKS → Frontend PRESENTS
```

---

## 📦 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js (App Router) | ^14.2.0 | SPA with SSR support |
| Language | TypeScript | ^5.3.0 | Type safety |
| Styling | Tailwind CSS | ^3.4.0 | Utility-first styling |
| UI Components | shadcn/ui | latest | Accessible components |
| Server State | TanStack Query | ^5.17.0 | API data caching |
| Client State | Zustand | ^4.5.0 | Global UI state |
| HTTP Client | Axios | ^1.6.0 | API requests |
| Forms | React Hook Form | ^7.49.0 | Form management |
| Validation | Zod | ^3.22.0 | Schema validation |
| WebSocket | Socket.io Client | ^4.7.0 | Real-time updates |
| Icons | Lucide React | ^0.300.0 | Icon library |
| Charts | Recharts | ^2.10.0 | Data visualization |
| Animation | Framer Motion | latest | Page and component animations |

---

## 🏗 Project Initialization

```bash
# Create Next.js project
npx create-next-app@latest boarding-student-app \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd boarding-student-app

# Core dependencies
npm install @tanstack/react-query @tanstack/react-query-devtools
npm install zustand
npm install axios
npm install react-hook-form @hookform/resolvers zod
npm install socket.io-client
npm install date-fns
npm install lucide-react
npm install recharts
npm install framer-motion

# shadcn/ui setup
npx shadcn-ui@latest init

# Install essential components
npx shadcn-ui@latest add button input card form dialog toast
npx shadcn-ui@latest add dropdown-menu avatar badge separator
npx shadcn-ui@latest add skeleton tabs select progress
npx shadcn-ui@latest add calendar popover command

# Dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D prettier eslint-config-prettier
npm install -D @testing-library/react @testing-library/jest-dom jest
```

---

## 🎞 Animation & Motion

### 1. Framer Motion ⭐ Highly Recommended

**What it is:** Production-ready animation library  
**Cost:** Free

**Install:**

```bash
npm install framer-motion
```

**Perfect for:**

- Page transitions
- Component animations
- Micro-interactions
- Timeline animations

**Example usage:**

```tsx
import { motion } from 'framer-motion';

// Animated card
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <MatchCard match={match} />
</motion.div>

// Journey timeline with stagger
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

<motion.div variants={container} initial="hidden" animate="show">
  {steps.map((step, i) => (
    <motion.div key={i} variants={item}>
      <JourneyStep step={step} />
    </motion.div>
  ))}
</motion.div>
```

**Why it's great:**

- ✅ Smooth, professional animations
- ✅ Easy to use
- ✅ Performance optimized
- ✅ Great TypeScript support

---

## 📁 Folder Structure (Feature-Based)

```
boarding-student-app/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── (auth)/                       # Public routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (onboarding)/                 # Onboarding flow
│   │   │   ├── welcome/
│   │   │   ├── profile-setup/
│   │   │   ├── cv-upload/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (student)/                    # Main student dashboard
│   │   │   ├── dashboard/                # Overview/Home
│   │   │   ├── profile/                  # Profile management
│   │   │   ├── matching/                 # Company matches
│   │   │   ├── journey/                  # Journey tracking
│   │   │   ├── appointments/             # Advisor meetings
│   │   │   ├── messages/                 # Messaging
│   │   │   ├── resources/                # Housing, integration, community
│   │   │   └── layout.tsx                # Shared layout (sidebar)
│   │   │
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Landing page
│   │   ├── providers.tsx                 # Query + State providers
│   │   └── globals.css
│   │
│   ├── features/                         # Feature modules
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   ├── login.ts
│   │   │   │   ├── register.ts
│   │   │   │   └── refresh-token.ts
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── useRegister.ts
│   │   │   ├── types/
│   │   │   │   └── auth.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── profile/
│   │   │   ├── api/
│   │   │   │   ├── get-profile.ts
│   │   │   │   ├── update-profile.ts
│   │   │   │   ├── upload-cv.ts
│   │   │   │   └── get-profile-score.ts
│   │   │   ├── components/
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   ├── CVUploader.tsx
│   │   │   │   ├── SkillsDisplay.tsx        # Display AI-extracted skills
│   │   │   │   ├── ProfileCompleteness.tsx  # Visual progress
│   │   │   │   └── ProfileScore.tsx         # Display score from backend
│   │   │   ├── hooks/
│   │   │   │   ├── useProfile.ts
│   │   │   │   ├── useUpdateProfile.ts
│   │   │   │   └── useUploadCV.ts
│   │   │   ├── types/
│   │   │   │   └── profile.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── matching/
│   │   │   ├── api/
│   │   │   │   ├── get-matches.ts           # Get ranked matches from backend
│   │   │   │   ├── get-match-details.ts
│   │   │   │   └── get-match-explanation.ts # Get AI explanation
│   │   │   ├── components/
│   │   │   │   ├── MatchCard.tsx            # Display single match
│   │   │   │   ├── MatchList.tsx            # List all matches
│   │   │   │   ├── MatchVisualization.tsx   # Chart/graph of compatibility
│   │   │   │   ├── MatchFilters.tsx         # Filter UI (calls backend)
│   │   │   │   └── AIExplanation.tsx        # Show why company matches
│   │   │   ├── hooks/
│   │   │   │   ├── useMatches.ts
│   │   │   │   └── useMatchDetails.ts
│   │   │   ├── types/
│   │   │   │   └── match.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── journey/
│   │   │   ├── api/
│   │   │   │   └── get-journey-status.ts    # Get current status from backend
│   │   │   ├── components/
│   │   │   │   ├── JourneyTimeline.tsx      # Visual timeline
│   │   │   │   ├── JourneySteps.tsx         # Step-by-step progress
│   │   │   │   ├── MilestoneCard.tsx
│   │   │   │   └── NextSteps.tsx            # What to do next
│   │   │   ├── hooks/
│   │   │   │   └── useJourneyStatus.ts
│   │   │   ├── types/
│   │   │   │   └── journey.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── appointments/
│   │   │   ├── api/
│   │   │   │   ├── get-appointments.ts
│   │   │   │   ├── get-available-slots.ts
│   │   │   │   ├── book-appointment.ts
│   │   │   │   └── cancel-appointment.ts
│   │   │   ├── components/
│   │   │   │   ├── AppointmentList.tsx
│   │   │   │   ├── BookingCalendar.tsx
│   │   │   │   ├── AdvisorCard.tsx
│   │   │   │   └── AppointmentDetails.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAppointments.ts
│   │   │   │   └── useBookAppointment.ts
│   │   │   ├── types/
│   │   │   │   └── appointment.types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── messaging/
│   │   │   ├── api/
│   │   │   │   ├── get-conversations.ts
│   │   │   │   ├── get-messages.ts
│   │   │   │   └── send-message.ts
│   │   │   ├── components/
│   │   │   │   ├── ConversationList.tsx
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   ├── MessageBubble.tsx
│   │   │   │   └── MessageInput.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useConversations.ts
│   │   │   │   ├── useMessages.ts
│   │   │   │   └── useRealtimeMessages.ts  # WebSocket listener
│   │   │   ├── types/
│   │   │   │   └── message.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── resources/
│   │       ├── api/
│   │       │   ├── get-housing.ts
│   │       │   ├── get-integration.ts
│   │       │   └── get-community.ts
│   │       ├── components/
│   │       │   ├── ResourceCard.tsx
│   │       │   ├── HousingList.tsx
│   │       │   ├── IntegrationGuide.tsx
│   │       │   └── CommunityEvents.tsx
│   │       ├── hooks/
│   │       │   └── useResources.ts
│   │       ├── types/
│   │       │   └── resource.types.ts
│   │       └── index.ts
│   │
│   ├── shared/                           # Shared/reusable code
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── MobileNav.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── ProgressBar.tsx
│   │   │
│   │   ├── ui/                           # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useIntersectionObserver.ts
│   │   │
│   │   └── utils/
│   │       ├── cn.ts                     # Class merge utility
│   │       ├── formatters.ts             # Date, currency formatting
│   │       ├── validators.ts
│   │       └── constants.ts
│   │
│   ├── lib/                              # Infrastructure setup
│   │   ├── axios.ts                      # Axios instance + interceptors
│   │   ├── query-client.ts               # TanStack Query config
│   │   └── socket.ts                     # Socket.io setup
│   │
│   ├── store/                            # Zustand stores
│   │   ├── auth-store.ts                 # User + token state
│   │   ├── ui-store.ts                   # Theme, sidebar, etc.
│   │   └── index.ts
│   │
│   ├── types/                            # Global types
│   │   ├── api.types.ts
│   │   ├── user.types.ts
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── routes.ts
│   │   ├── api-endpoints.ts
│   │   ├── storage-keys.ts              # LocalStorage key constants
│   │   └── journey-steps.ts
│   │
│   └── middleware.ts                     # Route protection
│
├── public/
│   ├── images/
│   └── fonts/
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔐 Environment Variables (.env.example)

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000

# App Configuration
NEXT_PUBLIC_APP_NAME=Boarding Student Platform
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Features
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_MAX_CV_SIZE=5242880
NEXT_PUBLIC_ALLOWED_CV_TYPES=.pdf,.doc,.docx
```

---

## ⚙️ Core Infrastructure Files

### 1. Axios Instance (src/lib/axios.ts)

**Your Responsibility:**
- ✅ Add auth headers
- ✅ Handle token refresh
- ✅ Map errors to user-friendly messages
- ✅ Handle loading states

```typescript
import axios, { AxiosError } from 'axios';
import { STORAGE_KEYS } from '@/constants/storage-keys';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR - Add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR - Handle errors & refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Handle 401 - Token expired, try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
        
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    // Map backend errors to user-friendly messages
    const errorMessage = error.response?.data?.message || 
                         'Something went wrong. Please try again.';
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosInstance;
```

---

### 2. TanStack Query Client (src/lib/query-client.ts)

**Your Responsibility:**
- ✅ Configure caching strategy
- ✅ Set refetch behavior
- ✅ Handle stale data

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,         // 10 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});
```

---

### 2.1 Storage Keys Constants (src/constants/storage-keys.ts)

**Note:** These are just string constants - no need for environment variables!

```typescript
/**
 * LocalStorage key constants
 * These are hardcoded strings - NOT configurable environment variables
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'boarding_auth_token',
  REFRESH_TOKEN: 'boarding_refresh_token',
  USER_PREFERENCES: 'boarding_user_prefs',
  THEME: 'boarding_theme',
} as const;
```

---

### 3. Auth Store (src/store/auth-store.ts)

**Your Responsibility:**
- ✅ Manage logged-in user state
- ✅ Persist auth token
- ✅ Clear state on logout

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/constants/storage-keys';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileComplete: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setAuth: (user: User, token: string) => void;
  updateUser: (user: Partial<User>) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (user, token) => {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        set({ user, token, isAuthenticated: true });
      },
      
      updateUser: (updatedUser) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }));
      },
      
      clearAuth: () => {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'boarding-auth',
    }
  )
);
```

---

### 4. UI Store (src/store/ui-store.ts)

**Your Responsibility:**
- ✅ Manage sidebar open/closed
- ✅ Theme preference
- ✅ Notification state

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Array<{
    id: string;
    message: string;
    type: 'info' | 'success' | 'error';
  }>;
  
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (message: string, type: 'info' | 'success' | 'error') => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      notifications: [],
      
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      
      setTheme: (theme) => set({ theme }),
      
      addNotification: (message, type) => {
        const id = Date.now().toString();
        set((state) => ({
          notifications: [...state.notifications, { id, message, type }],
        }));
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        }, 5000);
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      },
    }),
    {
      name: 'boarding-ui',
    }
  )
);
```

---

### 5. Route Protection Middleware (src/middleware.ts)

**Your Responsibility:**
- ✅ Protect student routes
- ✅ Redirect unauthenticated users
- ✅ Handle onboarding flow

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register', '/'];
const authRoutes = ['/login', '/register'];
const onboardingRoutes = ['/onboarding/welcome', '/onboarding/profile-setup', '/onboarding/cv-upload'];
const studentRoutes = ['/dashboard', '/profile', '/matching', '/journey', '/appointments', '/messages', '/resources'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = request.cookies.get('auth_token')?.value;
  const isAuthenticated = !!token;
  
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Redirect authenticated users away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Protect student routes
  const isStudentRoute = studentRoutes.some(route => pathname.startsWith(route));
  if (isStudentRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

---

### 6. Providers (src/app/providers.tsx)

```typescript
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';
import { Toaster } from '@/shared/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
```

---

## 🎨 Feature Implementation Pattern

### Example: Profile Feature (Complete Flow)

#### 1. Types (src/features/profile/types/profile.types.ts)

```typescript
// Backend returns this
export interface ProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  cvUrl: string | null;
  skills: string[];              // AI-extracted skills
  completenessScore: number;     // From backend (0-100)
  profileScore: number;          // AI score
  lastUpdated: string;
}

// Frontend uses this
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  cvUrl: string | null;
  skills: string[];
  completenessScore: number;
  profileScore: number;
  lastUpdated: Date;
}

// Update payload
export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}
```

#### 2. API Layer (src/features/profile/api/get-profile.ts)

**Your Responsibility:**
- ✅ Call endpoint correctly
- ✅ Map response to frontend model
- ✅ Handle null values

```typescript
import axios from '@/lib/axios';
import { ProfileResponse, Profile } from '../types/profile.types';

export const getProfile = async (): Promise<Profile> => {
  const { data } = await axios.get<ProfileResponse>('/profile');
  
  // Map backend response to frontend model
  return {
    ...data,
    lastUpdated: new Date(data.lastUpdated),
  };
};
```

#### 3. Hook Layer (src/features/profile/hooks/useProfile.ts)

**Your Responsibility:**
- ✅ Manage loading state
- ✅ Handle errors
- ✅ Cache data

```typescript
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/get-profile';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
```

#### 4. Component (src/features/profile/components/ProfileForm.tsx)

**Your Responsibility:**
- ✅ Display data correctly
- ✅ Handle empty states
- ✅ Show loading spinners
- ✅ Display errors

```typescript
'use client';

import { useProfile } from '../hooks/useProfile';
import { Card, CardHeader, CardContent } from '@/shared/ui/card';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { ProfileCompleteness } from './ProfileCompleteness';
import { SkillsDisplay } from './SkillsDisplay';

export function ProfileForm() {
  const { data: profile, isLoading, error } = useProfile();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-600">
        Failed to load profile. Please try again.
      </div>
    );
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Profile completeness - backend calculates, you display */}
      <ProfileCompleteness score={profile.completenessScore} />
      
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">
            {profile.firstName} {profile.lastName}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label>Email</label>
              <p>{profile.email}</p>
            </div>
            
            <div>
              <label>Phone</label>
              <p>{profile.phone || 'Not provided'}</p>
            </div>
            
            {/* AI-extracted skills - backend extracts, you display */}
            <SkillsDisplay skills={profile.skills} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🎯 Frontend Responsibilities by Feature

### 1. Authentication
**You Own:**
- ✅ Login/register form UI
- ✅ Token storage (localStorage or httpOnly cookie)
- ✅ Adding auth headers to requests
- ✅ Handling token refresh
- ✅ Redirecting on logout

**Backend Owns:**
- ❌ Password hashing
- ❌ Token generation
- ❌ Session validation

---

### 2. Profile Management
**You Own:**
- ✅ Upload CV UI (drag-drop, file picker)
- ✅ Display AI-extracted skills **as provided by backend**
- ✅ Show profile completeness progress bar
- ✅ Display profile score **as calculated by backend**
- ✅ Form validation (basic: email format, required fields)
- ✅ Handle upload progress

**Backend Owns:**
- ❌ CV parsing
- ❌ Skill extraction
- ❌ Profile scoring algorithm
- ❌ Completeness calculation

**Example Component:**

```typescript
// ProfileScore.tsx
export function ProfileScore({ score }: { score: number }) {
  // Backend calculates score, you just display it
  return (
    <div className="flex items-center gap-2">
      <Progress value={score} max={100} />
      <span className="text-sm font-medium">{score}/100</span>
    </div>
  );
}
```

---

### 3. Company Matching
**You Own:**
- ✅ Display ranked list **as provided by backend**
- ✅ Visualize match score (charts, progress bars)
- ✅ Show AI explanation **as provided by backend**
- ✅ Filter UI (location, industry)
- ✅ Pagination/infinite scroll
- ✅ Handle empty states ("No matches yet")

**Backend Owns:**
- ❌ Matching algorithm
- ❌ Score calculation
- ❌ Ranking logic
- ❌ AI explanation generation

**Example Component:**

```typescript
// AIExplanation.tsx
export function AIExplanation({ explanation }: { explanation: string }) {
  // Backend generates explanation, you display it clearly
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-semibold mb-2">Why this match?</h4>
      <p className="text-sm text-gray-700">{explanation}</p>
    </div>
  );
}
```

---

### 4. Journey Tracking
**You Own:**
- ✅ Visual timeline component
- ✅ Progress indicators
- ✅ Display milestones **as provided by backend**
- ✅ Show next steps **as determined by backend**
- ✅ Celebrate completed steps

**Backend Owns:**
- ❌ Journey stage calculation
- ❌ Milestone completion logic
- ❌ Next step recommendations

**Example Component:**

```typescript
// JourneyTimeline.tsx
interface Step {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  date: Date | null;
}

export function JourneyTimeline({ steps }: { steps: Step[] }) {
  // Backend provides steps with status, you visualize them
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step.status === 'completed' ? 'bg-green-500' :
            step.status === 'current' ? 'bg-blue-500' :
            'bg-gray-300'
          }`}>
            {step.status === 'completed' && <Check className="text-white" />}
            {step.status === 'current' && <span className="text-white">{index + 1}</span>}
          </div>
          
          <div>
            <h4 className="font-semibold">{step.title}</h4>
            {step.date && (
              <p className="text-sm text-gray-500">
                {format(step.date, 'MMM dd, yyyy')}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

### 5. Appointments
**You Own:**
- ✅ Calendar UI
- ✅ Display available slots **as provided by backend**
- ✅ Booking form
- ✅ Confirmation dialogs
- ✅ Handle booking conflicts (show error from backend)

**Backend Owns:**
- ❌ Slot availability calculation
- ❌ Double-booking prevention
- ❌ Advisor assignment

---

### 6. Messaging
**You Own:**
- ✅ Chat UI
- ✅ WebSocket connection for real-time
- ✅ Message rendering
- ✅ Typing indicators
- ✅ Handle connection drops

**Backend Owns:**
- ❌ Message storage
- ❌ Conversation creation
- ❌ Message validation

**WebSocket Example:**

```typescript
// useRealtimeMessages.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSocket } from '@/lib/socket';

export function useRealtimeMessages(conversationId: string) {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const socket = getSocket();
    
    if (!socket) return;
    
    // Listen for new messages
    socket.on('message:new', (message) => {
      // Update cache when new message arrives
      queryClient.setQueryData(
        ['messages', conversationId],
        (old: any) => [...(old || []), message]
      );
    });
    
    return () => {
      socket.off('message:new');
    };
  }, [conversationId, queryClient]);
}
```

---

### 7. Resources (Housing, Integration, Community)
**You Own:**
- ✅ Display resources **as provided by backend**
- ✅ Filter/search UI
- ✅ Resource cards with images
- ✅ Handle external links safely

**Backend Owns:**
- ❌ Resource data management
- ❌ Content recommendations

---

## 🛡 Error Handling Strategy

**Your Responsibility:**
- ✅ Map backend errors to user-friendly messages
- ✅ Display errors clearly
- ✅ Provide retry mechanisms
- ✅ Handle edge cases

```typescript
// Example error handling in component
export function MatchList() {
  const { data, isLoading, error, refetch } = useMatches();
  
  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">
          {error.message || 'Failed to load matches'}
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!data || data.length === 0) {
    return (
      <EmptyState 
        title="No matches yet"
        description="Complete your profile to see company matches"
      />
    );
  }
  
  return (
    <div className="grid gap-4">
      {data.map(match => <MatchCard key={match.id} match={match} />)}
    </div>
  );
}
```

---

## ⚡ Performance Optimization

**Your Responsibility:**

1. **Code Splitting**
```typescript
// Lazy load heavy components
const MatchVisualization = dynamic(
  () => import('@/features/matching/components/MatchVisualization'),
  { loading: () => <LoadingSpinner /> }
);
```

2. **Image Optimization**
```typescript
import Image from 'next/image';

<Image
  src={company.logo}
  alt={company.name}
  width={200}
  height={200}
  priority={false}
/>
```

3. **Virtual Scrolling for Long Lists**
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

// For rendering 1000+ items efficiently
```

4. **Memoization**
```typescript
const filteredMatches = useMemo(
  () => matches.filter(m => m.score > 70),
  [matches]
);
```

---

## 🧪 Testing Checklist

**Your Responsibility:**
- ✅ Test component rendering
- ✅ Test user interactions
- ✅ Test loading states
- ✅ Test error states
- ✅ Test empty states

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import { ProfileForm } from '../ProfileForm';

describe('ProfileForm', () => {
  it('shows loading state', () => {
    render(<ProfileForm />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  
  it('displays profile data', async () => {
    render(<ProfileForm />);
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
  });
  
  it('handles empty skills gracefully', () => {
    // Test edge case
  });
});
```

---

## 📚 Documentation Checklist

**Your Deliverables:**

1. **README.md**
   - Setup instructions
   - Environment variables
   - How to run locally
   - How to build for production

2. **API Integration Guide**
   - List of consumed endpoints
   - Expected request/response formats
   - Error codes handled

3. **Component Documentation**
   - Storybook (optional)
   - Usage examples

---

## 🚀 Deployment Checklist

- [ ] All environment variables set
- [ ] Build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] Routes protected correctly
- [ ] Error boundaries in place
- [ ] Loading states everywhere
- [ ] Mobile responsive
- [ ] Accessible (ARIA labels, keyboard nav)

---

## 🎯 Final Mental Model

```
┌─────────────────────────────────────────────────────────┐
│                   BOARDING PLATFORM                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  AI BACKOFFICE (Backend)      STUDENT APP (Frontend)    │
│  ───────────────────────      ─────────────────────     │
│                                                          │
│  🧠 Thinks                    👁 Presents               │
│  ├─ Parses CV                 ├─ Upload UI               │
│  ├─ Extracts skills           ├─ Display skills          │
│  ├─ Scores profile            ├─ Show score              │
│  ├─ Matches companies         ├─ Visualize matches       │
│  ├─ Ranks results             ├─ Display ranking         │
│  ├─ Generates explanations    ├─ Show explanations       │
│  └─ Tracks journey            └─ Display timeline        │
│                                                          │
│  Backend decides ────────────> Frontend presents         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Remember:**
- Backend = Business logic
- Frontend = User experience
- You consume, you don't compute
- You present, you don't predict

---

## 🎬 Next Steps

1. Initialize project with commands above
2. Set up infrastructure (axios, query client, stores)
3. Build authentication flow
4. Implement onboarding (profile setup, CV upload)
5. Build dashboard with journey tracking
6. Add matching visualization
7. Implement appointments & messaging
8. Add resources section
9. Polish UI/UX
10. Test, document, deploy

**You've got this! 🚀**
