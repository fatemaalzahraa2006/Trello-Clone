import { createContext, useContext, useState } from 'react'
import mockBoards from '../data/mockBoards'

const BoardsContext = createContext()

export function BoardsProvider({ children }) {
  const [boards, setBoards] = useState(mockBoards)

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardsContext.Provider>
  )
}

export function useBoards() {
  return useContext(BoardsContext)
}