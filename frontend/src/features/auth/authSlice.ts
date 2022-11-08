import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@app/store';

type User = {
    id: string | null;
    username: string | null;
    email: string | null;
    createdAt: Date | null;
}

interface AuthState {
    signUpFormMounted: boolean;
    loginFormMounted: boolean;
    credantial: string | null;
    user: User;
}

const initialState: AuthState = {
    signUpFormMounted: false,
    loginFormMounted: false,
    credantial: null,
    user: {
        id: null,
        username: null,
        email: null,
        createdAt: null
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleSignUpForm: (state, action: PayloadAction<boolean>) => {
            state.signUpFormMounted = action.payload;
        },

        toggleLoginForm: (state, action: PayloadAction<boolean>) => {
            state.loginFormMounted = action.payload;
        },

        setUserInfo: (state, action: PayloadAction<User>) => {
            const { id, username, email, createdAt }: User = action.payload;
            state.user = { id: id, username: username, email: email, createdAt: createdAt };
        },

        setcredantial: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            state.credantial = token;
        },

        logout: () => initialState
        
    }
})

export const { toggleSignUpForm, toggleLoginForm, setUserInfo, setcredantial, logout } = authSlice.actions;

export const selectSignUpFormMounted = (state: RootState) => state.auth.signUpFormMounted;
export const selectLoginFormMounted = (state: RootState) => state.auth.loginFormMounted;
export const selectUser = (state: RootState) => state.auth.user;
export const selectcredantial = (state: RootState) => state.auth.credantial;

export default authSlice.reducer;