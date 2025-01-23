import nodemailer from 'nodemailer';

export async function post({ request }: any) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Contacto Web" <${process.env.EMAIL}>`,
      to: 'jserravidal@gmail.com',
      subject: 'Nuevo mensaje de contacto',
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`,
    });
    return new Response('Email enviado', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error al enviar el email', { status: 500 });
  }
}
