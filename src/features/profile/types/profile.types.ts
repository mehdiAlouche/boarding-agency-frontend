export interface ProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  cvUrl: string | null;
  skills: string[];
  completenessScore: number;
  profileScore: number;
  lastUpdated: string;
}

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

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface CVUploadResponse {
  cvUrl: string;
  skills: string[];
}
