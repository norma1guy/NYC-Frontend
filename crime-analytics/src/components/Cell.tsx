import { useContext, useState } from "react";
import type { Turn } from "./Board";
import { useTurnContext } from "./Board";
import './Cell.css';
function Cell(){

    const [clicked,setClicked] = useState(false);
    const turn = useTurnContext();
    
    function handleClick(){

        setClicked(true);
        turn.handler();
    }

    return (
        <div className = 'cell'>
            <button onClick={handleClick} disabled={clicked}>
                {clicked ? turn.turn % 2 === 0 ? 'X' :'O' : ''}
            </button>
        </div>
    )
}

export default Cell;