import React, { useRef, useState } from 'react'
import Tile from '../tile/Tile'
import './chessboard.css'
import Referee from '../referee/referee';
import Determination from '../../middleware/determination';
import { possibleDeplacement } from '../../middleware/determination';

const referee = new Referee()
const determination = new Determination()
const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const pieceType = {
    PAWN: 1,//pion
    ROOK: 2,//tour
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
for (let i = 0; i < 8; i++){
    initialeBoardState.push({ image: "../../images/pawn_b.png", x: i, y: 6, type: pieceType.PAWN, team: teamTurn.BLACK })//x-------  y|||||||
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
    const [grabX, setX] = useState(0);//ne pas mettre 0 en valeur initiale sinon on se retrouve avce les coordonnées x 0 et y 0 rook w
    const [grabY, setY] = useState(0);
    const [firstClick, setClick] = useState(true)
    const [team, setTeam] = useState(true);//on commence par les blancs??!
    const chessboardRef = useRef(null);
    
    determination.determinationPosition(pieces)
    console.log(possibleDeplacement);
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



                    /*  const updatedPieces = pieces.reduce((results, piece, index) => {
                        if (piece.x === grabX && piece.y === grabY) {
                            if (indexOfAttackedPiece !== -1) {
                                results.splice(indexOfAttackedPiece, 1, piece)
                            } else {
                            piece.x = x
                            piece.y = y
                            console.log(piece.team);
                            results.push(piece)
                            setTeam(!currentPiece.team)
                            setActivePiece(null)
                            setClick(true)
                            }
                        } else if (!(piece.x === grabX && piece.y === grabY)) {
                            results.push(piece)
                        }
                        return results
                    }, [])
                    setPieces(updatedPieces) */
                } else if (!isValid) {
                        setX(0)
                        setY(0)
                        setClick(true)
                }
            }
            /* if (isValid) {
                //on trouve l'indx de la piece qui nous interesse e on splice pas besoin de savoir la team ou l'autre cest ok
                const index = pieces.findIndex(p => (p.x === gridX && p.y === gridY))
                const newPositionPiece = {...currentPiece, x: x, y: y}
                const newPieces = pieces
                newPieces.splice(index, 1, newPositionPiece)            
                setPieces(newPieces)
            } */
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
