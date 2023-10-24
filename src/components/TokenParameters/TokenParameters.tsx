import NumParameterInput from "../NumParameterInput/NumParameterInput";

import { useSelector } from "react-redux";
import {  RootState } from "../../state/redux/store";


import { setName, setTokens } from "../../state/redux/tokenSetParameterSlice";
import StringParameterInput from "../StringParamInput/StringParameterInput";
import { crementTranslate } from "../../state/redux/tokenNumParameterSlice";


const TokenParameters = ()=>{
/*        */ 

    const {
        ['Tokens/Cluster']:     TokensPerCluster,
        ['Silence/Tokens']:     SecondsBetweenTokens,
        ['Silence/Clusters']:   SecondsBetweenClusters,
        ['Position']: Position
    } = useSelector((state:RootState)=>state.tokenNumParameterReducer)  
            
    const {
        ['Name']:   NameVal,
        ['Tokens']: TokensVal
    } = useSelector((state:RootState)=>state.tokenSetParameterReducer);
    
    return (
        <>
            <NumParameterInput name={'Tokens/Cluster'} val={TokensPerCluster}/>
            <NumParameterInput name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
            <NumParameterInput name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            <NumParameterInput name={'Position'} val={Position} delta={crementTranslate}/>
            
            <StringParameterInput name={'Name'} val={NameVal} action={setName}/>
            <StringParameterInput name={'Tokens'} val={TokensVal.join(' ')} action={setTokens}/>
        </>
    )
}

export default TokenParameters