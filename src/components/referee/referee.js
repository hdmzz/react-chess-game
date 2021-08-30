import { pieceType,  } from "../chessboard/Chessboard";

export default class Referee {
    tileIsOccupied (x, y, chessboard) {
        const piece = chessboard.find( p => (p.x === x && p.y === y))
        if (piece) {
            console.log(piece);
            console.log('occupée');
            return true 
        } else {
            console.log('libre');
            return false
        }
    }

    isValid(px, py, x, y, piece, team, chessboard){
        if (piece === pieceType.PAWN) {
//--------------------------------------------------Blanc-------------------------------------------------
            if (team === true) {
                if (py === 1){
                    if (px === x && y - py === 1 || y - py === 2){ //le pion ne peut pas reculer
                        if (!this.tileIsOccupied(x, y, chessboard)) {
                            return true
                        }
                    }
                } else {
                    if (px === x && y - py === 1){
                        if (!this.tileIsOccupied(x, y, chessboard)) {
                            return true
                        }
                    } 
                }
                //black
            } else if (team === false) {
                if (py === 6) {
                    if (px === x && py - y === 1 || py - y === 2) { //le pion ne peut pas reculer
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
