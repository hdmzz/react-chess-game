//import Referee from "../components/referee/referee";
//const referee = new Referee();

//implementer une fonction qui detremine si la piece bouge sinon pas besoin de tout recalculer 
//pour une histoire de performance de l'appli
export default class RookDetermination {
    determination(piece, n) {
        const rook = [piece]
        if (n === undefined){
            n = 8
        }
        for (let i = 1; i < n; i++) {
            let possibleMove = {
                x: piece.x,
                y: piece.y - i
            }
            if (possibleMove.y < 0) break;
            rook.push(possibleMove)
        }
        for (let i = 1; i < n; i++) {
            let possibleMove = {
                x: piece.x,
                y: piece.y + i
            }
            if (possibleMove.y > 7) break;
            rook.push(possibleMove)
        }
        for (let i = 1; i < n; i++) {
            let possibleMove = {
                x: piece.x - i,
                y: piece.y
            }
            if (possibleMove.x < 0) break;
            rook.push(possibleMove)
        }
        for (let i = 1; i < n; i++) {
            let possibleMove = {
                x: piece.x + i,
                y: piece.y
            }
            if (possibleMove.x > 7) break;
            rook.push(possibleMove)
        }
        return rook
    }
}
