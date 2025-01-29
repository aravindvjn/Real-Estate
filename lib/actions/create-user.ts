'use server';
import xss from 'xss'
import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions';
import { redirect } from 'next/navigation';
import { query } from '@/lib/db';
import { imageUpload } from './imageUpload';

export const createUser = async (selectedImage: string[], prevState: { message: string[] }, formData: FormData) => {
  const session = await getServerSession(authOptions);
  console.log(session)

  if (!session || !session?.isNewUser) {
    redirect('/');
  }

  const firstName = xss(formData.get('first_name')?.toString().trim() || '');
  const lastName = xss(formData.get('last_name')?.toString().trim() || '');
  const phoneNumber = xss(formData.get('phone_number')?.toString().trim() || '');
  const email = session.user?.email;
  const role = xss(formData.get('role')?.toString().trim() || '');
  const location = xss(formData.get('location')?.toString().trim() || '');
  const preferences = null;

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


  let profilePictureUrl = session.user?.image || null;
  if (selectedImage && selectedImage?.length > 0) {
    const res = await imageUpload(selectedImage)
    if (res.length > 0) {
      profilePictureUrl = res[0]
    } else {
      returnState.push('Failed to upload profile picture.')
    }
  }

  if (returnState.length > 0) {
    return {
      message: returnState,
    };
  }

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
    } else {
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
