import React from 'react'
import './tile.css'

export default function Tile({number, image, x, y}) {
    if (number % 2 === 0) {
        return (
            <div className="box" style={{backgroundColor: "white"}} data-x={x} data-y={y}>
                {x},{y}
                <div  style={{position: 'absolute'}}></div> 
                {image && <div className="piece" style={{backgroundImage: `url(${image})`}}></div>} {/* si image non null alors on rend la div avec le background */}
            </div>
        )
    } else {
        return (
            <div className="box" style={{backgroundColor: "slateblue"}} data-x={x} data-y={y}>
                {x},{y}
                <div style={{position: 'absolute'}}></div>
                {image && <div className="piece" style={{backgroundImage: `url(${image})`}}></div>}
            </div>
        ) 
    }
}
/* l'image est mise en background d'une de ce fait on ne peut pas 'prendre' l'image et l'ouvrir dans une autre fenetre par exemple */