import { PatternUnit } from "../../shared/models/patternUnit"
import { STIM_TYPES } from "../../shared/models/stimTypes";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { typeToIconMap } from "../../shared/models/patternUnit";
import usePatternModelSelector from "../../state/usePatternModelSelector";
import { useEffect } from "react";

interface StimPatternModelProps {
    model : PatternUnit[]
}

const StimPatternModel = ()=>{
    const {model, togglePatternUnit} = usePatternModelSelector();
    const isSilence = (unit:PatternUnit)=> unit.type == STIM_TYPES.Silence 


    const stims = model.map((unit, index)=> <FontAwesomeIcon onClick={()=>togglePatternUnit(unit.type, index)} color={isSilence(unit) ? 'white' : 'gray' } icon={typeToIconMap[unit.type]} />);
    
        

    return (
        <div>
            {stims}
        </div>
    )
}

export default StimPatternModel