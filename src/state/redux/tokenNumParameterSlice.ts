import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NumActionPayload } from "../../shared/models/actionsPayload";
import { TOKEN_NUM_PARAMS } from "../../shared/models/parameters";
import { PURGE } from "redux-persist";



interface TokenState {
    tokensPerCluster: number,
    silenceBetweenTokens: 2,
    tokensAt: number[]
}

const initialState: TokenState = {
        tokensPerCluster: 10,
        silenceBetweenTokens: 2,

        tokensAt: [4, 5, 6, 7] as number[]
};



const tokenNumParameterSlice = createSlice({
    name: 'tokenParameters',
    initialState,
    reducers: {
        modifyTPC(state: TokenState, action: PayloadAction<number>){
            state.tokensPerCluster = action.payload;
        },

        modifySBT(state: TokenState, action: PayloadAction<number>){
            state.tokensPerCluster = action.payload;
        },


        crementTPC(state: TokenState, action:PayloadAction<number>){
            state.tokensPerCluster  += action.payload;;
        },

        crementSBT(state: TokenState, action:PayloadAction<number>){
            state.silenceBetweenTokens  += action.payload;;
        },

        addToken(state: TokenState, action: PayloadAction<number>){
            const index = action.payload;
            const {tokensAt} = state;
            if(tokensAt.includes(index)) return state;

            const newTokens = tokensAt.slice();
            newTokens.push(index);
            newTokens.sort((a, b)=>a-b);
            state.tokensAt = newTokens;
            return state;
        },

        removeToken(state: TokenState, action: PayloadAction<number>){
            state.tokensAt = state.tokensAt.filter(index=> index != action.payload);
        },

        clearAllTokens(state: TokenState){
            state.tokensAt = [] as number[];
        }
    }, 

    extraReducers: 
    (builder)=> { builder.addCase(PURGE, ()=> initialState)}
})

export const {modifySBT, modifyTPC, crementSBT, crementTPC, addToken, removeToken, clearAllTokens} = tokenNumParameterSlice.actions;
export default tokenNumParameterSlice.reducer;
