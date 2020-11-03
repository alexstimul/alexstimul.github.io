import React from 'react';
import ReactDOM from 'react-dom';
import Inventory from './Inventory';
import AddInventory from './AddInventory';
import './css/LinkItem.css';

function GetAllPlacesId(element) {
    window.allchilds.push(element.id);
    if (element.children) {
        element.children.forEach((child) => {
            GetAllPlacesId(child);
        });
    }
}

class LinkItem extends React.Component {
    constructor(props) {
        super(props);
        this.place = props.place;
        this.state = {empty: true, click: false};
        this.isHasChild = false;
        this.showInventory = this.showInventory.bind(this);
    }

    showInventory () {
        let item = window.map.get(this.place.id);
        let result;
        if (item.hasOwnProperty("children")) {
            this.isHasChild = true;
            window.allchilds = [];
            GetAllPlacesId(item);
            result = window.allchilds;
            result = window.inventory.filter(inventory => window.allchilds.indexOf(inventory.placeId) !== -1);
        }
        else {
            result = window.inventory.filter(inventory => inventory.placeId === this.place.id);
        }

        this.setState(state => ({
            empty: !result.length,
            click: true
        }));

        ReactDOM.render(
            <React.Fragment>
                <Inventory idPlace={this.place.id} inventory={result}  isCanChange={!this.isHasChild} />
                {!this.isHasChild && <div id="change"><AddInventory idPlace={this.place.id} /></div>}
            </React.Fragment>,
            document.getElementById('inventory')
        )
    }

    render() {
        return (
            <a 
                id={this.place.id} 
                href="#"
                onClick={this.showInventory}
                className="link"
            >
                {this.place.data.name} {this.state.click ? this.state.empty ? 'Нет' : 'Да' : ''}   
            </a>
        );
    }
}

export default LinkItem;
