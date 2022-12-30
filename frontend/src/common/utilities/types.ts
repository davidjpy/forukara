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
    id?: string | null;
    username?: string | null;
    email?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
    avatar?: string | null;
    background?: string | null;
    about?: string | null;
    discussions?: Array<string> | null;
    connections?: Array<string> | null;
    status?: 'Pending' | 'Active';
    createdAt?: string | null;
}

export type OAuthLogin = {
    authorizationCode?: string;
    codeVerifier?: string;
    codeChallenge?: string;
}

export type Pages = 'splash' | 'home' | 'profile' | 'notifications' | 'settings' | 'help' | 'feedback' | 'contact' | null;
