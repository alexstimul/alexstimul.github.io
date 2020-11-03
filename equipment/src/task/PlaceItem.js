import React from 'react';
import LinkItem from './LinkItem';
import './css/PlaceItem.css';

function PlaceItem(props) {
    const place = props.place;
    return (
        <li id={place.id} className="list-element">
            <LinkItem place={place}/>
        </li>
    )
}

export default PlaceItem;