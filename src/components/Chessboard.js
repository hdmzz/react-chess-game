import React from 'react'

export default function Chessboard() {
    const verticalIndex = ["1", "2", "3", "4", "5", "6", "7", "8"]
    const horizontalIndex = ["a", "b", "c", "d", "e", "f", "g", "h"]

    let board = []

    verticalIndex.map(vIndex => {
        horizontalIndex.map(hIndex => {
            const position = [vIndex, hIndex]
            board.push(position)
            console.log(board.indexOf(position));
        })
    })
    return (
        <>
            <div>
                {board && (
                    <div id="chessBoard">
                        {board.map(box => (
                            <div style={{height:"100px",border: "1px black solid"}}> 
                                {box}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}