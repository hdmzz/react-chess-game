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

    let activePiece;

    function grabPiece(e){
        const element = e.target 
        if (e.target.className === 'piece') {
            const x = e.clientX - 50
            const y = e.clientY - 50
            element.style.position = 'absolute'
            element.style.left = `${x}px`
            element.style.top = `${y}px`
            activePiece = element
        }
    }
    
    function movePiece(e) {
        if (activePiece) {
            const x = e.clientX - 50
            const y = e.clientY - 50
            activePiece.style.position = 'absolute'
            activePiece.style.left = `${x}px`
            activePiece.style.top = `${y}px`
        }
    }

    function dropPiece(e) {
        if (activePiece){
            activePiece = null
        }
    }

    for (let j = verticalIndex.length - 1; j >= 0; j--){
        for (let i = 0; i < horizontalIndex.length; i++){
            const number = j + i + 2
            let image = ""

            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image
                }
            })
            board.push(<Tile key={`${i},${j}`} number={number} image={image} j={j} i={i}/>)
        }
    }
    return (
        <div className="container">
            <div 
            onMouseMove={e => movePiece(e)}
            onMouseDown={e => grabPiece(e)} 
            onMouseUp={e => dropPiece(e)}
            id="chessboard">
                {board}
            </div>
        </div>
    )
}
