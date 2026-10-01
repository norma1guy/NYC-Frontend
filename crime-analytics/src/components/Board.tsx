import { useMemo, useState } from "react";
import Cell from "./Cell";
import './Board.css';


function Board(){

    const [gameTurn,setGameTurn] = useState(1);
    const [gameOver,setGameOver] = useState(false);
    const [winner,setWinner] = useState<null | number>(null);
    const [cells,setCells] = useState(Array(9).fill(null));
    const [isNextX,setIsNextX] = useState(false);


    function handleClick(i : number){
        if(cells[i] || gameOver) return;

        const nextCells = cells.slice();
        if(isNextX){
            nextCells[i] = 'X';
        } else {
            nextCells[i] = 'O';
        }
        setCells(nextCells);
        setIsNextX(!isNextX);
        setGameTurn(gameTurn + 1);
    }

    function handleReset(){
        setCells(Array(9).fill(null));
        setIsNextX(false);
        setWinner(null);
        setGameOver(false);
    }
    
    const renderWinner = useMemo(() => {
        const lines = [
            [0,1,2],
            [0,3,6],
            [0,4,8],
            [1,4,7],
            [2,5,8],
            [2,4,6],
            [3,4,5],
            [6,7,8],
        ]

        for(const line of lines){
            if(cells[line[0]] && cells[line[0]] === cells[line[1]] && cells[line[1]] === cells[line[2]]){
                const player = cells[line[0]] === 'O' ? 1 : 2;
                setWinner(player);
                setGameOver(true);
                break;
            }  
        }
        

    },[gameTurn]);



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
            <div className="event">
                <p><b>{winner ? `Winner is ${winner}` : `Next Player : ${isNextX?2:1}`}</b></p>
            </div>
            <div className="reset">
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}

export default Board;