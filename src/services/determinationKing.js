import Pieces from "../components/pieces/pieces";
import BishopDetermination from "./determinationBishop";
import RookDetermination from "./determinationRook";
const bishopDetermination = new BishopDetermination();
const rookDeter = new RookDetermination();

export default class King extends Pieces {
    constructor(image, x, y, type, team, position) {
        super(image, x, y, type, team, position)
    }
    determination(piece) {
        const king = [];
        const verticalAndHorizontalMove = rookDeter.determination(piece, 2)
        const diagonalMove = bishopDetermination.determination(piece, 2)
        king.push(verticalAndHorizontalMove.concat(diagonalMove))
        return king
    }
}