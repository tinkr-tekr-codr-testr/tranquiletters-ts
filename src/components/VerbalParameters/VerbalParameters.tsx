import NumParameterInput from "../NumParameterInput/NumParameterInput";
import { NUM_PARAMS, STRING_PARAMS, StringParameterState } from "../../shared/models/parameters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { NumParameterState } from "../../shared/models/parameters";


import { setName, setTokens } from "../../state/stringParameterSlice";
import StringParameterInput from "../StringParamInput/StringParameterInput";
import { ReactNode } from "react";

const VerbalParameters = ()=>{
    const tokenSetName = useSelector((state:RootState)=>state.selectedSliceReducer);

    const {
        ['Tokens/Cluster']:     TokensPerCluster,
        ['Silence/Tokens']:     SecondsBetweenTokens,
        ['Silence/Clusters']:   SecondsBetweenClusters
    } = useSelector((state:RootState)=>state.numParameterReducer)  
            

    
    return (
        <>
            <StringParameterInput name={'Name'} val={NameVal} action={setName}/>
            <StringParameterInput name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>

            <NumParameterInput name={'Tokens/Cluster'} val={TokensPerCluster}/>
            <NumParameterInput name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
            <NumParameterInput name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            

        </>
    )
}

export default VerbalParameters