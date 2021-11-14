import Pieces from "../components/pieces/pieces";
import Referee from "../components/referee/referee";
import { pieces } from "../components/chessboard/Chessboard";
const referee = new Referee();

export default class Pawn extends Pieces {
    determination(piece) {
        if (piece.x === -1 || piece.y === -1) return;
        const specialRow = (piece.team === true) ? 1 : 6 
        const direction = (piece.team === true) ? 1 : -1
        const attack = this.attackingDetermination(piece, direction)//renvoie un array de 2 position
        // console.log(attack);
        const possibleAttack = attack.reduce((possibleAttack, position) => {
            const isOccupiedByOpponent = referee.tileIsOccupiedByOpponent(position.x, position.y, pieces, piece.team)
            if (isOccupiedByOpponent){
                possibleAttack.push(position)
            } 
            return possibleAttack
        }, [])
        //comment ajouter les deplcement d'attack si les cases sont occupées par l'opposant
        const possibleMove = []
        if (piece.y === specialRow) {
            possibleMove.push(
                {
                    x: piece.x,
                    y: piece.y + direction,
                    attack: -1
                },
                {
                    x: piece.x,
                    y: piece.y + 2 * direction,
                    attack: -1
                },
                ...possibleAttack
            )
        } else {
            possibleMove.push(
                {
                    x: piece.x ,
                    y: piece.y + direction,
                    attack: -1
                },
                ...possibleAttack
            )
        }
        return possibleMove
    }
    attackingDetermination(piece, direction) {
        let possibleAttack = (direction === 1) ? 
        [
            {
                x: (piece.x - 1 < 0) ? null : piece.x - 1,
                y: (piece.y + 1 > 7) ? null : piece.y + 1,
                attack: 1
            },
            {
                x: (piece.x + 1 > 7) ? null : piece.x + 1,
                y: (piece.y + 1 > 7) ? null : piece.y + 1,
                attack: 1
            }
        ] : [
            {
                x: (piece.x + 1 > 7) ? null : piece.x + 1,
                y: (piece.y - 1 < 0) ? null : piece.y - 1,
                attack: 1
            },
            {
                x: (piece.x - 1 < 0) ? null : piece.x - 1,
                y: (piece.y - 1 < 0) ? null : piece.y - 1,
                attack: 1
            }
        ]
        return possibleAttack
    }
}