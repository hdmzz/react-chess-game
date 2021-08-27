import { teamTurn } from "../chessboard/Chessboard";


export default class Referee {
    isValid(px, py, x, y, pieceType, team){
        if (pieceType === 1){
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
        return false//return false par default bloque les autres deplacements
    }
}
