import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaHome, FaPhone, FaMapMarkedAlt }  from 'react-icons/fa';
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
			activities,
			contact_phones,
			geolocation
		} = initiative;

		return (
			<React.Fragment>
				<div className='initiative-jumbotron-wrapper'>
					<Details name={name} category={category} hood={hood} province={province}
							 contact_phones={contact_phones} address={address} />
				</div>
				<MapContainer geolocation={geolocation} />
				<Schedule activities={activities} />
				<div className='aligner'></div>
			</React.Fragment>
		)
	}
	else {
		return <div>Cargando...</div>
	}
}

/* Local components */

const Details = ({ name, category, hood, province, address, contact_phones }) => {

	const { categoryDisplay, icon } = getCategoryDisplay(category);

	const scrollToSchedule = () => {
		//const e = document.querySelector('.initiative-schedule');
		const e = document.getElementById('schedule-title');
		e.scrollIntoView({ behavior: 'smooth' });
	}

	const scrollToMap = () => {
		const e = document.getElementById('map-title');
		e.scrollIntoView({ behavior: 'smooth' });
	}

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
				<p className='icon'><FaMapMarkedAlt /></p>
				<button className='button-link'
						onClick={() => scrollToMap()}><p>Ver ubiación</p></button>
			</div>
			<div className='info-wrapper'>
				<p className='icon'><FaClock /></p>
				<button className='button-link'
						onClick={() => scrollToSchedule()}><p>Ver horarios</p></button>
			</div>
		</div>
	)
}

//

const MapContainer = ({ geolocation }) => {
	let { latitude, longitude } = geolocation;

	return (
		<React.Fragment>
			<h1 className='section-title' id='map-title'>Ubicación</h1>
			<div className='map-wrapper'>
				<Map center={[latitude, longitude]} zoom={15} scrollWheelZoom={false}>
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
		</React.Fragment>
	);
}

//

const START_HOUR = 6;
const END_HOUR = 23;
const TOTAL_TIME = END_HOUR-START_HOUR+1;

const HOURS = ['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];

const Schedule = ({ activities }) => {

	let { sun, mon, tue, wed, thu, fri, sat} = activities;

	return (
		<React.Fragment>
			<h1 className='section-title' id='schedule-title'>Horarios</h1>
			<div className='initiative-schedule'>
				<div className='schedule-header'>
					<h3>Hora</h3>
					{ HOURS.map((hour, j) => ( <div className='hour' key={j}>{hour}</div> ))}
				</div>

				<DaySchedule day='Domingo'   activities={sun} />
				<DaySchedule day='Lunes'     activities={mon} />
				<DaySchedule day='Martes'    activities={tue} />
				<DaySchedule day='Miércoles' activities={wed} />
				<DaySchedule day='Jueves'    activities={thu} />
				<DaySchedule day='Viernes'   activities={fri} />
				<DaySchedule day='Sábado'    activities={sat} />
			</div> 
		</React.Fragment>
	)
}

const DaySchedule = ({ day, activities }) => {

	const toHourFormat = (hour_float) => {
		let hour = Math.floor(hour_float);
		let minutes = `${Math.floor((hour_float - hour)*60)}`;
		if(hour.length == 1) { hour = `0${hour}` }
		if(minutes.length == 1) { minutes = `0${minutes}` };

		return (`${hour}:${minutes}`)
	} 

	return (
		<div className='day-schedule-wrapper'>
			<h2>{day}</h2>
			<div className='day-schedule'>
				<div className='hours'>
					{ HOURS.map((hour, j) => ( <div className='hour' key={j}></div> ))}
				</div>
				<div className='activities'>
					{ 
						activities.map((activity, index) => {
							const { start, duration, description } = activity;
							const left = `calc(${(start-START_HOUR)/TOTAL_TIME*100}% + 2px)`;
							const width = `calc(${duration/TOTAL_TIME*100}% - 4px)`;
							return (
								<div className='activity' key={index} style={{ left: left, width: width }}>
									<div className='activity-body'></div>
									<div className='activity-info'>
										<div className='body'>
											<p>{description}</p>
											<br />
											<p>{toHourFormat(start)} - {toHourFormat(start+duration)}</p>
										</div>
										<div className='triangle'></div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default InitiativeView;