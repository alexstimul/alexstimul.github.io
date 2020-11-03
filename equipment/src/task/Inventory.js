import React from 'react';

function Inventory(props) {
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
            <table>
                <thead>
                    <tr>
                        <td>
                            Наименование
                        </td>
                        <td>
                            Количество
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {props.inventory.map(inv => {
                        return (
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