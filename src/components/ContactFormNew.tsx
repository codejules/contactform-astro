import { useState } from 'preact/hooks';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formData.honeypot) return; // Anti-spam honeypot check
    console.log(formData);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStatus('Email enviado exitosamente.');
      else throw new Error('Error al enviar el email.');
    } catch {
      setStatus('Error al enviar el email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <input type="text" name="honeypot" className="hidden" onChange={handleChange} />
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input type="text" name="name" required className="w-full p-2 border rounded" onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" name="email" required className="w-full p-2 border rounded" onChange={handleChange} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mensaje</label>
        <textarea name="message" required className="w-full p-2 border rounded" onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
}
