import { createContext, useContext, useMemo, useState } from "react";
import Cell from "./Cell";
import './Board.css';


function Board(){

    const [gameTurn,setGameTurn] = useState(1);
    const [gameFinished,setGameFinished] = useState(false);
    const [reset, setReset] = useState(false);
    const [cells,setCells] = useState(Array(9).fill(null));
    const [isNextX,setIsNextX] = useState(false);


    function handleClick(i : number){
        if(cells[i]) return;

        const nextCells = cells.slice();
        if(isNextX){
            nextCells[i] = 'X';
        } else {
            nextCells[i] = 'O';
        }
        setCells(nextCells);
        setIsNextX(!isNextX);
    }

    function handleReset(){
        setGameTurn(1);
        setReset(!reset);
    }


    return (
        <div className="tic-tac-toe">
            <div className="board">
                <div className="board-row">
                    <Cell value={cells[0]} onClick={() => handleClick(0)}/>
                    <Cell value={cells[1]} onClick={() => handleClick(1)}/>
                    <Cell value={cells[2]} onClick={() => handleClick(2)}/>
                </div>
                <div className="board-row">
                    <Cell value={cells[3]} onClick={() => handleClick(3)}/>
                    <Cell value={cells[4]} onClick={() => handleClick(4)}/>
                    <Cell value={cells[5]} onClick={() => handleClick(5)}/>
                </div>
                <div className="board-row">
                    <Cell value={cells[6]} onClick={() => handleClick(6)}/>
                    <Cell value={cells[7]} onClick={() => handleClick(7)}/>
                    <Cell value={cells[8]} onClick={() => handleClick(8)}/>
                </div>
            </div>
            <div className="reset">
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Board;