import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@app/store';
import { User } from '@common/utilities/types'

interface AuthState {
    signUpFormMounted: boolean;
    loginFormMounted: boolean;
    credantial: string | null;
    user: User;
    unknownAuthErr: string;
}

const initialState: AuthState = {
    signUpFormMounted: false,
    loginFormMounted: false,
    credantial: null,
    user: {
        id: '',
        profile: {
            username: '',
            email: '',
            avatar: '',
            background: '',
            preferredName: '',
            gender: '',
            location: '',
            occupation: '',
            biography: {
                about: '',
            },
            socialMedia: {
                twitter: '',
                linkedin: '',
                facebook: ''
            }
        },
        discussions: [],
        connections: [],
        createdAt: '',
    },
    unknownAuthErr: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Open and close signup form dialog
        toggleSignUpForm: (state, action: PayloadAction<boolean>) => {
            state.signUpFormMounted = action.payload;
        },

        // Open and close login form dialog
        toggleLoginForm: (state, action: PayloadAction<boolean>) => {
            state.loginFormMounted = action.payload;
        },

        // Set current user info
        setUserInfo: (state, action: PayloadAction<Partial<User>>) => {
            state.user = { ...state.user, ...action.payload };
        },

        // Set user's access token
        setCredantial: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            state.credantial = token;
        },

        // Logout and reset all states
        logout: () => initialState
        
    }
});

export const { toggleSignUpForm, toggleLoginForm, setUserInfo, setCredantial, logout } = authSlice.actions;

export const selectSignUpFormMounted = (state: RootState) => state.auth.signUpFormMounted;
export const selectLoginFormMounted = (state: RootState) => state.auth.loginFormMounted;
export const selectUser = (state: RootState) => state.auth.user;
export const selectcredantial = (state: RootState) => state.auth.credantial;

export default authSlice.reducer;