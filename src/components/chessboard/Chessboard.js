import React from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'
const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]
const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"]

export default function Chessboard() {
    const pieces = []
    let board = []

    for (let i = 0; i < 8; i++){
        pieces.push({ image: "../../images/pawn_b.png", x: i, y: 6 })
        pieces.push({ image: "../../images/pawn_w.png", x: i, y: 1 })
    }

    for (let p = 0; p < 2; p++) {
        const type = (p === 0) ? "b" : "w"
        const y = (p === 0) ? 7 : 0
        pieces.push({ image: `../../images/rook_${type}.png`, x: 0, y })
        pieces.push({ image: `../../images/rook_${type}.png`, x: 7, y })
        pieces.push({ image: `../../images/knight_${type}.png`, x: 1, y })
        pieces.push({ image: `../../images/knight_${type}.png`, x: 6, y })
        pieces.push({ image: `../../images/bishop_${type}.png`, x: 2, y })
        pieces.push({ image: `../../images/bishop_${type}.png`, x: 5, y })
        pieces.push({ image: `../../images/king_${type}.png`, x: 3, y })
        pieces.push({ image: `../../images/queen_${type}.png`, x: 4, y })
    }
    /* //Tours
    pieces.push({ image: "../../images/rook_w.png", x: 0, y: 0 })
    pieces.push({ image: "../../images/rook_w.png", x: 7, y: 0 })

    //Chevaliers
    pieces.push({ image: "../../images/knight_w.png", x: 1, y: 0 })
    pieces.push({ image: "../../images/knight_w.png", x: 6, y: 0 })

    //Fous
    pieces.push({ image: "../../images/bishop_w.png", x: 2, y: 0 })
    pieces.push({ image: "../../images/bishop_w.png", x: 5, y: 0 })
    
    //Rois Reine
    pieces.push({ image: "../../images/queen_w.png", x: 3, y: 0 })
    pieces.push({ image: "../../images/king_w.png", x: 4, y: 0 }) */








    for (let j = verticalIndex.length - 1; j >= 0; j--){
        for (let i = 0; i < horizontalIndex.length; i++){
            const number = j + i + 2
            let image = ""

            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image
                }
            })
            board.push(<Tile number={number} image={image} j={j} i={i}/>)
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
