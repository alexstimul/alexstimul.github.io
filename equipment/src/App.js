import React from 'react';
import Inventory from './task/Inventory';
import Places from './task/Places';
import './task/css/App.css';


function App() {
	function buildTree(items, map) {
		let mapMain = new Map();
		let childs = [];
	
		items.forEach((item) => {
			mapMain.set(item.id, item);
			if (item.parts) {
				item.children = [];
				for (let i = 0; i < item.parts.length; i++) {
					childs.push(item.parts[i]);
					let child = map.get(item.parts[i]);
					item.children.push(child);
				}
			}
		});
		
		childs.forEach((child) => {
			mapMain.delete(child);
		});
	
		let result = [];
	
		mapMain.forEach((el) => {
			result.push(el);
		});
	
		return result;
	}
	const [loading, setLoading] = React.useState(true);
	setTimeout(() => {
		setLoading(false)
	}, 500);

	if (!loading) {
		window.places = buildTree(window.places, window.map);
	}

	return (
		<div className="wrapper">
			{!loading && <div id="places"><Places places={window.places} /></div>}
			{!loading && <div id="inventory"><Inventory inventory={0} /></div>}
		</div>
	);
}

export default App;
