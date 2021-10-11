import Pieces from "../components/pieces/pieces";

export default class Pawn extends Pieces {
    determination(piece) {
        const specialRow = (piece.team === true) ? 1 : 6 
        const direction = (piece.team === true) ? 1 : -1
        if (piece.y === specialRow) {
            let possibleMove = [
                {
                    x: piece.x ,
                    y: piece.y + direction
                },
                {
                    x: piece.x,
                    y: piece.y + 2 * direction
                }
            ]
            return possibleMove
        } else {
            let possibleMove = [
                {
                    x: piece.x ,
                    y: piece.y + direction
                }
            ]
            return possibleMove

        }
    }
}