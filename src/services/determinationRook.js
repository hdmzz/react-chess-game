//import Referee from "../components/referee/referee";
//const referee = new Referee();
import Pieces from "../components/pieces/pieces";
import Referee from "../components/referee/referee";
import { testClass } from "../components/chessboard/Chessboard";

const referee = new Referee();

export default class Rook extends Pieces {
    determination(piece, n) {
        let rook = []
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
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        for (let i = 1; i < n; i++) {
            let possibleMove = {
                x: piece.x,
                y: piece.y + i
            }
            if (possibleMove.y > 7) break;
            rook.push(possibleMove)
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        for (let i = 1; i < n; i++) {
            let possibleMove = {
                x: piece.x - i,
                y: piece.y
            }
            if (possibleMove.x < 0) break;
            rook.push(possibleMove)
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        for (let i = 1; i < n; i++) {
            let possibleMove = {
                x: piece.x + i,
                y: piece.y
            }
            if (possibleMove.x > 7) break;
            rook.push(possibleMove)
            const isOccupied = referee.tileIsOccupied(possibleMove.x, possibleMove.y, testClass)
            if (isOccupied) break;
        }
        return rook
    }
}
