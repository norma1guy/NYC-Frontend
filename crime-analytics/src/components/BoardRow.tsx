import Cell from "./Cell";
import './BoardRow.css'
function BoardRow(){

    return(
        <div className='board-row'>
            <Cell/>
            <Cell/>
            <Cell/>
        </div>
    )

}

export default BoardRow;