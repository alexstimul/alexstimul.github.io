import React from 'react';
import LinkItem from './LinkItem';
//import Context from './context';

function PlaceItem(props) {
    const place = props.place;
    return (
        <li id={place.id}>
            <LinkItem place={place}/>
        </li>
    )
}

export default PlaceItem;