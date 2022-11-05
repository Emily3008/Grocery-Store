import { useContext, createContext, ReactNode, useState } from "react";
import React from "react"
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => any,
    closeCart: () => any,
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => any,
    decreaseCartQuantity: (id: number) => any,
    removeFromCart: (id: number) => any,
    cartQuantity: number,
    cartItems: CartItem[]
}
// as ShoppingCartContext
const ShoppingCartContext = createContext({} as  ShoppingCartContext )

export  const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}

export const  ShoppingCartProvider=({ children }: ShoppingCartProviderProps)=> {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {
                return currItems.map((item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                }))
            }
        })


    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map((item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                }))
            }
        })
    }

    function removeFromCart(id:number ) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }


    return (<ShoppingCartContext.Provider value={{
         getItemQuantity, 
         increaseCartQuantity, 
         decreaseCartQuantity,
          removeFromCart,
          openCart, closeCart,
          cartItems,
          cartQuantity}}>
        {children}
        <ShoppingCart  isOpen={isOpen}/>
    </ShoppingCartContext.Provider>)
}

