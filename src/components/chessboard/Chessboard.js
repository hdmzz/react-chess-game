import React, { useRef, useState } from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'
import Referee from '../referee/referee';
import Determination from '../../services/determination';
import Pawn from "../../services/determination"
import Pieces from '../pieces/pieces';
import Rook from '../../services/determinationRook';
import Knight from '../../services/determinationKnight';
import Bishop from '../../services/determinationBishop'
import Queen from '../../services/determinationQueen';
import King from '../../services/determinationKing';
const referee = new Referee();
const determination = new Pieces();

const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const pieceType = {
    PAWN: 1,
    ROOK: 2,
    KNIGHT: 3,
    BISHOP: 4,
    KING: 5,
    QUEEN: 6
}

export const teamTurn = {
    WHITE: true,
    BLACK: false
}

const initialeBoardState = [];
const testClass = [];
//fonctionne 
for (let i = 0; i < 8; i++){
    let pawnB = new Pawn("../../images/pawn_b.png", i, 6,  pieceType.PAWN, teamTurn.BLACK, [])
    let pawnW = new Pawn("../../images/pawn_w.png", i, 1,  pieceType.PAWN, teamTurn.WHITE, [])
    testClass.push(pawnB, pawnW)
} 



/* for (let i = 0; i < 8; i++){
    initialeBoardState.push({ image: "../../images/pawn_b.png", x: i, y: 6, type: pieceType.PAWN, team: teamTurn.BLACK, name: "Pawn" })//x-------  y|||||||
    initialeBoardState.push({ image: "../../images/pawn_w.png", x: i, y: 1, type: pieceType.PAWN, team: teamTurn.WHITE, name: "Pawn" })
} */

for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w"
    const team = (p === 0) ? teamTurn.BLACK : teamTurn.WHITE
    const y = (p === 0) ? 7 : 0
    testClass.push(new Rook(`../../images/rook_${type}.png`, 0, y, pieceType.ROOK, team, []))
    testClass.push(new Rook(`../../images/rook_${type}.png`, 7, y, pieceType.ROOK, team, []))
    
    // initialeBoardState.push({ image: `../../images/rook_${type}.png`, x: 0, y: y, type: pieceType.ROOK, team: team})
    // initialeBoardState.push({ image: `../../images/rook_${type}.png`, x: 7, y: y, type: pieceType.ROOK, team: team})
    testClass.push(new Knight(`../../images/knight_${type}.png`, 1, y, pieceType.KNIGHT, team, []))
    testClass.push(new Knight(`../../images/knight_${type}.png`, 6, y, pieceType.KNIGHT, team, []))

    // initialeBoardState.push({ image: `../../images/knight_${type}.png`, x: 1, y: y, type: pieceType.KNIGHT, team: team, name: "Knight" })
    // initialeBoardState.push({ image: `../../images/knight_${type}.png`, x: 6, y: y, type: pieceType.KNIGHT, team: team, name: "Knight" })
    testClass.push(new Bishop(`../../images/bishop_${type}.png`, 2, y, pieceType.BISHOP, team, []))
    testClass.push(new Bishop(`../../images/bishop_${type}.png`, 5, y, pieceType.BISHOP, team, []))

    // initialeBoardState.push({ image: `../../images/bishop_${type}.png`, x: 2, y: y, type: pieceType.BISHOP, team: team, name: "Bishop" })
    // initialeBoardState.push({ image: `../../images/bishop_${type}.png`, x: 5, y: y, type: pieceType.BISHOP, team: team, name: "Bishop" })
    testClass.push(new King(`../../images/king_${type}.png`, 3, y, pieceType.KING, team, []))
    // initialeBoardState.push({ image: `../../images/king_${type}.png`, x: 3, y: y, type: pieceType.KING, team: team, name: "King" })
    testClass.push(new Queen(`../../images/queen_${type}.png`, 4, y, pieceType.QUEEN, team, []))
    // initialeBoardState.push({ image: `../../images/queen_${type}.png`, x: 4, y: y, type: pieceType.QUEEN, team: team, name: "Queen" })
}

for (let p of testClass) {
    let position = p.determination(p)
    p.position.push(position)
}

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState(null)
    const [pieces, setPieces] = useState(testClass);
    const [grabX, setX] = useState(0);//ne pas mettre 0 en valeur initiale sinon on se retrouve avce les coordonnées x 0 et y 0 rook w
    const [grabY, setY] = useState(0);
    const [firstClick, setClick] = useState(true)
    const [team, setTeam] = useState(true);//on commence par les blancs??!
    const chessboardRef = useRef(null);

    console.log(pieces);
    function grabPiece(e){
        const chessboard = chessboardRef.current
        const element = e.target 
        if ((e.target.className === 'piece') && chessboard) {
            const grabX = Math.floor(element.offsetLeft / 100)
            const grabY = Math.floor(element.offsetTop / 100)
            const piece = pieces.find(p => p.x === grabX && p.y === grabY)
            console.log(piece);
            //Gestion du tour 
            if (piece.team !== team) {
                return 
            } else {
                setX(grabX)
                setY(grabY)
                setActivePiece(element)
                setClick(false)
            }
        }
    }

    function dropPiece(e) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard){
            //NOUVELLES COORDONN2ES
            const x = Math.floor(e.target.offsetLeft / 100) ;//on a des coordonnées de position
            const y = Math.floor(e.target.offsetTop / 100);
            //COMPARISON AUX ANCIENNES COORDO PUIS VERIF
            const currentPiece = pieces.find(p => (p.x === grabX && p.y === grabY))//La piece que l'on bouge
            const attackedPiece = pieces.find(p => (p.x === x && p.y === y))//La piece sur laquelle on lache la currentPiece doit partir
            console.log(attackedPiece);
            if (currentPiece) {
                const isValid = referee.isValid(grabX, grabY, x, y, currentPiece.type, team, pieces)
                if (isValid) {
                    const newPieces = pieces
                    if (attackedPiece) {
                        console.log(newPieces.indexOf(attackedPiece));
                        newPieces.splice(newPieces.indexOf(attackedPiece), 1)//l'element attaqué est remplacé supprimé de l'array
                    }
                    //les nouvelles coordonnees du pion 
                    const newPositionPiece = {...currentPiece, x: x, y: y}
                    const index = newPieces.findIndex(p => (p.x === grabX && p.y === grabY))                    
                        newPieces.splice(index, 1, newPositionPiece)
                        setPieces(newPieces)
                        setTeam(!currentPiece.team)
                        setActivePiece(null)
                        setClick(true)
                } else if (!isValid) {
                        setX(0)
                        setY(0)
                        setClick(true)
                }
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
        onClick={firstClick ? (e => grabPiece(e)) : (e => dropPiece(e)) } 
        id="chessboard"
        ref={chessboardRef}>
            {board}
        </div>
    )
}
