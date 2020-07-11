import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/* Helpers */
import { getCategoryDisplay } from '../helpers/getCategoryDisplay';

/* Styles */
import '../styles/initiative.scss';


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
		let { name, category, hood, city, _id } = initiative;
		let { categoryDisplay, icon } = getCategoryDisplay(category);

		return (
			<div className='initiative-jumbotron-wrapper'>
				<div className='details'>
					<h1 className='name'>{name}</h1>
					<div className='category-wrapper'>
						<p className='icon'>{icon}</p>
						<p className='category'>{categoryDisplay}</p>
					</div>
					<p className='location'>{`${hood}, ${city}`}</p>
				</div>
				<div className='map'></div>
			</div>
		)
	}
	else {
		return <div>Cargando...</div>
	}
}

export default InitiativeView;