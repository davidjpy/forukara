export interface ILoginResponse {
    token: string;
    user: User,
}

export interface IRefreshResponse {
    token: string,
    user: User
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

