import React from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'
const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]
const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"]

export default function Chessboard() {
    const pieces = []
    let board = []

    /* for (let i = 0; i < 8; i++) {
        pieces.push({ image: "../../images/pawn_b.png", x: i, y: 6 })
    }

    for (let i = 0; i < 8; i++) {
        pieces.push({ image: "../../images/pawn_w.png", x: i, y: 1 })
    } */



    for (let j = verticalIndex.length; j >= 0; j--){
        for (let i = 0; i < horizontalIndex.length; i++){
            const number = j + i + 2
            board.push(<Tile number={number}/>)
        }
    }
    return (
        <div className="container">
            <div id="chessboard">
                {board}
            </div>
        </div>
    )
}
