import React, { useRef, useState } from 'react'
import Tile from '../tile/Tile'
import { usePosition } from '../../context/PositionContext';
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
        console.log(e);
        if (e.target.className === 'piece') {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100))
            setX(grabX)
            setY(grabY)
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = 'absolute'
            element.style.left = `${x}px`
            element.style.top = `${y}px`
            setActivePiece(element)
            setClick(false)
        }
    }
    
    function movePiece(e) {
        const chessboard = chessboardRef.current
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = 'absolute'
            /* activePiece.style.left = `${x}px`
            activePiece.style.top = `${y}px` */
            /* if ( x < minX) {
                activePiece.style.left = `${minX}px`
            } else {
                activePiece.style.left = `${x}px`
            } */
            if ( x < minX ) {
                activePiece.style.left = `${minX}px` 
            } else if ( x > maxX ) {
                activePiece.style.left = `${maxX}px`
            } else {
                activePiece.style.left = `${x}px`
            }
            
            if ( y < minY ) {
                activePiece.style.top = `${minY}px` 
            } else if ( y > maxY ) {
                activePiece.style.top = `${maxY}px`
            } else {
                activePiece.style.top = `${y}px`
            }
        }
    }
    
    function dropPiece(e) {
        console.log('drop it');
        console.log(e);
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard){
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100) ;//on a des coordonnées de position
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 750) / 100));
            const piece = pieces.find(p => (p.x === gridX && p.y === gridY))
            const index = pieces.findIndex(p => (p.x === gridX && p.y === gridY)) 
            const newPositionPiece = {...piece, x: x, y: y}
            const newPieces = pieces
            console.log(newPieces);
            newPieces.splice(index, 1, newPositionPiece)            
            setPieces(newPieces)
            //on doit remplacer l'ancienne piece et les anciennes coordonnées par les nouvelles 
            //grace a l'index on peut utiliser le splice et remplacer lancienne piece positionnée par la nouvelle position
            setActivePiece(null)
            setClick(true)
        }
    }
    
    let board = [];
    for (let j = verticalIndex.length - 1; j >= 0; j--){
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
