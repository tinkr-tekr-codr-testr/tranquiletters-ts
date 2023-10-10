import NumParameterInput from "../NumParameterInput/NumParameterInput";
import { NUM_PARAMS, STRING_PARAMS, StringParameterState } from "../../shared/models/parameters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { NumParameterState } from "../../shared/models/parameters";

import { setName, setTokens, } from "../../state/tokenSlice";

import TokensParameterInput from "../StringParamInput/TokensParameterInput";
import { ReactNode } from "react";
import TokenNameCombobox from "../../widgets/TokenNameCombobox";

const VerbalParameters = ()=>{


    const {
        ['Tokens/Cluster']:     TokensPerCluster,
        ['Silence/Tokens']:     SecondsBetweenTokens,
        ['Silence/Clusters']:   SecondsBetweenClusters
    } = useSelector((state:RootState)=>state.numParameterReducer)  
            
    const {chosenSet} = useSelector((state: RootState) => state.tokenSliceReducer)

    
    return (
        <>
            <TokenNameCombobox/>
            <TokensParameterInput tokensKey={chosenSet}/>

            <NumParameterInput name={'Tokens/Cluster'} val={TokensPerCluster}/>
            <NumParameterInput name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
            <NumParameterInput name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            

        </>
    )
}

export default VerbalParameters