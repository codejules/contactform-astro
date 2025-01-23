import { useState } from 'preact/hooks';
import type { ContactFormData, FormStatus } from '../lib/types/contact';
import { handleContactSubmit } from '../lib/client/contact.client';
import UiSpinner from './Spinner';
import { inputsConfig } from '../config/FormInputs';


export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    botcheck: ''
  });
  
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleChange = (
    field: keyof ContactFormData, 
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus({ type: 'submitting' });
    
    const result = await handleContactSubmit(formData);
    setStatus(result);

    if (result.type === 'success') {
      setFormData({ name: '', phone: '', email: '', message: '', botcheck: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {inputsConfig.map((input) => (
        <div key={input.id} class="mb-4">
          <label 
            htmlFor={input.id}
            class="block text-sm font-medium text-gray-700"
          >
            {input.label}
            {input.type === 'textarea' ? (
              <textarea
                id={input.id}
                value={formData[input.name]}
                onInput={(e) => handleChange(input.name, (e.target as HTMLTextAreaElement).value)}
                required={input.required}
                placeholder={input.placeholder}
                class={input.className}
              />
            ) : (
              <input
                id={input.id}
                type={input.type}
                value={formData[input.name]}
                onInput={(e) => handleChange(input.name, (e.target as HTMLInputElement).value)}
                required={input.required}
                placeholder={input.placeholder}
                class={input.className}
              />
            )}
          </label>
        </div>
      ))}

      <button
        type="submit"
        disabled={status.type === 'submitting' || status.type === 'success'}
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status.type === 'submitting' && <UiSpinner />}
        {status.type === 'submitting' 
          ? 'Enviando...' 
          : status.type === 'success' 
          ? '✓ Mensaje Enviado' 
          : 'Enviar'}
      </button>

      {status.type === 'error' && (
        <p class="mt-4 text-red-500 text-center">{status.message}</p>
      )}
    </form>
  );
}