import Pieces from "../components/pieces/pieces";
import BishopDetermination from "./determinationBishop";
import RookDetermination from "./determinationRook";

const bishopDetermination = new BishopDetermination();
const rookDeter = new RookDetermination();

export default class Queen extends Pieces {
    determination(piece) {
        const queen = [];
        const verticalAndHorizontalMove = rookDeter.determination(piece)
        const diagonalMove = bishopDetermination.determination(piece)
        queen.push(...verticalAndHorizontalMove.concat(diagonalMove))
        return queen
    }
} 