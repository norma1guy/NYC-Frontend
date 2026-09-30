import { createContext, useContext, useState } from "react";
import BoardRow from "./BoardRow";

export type Turn = {
    turn: number;
    handler: () => void;
}

// Handle whose turn is it currently
const TurnContext = createContext<Turn | null>(null);
export const useTurnContext = () => {
    const currentTurnContext = useContext(TurnContext);
    if(!currentTurnContext){
        throw new Error(
            "useTurnContext has to be used within turnContext"
        );
    }

    return currentTurnContext;
}

function Board(){

    const [gameTurn,setGameTurn] = useState(1);

    function handleTurnchange(){
        setGameTurn(gameTurn + 1);
    }

    const [turn,setTurn] = useState<Turn>({turn:gameTurn,handler:handleTurnchange})

    return (
        <TurnContext value={turn}>
            <div className="board">
                <BoardRow/>
                <BoardRow/>
                <BoardRow/>
            </div>
        </TurnContext>
    )
}

export default Board;