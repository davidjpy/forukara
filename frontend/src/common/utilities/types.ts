export interface RefreshResponse {
    token: string;
    id: string;
}

export interface OAuthBody {
    url: string;
    challenge: string;
}

export interface ProfileSocialMedia {
    twitter: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    instagram: string;
}

export interface ProfileBio {
    summary: string;
    about: string;
    hashtag: Array<string>;
    topics: Array<string>;
    skills: Array<string>;
    languages: Array<string>;
}

export interface ProfileInfo {
    username: string;
    preferredName: string;
    email: string;
    avatar: string;
    background: string;
    gender: 'Male' | 'Female' | 'Other' | string;
    location: string;
    title: string;
    occupation: string;
    status: 'Pending' | 'Active' | string;
    biography: ProfileBio;
    socialMedia: ProfileSocialMedia
    
}

export interface User {
    id: string;
    profile: ProfileInfo;
    discussions: Array<string>;
    connections: Array<string>;
    createdAt: Date | string;
}

export type AuthProvider = 'google' | 'linkedin' | 'twitter' | 'email';

export type Pages = 'splash' | 'home' | 'profile' | 'notifications' | 'settings' | 'help' | 'feedback' | 'contact' | null;
