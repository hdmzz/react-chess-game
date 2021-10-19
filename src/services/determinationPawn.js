import Pieces from "../components/pieces/pieces";
import Referee from "../components/referee/referee";
import { testClass } from "../components/chessboard/Chessboard";
const referee = new Referee();

export default class Pawn extends Pieces {
    determination(piece) {
        const specialRow = (piece.team === true) ? 1 : 6 
        const direction = (piece.team === true) ? 1 : -1
        const attack = this.attackingDetermination(piece, direction)
        attack.forEach(p => {
            console.log(referee.tileIsOccupiedByOpponent(p.x, p.y, testClass, piece.team))
        })
        //comment ajouter les deplcement d'attack si les cases sont occupées par l'opposant
        if (piece.y === specialRow) {
            let possibleMove = [
                {
                    x: piece.x ,
                    y: piece.y + direction
                },
                {
                    x: piece.x,
                    y: piece.y + 2 * direction
                }, 
                {
                    attack: [
                        attack
                    ]
                }
            ]
            return possibleMove
        } else {
            let possibleMove = [
                {
                    x: piece.x ,
                    y: piece.y + direction
                }
            ]   
            return possibleMove
        }
    }
    attackingDetermination(piece, direction) {
        let possibleAttack = (direction === 1) ? 
        [
            {
                x: (piece.x - 1 < 0) ? null : piece.x - 1,
                y: (piece.y + 1 > 7) ? null : piece.y + 1
            },
            {
                x: (piece.x + 1 > 7) ? null : piece.x + 1,
                y: (piece.y + 1 > 7) ? null : piece.y + 1
            }
        ] : [
            {
                x: (piece.x + 1 > 7) ? null : piece.x + 1,
                y: (piece.y - 1 < 0) ? null : piece.y - 1
            },
            {
                x: (piece.x - 1 < 0) ? null : piece.x - 1,
                y: (piece.y - 1 < 0) ? null : piece.y - 1
            }
        ]
        return possibleAttack
    }
}