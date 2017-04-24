import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './index.css';


/*function tick() {
	let element = (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}</h2>
		</div>
	);
	render(
		element,
		document.getElementById('root')
	);
}

setInterval(tick, 1000);*/



render(
	<App />,
	document.getElementById('root')
)