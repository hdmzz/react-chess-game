import React, { useRef, useState, useEffect } from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'
import Referee from '../referee/referee';

const referee = new Referee()
const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const pieceType = {
    PAWN: 1,
    ROOK: 2,//tour
    KNIGHT: 3,
    BISHOP: 4,
    KING: 5,
    QUEEN: 6
}

export const teamTurn = {
    WHITE: 1,
    BLACK: 0
}

const initialeBoardState = [];
for (let i = 0; i < 8; i++){
    initialeBoardState.push({ image: "../../images/pawn_b.png", x: i, y: 6, type: pieceType.PAWN, team: teamTurn.BLACK })
    initialeBoardState.push({ image: "../../images/pawn_w.png", x: i, y: 1, type: pieceType.PAWN, team: teamTurn.WHITE })
}

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w"
    const team = (p === 0) ? teamTurn.BLACK : teamTurn.WHITE
    const y = (p === 0) ? 7 : 0
    initialeBoardState.push({ image: `../../images/rook_${type}.png`, x: 0, y: y, type: pieceType.ROOK, team: team })
    initialeBoardState.push({ image: `../../images/rook_${type}.png`, x: 7, y: y, type: pieceType.ROOK, team: team })
    initialeBoardState.push({ image: `../../images/knight_${type}.png`, x: 1, y: y, type: pieceType.KNIGHT, team: team })
    initialeBoardState.push({ image: `../../images/knight_${type}.png`, x: 6, y: y, type: pieceType.KNIGHT, team: team })
    initialeBoardState.push({ image: `../../images/bishop_${type}.png`, x: 2, y: y, type: pieceType.BISHOP, team: team })
    initialeBoardState.push({ image: `../../images/bishop_${type}.png`, x: 5, y: y, type: pieceType.BISHOP, team: team })
    initialeBoardState.push({ image: `../../images/king_${type}.png`, x: 3, y: y, type: pieceType.KING, team: team })
    initialeBoardState.push({ image: `../../images/queen_${type}.png`, x: 4, y: y, type: pieceType.QUEEN, team: team })
}

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState(null)
    const [pieces, setPieces] = useState(initialeBoardState);
    const [gridX, setX] = useState(0);//ne pas mettre 0 en valeur initiale sinon on se retrouve avce les coordonnées x 0 et y 0 rook w
    const [gridY, setY] = useState(0);
    const [firstClick, setClick] = useState(true)
    const [team, setTeam] = useState(true);//on commence par les blancs??!
    const chessboardRef = useRef(null);

    function grabPiece(e){
        console.log('hello');
        const chessboard = chessboardRef.current
        const element = e.target 
        console.log(element);
        // offset est une valeur stable 
        console.log(Math.floor(element.offsetLeft / 100), Math.floor(element.offsetTop / 100));
        if (e.target.className === 'piece' && chessboard) {
            const grabX = Math.floor(element.offsetLeft / 100)
            const grabY = Math.floor(element.offsetTop / 100)
            setX(grabX)
            setY(grabY)
            setActivePiece(element)
            setClick(false)
        }
    }

    function dropPiece(e) {
        console.log('drop it');
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard){
            //NOUVELLES COORDONN2ES
            const x = Math.floor(e.target.offsetLeft / 100) ;//on a des coordonnées de position
            const y = Math.floor(e.target.offsetTop / 100);
            //COMPARISON AUX ANCIENNES COORDO PUIS VERIF
            const piece = pieces.find(p => (p.x === gridX && p.y === gridY))
            const isValid = referee.isValid(gridX, gridY, x, y, piece.type, team, pieces)
            //console.log(isValid);
            if (isValid) {
                const index = pieces.findIndex(p => (p.x === gridX && p.y === gridY)) 
                const newPositionPiece = {...piece, x: x, y: y}
                const newPieces = pieces
                newPieces.splice(index, 1, newPositionPiece)            
                setPieces(newPieces)
                //on doit remplacer l'ancienne piece et les anciennes coordonnées par les nouvelles 
                //grace a l'index on peut utiliser le splice et remplacer lancienne piece positionnée par la nouvelle position
                setTeam(!piece.team)
                setActivePiece(null)
                setClick(true)
            } else if (!isValid) {
                setX(0)
                setY(0)
                setClick(true)
            }

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
