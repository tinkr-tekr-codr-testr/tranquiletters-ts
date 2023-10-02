import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
    name: 'selected',
    initialState: {'TokenSetName': 'Default'},
    reducers: {
        setTokenSetName(state, action: PayloadAction<string>){
            state['TokenSetName'] = action.payload;
        }
    }

})

export const {setTokenSetName} = selectedSlice.actions;
export default selectedSlice.reducer;
