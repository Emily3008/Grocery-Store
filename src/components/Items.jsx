import {Button} from "react-bootstrap"
import {useState, useContext} from "react"
import "./Items.css"


export default function Items({item}) {
    const [status, setStatus] = useState(true);
    return (
        <>
            <h1>{item.name}</h1>
            <p>{item.price}lei/{item.type}</p>
            <p>Country:{item.country}</p>
            <p>{item.description}</p>
            </>
    )
}