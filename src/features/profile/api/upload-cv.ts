import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

import type { CVUploadResponse } from '../types/profile.types';

export const uploadCV = async (file: File): Promise<CVUploadResponse> => {
  const formData = new FormData();
  formData.append('cv', file);

  const { data } = await axios.post<CVUploadResponse>(
    API_ENDPOINTS.PROFILE.UPLOAD_CV,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );

  return data;
};
