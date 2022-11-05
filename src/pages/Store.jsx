import { catalog } from "../data/catalog";
import { Row, Col, Button, Dropdown } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useState, createContext } from "react";
import Items from "../components/Items";

export function Store() {
    function getArr() {
        let aux = catalog;
        return aux;
    }
    const [arr, setArr] = useState(getArr().concat());
    const [show, setShow] = useState(null);
    let arr2 = catalog.concat();
    const [check, setCheck] = useState(0);
    let cates = [];
    const types = new Set();
    function findTypes() {
        let last = types.size;
        let aux = [];
        cates.push("All");
        catalog.map((item) => {
            types.add(item.category);
            if (last != types.size) {
                cates.push(item.category);
            }
            last = types.size;
        });
    }

    function setCateg(t) {
        if(t==="All") {
            return arr2.concat();
        }
        let aux = [];

        arr2.map((item)=>{if(item.category === t) {
            aux.push(item);
        }})
        return aux;
    }

    
    function desc(item) {
        console.log(item);
        return <Items item={item} />
        
    }

    return <>
    {findTypes()
    }
    {
        show != null ?  <div className="item-show"><Items item={show}/>
        <Button onClick={() => {setShow(null)}}>Close</Button></div> : <></>
    }
    
        <h1>Store</h1>
        {
            check === 0 ?
                <div>
                    <p>Current None</p>
                    <Button onClick={() => { setArr(arr.sort((a, b) => a.price - b.price)); setCheck(2); }}>Low to High</Button>
                    <Button onClick={() => { setArr(arr.sort((a, b) => b.price - a.price)); setCheck(1); }}>High to Low</Button>
                </div> :
                check === 1 ?
                    <div>
                        <p>Current High to Low</p>
                        <Button onClick={() => { setArr(arr.sort((a, b) => a.price - b.price)); setCheck(2); }}>Low to High</Button>
                        <Button onClick={() => { setArr(arr.sort((a, b) => a.id - b.id)); setCheck(0); }}>Reset</Button> </div>
                    :
                    <div>
                        <p>Current Low to High</p>
                        <Button onClick={() => { setArr(arr.sort((a, b) => b.price - a.price)); setCheck(1); }}>High to Low</Button>
                        <Button onClick={() => { setArr(getArr()); setCheck(0); }}>Reset</Button> </div>


        }

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Category
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {
                    cates.map((type) => <Dropdown.Item onClick={() => { setArr(setCateg(type).concat()); }}>{type}</Dropdown.Item>)
                }

            </Dropdown.Menu>
        </Dropdown>
        <Row md={2} xs={1} lg={3} className="g-3">
            {arr.map(item => (
                <Col onClick={() => { setShow(item); }} key={item.id}>
                    <StoreItem {...item} />
                </Col>
            ))}

        </Row>
    </>
}