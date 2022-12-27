import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@app/store';
import { Pages } from '@common/utilities/types'

interface GenericState {
    page: Pages
}

const initialState: GenericState = {
    page: null
}

export const genericSlice = createSlice({
    name: 'generic',
    initialState,
    reducers: {
        // Switch current page
        switchPage: (state, action: PayloadAction<Pages>) => {
            state.page = action.payload;
        }
    }
});

export const { switchPage } = genericSlice.actions;
export const selectPage = (state: RootState) => state.generic.page

export default genericSlice.reducer;