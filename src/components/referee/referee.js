import { pieceType } from "../chessboard/Chessboard";
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
            return true
        } else {
            return false
        }
    }
    checkmate(x, y , chessboard, team) {
        const piece = chessboard.find(p => (p.x === x && p.y === y && p.team !== team))
        let color;
        if (piece?.team === true) color = "blanc";
        if (piece?.team === false) color = "noir";
        if (piece) {
            if (piece.type === pieceType.KING){
                console.log(`le roi ${color} est en danger`)
                return true
            }
            else {
                return false
            }
        }
        return false
    }
}