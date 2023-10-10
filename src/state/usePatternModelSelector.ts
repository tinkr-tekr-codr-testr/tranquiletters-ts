import { useSelector } from "react-redux/es/hooks/useSelector"
import { PatternUnit, Silence, } from "../shared/models/patternUnit";
import { STIM_TYPES } from "../shared/models/stimTypes";
import { RootState } from "./store"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { togglePatternUnit, initializeModel } from "./patternModelSlice";


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

        const {patternModelReducer: patternModel} = state;

        const dispatch = useDispatch();


        const Tokens = sets[chosenSet];

        const selectToken = ()=>{
            return Tokens[Math.floor(Math.random()*Tokens.length)];
        }
    

       const setTokens = ()=>{
            patternModel.forEach((unit, index)=> index < TPC*SBT && index % SBT == 0 
                ? dispatch(togglePatternUnit({type:STIM_TYPES.Verbal, index}))
                : dispatch(togglePatternUnit({type: STIM_TYPES.Silence, index}))
            )
        };

        useEffect(()=>{dispatch(initializeModel({length:TPC*SBT+SBC}))}, []);

        useEffect(()=>{
            setTokens();

        }, [TPC, SBT, SBC])

        

        return patternModel;
}

export default usePatternModelSelector;
        

        





