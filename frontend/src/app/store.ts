import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from '@features/auth/authSlice';
import userReducer from '@features/user/userSlice';
import genericReducer from '@features/generic/genericSlice';
import { apiSlice } from '@app/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: userReducer,
        generic: genericReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
