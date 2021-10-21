import React, { useRef, useState } from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'
import Referee from '../referee/referee';
import Pawn from "../../services/determinationPawn"
import Rook from '../../services/determinationRook';
import Knight from '../../services/determinationKnight';
import Bishop from '../../services/determinationBishop'
import Queen from '../../services/determinationQueen';
import King from '../../services/determinationKing';

const referee = new Referee();
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
export const testClass = [];
//fonctionne 
for (let i = 0; i < 8; i++){
    testClass.push(new Pawn("../../images/pawn_b.png", i, 6,  pieceType.PAWN, teamTurn.BLACK, []))
    testClass.push(new Pawn("../../images/pawn_w.png", i, 1,  pieceType.PAWN, teamTurn.WHITE, []))
} 
for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w"
    const team = (p === 0) ? teamTurn.BLACK : teamTurn.WHITE
    const y = (p === 0) ? 7 : 0
    testClass.push(new Rook(`../../images/rook_${type}.png`, 0, y, pieceType.ROOK, team, []))
    testClass.push(new Rook(`../../images/rook_${type}.png`, 7, y, pieceType.ROOK, team, []))
    testClass.push(new Knight(`../../images/knight_${type}.png`, 1, y, pieceType.KNIGHT, team, []))
    testClass.push(new Knight(`../../images/knight_${type}.png`, 6, y, pieceType.KNIGHT, team, []))
    testClass.push(new Bishop(`../../images/bishop_${type}.png`, 2, y, pieceType.BISHOP, team, []))
    testClass.push(new Bishop(`../../images/bishop_${type}.png`, 5, y, pieceType.BISHOP, team, []))
    testClass.push(new King(`../../images/king_${type}.png`, 3, y, pieceType.KING, team, []))
    testClass.push(new Queen(`../../images/queen_${type}.png`, 4, y, pieceType.QUEEN, team, []))
}

testClass.forEach(p => {
    p.position = p.determination(p)
})

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState(null)
    //pieces contient les instances des differentes classes ainsi que 
    const [grabX, setX] = useState(0);//ne pas mettre 0 en valeur initiale sinon on se retrouve avce les coordonnées x 0 et y 0 rook w
    const [grabY, setY] = useState(0);
    const [firstClick, setClick] = useState(true)
    const [team, setTeam] = useState(true);//on commence par les blancs??!
    const chessboardRef = useRef(null);
    
    /* const newArray = [...pieces]
    newArray.map(p => {
        const position = p.determination(p)
        p.position = position
    })
    setPieces(newArray) */
    function grabPiece(e){
        const chessboard = chessboardRef.current
        const element = e.target 
        if ((e.target.className === 'piece') && chessboard) {
            const grabX = Math.floor(element.offsetLeft / 100)
            const grabY = Math.floor(element.offsetTop / 100)
            const currentPiece = testClass.find(p => p.x === grabX && p.y === grabY)
            console.log(currentPiece);
            currentPiece.position = currentPiece.determination(currentPiece)

            //Gestion du tour 
            if (currentPiece.team !== team) {
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
            //NOUVELLES COORDONN2ES de la piece choisi
            const x = Math.floor(e.target.offsetLeft / 100) ;//on a des coordonnées de position
            const y = Math.floor(e.target.offsetTop / 100);
            //COMPARISON AUX ANCIENNES COORDO PUIS VERIF
            //La piece que l'on bouge sur laquelle on a fait le premier clic 
            const currentPiece = testClass.find(p => (p.x === grabX && p.y === grabY))
            //La piece sur laquelle on lache la currentPiece doit partir on la trouvera avec indeOf
            const attackedPiece = testClass.find(p => (p.x === x && p.y === y))
            //Nouvelle logique dplcmnt ========================================
            if (currentPiece) {
                const validMove = currentPiece.position.find(position => (position.x === x && position.y === y))
                console.log(validMove);
                if (validMove) {
                    const occupied = referee.tileIsOccupied(x, y, testClass)
                    console.log(occupied);
                    if (occupied) {
                        const isOpponent = referee.tileIsOccupiedByOpponent(x, y , testClass, currentPiece.team)
                        console.log(isOpponent);
                        if (isOpponent) {
                            const index =  testClass.indexOf(attackedPiece)
                            testClass.splice(index, 1)
                            currentPiece.x = x
                            currentPiece.y = y
                            currentPiece.position = currentPiece.determination(currentPiece)
                        }
                    }
                    if (occupied === false) {
                        //les nouvelles coordonnees du pion 
                        //on overwrite sur la piece directement pas de rendue du tableau testClass/pieces en entier 
                        currentPiece.x = x
                        currentPiece.y = y
                        currentPiece.position = currentPiece.determination(currentPiece)
                        currentPiece.position.forEach(p => { 
                            referee.tileIsOccupied(p.x,p.y, testClass)
                        })
                    }
                        setTeam(!currentPiece.team)
                        setActivePiece(null)
                        setClick(true)
                } else if (!validMove) {
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
            testClass.forEach(p => {
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
