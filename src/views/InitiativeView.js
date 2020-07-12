import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

/* Helpers */
import { getCategoryDisplay } from '../helpers/getCategoryDisplay';

/* Styles */
import '../styles/initiative.scss';


const InitiativeView = (props) => {

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

		// Dummy map default props
		let defaultProps = {
		    center: {
		      lat: -34.878388,
		      lng: -56.250416
		    },
		    zoom: 11
		  };

		return (
			<div className='initiative-jumbotron-wrapper'>
				<div className='details'>
					<h1 className='name'>{name}</h1>
					<div className='info-wrapper'>
						<p className='icon'>{icon}</p>
						<p className='info'>{`${categoryDisplay} - ${hood}, ${city}`}</p>
						<p className='location'></p>
					</div>
				</div>
				<div className='map-wrapper'>
					<Map center={[-34.878388, -56.250416]} zoom={15}>
				    	<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				        		   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
				        <Marker key={0}
						        position={[
						        	-34.878388,
						            -56.250416
						        ]}
						        onClick={() => {}} />
				    </Map>
				</div>
			</div>
		)
	}
	else {
		return <div>Cargando...</div>
	}
}

export default InitiativeView;