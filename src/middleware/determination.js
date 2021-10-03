import { pieceType } from "../components/chessboard/Chessboard";
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
            z: {
                zx: piece.x,
                zy: piece.y
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