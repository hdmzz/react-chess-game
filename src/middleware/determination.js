import { pieceType } from "../components/chessboard/Chessboard";
import RookDetermination from "./determinationRook";
const rookDeter =  new RookDetermination();
export const possibleDeplacement = [];

export default class Determination {
    determinationPosition(chessboard) {
        chessboard.forEach(piece => {
            if (piece.type === pieceType.PAWN) {
                this.determinationPawn(piece)
            }
        });
    }

    determinationPawn(piece) {
        console.log('pawn deteminantion');
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
        possibleDeplacement.push(possibleMove)
    } 
}