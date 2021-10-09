export default class BishopDetermination {
    determination(piece, n) {
        if (n === undefined){
            n = 8
        }
        const bishop = [piece];
        for (let i = 1; i < n; i++) {//mouvement haut droite
            if (piece.x + i > 7 || piece.y - i < 0) break;
            let possibleMove =
            {
                x: piece.x + i,
                y: piece.y - i
            }
            bishop.push(possibleMove)
        }
        for (let i = 1; i < n; i++) { //Bas Gauche
            if (piece.x - i < 0 || piece.y + i > 7) break;
            let possibleMove =
            {
                x: piece.x - i,
                y: piece.y + i
            }
            bishop.push(possibleMove)
        }
        for (let i = 1; i < n; i++) {//Haut Gauche
            if (piece.x - i < 0 || piece.y - i < 0) break;
            let possibleMove =
            {
                x: piece.x - i,
                y: piece.y - i
            }
            bishop.push(possibleMove)
        }
        for (let i = 1; i < n; i++) { //Bas Droite
            if (piece.x + i > 7 || piece.y + i > 7) break;
            let possibleMove =
            {
                x: piece.x + i,
                y: piece.y + i
            }
            bishop.push(possibleMove)
        }
        return bishop
    }
}