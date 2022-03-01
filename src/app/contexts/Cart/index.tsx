import React, { useEffect } from 'react'
import { reducer, initialState, CartState } from './reducer'

type CartContext = [CartState, React.Dispatch<any>]
const localStorage = window.localStorage

const localState = localStorage.getItem('state')
const initialStateOrLocal = localState ? JSON.parse(localState) : initialState

export const CartContext = React.createContext<CartContext>([
  initialStateOrLocal,
  () => null,
])

export const CartProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialStateOrLocal)

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  )
}
