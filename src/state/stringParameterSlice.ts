import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { STRING_PARAMS, StringParameterState, defaultStringParams } from '../shared/models/parameters';
import { NameActionPayload, TokensActionPayload } from '../shared/models/actionsPayload';

const stringParameterSlice = createSlice({
    name: 'stringParameters',
    initialState: defaultStringParams as StringParameterState,
    reducers: {
        setName(state: StringParameterState, action: PayloadAction<NameActionPayload>){
            const {oldName, newName} = action.payload
            const tokens = state[oldName];
            delete state[oldName];
            state[newName] = tokens
        },

        setTokens(state: StringParameterState, action: PayloadAction<TokensActionPayload>){
            const {name, val} = action.payload;
            state[name] = val;
        },
    }
})

export const {setName, setTokens} = stringParameterSlice.actions;
export default stringParameterSlice.reducer;