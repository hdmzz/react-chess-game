import Pieces from "../components/pieces/pieces"    

export default class Knight extends Pieces {
    constructor(image, x, y, type, team, position) {
        super(image, x, y, type, team, position)
    }
    determination(piece) {
        const knight = []
        for(let i = -1; i < 2 ; i+= 2) {
            let possibleMove = (piece.x + i > 7 || piece.x + i < 0) ? false : (piece.y + 2 * i < 0 || piece.y + 2 * i > 7) ? false : {
                x: piece.x + i,
                y: piece.y + 2 * i,
            }
            knight.push(possibleMove)
        }
        //LeftUp RightBottom========FONCTIONNEOKOKOK
        for(let i = -1; i < 2 ; i+= 2) {
            let possibleMove = (piece.x + 2 * i > 7 || piece.x + 2 *i < 0) ? false : (piece.y + i < 0 || piece.y + i > 7) ? false : {
                x: piece.x + 2 * i,
                y: piece.y + i, 
            }
            knight.push(possibleMove)
        }
        //UpRigth BottomLeft===================okOKOKOKOK
        for(let i = -1; i < 2 ; i += 2) {
            let possibleMove = {
                x: null,
                y: null
            }
            possibleMove.x = piece.x + i
            if (piece.x + i < piece.x) {
                if(piece.y + 2 > 7) {
                    continue
                }
                if (piece.y + 2 >= 0 && piece.y <= 7){
                    possibleMove.y = piece.y + 2
                }
            } else if (piece.x + i > piece.x) {
                if (piece.y - 2 >= 0 && piece.y -2 <= 7){
                    possibleMove.y = piece.y - 2
                } else {
                    continue
                }
            }
            knight.push(possibleMove)
        }
        //RIGHTUP LEFTBOTTOM ///OOOOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKKKKKKKKKKKKKKK
        for(let i = -1; i < 2 ; i += 2) {
            let possibleMove = {
                x: null,
                y: null
            }
            if (piece.x + 2*i > piece.x && piece.x + 2*i <= 7 && piece.x + 2*i >= 0) {//tourne a droite
                if (piece.y - 1 < 0) {
                    continue
                } else {
                    possibleMove.x = piece.x + 2
                    possibleMove.y = piece.y - 1
                }
            }
            if (piece.x + 2*i < piece.x && piece.x + 2*i <= 7 && piece.x + 2*i >= 0) {//tourne a gauche 
                if (piece.y + 1 > 7){
                    continue
                } else {
                    possibleMove.x = piece.x - 2
                    possibleMove.y = piece.y + 1
                }
            }
            knight.push(possibleMove)
        }
        return knight
    }
}