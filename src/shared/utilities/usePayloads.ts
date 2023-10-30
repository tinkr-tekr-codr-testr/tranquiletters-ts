import { useSelector } from "react-redux";
import { RootState } from "../../state/redux/store";

const usePayloads = ()=>{

    const {
        feedbackParameterReducer : {questionSound, feedbackTime, isVocal, hitUpgradeThreshold, isAdaptive, isGeneratingFeedback, isReducingClusters, acknowledgementsAccepted},
        tokenSetParameterReducer : {['Tokens']: tokens},
        tokenNumParameterReducer:  {
            ['Tokens/Cluster']: TPC,
            ['Silence/Clusters']: SBC,
            ['SessionTime']: SessionTime
          },
        stimToggleSliceReducer: {patternModel}
    } = useSelector((state: RootState)=>state.persistedRootReducer)
    

    return {
        TPC,
        SBC,
        SessionTime,
        tokens, 
        
        questionSound, 
        feedbackTime, 
        hitUpgradeThreshold,
        isAdaptive, 
        isVocal,
        isGeneratingFeedback,
        isReducingClusters,

        acknowledgementsAccepted,
    
        patternModel
    };

}

export default usePayloads;