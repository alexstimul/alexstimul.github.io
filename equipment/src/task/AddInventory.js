import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './css/Modal.css';
import Inventory from './Inventory';
import GetInventory from './functions/GetInventory';

function AddInventory(props) {
    const idPlace = props.idPlace;
    const [name, setName] = useState(''); 
    const [count, setCount] = useState('');

    function onCreate(options) {
        window.firestore.collection("inventory").doc().set({ 
            name: options.name, 
            count: options.count, 
            place: window.firestore.collection("places").doc(options.idPlace)
        }).then(() => {
            console.log("f" + window.inventory.length); // 1 - 31
            window.firestore.collection("inventory").get().then(response => { 
                window.inventory = response.docs.map(x => ({ 
                        id: x.id, 
                        data: x.data(), 
                        placeId: x.data().place.id 
                }));
                console.log("www" + window.inventory.length); // 2 - 32
            });
            setTimeout(() => {
                console.log("r" + window.inventory.length) // 3 - 32
                ReactDOM.render(
                    <React.Fragment>
                        <Inventory inventory={window.inventory.filter(inventory => inventory.placeId === options.idPlace)} />,
                        <AddInventory idPlace={options.idPlace} />
                    </React.Fragment>,
                    document.getElementById('inventory')
                )
            }, 1000);
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
        //<div className='modal'>
        //    <div className='modal-body'>
        <React.Fragment>
            <h3>Добавить</h3>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={event => setName(event.target.value)} />
                <input value={count} onChange={event => setCount(event.target.value)} />
                <button type='submit'>Добавить</button>
            </form>
        </React.Fragment>

           // </div>
       // </div>
    )
}

export default AddInventory;