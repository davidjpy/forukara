export interface LoginResponse {
    token: string;
    user: User;
}

export interface RefreshResponse {
    token: string;
    id: string;
}

export interface OAuthBody {
    url: string;
    challenge: string;
}

export type User = {
    id?: string
    username?: string
    preferredName?: string
    email?: string
    password?: string
    confirmPassword?: string
    avatar?: string
    background?: string
    gender?: 'Male' | 'Female' | 'Other' | string;
    location?: string
    occupation?: string
    about?: string
    discussions?: Array<string>
    connections?: Array<string>
    status?: 'Pending' | 'Active';
    createdAt?: string
}

export type UserLogin = {
    auth: 'id' | 'oauth',
    body: {
        email?: string;
        password?: string;
        authorizationCode?: string;
        codeVerifier?: string;
        codeChallenge?: string;
    }
}

export type Pages = 'splash' | 'home' | 'profile' | 'notifications' | 'settings' | 'help' | 'feedback' | 'contact' | null;
