import React from 'react'
import './tile.css'

export default function Tile({ number }) {
    if (number % 2 === 0) {
        return (
            <div className="boxWhite">
                     hello   
            </div>
        )
    } else {
        return (
            <div className="boxBlack">
                     hallo   
            </div>
        ) 
    }
}
