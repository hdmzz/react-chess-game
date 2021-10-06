import Referee from "../components/referee/referee";
const referee = new Referee();
const rookPosition = [];

export default class RookDetermination {
    determination(piece, chessboard) {
        let Rook = [piece]
    console.log(piece);
        for (let i = 1; i < 8; i++) {
            let possibleMove = {
                x: piece.x,
                y: piece.y - i
            }
            if (possibleMove.y < 0) break;
            Rook.push(possibleMove)
        }
        for (let i = 1; i < 8; i++) {
            let possibleMove = {
                x: piece.x,
                y: piece.y + i
            }
            if (possibleMove.y > 7) break;
            Rook.push(possibleMove)
        }
        for (let i = 1; i < 8; i++) {
            let possibleMove = {
                x: piece.x - i,
                y: piece.y
            }
            if (possibleMove.x < 0) break;
            Rook.push(possibleMove)
        }
        for (let i = 1; i < 8; i++) {
            let possibleMove = {
                x: piece.x + i,
                y: piece.y
            }
            if (possibleMove.x > 7) break;
            Rook.push(possibleMove)
        }
        console.log(Rook);
    }
}
