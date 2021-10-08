import { pieceType } from "../components/chessboard/Chessboard";
import RookDetermination from "./determinationRook";
import KnightDetermination from "./determinationKnight";
const rookDeter =  new RookDetermination();
const knightDeter = new KnightDetermination();

export default class Determination {
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
        });
    }

    determinationPawn(piece) {
        let pawn = [piece]
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
        pawn.push(possibleMove)
    } 
}