import React from 'react';
import ReactDOM from 'react-dom';
import ChangeInventory from './ChangeInventory';
import AddInventory from './AddInventory';
import './css/Table.css';
import './css/Buttons.css';

function Inventory(props) {
    function changeInventory(event) {
        ReactDOM.render(
            <ChangeInventory idPlace={props.idPlace} id={event.target.id} value={event.target.value} />,
            document.getElementById('change')
        );
    }

    function deleteInventory(event) {
        window.firebase.firestore().collection("inventory").doc(event.target.id).delete().then(() => {
            ReactDOM.render(
                <React.Fragment>
                    <Inventory idPlace={props.idPlace} inventory={props.inventory}  isCanChange={props.isCanChange} />
                    {props.isCanChange && <div id="change"><AddInventory idPlace={props.idPlace} /></div>}
                </React.Fragment>,
                document.getElementById('inventory')
            );
        });        
    }

    if (props.inventory === 0) {
        return(
            <h2>Выберите здание / комнату</h2>
        );
    }
    else if(props.inventory.length === 0) {
        return(
            <h2>Здесь нет оборудования!</h2>
        );
    }
    else {
        return (
            <table className="inventory">
                <thead className="inventory-head">
                    <tr>
                        <td>
                            Наименование
                        </td>
                        <td>
                            Количество
                        </td>
                    </tr>
                </thead>
                <tbody className="inventory-body">
                    {props.inventory.map(inv => {
                        return (
                            props.isCanChange ? 
                            <tr key={inv.id}>
                                <td>
                                    {inv.data.name}
                                </td>
                                <td>
                                    {inv.data.count}
                                </td>
                                <td>
                                    <button 
                                        id={inv.id} 
                                        value={inv.data.name + ";" + inv.data.count} 
                                        onClick={changeInventory}
                                        className="button"    
                                    >
                                        Изменить
                                    </button>
                                </td>
                                <td>
                                    <button
                                        id={inv.id}
                                        onClick={deleteInventory}
                                        className="button button-delete"
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr> :
                            <tr key={inv.id}>
                                <td>
                                    {inv.data.name}
                                </td>
                                <td>
                                    {inv.data.count}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default Inventory;