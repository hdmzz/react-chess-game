import React from 'react'

export default function Chessboard() {
    const verticalIndex = [1, 2, 3, 4, 5, 6, 7, 8]
    const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]

    let board = []

    verticalIndex.map(vIndex => {
        horizontalIndex.map(hIndex => {
            board.push(vIndex + hIndex)
            console.log(vIndex, hIndex);
        })
    })
    return (
        <>
            <div id='chessBoard'>
                {board && (
                    <div style={{display: "grid", gridColumn: "repeat(3, 1fr)"}}>
                        {board.map(boardcase => (
                            <div style={{width:"50px", height: "50px", border: "1px black solid"}}> 
                                {boardcase}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
