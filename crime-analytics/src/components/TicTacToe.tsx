import { useMemo, useState } from "react";
import Board from "./Board";
import { Button } from "@mui/material";
import "./TicTacToe.css"

export type Player = 'X' | 'O';
type Cell = Player | null;


export function calculateWinner(cells : Cell[]):Player | null{
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

        for(const [a,b,c] of lines){

            if(cells[a] && cells[a] == cells[b] && cells[b] == cells[c]){
                return cells[a];
            }
            
        }
        
        return null;

    }

function TicTacToe(){

    const [gameTurn,setGameTurn] = useState(0);
    const [history,setHistory] = useState<Array<Array<Cell>>>([Array(9).fill(null)]);
    const [isNextX,setIsNextX] = useState(false);
    const cells = history[gameTurn];
    const winner = calculateWinner(cells);

    function handleReset(){
        setHistory([Array(9).fill(null)]);
        setIsNextX(false);
        setGameTurn(0);

    }

    function handlePlay(cells : Array<Cell>){
        const nextHistory = [...history.slice(0,gameTurn + 1),cells];
        setHistory(nextHistory);
        setIsNextX(!isNextX);
        setGameTurn(nextHistory.length - 1);
        
    }


    function goBack(nextTurn : number){
        setGameTurn(nextTurn);
        setIsNextX(nextTurn % 2 === 0)
    }

    const moves = history.map((_,turn) =>{
        let value;
        if(turn > 0) value = `Go to turn ${turn}`;
        else value = 'Go to start';

        return (
            <li key={turn}>
                <Button variant="contained" size="small" onClick={()=> goBack(turn)}>
                    {value}
                </Button>
            </li>
        )

    })

    return (
        <div className="tic-tac-toe">
            <div className='game'>
                <div className="event">
                    <p><b>{winner ? `Winner is ${winner}` : `Next Player : ${isNextX?2:1}`}</b></p>
                </div>
                <div>
                    <Board cells={cells} isNextX={isNextX} handlePlay={handlePlay}/>
                </div>
                <div className="reset">
                    <Button variant='outlined' onClick={handleReset}>Reset</Button>
                </div>
            </div>
            <div className='history'>
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )

}

export default TicTacToe;