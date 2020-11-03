export default function GetInventory() {
    window.firestore.collection("inventory").get().then(response => { 
        window.inventory = response.docs.map(x => ({ 
                id: x.id, 
                data: x.data(), 
                placeId: x.data().place.id 
        }));
    });
}
