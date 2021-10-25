import Pieces from "../components/pieces/pieces";
import BishopDetermination from "./determinationBishop";
import RookDetermination from "./determinationRook";
const bishopDetermination = new BishopDetermination();
const rookDeter = new RookDetermination();

export default class King extends Pieces {
    determination(piece) {
        const king = [];
        const verticalAndHorizontalMove = rookDeter.determination(piece, 2)
        const diagonalMove = bishopDetermination.determination(piece, 2)
        king.push(...verticalAndHorizontalMove.concat(diagonalMove))
        return king
    }
}