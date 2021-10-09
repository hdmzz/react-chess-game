import BishopDetermination from "./determinationBishop";
import RookDetermination from "./determinationRook";
const bishopDetermination = new BishopDetermination();
const rookDeter = new RookDetermination();
export default class QueenDetermination {
    determination(piece) {
        const queen = [piece];
        const verticalAndHorizontalMove = rookDeter.determination(piece)
        const diagonalMove = bishopDetermination.determination(piece)
        queen.push(verticalAndHorizontalMove.concat(diagonalMove))
        console.log(queen);
    }
} 