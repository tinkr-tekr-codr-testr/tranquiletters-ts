import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import numParameterReducer from './numParameterSlice';
import tokenSliceReducer from './tokenSlice';
import patternModelReducer from './patternModelSlice';

const persistConfig = {
    key: 'data',
    storage
}
const persistedReducer = persistReducer(persistConfig, combineReducers({numParameterReducer, tokenSliceReducer, patternModelReducer}))



export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;