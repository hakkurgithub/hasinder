import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('E-posta ayarları eksik. Simüle ediliyor:', { to, subject });
      return;
    }
    await transporter.sendMail({
      from: `"TİB Ağı Genel Merkez" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log('✅ E-posta başarıyla gönderildi:', to);
  } catch (error) {
    console.error('❌ E-posta gönderme hatası:', error);
  }
};
