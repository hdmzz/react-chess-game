import { pieceType } from "../components/chessboard/Chessboard";
import RookDetermination from "./determinationRook";
import KnightDetermination from "./determinationKnight";
import BishopDetermination from "./determinationBishop";
import QueenDetermination from "./determinationQueen";
import KingDetermination from "./determinationKing";
import Pieces from "../components/pieces/pieces";

const rookDeter =  new RookDetermination();
const knightDeter = new KnightDetermination();
const bishopDeter = new BishopDetermination();
const queenDeter = new QueenDetermination();
const kingDeter = new KingDetermination();

export class Determination {
    determinationPosition(chessboard) {
        chessboard.forEach(piece => {
            if (piece.type === pieceType.PAWN) {
                this.determinationPawn(piece)
            }
            if (piece.type === pieceType.ROOK) {
                rookDeter.determination(piece, chessboard)
            }
            if (piece.type === pieceType.KNIGHT) {
                knightDeter.determination(piece)
            }
            if (piece.type === pieceType.BISHOP) {
                bishopDeter.determination(piece)
            }
            if (piece.type === pieceType.QUEEN) {
                queenDeter.determination(piece)
            }
            if (piece.type === pieceType.KING) {
                kingDeter.determination(piece)
            }
        });
    }
    
    determinationPawn(piece) {
        let possibleMove = {
            name: piece.name,
            z: {
                x0: piece.x,
                y0: piece.y
            },
            a: {
                x: piece.x ,
                y: piece.y + ((piece.y === 1) ? 1 : -1)
            },
            b: {
                x: piece.x,
                y: piece.y + ((piece.y === 1) ? 2 : -2)
            }
        }
        return possibleMove
    } 
}

export default class Pawn extends Pieces {
    constructor(image, x, y, type, team, position) {
        super(image, x, y, type, team)
        this.position = position
    }
    determination(piece) {
        let possibleMove = {
            a: {
                x: piece.x ,
                y: piece.y + ((piece.y === 1) ? 1 : -1)
            },
            b: {
                x: piece.x,
                y: piece.y + ((piece.y === 1) ? 2 : -2)
            }
        }
        return possibleMove
    }
}