export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  botcheck: string;
}

export type FormStatus = 
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}