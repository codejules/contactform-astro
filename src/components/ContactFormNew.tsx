import { useState } from 'preact/hooks';
import { handleContactSubmit } from '../lib/client/contact.client';
import type { ContactFormData, FormStatus } from '../lib/types/contact';
import UiSpinner from './Spinner.tsx';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    botcheck: ''
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setStatus({ type: 'submitting' });
    
    const result = await handleContactSubmit(formData);
    setStatus(result);

    if (result.type === 'success') {
      setFormData({ name: '', email: '', message: '', botcheck: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">

     <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Name
          <input
            type="text"
            value={formData.name}
            onInput={(e) => setFormData({...formData, name: (e.target as HTMLInputElement).value})}
            required
            class="mt-1 w-full px-3 py-2 border rounded-md"
          />
        </label>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Email
          <input
            type="email"
            value={formData.email}
            onInput={(e) => setFormData({...formData, email: (e.target as HTMLInputElement).value})}
            required
            class="mt-1 w-full px-3 py-2 border rounded-md"
          />
        </label>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Message
          <textarea
            value={formData.message}
            onInput={(e) => setFormData({...formData, message: (e.target as HTMLTextAreaElement).value})}
            required
            rows={4}
            class="mt-1 w-full px-3 py-2 border rounded-md"
          />
        </label>
      </div>

      {/* Campo Honeypot Mejorado */}
      <div class="hidden">
        <label>
          Don't fill this:
          <input
            type="text"
            name="botcheck"
            value={formData.botcheck}
            onInput={(e) => setFormData({...formData, botcheck: (e.target as HTMLInputElement).value})}
          />
        </label>
      </div>   
      <SubmitButton status={status} />
      
      {status.type === 'error' && (
        <p class="mt-4 text-red-500 text-center">{status.message}</p>
      )}
    </form>
  );
}

const SubmitButton = ({ status }: { status: FormStatus }) => (
  <button
    type="submit"
    disabled={status.type === 'submitting' || status.type === 'success'}
    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    {status.type === 'submitting' && <UiSpinner />}
    {getButtonText(status)}
  </button>
);

const getButtonText = (status: FormStatus) => {
  switch (status.type) {
    case 'submitting': return 'Enviando mensaje...';
    case 'success': return '✓ Mensaje enviado correctamente!';
    default: return 'Enviar';
  }
};