import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { End, PatternUnitModel } from "../../shared/models/patternUnitModel";
import { STIM_TYPES } from "../../shared/models/stimTypes";
import { PURGE } from "redux-persist";


export interface StimToggleState {
    patternModel: PatternUnitModel[],
    currentStimType: STIM_TYPES,
}

interface SetStimPayload {
    index: number, 
    type: STIM_TYPES
}


const DefaultStimsToggled = {
    patternModel: new Array<PatternUnitModel>(),
    currentStimType: STIM_TYPES.None,

}

const stimToggleSlice = createSlice({
    name: 'stimToggleSlice',
    initialState: DefaultStimsToggled,
    reducers: {
        switchStimToToggle(state: StimToggleState, action: PayloadAction<STIM_TYPES>){
            const stimType = action.payload;
            state.currentStimType = stimType;
        },

        toggleStim(state: StimToggleState, action: PayloadAction<{index:number, stimType: STIM_TYPES}>){
            const {index, stimType} = action.payload;
            const {patternModel} = state;

            patternModel[index] =  patternModel[index].type != stimType 
            ? new PatternUnitModel(stimType)
            : new PatternUnitModel(STIM_TYPES.Silence);
        },

        setStim(state: StimToggleState, action: PayloadAction<SetStimPayload>){
            const {index, type} = action.payload;
            state.patternModel[index] = new PatternUnitModel(type);
        },

        initializeModel(state, action: PayloadAction<number>){
            const length = action.payload;
            state.patternModel.length = length;
        },

        handleTranslate(state, action: PayloadAction<number>){
            const translation = action.payload;
            const {patternModel} = state;

            if(translation > 0){
                const spliceStart = patternModel.length - translation;
                const displaced = patternModel.splice(spliceStart);
                patternModel.unshift(...displaced);
            }

            else if(translation < 0){
                const spliceEnd = -translation;
                const displaced = patternModel.splice(0, spliceEnd);
                patternModel.push(...displaced);
            }
            
 
        
        },


        capOff(state){
            state.patternModel.push(End)
        }
    },

    extraReducers: 
        (builder)=> { builder.addCase(PURGE, state=>state = DefaultStimsToggled)}
    
})

export const {switchStimToToggle, toggleStim, initializeModel, setStim, handleTranslate, capOff} = stimToggleSlice.actions;
export default stimToggleSlice.reducer;