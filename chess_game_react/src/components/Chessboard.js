import React from 'react'

export default function Chessboard() {
    const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"]
    const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]

    let board = []

    verticalIndex.map(vIndex => {
        horizontalIndex.map(hIndex => {
            board.push(vIndex + hIndex)
        })
    })
    return (
        <>
            <div>
                {board && (
                    <div id="chessBoard">
                        {board.map(boardcase => (
                            <div style={{height:"100px",border: "1px black solid"}}> 
                                {boardcase}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
