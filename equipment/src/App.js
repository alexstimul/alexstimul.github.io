import React from 'react';
import Inventory from './task/Inventory';
import Places from './task/Places';
import './task/css/App.css';
import './task/css/Buttons.css';
import buildTree from './task/functions/Tree';
import Modal from './task/Modal/Modal';


function App() {
	const [loading, setLoading] = React.useState(true);
	setTimeout(() => {
		setLoading(false)
	}, 1000);

	if (!loading) {
		window.places = buildTree(window.places, window.map);
	}

	return (
		<React.Fragment>
			<Modal />
			<div className="wrapper">
				{!loading && <div id="places"><Places places={window.places} /></div>}
				{!loading && <div id="inventory"><Inventory inventory={0} /></div>}
			</div>
		</React.Fragment>
		
	);
}

export default App;
