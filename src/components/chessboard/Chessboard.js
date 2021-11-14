import Referee from '../referee/referee';
import React, { useRef, useState } from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'
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
export const pieces = [];//pieces est le tableau qui contiendra toutes les pièces appartenant chacune à leur propre classe

//Pour les pions 
for (let i = 0; i < 8; i++){
    pieces.push(new Pawn("../../images/pawn_b.png", i, 6,  pieceType.PAWN, teamTurn.BLACK, []))
    pieces.push(new Pawn("../../images/pawn_w.png", i, 1,  pieceType.PAWN, teamTurn.WHITE, []))
} 
//Pour lesautres pièces 
for (let p = 0; p < 2; p++) {
    const type = (p === 0) ? "b" : "w"
    const team = (p === 0) ? teamTurn.BLACK : teamTurn.WHITE
    const y = (p === 0) ? 7 : 0
    pieces.push(new Rook(`../../images/rook_${type}.png`, 0, y, pieceType.ROOK, team, []))
    pieces.push(new Rook(`../../images/rook_${type}.png`, 7, y, pieceType.ROOK, team, []))
    pieces.push(new Knight(`../../images/knight_${type}.png`, 1, y, pieceType.KNIGHT, team, []))
    pieces.push(new Knight(`../../images/knight_${type}.png`, 6, y, pieceType.KNIGHT, team, []))
    pieces.push(new Bishop(`../../images/bishop_${type}.png`, 2, y, pieceType.BISHOP, team, []))
    pieces.push(new Bishop(`../../images/bishop_${type}.png`, 5, y, pieceType.BISHOP, team, []))
    pieces.push(new King(`../../images/king_${type}.png`, 3, y, pieceType.KING, team, []))
    pieces.push(new Queen(`../../images/queen_${type}.png`, 4, y, pieceType.QUEEN, team, []))
}
//on détermine pour chaque pièce les déplacements possible grâce a une fonction determination qui prend plusieurs formes 
//Polimophysme
pieces.forEach(p => {
    p.possiblePosition = p.determination(p)
})

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState(null)
    const [grabX, setX] = useState(0);//ne pas mettre 0 en valeur initiale sinon on se retrouve avce les coordonnées x 0 et y 0 rook w
    const [grabY, setY] = useState(0);
    const [firstClick, setClick] = useState(true);
    const [firstCheck, setCheck] = useState(0);
    const [team, setTeam] = useState(true);//on commence par les blancs.
    const chessboardRef = useRef(null);
    let board = [];
    //vertical index = y
    //horizontal index = x
    for (let j = 0; j < verticalIndex.length; j++){
        for (let i = 0; i < horizontalIndex.length; i++){
            const number = j + i + 2
            let image = ""
            pieces.forEach(p => {
                if (p.x === i && p.y === j) {
                    image = p.image
                }
            })
            board.push(<Tile key={`${i},${j}`} number={number} image={image} x={i} y={j}/>)
        }
    }
    function grabPiece(e){
        const chessboard = chessboardRef.current
        const element = e.target
        // console.log(element.parentElement);
        if ((e.target.className === 'piece') && chessboard) {
            const grabX = Math.floor(element.offsetLeft / 100);
            const grabY = Math.floor(element.offsetTop / 100);
            const currentPiece = pieces.find(p => p.x === grabX && p.y === grabY);
            currentPiece.possiblePosition = currentPiece.determination(currentPiece) 
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
            const currentPiece = pieces.find(p => (p.x === grabX && p.y === grabY))
            //Si une piece corrspond au coordonnées de la souris on recherhe si la case choisi pour le deplacemnent est occupée
            //Si elle est occupée ==> verif si occupée par opposant 
            //Si opposant alors la pièce attaquée voit ses coordonnées changer pour -1 ce qui la fait diparaitre mais elle reste dans l'array de pièces
            if (currentPiece) {
                const validMove = currentPiece.possiblePosition.find(position => (position.x === x && position.y === y))
                if (validMove) {
                    const occupied = referee.tileIsOccupied(x, y, pieces)
                    if (occupied) {
                        const isOpponent = referee.tileIsOccupiedByOpponent(x, y , pieces, currentPiece.team)
                        currentPiece.possiblePosition.forEach(p => {
                            if (isOpponent && p.attack === 1){
                                const attackedPiece = pieces.find(p => (p.x === x && p.y === y))
                                currentPiece.x = x
                                currentPiece.y = y
                                pieces.forEach(p => {
                                    p.possiblePosition = p.determination(p)
                                })
                                attackedPiece.x = -1
                                attackedPiece.y = -1
                            } else {
                                return
                            }
                        })
                    }
                    //Simple déplacement 
                    if (occupied === false) {
                        //Les nouvelles coordonnées du pion 
                        //On overwrite sur la piece directement pas de rendue du tableau pieces/pieces en entier 
                        currentPiece.x = x
                        currentPiece.y = y
                        //Nécéssité de recalculer tout les dépalcement possible à chaque changement dans le jeu
                        pieces.forEach(p => {
                            p.possiblePosition = p.determination(p)
                        })
                        currentPiece.possiblePosition.forEach(p => { 
                            referee.tileIsOccupied(p.x,p.y, pieces)
                        })
                    }
                    //À chaque deplacement il faut vérifier si le roi est en danger
                    //Si il est en danger l'équipe du roi en danger doit le protéger donc si checkmate est positif 2 fois de suite le mouvment est illégal
                    let count = 0;//pas de roi en danger
                    if (count === 0) {
                        pieces.forEach(p => {
                            p.possiblePosition?.forEach(c => { // c = coordonées
                                const check = referee.checkmate(c.x, c.y, pieces, p.team)
                                if (check === true) {//un des roi est en danger
                                    count++//compte = 1
                                    setCheck(count)
                                } 
                            })                                      
                        })
                    }
                    if (firstCheck > 0) {//Si un checkMate a montrer un roi vulnérable il faut recommencer le test puis si le test est negatif on enlève le firstCheck 
                        console.log('firstcheck > 0');
                        const reCheck = [];
                        pieces.forEach(p => {
                            p.possiblePosition?.forEach(c => { // c = coordonées
                                const check = referee.checkmate(c.x, c.y, pieces, p.team);
                                reCheck.push(check)
                            })                                      
                        })
                        if (reCheck.some(element => element === true)) {
                            currentPiece.x = grabX;//on annule le deplacement 
                            currentPiece.y = grabY;
                            console.log('il faut protéger le roi');
                            setTeam(currentPiece.team)
                        } else {
                            setCheck(0)
                            setTeam(!currentPiece.team)

                        }
                    } else {
                        setTeam(!currentPiece.team)
                    }
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
    return (
        <div 
        onClick= {firstClick ? (e => grabPiece(e)) : (e => dropPiece(e))} 
        id="chessboard"
        ref={chessboardRef}>
            {board}
        </div>
    )
}