import React, { useContext, useState } from 'react'

const PositionContext = React.createContext()

export function usePosition() {
    return useContext(PositionContext)
}
export function PiecePositionProvider({ children }) {

    return (
        <PositionContext.Provider>
            {children}
        </PositionContext.Provider>
    )
}
