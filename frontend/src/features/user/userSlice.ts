import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@app/store';
import { User } from '@common/utilities/types';

interface UserState {
    userProfile: User;
}

const initialState: UserState = {
    userProfile: {
        username: null,
        avatar: null,
        about: null,
        discussions: null,
        connections: null,
        background: null,
        createdAt: null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<User>) => {
            state.userProfile = { ...state.userProfile, ...action.payload };
        }
    }
});

export const { setUserProfile } = userSlice.actions;

export const selectUserProfile = (state: RootState) => state.user.userProfile;

export default userSlice.reducer;