export interface ILoginResponse {
    token: string;
    user: User,
}

export interface IRefreshResponse {
    token: string,
    id: string
}

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    status: 'Pending' | 'Active';
    createdAt: Date;
}