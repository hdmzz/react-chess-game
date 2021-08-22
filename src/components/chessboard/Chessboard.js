import React, { useRef, useState } from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'

const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"];

const initialeBoardState = [];
for (let i = 0; i < 8; i++){
    initialeBoardState.push({ image: "../../images/pawn_b.png", x: i, y: 6 })
    initialeBoardState.push({ image: "../../images/pawn_w.png", x: i, y: 1 })
}

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w"
    const y = (p === 0) ? 7 : 0
    initialeBoardState.push({ image: `../../images/rook_${type}.png`, x: 0, y: y })
    initialeBoardState.push({ image: `../../images/rook_${type}.png`, x: 7, y: y })
    initialeBoardState.push({ image: `../../images/knight_${type}.png`, x: 1, y: y })
    initialeBoardState.push({ image: `../../images/knight_${type}.png`, x: 6, y: y })
    initialeBoardState.push({ image: `../../images/bishop_${type}.png`, x: 2, y: y })
    initialeBoardState.push({ image: `../../images/bishop_${type}.png`, x: 5, y: y })
    initialeBoardState.push({ image: `../../images/king_${type}.png`, x: 3, y: y })
    initialeBoardState.push({ image: `../../images/queen_${type}.png`, x: 4, y: y })
}

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState(null)
    const [pieces, setPieces] = useState(initialeBoardState);
    const [gridX, setX] = useState();//ne pas mettre 0 en valeur initiale sinon on se retrouve avce les coordonnées x 0 et y 0 rook w
    const [gridY, setY] = useState();
    const [firstClick, setClick] = useState(true)
    const chessboardRef = useRef(null);

    function grabPiece(e){
        console.log('hello');
        const chessboard = chessboardRef.current
        const element = e.target 
        // offset est une valeur stable 
        console.log(Math.floor(element.offsetLeft / 100), Math.floor(element.offsetTop / 100));
        if (e.target.className === 'piece' && chessboard) {
            const grabX = Math.floor(element.offsetLeft / 100)
            const grabY = Math.floor(element.offsetTop / 100)
            console.log(grabX, grabY);
            setX(grabX)
            setY(grabY)
            setActivePiece(element)
            setClick(false)
        }
    }
    
    function dropPiece(e) {
        console.log('drop it');
        console.log(e);
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard){
            const x = Math.floor(e.target.offsetLeft / 100) ;//on a des coordonnées de position
            const y = Math.floor(e.target.offsetTop / 100);
            const piece = pieces.find(p => (p.x === gridX && p.y === gridY))
            const index = pieces.findIndex(p => (p.x === gridX && p.y === gridY)) 
            const newPositionPiece = {...piece, x: x, y: y}
            const newPieces = pieces
            newPieces.splice(index, 1, newPositionPiece)            
            setPieces(newPieces)
            //on doit remplacer l'ancienne piece et les anciennes coordonnées par les nouvelles 
            //grace a l'index on peut utiliser le splice et remplacer lancienne piece positionnée par la nouvelle position
            setActivePiece(null)
            setClick(true)
        }
    }
    
    let board = [];
    for (let j = 0; j < verticalIndex.length; j++){
        for (let i = 0; i < horizontalIndex.length; i++){
            const number = j + i + 2
            const position = [ i , j ]
            let image = ""
            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image
                }
            })
            board.push(<Tile key={`${i},${j}`} number={number} image={image} position={position}/>)
        }
    }
    return (
        <div 
        //onMouseMove={e => movePiece(e)}
        onClick={firstClick ? (e => grabPiece(e)) : (e => dropPiece(e)) } 
        //onMouseUp={e => dropPiece(e)}
        id="chessboard"
        ref={chessboardRef}>
            {board}
        </div>
    )
}
