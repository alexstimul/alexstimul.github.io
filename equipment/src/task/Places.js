import React from 'react';
import PlaceItem from './PlaceItem';

function Places(props) {
    return(
        <ul>
            { props.places.map(place => {
                return (
                    <React.Fragment key={place.id}>
                        <PlaceItem place={place} />
                        {place.children && <Places places={place.children} />}
                    </React.Fragment>
                )   
            }) }
        </ul>
    );
}

export default Places;