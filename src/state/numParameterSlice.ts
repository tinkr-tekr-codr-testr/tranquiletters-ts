import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumActionPayload } from "../shared/models/actionsPayload";



const initialState = {
        'Tokens/Cluster': 10,
        'Silence/Tokens': 2,
        'Silence/Clusters': 10
};

const numParameterSlice = createSlice({
    name: 'numParameters',
    initialState,
    reducers: {
        modifyNumParameters(state, action: PayloadAction<NumActionPayload>){
            const {name, val} = action.payload as NumActionPayload;
            state[name]  = val;
        },

        crementNumParameter(state, action:PayloadAction<NumActionPayload>){
            const {name, val} = action.payload as NumActionPayload;
            state[name]  = state[name]+ val;
        }

        
    }
})

export const {modifyNumParameters, crementNumParameter} = numParameterSlice.actions;
export default numParameterSlice.reducer;
