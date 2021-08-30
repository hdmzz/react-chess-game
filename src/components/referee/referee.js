import { pieceType,  } from "../chessboard/Chessboard";

export default class Referee {
    tileIsOccupied (x, y, chessboard) {
        const piece = chessboard.find( p => p.x === x && p.y === y)
        if (piece) {
            return true 
        } else {
            return false
        }
    }

    isValid(px, py, x, y, piece, team, chessboard){
        if (piece === pieceType.PAWN) {
            if (team) {
                if (py === 1){
                    if (px === x && (y - py === 1 || y - py === 2)){ //le pion ne peut pas reculer
                        this.tileIsOccupied(x, y, chessboard)
                        return true
                    }
                } else {
                    if (px === x && y - py === 1){
                        return true
                    } 
                }
            } else if (!team) {
                if (py === 6) {
                    if (px === x && (py - y === 1 || py - y === 2)){ //le pion ne peut pas reculer
                        return true
                    }
                } else {
                    if (px === x && py - y === 1) {
                        return true
                    }
                }
            }
        }
        if (piece === pieceType.ROOK) {
            console.log(pieceType.ROOK);
        }//tour
        return false//return false par default bloque les autres deplacements
    }
}
