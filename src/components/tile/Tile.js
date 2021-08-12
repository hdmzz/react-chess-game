import React from 'react'
import './tile.css'

export default function Tile({ number, image, j, i}) {
    /* let image = ""; 
    if (jIndex === 6) {
        image = "images/pawn_b.png"
    }
    if (jIndex === 1) {
        image = "images/pawn_w.png"
    } */
    if (number % 2 === 0) {
        return (
            <div className="boxWhite">
                <img src={image}/>
            </div>
        )
    } else {
        return (
            <div className="boxBlack">
                <img src={image}/>
            </div>
        ) 
    }
}
