import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { recipeSlice } from './slices';
import { homepageSlice } from './slices/homepageSlice';

export const store = configureStore({
    reducer: {
        recipe: recipeSlice.reducer,
        homepage: homepageSlice.reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
