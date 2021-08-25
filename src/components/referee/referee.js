import { teamTurn } from "../chessboard/Chessboard";

export default class Referee {
    isValid(px, py, x, y, pieceType, teamType){
        let turn = (teamType === teamTurn.WHITE) ? true : false;
        if (pieceType === 1){
            if (py === 1 || py === 6){//pas forcement necessaire
                if (turn){
                    if (y - py === 1 || y - py === 2){ //le pion ne peut pas reculer
                        return true
                    }
                }
                if (!turn){
                    if (py - y === 1 || py - y === 2){ //le pion ne peut pas reculer
                        return true
                    }
                }
            }
        }
        return false//return false par default bloque les autres deplacements
    }
}
