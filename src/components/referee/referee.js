import { pieceType,  } from "../chessboard/Chessboard";

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

    isValid(px, py, x, y, piece, team, chessboard){
        if (piece === pieceType.PAWN) {
            const row = (team === true) ? 1 : 6;//si team true ===> white alors axe x = 1 sinon egal a 6
            const pawnDirection = (team === true) ? 1 : -1;
            const xDirection = x - px;
            if (px === x && py === row && y - py === 2*pawnDirection) {
                if (!this.tileIsOccupied(x, y, chessboard) && !this.tileIsOccupied(x, y-pawnDirection, chessboard)){
                    return true
                }  
            } else if (px === x && y - py === pawnDirection) {
                if (!this.tileIsOccupied(x, y, chessboard)) {
                    return true
                }
            } 
            //ATTACKING PAWN
            else if (x - px === xDirection && y - py === pawnDirection) {
                if (this.tileIsOccupiedByOpponent(x, y, chessboard, team)) {
                    return true
                }
            }
        }
        return false
    }
}
