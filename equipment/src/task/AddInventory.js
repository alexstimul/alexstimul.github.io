import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Inventory from './Inventory';
import GetInventory from './functions/GetInventory';
import './css/Buttons.css';
import './css/Form.css';

function AddInventory(props) {
    const idPlace = props.idPlace;
    const [name, setName] = useState(''); 
    const [count, setCount] = useState('');
    
    function Render(id) {
        let res = window.inventory.filter(inventory => inventory.placeId === id);
        ReactDOM.render(
            <React.Fragment>
                <Inventory inventory={res} />
                <div id="change"><AddInventory idPlace={id} /></div>
            </React.Fragment>,
            document.getElementById('inventory')
        )
        setName('');
        setCount  ('');
    }

    function onCreate(options) {
        window.firestore.collection("inventory").doc().set({ 
            name: options.name, 
            count: options.count, 
            place: window.firestore.collection("places").doc(options.idPlace)
        }).then(() => {
            GetInventory();
            setTimeout(() => { 
                Render(options.idPlace);
            }, 500);

        });        
    }

    function submitHandler(event) {
        event.preventDefault(); 

        if (name.trim() && count.trim()) {
            onCreate({
                name: name,
                count: count,
                idPlace: idPlace
            })
        }
    }

    return (
        <React.Fragment>
            <h3>Добавить</h3>
            <form onSubmit={submitHandler}>
                <input className="input" value={name} onChange={event => setName(event.target.value)} />
                <input className="input" value={count} onChange={event => setCount(event.target.value)} />
                <button type='submit' className="button">Добавить</button>
            </form>
        </React.Fragment>
    )
}

export default AddInventory;