import { useSelector } from "react-redux/es/hooks/useSelector"
import { PatternUnit, Silence, } from "../shared/models/patternUnit";
import { STIM_TYPES } from "../shared/models/stimTypes";
import { RootState } from "./store"
import { useEffect, useState } from "react";


const usePatternModelSelector = ()=>{



     const state = useSelector((state:RootState)=> state);
        const {tokenSliceReducer:Strings, numParameterReducer: Nums} = state;
         const {
            ['Tokens/Cluster']: TPC, 
            ['Silence/Tokens']: SBT,
            ['Silence/Clusters']: SBC,
        } = Nums;

        const {
            sets, chosenSet
        } = Strings;

        const [model, setModel] = useState(new Array<PatternUnit>())
        const Tokens = sets[chosenSet];

        const selectToken = ()=>{
            return Tokens[Math.floor(Math.random()*Tokens.length)];
        }
    



        const initialModel = [
            ...(new Array<PatternUnit>(TPC*SBT+SBC).fill(Silence)), 
                new PatternUnit(STIM_TYPES.End, '')
        ];

                                                //is within the cluster && is spaced out by Silence 
        const initTokens = ()=> {
            setModel(initialModel.map((unit, index)=> index < TPC*SBT && index % SBT == 0
                ? new PatternUnit(STIM_TYPES.Verbal, selectToken())
                : unit
            ))
        };

        useEffect(initTokens, [TPC, SBT, SBC])

        const togglePatternUnit = (type: STIM_TYPES, index: number) =>{
            const patternUnitSwitch = {
                [STIM_TYPES.Verbal]: new PatternUnit(STIM_TYPES.Verbal, selectToken()),
                [STIM_TYPES.Silence]: new PatternUnit(STIM_TYPES.Silence, ''),
                [STIM_TYPES.SoundFX]: new PatternUnit(STIM_TYPES.SoundFX, ''),
                [STIM_TYPES.Feedback]: new PatternUnit(STIM_TYPES.Feedback, ''),
                [STIM_TYPES.End]: new PatternUnit(STIM_TYPES.End, ''),
            }


            const newModel = [...model];
            if(type != STIM_TYPES.Silence)
                newModel[index] = patternUnitSwitch[STIM_TYPES.Silence];
            else 
                newModel[index] = patternUnitSwitch[STIM_TYPES.Verbal];

            setModel(newModel);
        }

        return {model, togglePatternUnit, initTokens};

            


    
            /*
            switch(unit.type){
                case STIM_TYPES.Feedback: {
                    break;
                }
                case STIM_TYPES.Silence:{
                    return unit;
                    break;

                }
                case STIM_TYPES.SoundFX:{
                    break;
                }
                case STIM_TYPES.Verbal:{
                    
                    break;
                }
            }*/}

export default usePatternModelSelector;
        

        





