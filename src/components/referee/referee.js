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

    isValid(px, py, x, y, Type, team, chessboard){
        if (Type === pieceType.PAWN) {
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
        } else if (Type === pieceType.KNIGHT) {
            //deplacement haut gauche /droite
            if (py - y === 2) {
                if (px - x === 1) {
                    console.log('deplacement haut gauche');
                }
                if (px - x === -1) {
                    console.log('deplacement haut droite');
                }
            }
            //deplacement droite haut/bas
            if (px - x === -2) {
                if (py - y === 1) {
                    console.log('deplacemnt droite haut');
                }
                if (py - y === -1) {
                    console.log('deplacement droite bas');
                }
            }
            //deplacemtn bas gauche/droite
            if (py - y === -2) {
                if (px - x === -1){
                    console.log('depalcemnt bas droite');
                }
                if ( px - x === 1) {
                    console.log('deplacement bas gauche');
                }
            }
            //deplacement gauche haut/bas 
            if (px - x === 2) {
                if (py - y === -1) {
                    console.log('dplcmt gauche bas');
                }
                if (py - y === 1) {
                    console.log('dplcmt gauche haut');
                }
            }
        }
        return false
    }
}
