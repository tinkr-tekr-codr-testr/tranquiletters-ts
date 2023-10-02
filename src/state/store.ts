import {configureStore} from '@reduxjs/toolkit';
import numParameterReducer from './numParameterSlice';
import stringParameterReducer from './stringParameterSlice';
import selectedSliceReducer from './selectedSlice';

export const store = configureStore({
    reducer: {numParameterReducer, stringParameterReducer, selectedSliceReducer}
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;