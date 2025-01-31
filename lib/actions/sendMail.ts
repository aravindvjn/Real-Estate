'use server'
import nodemailer from 'nodemailer'

export async function sendMail(prev: string, formData: FormData) {
    const sender_email = formData.get('sender_email') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!sender_email || !name || !message) {
        return "Fill All Fields."
    }
    if (!email) {
        return "Server Busy! Please Try Again"
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: sender_email,
        to: email,
        subject: `New Message from ${name}`,
        text: `Message: ${message}\n\nContact Info: ${sender_email}`,
    }

    try {
        await transporter.sendMail(mailOptions)
        return ""
    } catch (error) {
        console.error('Error sending email:', error)
        return "Error sending email. Please try again later."
    }
}
