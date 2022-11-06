import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@app/store';

interface MountState {
    signUpFormMounted: boolean;
    loginFormMounted: boolean;
}

const initialState: MountState = {
    signUpFormMounted: false,
    loginFormMounted: false
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
        }
    }
})

export const { toggleSignUpForm, toggleLoginForm } = authSlice.actions;

export const selectSignUpFormMounted = (state: RootState) => state.auth.signUpFormMounted;
export const selectLoginFormMounted = (state: RootState) => state.auth.loginFormMounted;

export default authSlice.reducer;