import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InitiativeView = () => {

	let { id } = useParams();
	const [initiative, setInitiative] = useState(null);

	// Fetch initiative data
	useEffect(() => {
		setInitiative({
			id: id,
			name: 'Ateneo Cerro',
			category: 'PUNTO_DONACION',
			hood: 'Cerro',
			city: 'Montevideo'
		});
	})

	if (!!initiative) {
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