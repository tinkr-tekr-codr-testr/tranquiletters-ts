import {configureStore} from '@reduxjs/toolkit';
import numParameterReducer from './numParameterSlice';
import tokenSliceReducer from './tokenSlice';

export const store = configureStore({
    reducer: {numParameterReducer, tokenSliceReducer}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;