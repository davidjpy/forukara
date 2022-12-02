export interface ILoginResponse {
    token: string;
    user: User,
}

export interface IRefreshResponse {
    token: string,
    id: string
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
    discussion?: Array<string> | null;
    followers?: Array<string> | null;
    following?: Array<string> | null;
    status?: 'Pending' | 'Active';
    createdAt?: string | null;
}

