import type {ContactFormData, FormStatus, ApiResponse } from '../types/contact';

export const handleContactSubmit = async (
  formData: ContactFormData
): Promise<FormStatus> => {
  if (formData.botcheck) {
    return { type: 'error', message: 'Bot detected' };
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data: ApiResponse = await response.json();
    
    return response.ok 
      ? { type: 'success', message: data.message || 'Message sent!' }
      : { type: 'error', message: data.error || 'Server error' };

  } catch (error) {
    return {
      type: 'error',
      message: error instanceof Error ? error.message : 'Connection error'
    };
  }
};