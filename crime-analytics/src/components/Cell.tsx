import { useState } from "react";
import './Cell.css';
function Cell( {value,onClick} : {value : string,onClick: ()=> void}){


    return (
        <div className = 'cell'>
            <button onClick={onClick}>
                {value}
            </button>
        </div>
    )
}

export default Cell;