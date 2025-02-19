'use server'
import { PropertyTypes } from '@/components/cards/type'
import { mailOptions as Options } from '@/globals/helper/mailOption'
import nodemailer from 'nodemailer'

export async function sendMail(property:PropertyTypes,prev: string, formData: FormData) {
    const sender_email = formData.get('sender_email') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const phone_number = formData.get('phone_number') as string
    if (!sender_email || !name || !message || !phone_number) {
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
    const mailOptions = Options({
        sender_email,
        name,
        email,
        message,
        phone_number,
        property,
    })

    try {
        await transporter.sendMail(mailOptions)
        return "Email sent successfully!"
    } catch (error) {
        console.error('Error sending email:', error)
        return "Error sending email. Please try again later."
    }
}
