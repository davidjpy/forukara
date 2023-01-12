export interface RefreshResponse {
    token: string;
    id: string;
}

export interface OAuthBody {
    url: string;
    challenge: string;
}

export type ProfileSocialMedia = {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
}

export type ProfileBio = {
    summary?: string;
    about?: string;
    hashtag?: Array<string>;
    topics?: Array<string>;
    skills?: Array<string>;
    languages?: Array<string>;
}

export type ProfileInfo = {
    username?: string;
    preferredName?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    avatar?: string;
    background?: string;
    gender?: 'Male' | 'Female' | 'Other' | string;
    location?: string;
    title?: string;
    languages?: Array<string>;
    occupation?: string;
    status?: 'Pending' | 'Active';
    expiredIn?: Date | null;
    biography: ProfileBio;
    socialMedia: ProfileSocialMedia;
}

export interface User {
    id?: string;
    profile: ProfileInfo;
    discussions: Array<string>;
    connections: Array<string>;
    createdAt?: Date | string;
}

export type AuthProvider = 'google' | 'linkedin' | 'twitter' | 'email';

export type Pages = 'splash' | 'home' | 'profile' | 'notifications' | 'settings' | 'help' | 'feedback' | 'contact' | null;
