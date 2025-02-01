export interface UserType {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    profile_picture_url: string;
    role: string;
    location: string;
    created_at: string;
}

export interface BasicUserDataType {
    user_id: string;
    profile_picture_url: string;
    first_name: string;
    last_name: string;
    email: string;
    isAdmin: boolean;
}