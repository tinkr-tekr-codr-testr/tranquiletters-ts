import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useState } from "react";
import { setName, chooseTokens, newTokenSet } from "../state/tokenSlice";

const TokenNameCombobox = ()=>{
    const tokenState = useSelector((state:RootState)=> state.tokenSliceReducer );
    const {sets, chosenSet} = tokenState;
    const setNames = Object.keys(sets);
    const dispatch = useDispatch();


    const [isAdding, setIsAdding] = useState(false);
    const [newTokenSetName, setNewTokenSetName] = useState('');
    const handleTokenSetNameChange = (e:React.ChangeEvent<HTMLInputElement>)=> setNewTokenSetName(e.target.value)
    const submit = ()=>{
        setIsAdding(false);
        setNewTokenSetName('');
        dispatch(newTokenSet(newTokenSetName));
        dispatch(chooseTokens(newTokenSetName));
    }

    const select = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        console.log(e.target.value);
        dispatch(chooseTokens(e.target.value));
    }


    const cancel = ()=>{
        setIsAdding(false);
        setNewTokenSetName('');
    }

    const selector = !isAdding 
                            ? 
                                <div>
                                    <select value={chosenSet} onChange={select}>
                                        {setNames.map(name=><option value={name}>{name}</option>)}
                                    </select>
                                    <button onClick={()=>setIsAdding(true)}>Add New</button>
                                </div>
                            : 
                                <div>
                                    <input onChange={handleTokenSetNameChange} value={newTokenSetName} />
                                    <button onClick={submit}>Submit</button>
                                    <button onClick={cancel}>Cancel</button>
                                </div>

    return selector;
    

    
}

export default TokenNameCombobox;