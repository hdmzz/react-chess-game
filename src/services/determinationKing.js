import BishopDetermination from "./determinationBishop";
import RookDetermination from "./determinationRook";
const bishopDetermination = new BishopDetermination();
const rookDeter = new RookDetermination();

export default class KingDetermination {
    determination(piece) {
        const king = [piece];
        const verticalAndHorizontalMove = rookDeter.determination(piece, 2)
        const diagonalMove = bishopDetermination.determination(piece, 2)
        king.push(verticalAndHorizontalMove.concat(diagonalMove))
        console.log(king);
    }
}