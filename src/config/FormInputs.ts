import type { ContactFormData } from '../lib/types/contact';

export type InputConfig = {
  id: string;
  name: keyof ContactFormData;
  type: 'text' | 'email' | 'textarea' | 'tel' | 'number';
  placeholder?: string;
  required?: boolean;
  className: string;
  pattern?: string;
  rows?: number;
};

export const inputsConfig: InputConfig[] = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Nombre...',
    required: true,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
  },
  {
    id: 'phone',
    name: 'phone',
    type: 'tel',
    placeholder: 'Teléfono...',
    pattern: '^[+]?[0-9\\s]{9,15}$',
    required: true,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    placeholder: 'Email...',
    required: true,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
  },
  {
    id: 'message',
    name: 'message',
    type: 'textarea',
    placeholder: 'Mensaje...',
    required: true,
    rows: 5,
    className: 'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
  },
  {
    id: 'botcheck',
    name: 'botcheck',
    type: 'text',
    className: 'hidden'
  }
];