import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [isNext, setNext] = useState(true)
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove]

    function handlePlay(squares) {
        const nextHistory = [...history.slice(0, currentMove + 1), squares];
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
        setNext(!isNext)
    }

    function jumpTo(move) {
        setCurrentMove(move)
        setNext(isNext % 2 === 0)
    }

    const moves = history.map((squares, move) => {
        let desc
        if(move > 0) {
            desc = `Go to move #${move}`
        }else{
            desc = `Go to game start`
        }

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    })
    
    return (
        <>
            <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay}/>
            <div className="game-history">
                <ol>{moves}</ol>
            </div>
        </>
        
    )
}