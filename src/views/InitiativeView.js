import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaHome, FaPhone }  from 'react-icons/fa';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

/* Helpers */
import { getCategoryDisplay } from '../helpers/getCategoryDisplay';

/* Styles */
import '../main.scss';
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
		let { 
			_id, 
			name, 
			category, 
			hood, 
			province,
			address,
			contact_phones,
			geolocation
		} = initiative;

		return (
			<React.Fragment>
				<div className='initiative-jumbotron-wrapper'>
					<Details name={name} category={category} hood={hood} province={province}
							 contact_phones={contact_phones} address={address} />
					<MapContainer geolocation={geolocation} />
				</div>
				<Schedule />
			</React.Fragment>
		)
	}
	else {
		return <div>Cargando...</div>
	}
}

/* Local components */

const Details = ({ name, category, hood, province, address, contact_phones }) => {

	let { categoryDisplay, icon } = getCategoryDisplay(category);

	return (
		<div className='details'>
			<h1 className='name'>{name}</h1>
			<div className='info-wrapper'>
				<h2 className='icon'>{icon}</h2>
				<h2 className='info'>{`${categoryDisplay} - ${hood}, ${province}`}</h2>
			</div>
			<div className='info-wrapper'>
				<p className='icon'><FaHome /></p>
				<p className='info'>{address}</p>
			</div>
			<div className='info-wrapper'>
				<p className='icon'><FaPhone /></p>
				{
					contact_phones.map((phone, index) => (
						<React.Fragment>
							{ (index === 0) ? null : <p className='separator'>-</p> }
							<p className='info'>{phone}</p>
						</React.Fragment>
				 	))
				}
			</div>
			<div className='info-wrapper'>
				<p className='icon'><FaClock /></p>
				<button className='button-link'><p>Ver Horarios</p></button>
			</div>
		</div>
	)
}

//

const MapContainer = ({ geolocation }) => {
	let { latitude, longitude } = geolocation;

	return (
		<div className='map-wrapper'>
			<Map center={[latitude, longitude]} zoom={15}>
		    	<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		        		   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
		        <Marker key={0}
				        position={[
				        	latitude,
				            longitude
				        ]}
				        onClick={() => {}} />
		    </Map>
		</div>
	);
}

//

const Schedule = () => {
	const hours = ['6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

	return (
		<div className='initiative-schedule'>
			<div className='schedule-header'>
				<h2>Hora</h2>
				<h2>Domingo</h2>
				<h2>Lunes</h2>
				<h2>Martes</h2>
				<h2>Miércoles</h2>
				<h2>Jueves</h2>
				<h2>Viernes</h2>
				<h2>Sábado</h2>
			</div>
			<div className='schedule-hours'>
				{ 
					hours.map((hour, index) => (
						<div className='hour' key={index}>
							<p>{hour}</p>
							<div className='v-line'></div>
							<div className='v-line'></div>
							<div className='v-line'></div>
							<div className='v-line'></div>
							<div className='v-line'></div>
							<div className='v-line'></div>
							<div className='v-line'></div>
						</div>		
					))
				}
			</div>
		</div> 
	)
}

export default InitiativeView;