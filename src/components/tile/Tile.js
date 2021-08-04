import React from 'react'
import './tile.css'

export default function Tile({ number, iIndex,jIndex }) {
    if (number % 2 === 0) {
        return (
            <div className="boxWhite">
                <img src="images/pawn_b.png"/>
            </div>
        )
    } else {
        return (
            <div className="boxBlack">
                {number}, {iIndex}, {jIndex}  
            </div>
        ) 
    }
}
