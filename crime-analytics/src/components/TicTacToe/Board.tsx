import Cell from "./Cell";
import './Board.css';
import {calculateWinner, type Player} from "./TicTacToe";

type boardState = {
    cells : Array<Player | null>;
    isNextX : boolean;
    handlePlay : (nextCells :Array<Player | null>) => void;
}

function Board({cells,isNextX,handlePlay} : boardState){

    function handleClick(i : number){
        if(cells[i] || calculateWinner(cells)) return;

        const nextCells = cells.slice();
        if(isNextX){
            nextCells[i] = 'X';
        } else {
            nextCells[i] = 'O';
        }
        handlePlay(nextCells);
    }

    
    



    return (

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
        
    )
}

export default Board;