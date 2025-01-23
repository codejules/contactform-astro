import nodemailer from 'nodemailer';
import type { ContactFormData, ApiResponse } from '../types/contact';

import type SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT), // 465 for secure
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
} as SMTPTransport.Options);

export const sendContactEmail = async (
  formData: ContactFormData
): Promise<ApiResponse> => {
  try {
    // Validación del servidor
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.message?.trim()) {
      throw new Error('All fields are required');
    }

    // Sanitización básica
    const sanitize = (text: string) => text.substring(0, 1000).replace(/[<>]/g, '');
    const sanitizedPhone = formData.phone ?
      sanitize(formData.phone).replace(/[^\d+]/g, '') : '';

    await transporter.sendMail({
      from: `Formulario de Contacto <info@audioprobe.es>`,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de ${sanitize(formData.name)}`,
      text: sanitize(formData.message),
      html: `
        <h3>Formulario de contacto web Audioprobe</h3>
        <p><strong>Nombre:</strong> ${sanitize(formData.name)}</p>
        <p><strong>Teléfono:</strong> ${sanitizedPhone}</p>
        <p><strong>Email:</strong> ${sanitize(formData.email)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitize(formData.message)}</p>
      `
    });

    return { success: true, message: 'Mensaje enviado correctamente' };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};