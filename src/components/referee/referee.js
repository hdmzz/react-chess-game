import { teamTurn } from "../chessboard/Chessboard";

export default class Referee {
    isValid(px, py, x, y, pieceType, teamType){
        if (pieceType === 1){
            if (teamType === teamTurn.WHITE ){//pas forcement necessaire
                if (py === 1) {
                    if (y - py === 1 || y - py === 2){ //le pion ne peut pas reculer
                        console.log('referee check le deplacement');
                        console.log(px, py, x, y);
                        return true
                    }
                }
            }
        }
        return false//return false par default bloque les autres deplacements
    }
}
