import Pieces from "../components/pieces/pieces";
import Referee from "../components/referee/referee";
import { testClass } from "../components/chessboard/Chessboard";
const referee = new Referee();

export default class Pawn extends Pieces {
    determination(piece) {
        console.log(piece);
        const specialRow = (piece.team === true) ? 1 : 6 
        const direction = (piece.team === true) ? 1 : -1
        const attack = this.attackingDetermination(piece, direction)//renvoie un array de 2 position
        // console.log(attack);
        const possibleAttack = attack.reduce((possibleAttack, position) => {
            const isOccupiedByOpponent = referee.tileIsOccupiedByOpponent(position.x, position.y, testClass, piece.team)
            console.log(isOccupiedByOpponent);
            if (isOccupiedByOpponent){
                console.log('true');
                console.log(position);
                possibleAttack.push(position)
            } 
            return possibleAttack
        }, [])
        console.log(...possibleAttack);
        //comment ajouter les deplcement d'attack si les cases sont occupées par l'opposant
        const possibleMove = []
        if (piece.y === specialRow) {
            possibleMove.push(
                {
                    x: piece.x ,
                    y: piece.y + direction
                },
                {
                    x: piece.x,
                    y: piece.y + 2 * direction
                },
                ...possibleAttack
            )
        } else {
            possibleMove.push(
                {
                    x: piece.x ,
                    y: piece.y + direction
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