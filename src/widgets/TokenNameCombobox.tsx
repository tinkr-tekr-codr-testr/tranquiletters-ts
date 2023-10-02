import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useState } from "react";
import { setTokenSetName } from "../state/selectedSlice";

const TokenNameCombobox = ()=>{
    const selectedTokenSetName = useSelector((state:RootState)=> state.selectedSliceReducer );
    const namedTokenSets = useSelector((state: RootState)=>state.stringParameterReducer)
    const tokenSetNames = Object.keys(namedTokenSets);
    const dispatch = useDispatch();


    const [isAdding, setIsAdding] = useState(false);
    const [newTokenSetName, setNewTokenSetName] = useState('');
    const handleTokenSetNameChange = (e:React.ChangeEvent<HTMLInputElement>)=> setNewTokenSetName(e.target.value)
    const submit = ()=>{
        setIsAdding(false);
        setNewTokenSetName('');
        dispatch(setTokenSetName(newTokenSetName));

    }
    const cancel = ()=>{
        setIsAdding(false);
        setNewTokenSetName('');
    }

    return isAdding 
                    ? 
                        <select>
                            {tokenSetNames.map(name=><option>{name}</option>)}
                            <option onClick={()=>setIsAdding(true)}>Add New</option>
                        </select>
                    : 
                        <div>
                            <input onChange={handleTokenSetNameChange} value={newTokenSetName} />
                            <button onClick={submit}>Submit</button>
                            <button onClick={cancel}>Cancel</button>
                        </div>
    

    
}

export default TokenNameCombobox;