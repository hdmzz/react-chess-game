import Referee from "../components/referee/referee";
const referee = new Referee();
const rookPosition = [];

export default class RookDetermination {
    determination(piece) {
        for (let i = 1; i < 8; i++) {
            if (piece.x === 0) {
                if (piece.y === 0) {
                    let possibleMove = {
                        name: piece.name,
                        z: {
                            x0: piece.x,
                            y0: piece.y
                        },
                        a: {
                            x: piece.x +i,
                            y: piece.y
                        },
                        b: {
                            x: piece.x,
                            y: piece.y + i
                        }
                    }
                    rookPosition.push(possibleMove)
                }
            }
        }
    }
}