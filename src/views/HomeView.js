import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

import { Map, Marker, TileLayer } from "react-leaflet";
//import { Icon } from "leaflet";

/* Styles */
import '../main.scss';
import '../styles/home.scss';

const HomeView = () => {
	return (
		<React.Fragment>
			<SearchJumbotron />
			<CloseInitiativesJumbotron />
		</React.Fragment>
	)
}


/* Local components */

const SearchJumbotron = () => {

	const [search, setSearch] = useState('');

	return (
		<div className='jumbotron-1'>
			<div className='jumbotron-1-inner'>
				<h2>Buscar iniciativas solidarias</h2>

				<div className='search-fields'>
					<SearchBar value={search}
							   _setValue={(value) => setSearch(value)} />

					<select>
						<option>Montevideo</option>
						<option>Maldonado</option>
						<option>Artigas</option>
						<option>Rocha</option>
					</select>
					<select>
						<option>Buceo</option>
						<option>Piedras Blancas</option>
						<option>Pocitos</option>
					</select>
					<select>
						<option>Canasta</option>
						<option>Olla</option>
						<option>Merendero</option>
					</select> 

					<Link to={`/search-results?search=${search}`}>
						<button className='search-button'>
							<FaSearch />
						</button>
					</Link>	
				</div>

				<p>Esta plataforma virtual se construye de forma colaborativa,
				   entre varios colectivos y actores sociales insertos en el territorio que aportan a la difusión
				   y comprensión de todas las iniciativas solidarias.</p>
			</div>
		</div>
	)

}

const SearchBar = ({ value, _setValue }) => {
	return (
		<div className='input-wrapper'>
			<FaSearch />
			<input placeholder='Buscar por nombre...'
				   value={value}
				   onChange={(e) => _setValue(e.target.value)}/>
		</div>
	)
}

//

const CloseInitiativesJumbotron = () => {

	const [homeCoords, setHomeCoords] = useState({ latitude: 0, longitude: 0 });

	navigator.geolocation.getCurrentPosition(function(position) {
		// Success
		setHomeCoords(position.coords);
	}, function(err) {
		// Error
		console.log(err);
	});

	return (
		<div className='jumbotron-2'>
			<h1 className='section-title'>Iniciativas solidarias cerca de ti</h1>
			<MapContainer home={homeCoords} />
		</div>
	)
}

const MapContainer = ({ home, initiatives }) => {
	let { latitude, longitude } = home;

	return (
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
	);
}

export default HomeView;