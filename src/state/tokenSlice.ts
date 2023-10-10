import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TokenSets{
    [name:string]: Array<string>
}

interface TokenState {
    sets: TokenSets,
    chosenSet: keyof TokenSets
}

interface SetNamePayload {
    oldName: string,
    newName: string
}

interface SetTokensPayload {
    name: keyof TokenSets,
    tokens: string[]
}

export type {TokenSets, SetNamePayload, SetTokensPayload}


const tokenSlice = createSlice({
    name: 'tokens',
    initialState: <TokenState>{chosenSet: 'default', sets:{'default': ['a', 'b', 'c', 'd', 'e']}},
    reducers: {
        setName(state, action: PayloadAction<SetNamePayload>){
            const {oldName, newName} = action.payload;
            const {sets} = state;
            const tokens = sets[oldName as keyof TokenSets];
            delete sets[oldName as keyof TokenSets];
            sets[newName as keyof TokenSets] = tokens;
        },

        setTokens(state, action: PayloadAction<SetTokensPayload>){
            const {name, tokens} = action.payload;
            const {sets} = state;
            sets[name as keyof TokenSets] = tokens;
        },

        chooseTokens(state, action: PayloadAction<keyof TokenSets>){
            state.chosenSet = action.payload;
        },

        newTokenSet(state, action: PayloadAction<string>){
            const newSetName = action.payload;
            state.sets[newSetName] = [];
        }

        
    }

})

export const {setName, setTokens, chooseTokens, newTokenSet} = tokenSlice.actions;
export default tokenSlice.reducer;
