'use server';
import xss from 'xss'
import { getServerSession } from 'next-auth';
import { authOptions } from '../authOptions';
import { redirect } from 'next/navigation';
import { query } from '@/lib/db';
import { imageUpload } from './imageUpload';

export const createUser = async (selectedImage: string[], pathName: string, prevState: { message: string[] }, formData: FormData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await getServerSession(authOptions);
  const isEdit = pathName.split('/')[2] === 'edit';

  if ((!session || !session?.isNewUser) && !isEdit) {
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

  if (!firstName) {
    returnState.push('First Name is required.');
  } else if (firstName.length < 2 || firstName.length > 15) {
    returnState.push('First Name must be between 2 and 15 characters.');
  }

  if (!lastName) {
    returnState.push('Last Name is required.');
  } else if (lastName.length < 2 || lastName.length > 15) {
    returnState.push('Last Name must be between 2 and 15 characters.');
  }

  if (!role || !['buyer', 'seller', 'agent'].includes(role)) {
    returnState.push('Role must be buyer, seller, or agent.');
  }

  if (!phoneNumber) {
    returnState.push('Phone Number is required.');
  } else if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
    returnState.push('Phone Number must be a valid 10-digit Indian number.');
  }

  if (!location) {
    returnState.push('Location is required.');
  } else if (location.length < 2 || location.length > 100) {
    returnState.push('Location must be between 2 and 100 characters.');
  }

  let profilePictureUrl = session.user?.image || null;
  if (selectedImage && selectedImage.length > 0) {
    const res = await imageUpload(selectedImage);
    if (res.length > 0) {
      profilePictureUrl = res[0];
    } else {
      returnState.push('Failed to upload profile picture.');
    }
  }
  if (returnState.length > 0) {
    return {
      message: returnState,
    };
  }
  let queryText;
  let values;

  if (isEdit) {
    queryText = `
    UPDATE users
    SET 
      first_name = $1,
      last_name = $2,
      phone_number = $3,
      profile_picture_url = $4,
      role = $5,
      location = $6,
      preferences = $7,
      updated_at = NOW()
    WHERE email = $8
    RETURNING user_id, created_at
  `;

    values = [
      firstName,
      lastName,
      phoneNumber,
      profilePictureUrl,
      role,
      location,
      preferences ? JSON.stringify(preferences) : null,
      email, 
    ];

  } else {

    queryText = `
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

    values = [
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePictureUrl,
      role,
      location,
      preferences ? JSON.stringify(preferences) : null,
    ];
  }

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
