export default class Pieces {
    constructor(image, x, y, type, team, possiblePosition) {
        this.image = image
        this.x = x
        this.y = y
        this.type = type
        this.team = team
        this.possiblePosition = possiblePosition
    }
}