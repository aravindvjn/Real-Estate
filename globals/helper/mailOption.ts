import { PropertyTypes } from "@/components/cards/type";
import { app_logo } from "../constants";

export const mailOptions = ({
  sender_email,
  email,
  name,
  message,
  phone_number,
  property,
}: {
  sender_email: string;
  email: string;
  name: string;
  message: string;
  phone_number: string;
  property: PropertyTypes;

}) => ({
  from: sender_email,
  to: email,
  subject: `New Message from ${name} Regarding ${property.title}`,
  html: `
  <html>
    <body style="font-family: Arial, sans-serif; color: #333;">
      <div style="text-align: center;">
        <!-- Add Logo Image -->
        <img src="${app_logo}" alt="Company Logo" style="width: 200px; margin-bottom: 20px;" />
      </div>

      <h2 style="text-align: center; color: #2d3748;">New Message from ${name} Regarding ${property.title}</h2>

      <p>Dear Seller,</p>
      <p>You have received a new message regarding your property listed as "<strong>${property.title}</strong>" (${property.type}). Please find the details of the message below:</p>

      <hr />

      <h3>Message:</h3>
      <p>${message}</p>

      <hr />

      <h3>Contact Info:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${sender_email}</p>
      <p><strong>Phone:</strong> ${phone_number}</p>

      <hr />

      <h3>Property Info:</h3>
      <ul>
        <li><strong>Title:</strong> ${property.title}</li>
        <li><strong>Location:</strong> ${property.location}</li>
        <li><strong>Type:</strong> ${property.type === 'sale' ? 'For Sale' : 'For Rent'}</li>
        <li><strong>Price:</strong> ${property.price}</li>
        <li><strong>Description:</strong> ${property.description}</li>
        <li><strong>Bedrooms:</strong> ${property.bedrooms}</li>
        <li><strong>Bathrooms:</strong> ${property.bathrooms}</li>
        <li><strong>Garage:</strong> ${property.garage}</li>
        <li><strong>Size:</strong> ${property.size} sq.ft</li>
        <li><strong>Features:</strong> ${property.features.join(', ')}</li>
      </ul>

      <hr />

      <p>Thank you for using our platform. We hope this message provides you with the necessary information.</p>

      <p style="text-align: center; font-size: 14px; color: #888;">Best regards,<br />Your Real Estate Team</p>
    </body>
  </html>
  `,
});
