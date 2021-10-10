import Pieces from "../components/pieces/pieces";

export default class Pawn extends Pieces {
    constructor(image, x, y, type, team, position) {
        super(image, x, y, type, team, position)
    }
    determination(piece) {
        const move = []
        let possibleMove = [
            {
                x: piece.x ,
                y: piece.y + ((piece.y === 1) ? 1 : -1)
            },
            {
                x: piece.x,
                y: piece.y + ((piece.y === 1) ? 2 : -2)
            }
        ]
        return possibleMove
    }
}