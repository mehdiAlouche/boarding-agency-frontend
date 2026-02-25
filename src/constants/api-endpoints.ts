export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    UPLOAD_CV: '/profile/cv',
    SCORE: '/profile/score',
  },
  MATCHING: {
    LIST: '/matching',
    DETAILS: (id: string) => `/matching/${id}`,
    EXPLANATION: (id: string) => `/matching/${id}/explanation`,
  },
  JOURNEY: {
    STATUS: '/journey/status',
  },
  APPOINTMENTS: {
    LIST: '/appointments',
    SLOTS: '/appointments/slots',
    BOOK: '/appointments/book',
    CANCEL: (id: string) => `/appointments/${id}`,
  },
  MESSAGING: {
    CONVERSATIONS: '/messaging/conversations',
    MESSAGES: (conversationId: string) =>
      `/messaging/conversations/${conversationId}/messages`,
    SEND: '/messaging/messages',
  },
  RESOURCES: {
    HOUSING: '/resources/housing',
    INTEGRATION: '/resources/integration',
    COMMUNITY: '/resources/community',
  },
} as const;
