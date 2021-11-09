import Pieces from "../components/pieces/pieces";
import { testClass } from "../components/chessboard/Chessboard";
import Referee from "../components/referee/referee";
const referee = new Referee();

export default class Bishop extends Pieces {
    determination(piece, n) {
        if (n === undefined){
            n = 8
        }
        const bishop = [];
        for (let i = 1; i < n; i++) {//mouvement haut droite
            if (piece.x + i > 7 || piece.y - i < 0) break;
            let possibleMove =
            {
                x: piece.x + i,
                y: piece.y - i,
                attack: 1
            }
            bishop.push(possibleMove)
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        for (let i = 1; i < n; i++) { //Bas Gauche
            if (piece.x - i < 0 || piece.y + i > 7) break;
            let possibleMove =
            {
                x: piece.x - i,
                y: piece.y + i,
                attack: 1
            }
            bishop.push(possibleMove)
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        for (let i = 1; i < n; i++) {//Haut Gauche
            if (piece.x - i < 0 || piece.y - i < 0) break;
            let possibleMove =
            {
                x: piece.x - i,
                y: piece.y - i,
                attack: 1
            }
            bishop.push(possibleMove)
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        for (let i = 1; i < n; i++) { //Bas Droite
            if (piece.x + i > 7 || piece.y + i > 7) break;
            let possibleMove =
            {
                x: piece.x + i,
                y: piece.y + i,
                attack: 1
            }
            bishop.push(possibleMove)
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        return bishop
    }
}