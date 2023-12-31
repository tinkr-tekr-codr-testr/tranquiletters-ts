import { useDispatch } from "react-redux"
import { NUM_PARAMS } from "../../shared/models/parameters"
import { AppDispatch } from "../../state/store"
import { modifyNumParameters, crementNumParameter } from "../../state/numParameterSlice"
import './NumParameterInputStyles.css';

interface NumParameterProps {
    name: NUM_PARAMS,
    val: number
}



const NumParameterInput = ({name, val}: NumParameterProps)=>{
    const dispatch = useDispatch<AppDispatch>();

    const handleCrement = (val: number)=> dispatch(crementNumParameter({name, val}));
    const handleModify = (val: number)=> dispatch(modifyNumParameters({name, val}));


    return (

        <div className="center-content vertical">
            
            <div className="center-content">
                <label className="label is-small" htmlFor={name}>{name}</label>
            </div>
           
            <div className="control center-content horizontal">
                <button className="button is-small crement-button" id={`decrement-${name}`} type="button" onClick={()=>handleCrement(-1)}>-1</button>
                <input style={{width:'6rem'}} className=" is-small input " value={val} id={name} onChange={()=>{}} type="number" name="tokensPerClus"/>
                <button className="button is-small crement-button" id={`increment-${name}`} type="button" onClick={()=>handleCrement(+1)}>+1</button>
            </div>
        </div>
        
    )
}

const paramStyle = {
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center'
}



export default NumParameterInput;