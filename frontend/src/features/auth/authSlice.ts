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
        id: null,
        username: null,
        email: null,
        avatar: null,
        background: null,
        about: null,
        discussions: null,
        connections: null,
        createdAt: null
    },
    unknownAuthErr: ''
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleSignUpForm: (state, action: PayloadAction<boolean>) => {
            state.signUpFormMounted = action.payload;

            // if (state.signUpFormMounted) {
            //     document.body.style.overflow = 'hidden';
            // }

            // if (!state.signUpFormMounted) {
            //     document.body.style.overflow = 'auto';
            // }
        },

        toggleLoginForm: (state, action: PayloadAction<boolean>) => {
            state.loginFormMounted = action.payload;

            // if (state.loginFormMounted) {
            //     document.body.style.overflow = 'hidden';
            // }

            // if (!state.loginFormMounted) {
            //     document.body.style.overflow = 'auto';
            // }
        },

        setUserInfo: (state, action: PayloadAction<User>) => {
            state.user = { ...state.user, ...action.payload };
        },

        setCredantial: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            state.credantial = token;
        },

        logout: () => initialState
        
    }
});

export const { toggleSignUpForm, toggleLoginForm, setUserInfo, setCredantial, logout } = authSlice.actions;

export const selectSignUpFormMounted = (state: RootState) => state.auth.signUpFormMounted;
export const selectLoginFormMounted = (state: RootState) => state.auth.loginFormMounted;
export const selectUser = (state: RootState) => state.auth.user;
export const selectcredantial = (state: RootState) => state.auth.credantial;

export default authSlice.reducer;