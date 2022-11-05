import React from "react";
import { Offcanvas, OffcanvasBody, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { CartItem } from "./CartItem";
import {catalog} from "../data/catalog.js";


// type ShoppingCartProps = {
//     isOpen: boolean
// }
//:ShoppingCartProps
export function ShoppingCart({isOpen}) {
    const {closeCart, cartItems} = useShoppingCart();
    let sum=0;
    function calc() {
        cartItems.map((item) => {
            
            catalog.map((itx) => {
                if(item.id === itx.id) {
                    sum+=(itx.price*item.quantity);
                }
            })
        })
    }
    return( 
        
    <Offcanvas show={isOpen} onHide={closeCart} palcement="end">
        {
            calc()
        }
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    
                   {cartItems.map(item => ( 
                   <CartItem key={item.id} {...item} />)) }
                   <div className="ms-auto fw-bold fs-5">Total {sum.toFixed(2)}

                   </div>
                </Stack>
            </Offcanvas.Body>
    </Offcanvas>
    )
}