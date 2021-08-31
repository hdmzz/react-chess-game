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

    isValid(px, py, x, y, piece, team, chessboard){
        if (piece === pieceType.PAWN) {
            const row = (team === true) ? 1 : 6;//si team true ===> white alors axe x = a 1 sinon egal a 6
            const pawnDirection = (team === true) ? 1 : -1;
            if (py === row) {
                if (px === x && y - py === 1*pawnDirection){
                    if (!this.tileIsOccupied(x, y, chessboard)) {
                        return true
                    }
                } else if (px === x && y - py === 2*pawnDirection) {
                    if (!this.tileIsOccupied(x, y, chessboard) && !this.tileIsOccupied(x, y-pawnDirection, chessboard)){
                        return true
                    }   
                }
            } else {
                if (px === x && y - py === pawnDirection) {
                    if (!this.tileIsOccupied(x, y, chessboard)) {
                        return true
                    }
                }
            }
        }
        return false
    }
}
