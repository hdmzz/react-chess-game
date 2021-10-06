const knight1 = { image: `../../images/knight_w.png`, x: 6, y: 0, type: pieceType.KNIGHT, team: true, name: "Knight" }
const knigth2 = { image: `../../images/knight_b.png`, x: 1, y: 7, type: pieceType.KNIGHT, team: false, name: "Knight" }
const array1 = [knight1, knigth2]
class KnightDetermination{
    determination(knight) {
        console.log(knight);
    }
}
const test = new KnightDetermination()
array1.map(knight => test.determination(knight))
console.log('hello')