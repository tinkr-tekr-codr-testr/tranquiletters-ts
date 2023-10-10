import { useSelector } from "react-redux/es/hooks/useSelector"
import { PatternUnit, Silence, } from "../shared/models/patternUnit";
import { STIM_TYPES } from "../shared/models/stimTypes";
import { RootState } from "./store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";




export interface TogglePatternUnitPayload {
    type: STIM_TYPES,
    index:number
}

export interface InitPayload{
    length: number
}



const patternModelSlice = createSlice({
    name: 'patternModel',
    initialState: new Array<PatternUnit>(),
    reducers: {
        initializeModel(state, action: PayloadAction<InitPayload>){
            const length = action.payload.length
            state = [
                ...new Array<PatternUnit>(length).fill(Silence),
                new PatternUnit(STIM_TYPES.End, '')
            ];
        },

        togglePatternUnit(state, action: PayloadAction<TogglePatternUnitPayload>){
            const patternUnitSwitch = {
                [STIM_TYPES.Verbal]: new PatternUnit(STIM_TYPES.Verbal, ''),
                [STIM_TYPES.Silence]: new PatternUnit(STIM_TYPES.Silence, ''),
                [STIM_TYPES.SoundFX]: new PatternUnit(STIM_TYPES.SoundFX, ''),
                [STIM_TYPES.Feedback]: new PatternUnit(STIM_TYPES.Feedback, ''),
                [STIM_TYPES.End]: new PatternUnit(STIM_TYPES.End, ''),
            }

            const {type, index} = action.payload;


            if(type != STIM_TYPES.Silence)
                state[index] = patternUnitSwitch[STIM_TYPES.Silence];
            else 
                state[index] = patternUnitSwitch[STIM_TYPES.Verbal];
        }
    }
})

export const {togglePatternUnit, initializeModel} = patternModelSlice.actions
export default patternModelSlice.reducer;
        

        





