import React from 'react'
import './chessboard.css'

export default function Chessboard() {
    const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"]
    const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]

    let board = []

    verticalIndex.map(vIndex => {
        return(
            horizontalIndex.map(hIndex => {
                const position = [vIndex, hIndex]
                const number = verticalIndex.indexOf(vIndex) + horizontalIndex.indexOf(hIndex) + 2 //on fait la somme des index des indexs vert et horizon pour determiner la couleur des cases
                if (number % 2 === 0 ) {//l'operateur % renvoie le reste donc 1 si impair ou 0 si pair
                    return(board.push(
                        <div key={position} className="boxWhite">
                        </div>
                    ))
                } else {
                    return(
                        board.push(
                        <div key={position} className="boxBlack">
                        </div>
                    ))
                    
                    
                }
                //la somme est pair alors couleur clair et inversement 
                //comme la somme des premiers indexs ets egal à 0 alors il faut ajouter 2 à cette somme et verifier si la somme est divisible par 2 
            })
        )
    }) 
    return (
        <>
            <div className="container">
                {board && (
                    <div id="chessBoard">
                        {board}
                    </div>
                )}
            </div>
        </>
    )
}
