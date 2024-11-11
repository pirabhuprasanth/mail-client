import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export async function sendEmail(to: string, subject: string, text: string) {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        text
    });
}
