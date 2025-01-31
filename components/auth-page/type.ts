export type UserData = {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    profile_picture_url?: string;
    role: 'buyer' | 'seller' | 'agent';
    location?: string;
    preferences?: Record<string, any>;
}