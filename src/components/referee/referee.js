import { pieceType } from "../chessboard/Chessboard";

export default class Referee {
    tileIsOccupied(x, y, chessboard) {
        const piece = chessboard.find( p => (p.x === x && p.y === y))
        if (piece) {
            console.log('occupied');
            return true 
        } else {
            return false
        }
    }

    tileIsOccupiedByOpponent(x, y , chessboard, team) {
        const piece = chessboard.find(p => (p.x === x && p.y === y && p.team !== team))
        if (piece) {
            console.log('occupied by opponent');
            return true
        } else {
            return false
        } 
    }

    isValid(px, py, x, y, type, team, chessboard){
        if (type === pieceType.PAWN) {
            const row = (team === true) ? 1 : 6;//si team true ===> white alors axe x = 1 sinon egal a 6
            const pawnDirection = (team === true) ? 1 : -1;
            const xDirection = x - px;
            if (px === x && py === row && y - py === 2*pawnDirection) {
                //--------------------------------------------------------------------y - pawnDirection(1 || -1) car on peut avancer de 2 case avec le pion le premier coup
                if (!this.tileIsOccupied(x, y, chessboard) && !this.tileIsOccupied(x, y-pawnDirection, chessboard)){//!this.tileIsOccupied === la case n'est pas occupée
                    return true
                }  
            } else if (px === x && y - py === pawnDirection) {
                if (!this.tileIsOccupied(x, y, chessboard)) {
                    return true
                }
            } 
            //ATTACKING PAWN
            //Lattaque se fait en diagonale avec un pion
            else if (x - px === xDirection && y - py === pawnDirection) {
                if (this.tileIsOccupiedByOpponent(x, y, chessboard, team)) {
                    return true
                }
            }
            //logic deplacement KNIGHT
        } else if (type === pieceType.KNIGHT) {
            for (let i = -1; i < 2; i += 2) {
                for (let j = -1; j <  2; j += 2) {
                    if (py - y === 2 * i) {// equivalent a  if (py - y === 2 * -1 || 2 * 1) 
                        if ( px - x === j) {
                            if (!this.tileIsOccupied(x, y, chessboard)) {
                                console.log('dplcemtn haut/bas droite/gauche');
                                return true
                            }
                            if (this.tileIsOccupiedByOpponent(x, y, chessboard, team)) {
                                return true
                            }
                        }
                    }
                    if (px - x === 2 * i) {//equivalent a  if (px - x === 2 * -1 || 2 * 1)
                        if (py - y === j) {
                            if (!this.tileIsOccupied(x, y, chessboard)) {
                                console.log('dplcmt droite/gauche bas/haut');
                                return true
                            }
                            if (this.tileIsOccupiedByOpponent(x, y, chessboard, team)) {
                                return true
                            }
                        }
                    }
                    //ici logique attaque 
                    
                }
            }
        }
        return false
    }
}
