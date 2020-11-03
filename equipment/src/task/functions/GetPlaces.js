import ConnectToDB from './ConnectToDB';

export default function GetPlaces() {
    window.firestore.collection("places").get().then(response => { 
        window.places = response.docs.map(x => ({ 
                id: x.id, 
                data: x.data(), 
                parts:  x.data().parts && x.data().parts.map(part => part.id) 
        })); 

        window.map = new Map(window.places.map(item => [item.id, item]));
    });
    console.log(window.places);
}