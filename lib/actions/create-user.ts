'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions';
import { redirect } from 'next/navigation';
import { query } from '@/lib/db';

export const createUser = async (prevState: { message: string[] }, formData: FormData) => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.isNewUser) {
    redirect('/');
  }

  const firstName = formData.get('first_name')?.toString().trim();
  const lastName = formData.get('last_name')?.toString().trim();
  const phoneNumber = formData.get('phone_number')?.toString().trim() || null;
  const email = session.user?.email;
  const profilePictureUrl = formData.get('profile_picture_url')?.toString().trim() || session.user?.image || null;
  const role = formData.get('role')?.toString().trim();
  const location = formData.get('location')?.toString().trim() || null;
  const preferences = null; // Extendable for JSON preferences

  const returnState: string[] = [];

  // Validation
  if (!firstName) {
    returnState.push('First Name is required.');
  }
  if (!lastName) {
    returnState.push('Last Name is required.');
  }
  if (!role || !['buyer', 'seller', 'agent'].includes(role)) {
    returnState.push('Role must be buyer, seller, or agent.');
  }

  if (returnState.length > 0) {
    return {
      message: returnState,
    };
  }

  // Insert Query
  const queryText = `
    INSERT INTO users (
      first_name,
      last_name,
      email,
      phone_number,
      profile_picture_url,
      role,
      location,
      preferences
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING user_id, created_at
  `;

  const values = [
    firstName,
    lastName,
    email,
    phoneNumber,
    profilePictureUrl,
    role,
    location,
    preferences ? JSON.stringify(preferences) : null,
  ];

  try {
    const result = await query(queryText, values as []);

    if (result.rows.length === 0) {
      return {
        message: ['Failed to create user.'],
      };
    }else{
      session!.user!.isNewUser = false; 
    }
  } catch (error) {
    console.error('Error inserting user:', error);
    return {
      message: ['An error occurred while creating the user. Please try again later.'],
    };
  }

  redirect('/')
};
