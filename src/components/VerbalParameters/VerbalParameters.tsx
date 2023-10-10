import NumParameterInput from "../NumParameterInput/NumParameterInput";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";


import TokensParameterInput from "../StringParamInput/TokensParameterInput";
import TokenNameSelector from "../../widgets/TokenNameSelector";

const VerbalParameters = ()=>{


    const {
        ['Tokens/Cluster']:     TokensPerCluster,
        ['Silence/Tokens']:     SecondsBetweenTokens,
        ['Silence/Clusters']:   SecondsBetweenClusters
    } = useSelector((state:RootState)=>state.numParameterReducer)  
            
    const {chosenSet} = useSelector((state: RootState) => state.tokenSliceReducer)

    
    return (
        <>
            <TokenNameSelector/>
            <TokensParameterInput tokensKey={chosenSet}/>

            <NumParameterInput name={'Tokens/Cluster'} val={TokensPerCluster}/>
            <NumParameterInput name={'Silence/Tokens'} val={SecondsBetweenTokens}/>
            <NumParameterInput name={'Silence/Clusters'} val={SecondsBetweenClusters}/>
            

        </>
    )
}

export default VerbalParameters