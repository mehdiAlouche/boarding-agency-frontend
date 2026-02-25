import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '@/constants/storage-keys';

type NotificationType = 'info' | 'success' | 'error';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Array<{
    id: string;
    message: string;
    type: NotificationType;
  }>;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addNotification: (message: string, type: NotificationType) => void;
  removeNotification: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'light',
      notifications: [],

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setTheme: (theme) => {
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        set({ theme });
      },

      addNotification: (message, type) => {
        const id = Date.now().toString();

        set((state) => ({
          notifications: [...state.notifications, { id, message, type }],
        }));

        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((item) => item.id !== id),
          }));
        }, 5000);
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: STORAGE_KEYS.USER_PREFERENCES,
    },
  ),
);
