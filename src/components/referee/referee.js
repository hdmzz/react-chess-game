import Pawn from "../../services/determinationPawn"
export default class Referee {
    tileIsOccupied(x, y, chessboard) {
        const piece = chessboard.find( p => (p.x === x && p.y === y))
        if (piece) {
            return true 
        } else {
            return false
        }
    }
    tileIsOccupiedByOpponent(x, y , chessboard, team) {
        const piece = chessboard.find(p => (p.x === x && p.y === y && p.team !== team))
        if (piece) {
            if (piece instanceof Pawn) console.log("pawn");
            console.log('occupied by opponent');
            console.log(piece);
            return true
        } else {
            return false
        } 
    }

    checkmate() {

    }
}