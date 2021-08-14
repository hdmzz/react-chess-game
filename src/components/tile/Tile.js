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
                {image && <div className="piece" style={{backgroundImage: `url(${image})`}}></div>} {/* si image non null alors on rend la div avec le background */}
            </div>
        )
    } else {
        return (
            <div className="boxBlack">
                {image && <div className="piece" style={{backgroundImage: `url(${image})`}}></div>}
            </div>
        ) 
    }
}
/* l'image est mise en background d'une div de ce fait on ne peut pas 'prendre' l'image et l'ouvrir dans une autre fenetre par exmple */