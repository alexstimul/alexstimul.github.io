import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Inventory from './Inventory';
import GetInventory from './functions/GetInventory';
import AddInventory from './AddInventory';

function ChangeInventory(props) {
    const idPlace = props.idPlace;
    
    const [name, setName] = useState(props.value.split(';')[0]); 
    const [count, setCount] = useState(props.value.split(';')[1]);
    
    function addInventory (event) {
        ReactDOM.render(
            <AddInventory idPlace={idPlace} id={event.target.id} value={event.target.value} />,
            document.getElementById('change')
        );
    }

    function Render(id) {
        let res = window.inventory.filter(inventory => inventory.placeId === id);
        ReactDOM.render(
            <React.Fragment>
                <Inventory inventory={res} />
            </React.Fragment>,
            document.getElementById('inventory')
        )
    }

    function onChange(options) {
        window.firebase.firestore().collection("inventory").doc(options.id).set({ 
            name: options.name,
            count: options.count
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
            onChange({
                id: props.id,
                name: name,
                count: count,
                idPlace: idPlace
            })
        }
    }

    return(
        <React.Fragment>
            <button className="button button-add" onClick={addInventory}>
                Добавить
            </button>
            <h3>Изменить</h3>
            <form onSubmit={submitHandler}>
                <input className="input" value={name} onChange={event => setName(event.target.value)} />
                <input className="input" value={count} onChange={event => setCount(event.target.value)} />
                <button type='submit' className="button">Добавить</button>
            </form>
        </React.Fragment>
    )
}

export default ChangeInventory;