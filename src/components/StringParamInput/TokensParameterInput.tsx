import { useDispatch, useSelector, } from "react-redux"
import { AppDispatch, RootState } from "../../state/store"
import {setTokens } from "../../state/tokenSlice"
import { TokenSets } from "../../state/tokenSlice";

import './StringParameterInputStyles.css';


interface TokensParameterProps {
    tokensKey: keyof TokenSets 
}

const TokensParameterInput = ({tokensKey}: TokensParameterProps)=>{
    const tokenState = useSelector((state:RootState)=>state.tokenSliceReducer);
    const {sets, chosenSet} = tokenState;
    const selectedTokens = sets[chosenSet];

    const dispatch = useDispatch<AppDispatch>();
    const updateTokens = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const tokens = e.target.value.split(' ');
        dispatch(setTokens({name: tokensKey, tokens}));
    }

    return (
        <div>
            <div className="center-content vertical">
                <div text-align='center' className="control ">
                    <input  style={{width:'10rem'}} className=" is-small input " value={selectedTokens.join(' ')} id='selectedSet' onChange={updateTokens} type="text" name="selectedSet"/>
                </div>
            </div>
        </div>
        
    )
}

const paramStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center'
}



export default TokensParameterInput;