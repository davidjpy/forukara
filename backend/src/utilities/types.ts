import { ObjectId, LeanDocument } from 'mongoose';

export interface DBError {
    no?: number;
    code?: string;
    syscall?: string;
    hostname?: string;
}

export interface EmailService {
    HTMLTemplate: string;
    replacement: object,
    target: string;
    subject: string;
}

export interface IUser {
    authorizationCode?: string;
    codeVerifier?: string;
    codeChallenge?: string;
    _id?: ObjectId;
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    avatar?: string;
    background?: string;
    about?: string;
    discussions?: Array<ObjectId> | Array<LeanDocument<ObjectId>>;
    connections?: Array<ObjectId> | Array<LeanDocument<ObjectId>>;
    confirmPassword?: string;
    status?: 'Pending' | 'Active';
    createdAt?: Date;
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


export interface JwtToken {
    tokenId?: string;
    tokenUsername?: string;
    tokenEmail?: string;
}

export interface ErrorResponse {
    error: string;
    code: number;
}

export enum ErrorCode {
    Failed = 0,
    UsernameErr = 1,
    EmailErr = 2,
    PasswordErr = 3,
    ConfirmPasswordErr = 4,
    AuthErr = 5
}
