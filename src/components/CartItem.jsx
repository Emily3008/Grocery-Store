import React from "react"
import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext.tsx"
import {catalog} from "../data/catalog"

// type CartItemProps ={ 
//     id: number
//     quantity: number
// } 

export function CartItem({id, quantity}) {
    const {removeFromCart} = useShoppingCart()
    const item = catalog.find(i => i.id === id)
    if(item == null) return null

    return  (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.photo} style={{width:"125px", height:"75px", objectFit:"contain"}}/>
            <div className="me-auto">
                <div>
                    {item.name}{" "} {quantity > 1 && (<span className="text-muted"
                    style={{fontSize: ".65rem"}}>x{quantity}</span>)}
                </div>
                <div className="text-muted" style={{fontSize:".75rem"}}>
                {item.price}
            </div>
            </div>
            <div>{(item.price * quantity).toFixed(2)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
            
        </Stack>
    )

}