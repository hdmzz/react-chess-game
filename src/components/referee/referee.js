import { teamTurn } from "../chessboard/Chessboard";
import { pieceType } from "../chessboard/Chessboard";

export default class Referee {
    isValid(px, py, x, y, piece, team){
        if (piece === pieceType.PAWN) {
            console.log(team);
            if (team) {
                if (py === 1){
                    if (px === x && (y - py === 1 || y - py === 2)){ //le pion ne peut pas reculer
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
