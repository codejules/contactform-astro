import type { ContactFormData } from '../lib/types/contact';

export type InputConfig = {
  id: string;
  name: keyof ContactFormData;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  className: string;
  pattern?: string;
};

export const inputsConfig: InputConfig[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Nombre completo',
    type: 'text',
    placeholder: 'Ej: Joe Doe',
    required: true,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Teléfono',
    type: 'tel',
    placeholder: 'Ej: 123 456 789',
    pattern: '^[+]?[0-9\\s]{9,15}$',
    required: true,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
  },
  {
    id: 'email',
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
    placeholder: 'Ej: joe@example.com',
    required: true,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
  },
  {
    id: 'message',
    name: 'message',
    label: 'Mensaje',
    type: 'textarea',
    placeholder: 'Escribe tu mensaje aquí...',
    required: true,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm h-32 focus:ring-blue-500 focus:border-blue-500'
  },
  // Campo honeypot (anti-spam)
  {
    id: 'botcheck',
    name: 'botcheck',
    label: '',
    type: 'text',
    className: 'hidden'
  }
];