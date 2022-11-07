import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    recipe: null,
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setRecipe: (state, action: PayloadAction<any>) => {
            state.recipe = action.payload;
        },
    },
});

export const { setRecipe } = recipeSlice.actions;
