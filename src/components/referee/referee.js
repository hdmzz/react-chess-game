import { pieceType } from "../chessboard/Chessboard";

export default class Referee {
    tileIsOccupied(x, y, chessboard) {
        const piece = chessboard.find( p => (p.x === x && p.y === y))
        if (piece) {
            console.log('tileIsOccupied running');
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
                            //ici logique attaque 
                            if (this.tileIsOccupiedByOpponent(x, y, chessboard, team)) {
                                return true
                            }
                        }
                    } 
                }
            }
            //LOgique DEPLACEMTN BISHOP
        } else if (type === pieceType.BISHOP) {
            console.log('Bishop');
            for (let i = 1; i < 8 ; i += 1) {
                //mouvement haut droite
                if (x > px && y < py) {
                    let possiblePosition = {x: px + i, y: py - i};
                    if (possiblePosition.x > x && possiblePosition.y < y){
                        break
                    }
                    console.log('possiblposition');
                    console.log(possiblePosition);
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x > possiblePosition.x && y < possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    } 
                }
                
                
                // mouvement haut gauche 
                if (x < px && y < py) {
                    let possiblePosition = {x: px - i, y: py - i};
                    if (possiblePosition.x < x && possiblePosition.y < y){
                        break
                    }
                    console.log('possiblposition');
                    console.log(possiblePosition);
                    console.log('desiredposition');
                    console.log(x, y);
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x < possiblePosition.x && y < possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    }
                }
                
                
                //mouvement bas droite
                if (x > px && y > py) {
                    let possiblePosition = {x: px + i, y: py + i};
                    if (possiblePosition.x > x && possiblePosition.y > y){
                        break
                    }
                    console.log(x, y);
                    console.log('possiblposition');
                    console.log(possiblePosition);
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x > possiblePosition.x && y > possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    }
                }
                
                
                //mouvement bas gauche
                if (x < px && y > py) {
                    let possiblePosition = {x: px - i, y: py + i};
                    if (possiblePosition.x < x && possiblePosition.y > y){
                        break
                    }
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x < possiblePosition.x && y > possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        //tile is occupied by team member
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    }
                }
            }
            return false
        } else if (type === pieceType.ROOK) {
            for (let i = 1; i < 8; i++) {
               //==============================vertical
                if (x === px) {
                    if (y > py) {//bas
                        let possiblePosition = {
                            x: px,
                            y: py + i
                        }
                        if (possiblePosition.y > y) break
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            }
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true
                        }
                    }
                    if (y < py) {//haut
                        let possiblePosition = {
                            x: px,
                            y: py - i
                        }
                        if (possiblePosition.y < y) break
                        console.log(i);
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            }
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true
                        }
                    }
                }
                //=========================================horizontal
                if (y === py) {
                    if (x > px) {
                        let possiblePosition = {
                            x: px + i,
                            y: py
                        }
                        if (possiblePosition.x > x) break
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            } 
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true 
                        }
                    }
                    if (x < px) {
                        let possiblePosition = {
                            x: px - i,
                            y: py
                        }
                        if (possiblePosition.x < x) break
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            } 
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true
                        }
                    }
                }
            } 
            return false
        } else if (type === pieceType.QUEEN) {
            console.log("QUEEN");
            //deplacemnt diagonale et horizontal et vertical melange de bishop et de rook mais refactoré
            //on va voir ce que ca donne 
            for (let i = 1; i < 8; i++){
                //mouvement haut droite
                if (x > px && y < py) {
                    let possiblePosition = {x: px + i, y: py - i};
                    if (possiblePosition.x > x && possiblePosition.y < y){
                        break
                    }
                    console.log('possiblposition');
                    console.log(possiblePosition);
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x > possiblePosition.x && y < possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    } 
                }
                // mouvement haut gauche 
                if (x < px && y < py) {
                    let possiblePosition = {x: px - i, y: py - i};
                    if (possiblePosition.x < x && possiblePosition.y < y){
                        break
                    }
                    console.log('possiblposition');
                    console.log(possiblePosition);
                    console.log('desiredposition');
                    console.log(x, y);
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x < possiblePosition.x && y < possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    }
                }
                 //mouvement bas droite
                if (x > px && y > py) {
                    let possiblePosition = {x: px + i, y: py + i};
                    if (possiblePosition.x > x && possiblePosition.y > y){
                        break
                    }
                    console.log(x, y);
                    console.log('possiblposition');
                    console.log(possiblePosition);
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x > possiblePosition.x && y > possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    }
                }
                //mouvement bas gauche
                if (x < px && y > py) {
                    let possiblePosition = {x: px - i, y: py + i};
                    if (possiblePosition.x < x && possiblePosition.y > y){
                        break
                    }
                    if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                        if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)){
                            if(x < possiblePosition.x && y > possiblePosition.y) {
                                console.log('illegalmove');
                                return false
                            } else { 
                                return true
                            }
                        //tile is occupied by team member
                        } else {
                            console.log("illegal move");
                            break
                        }
                    } else if (possiblePosition.x === x && possiblePosition.y === y) {
                        return true
                    }
                }
                //mouvement verticale
                if (x === px) {
                    if (y > py) {//bas
                        let possiblePosition = {
                            x: px,
                            y: py + i
                        }
                        if (possiblePosition.y > y) break
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            }
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true
                        }
                    }
                    if (y < py) {//haut
                        let possiblePosition = {
                            x: px,
                            y: py - i
                        }
                        if (possiblePosition.y < y) break
                        console.log(i);
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            }
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true
                        }
                    }
                }
                //mouvement horizontal
                if (y === py) {
                    if (x > px) {
                        let possiblePosition = {
                            x: px + i,
                            y: py
                        }
                        if (possiblePosition.x > x) break
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            } 
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true 
                        }
                    }
                    if (x < px) {
                        let possiblePosition = {
                            x: px - i,
                            y: py
                        }
                        if (possiblePosition.x < x) break
                        if (this.tileIsOccupied(possiblePosition.x, possiblePosition.y, chessboard)){
                            console.log('occupied');
                            if (this.tileIsOccupiedByOpponent(possiblePosition.x, possiblePosition.y, chessboard, team)) {
                                return true
                            } else {
                                return false 
                            } 
                        } else if (possiblePosition.x === x && possiblePosition.y === y) {
                            return true
                        }
                    }
                }
            }
        } else if (type === pieceType.KING) {
            console.log('king');
        }
        return false
    }
}
