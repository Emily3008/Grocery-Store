import { Card, Button} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext.tsx"

export function StoreItem({ id, name, price, photo }) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
    const quantity = getItemQuantity(id)
    return <Card className="h-100"> 
        <Card.Img 
        variant="top" 
        src={photo} 
        height="200px" 
        style={{ objectFit: "contain" }}
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4 ">
                <span className="fs-2">{name}</span>
                <span className="ms-2 text-muted">{price+"Lei"}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
                ) : <div className="d-flex align-items-center flex-column" style={{gap: ".5rem"}}>
                    <div className="d-flex align-items-center justify-content-center" 
                    style={{gap: ".5rem"}}>
                        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                        <div>
                        <span className="fs-3">{quantity}</span> 
                        <img style={{width:"32px", height:"32px"}}src="https://cdn-icons-png.flaticon.com/512/891/891462.png"></img>
                        </div>
                        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                    </div>
                        <Button variant="danger" size="small" onClick={() => removeFromCart(id)}>Remove</Button>
                     </div>}
            </div>
        </Card.Body>
    </Card>
}