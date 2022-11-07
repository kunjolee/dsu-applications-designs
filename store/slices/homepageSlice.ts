import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    homepageData: null,
};

export const homepageSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {
        setHomepage: (state, action: PayloadAction<any>) => {
            state.homepageData = action.payload;
        },
    },
});

export const { setHomepage } = homepageSlice.actions;
