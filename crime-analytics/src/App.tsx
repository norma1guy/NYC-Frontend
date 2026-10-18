
import './App.css'
import TicTacToe from './components/TicTacToe/TicTacToe';
import Mapper from './components/Mapper/Mapper';

function App() {

  return (
    <div className='title'>
      <h1>TIC-TAC-TOE</h1>
      <TicTacToe/>
      <Mapper/>
    </div>
  )


}

export default App;