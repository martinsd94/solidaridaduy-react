import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InitiativeView = () => {

	let { id } = useParams();
	const [initiative, setInitiative] = useState(null);

	// Fetch initiative data
	useEffect(() => {
		fetch(`http://localhost:5000/initiative/${id}`, {
			crossDomain: true,
			method: 'GET'
		})
			.then(response => response.json())
			.then(data => setInitiative(data));
	}, [])

	if (!!initiative) {
		console.log(initiative);
		return (
			<div>
				<h2>{initiative.title}</h2>
				<p>{initiative.name}</p>
				<p>{initiative.category}</p>
				<p>{initiative.hood}</p>
				<p>{initiative.city}</p>
				<p>{initiative.id}</p>
			</div>
		)
	}
	else {
		return <div>Cargando...</div>
	}
}

export default InitiativeView;