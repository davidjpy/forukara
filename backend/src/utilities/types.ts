import { ObjectId } from 'mongoose';

export interface IDBError {
    no?: number;
    code?: string;
    syscall?: string;
    hostname?: string;
}

export interface IEmailService {
    HTMLTemplate: string;
    replacement: object,
    target: string;
    subject: string;
}

export interface IUser {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
    status?: 'Pending' | 'Active';
    expiredIn?: Date | null;
}

export interface IPost {
    id?: ObjectId;
    user?: ObjectId;
    title?: string;
    content?: string;
}

export interface IComment {
    id?: ObjectId;
    post?: ObjectId;
    user?: ObjectId;
    content?: string;
}

export interface IToken {
    tokenId: string;
    tokenUsername: string;
    tokenEmail: string;
}

export interface IErrorResponse {
    error: string;
    code: number;
}

export enum ErrorCode {
    Failed = 0,
    UsernameErr = 1,
    EmailErr = 2,
    PasswordErr = 3,
    ConfirmPasswordErr = 4,
}
