import React, { useEffect, useState } from 'react';
import { 
	FaSearch,
} from 'react-icons/fa';

import { 
	useLocation,
	Link
} from "react-router-dom";

/* Helpers */
import { getCategoryDisplay } from '../helpers/getCategoryDisplay';

/* Styles */
import '../main.scss';
import '../styles/search-results.scss';


const SearchResultsView = () => {
	const query = new URLSearchParams(useLocation().search);
	const [search, setSearch] = useState(query.get('search'));

	return (
		<React.Fragment>
			<SearchBar value={search}
					   _setValue={(value) => setSearch(value)} />
			<SearchResults />
		</React.Fragment>
	)
}

/* Local components */

const SearchBar = ({ value, _setValue }) => {
	return (
		<div className='search-bar-wrapper'>
			<div className='search-bar-fields'>
				<input value={value}
					   placeholder='Buscar por nombre...'
					   onChange={(e) => _setValue(e.target.value)} />
				
				<button><FaSearch /></button> 

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
			</div>
		</div>
	)
}

const SearchResults = () => {
	const [initiatives, setInitiatives] = useState(null);

	// Fetch initiative data
	useEffect(() => {
		fetch('http://localhost:5000/initiatives/search', {
			crossDomain: true,
			method: 'GET'
		})
			.then(response => response.json())
			.then(data => setInitiatives(data));
	}, []);

	const renderInitiatives = () => {
		// If loaded, render initiatives
		if (!!initiatives) {
			return (
				<React.Fragment>
					{initiatives.map((init, index) => (
						<Initiative initiative={init} index={index} key={index} />
					))}
				</React.Fragment>
			)
		}

		else {
			return <p>Loading...</p>
		}
	}

	return (
		<div className='results-container'>
			<div className='results-inner'>
				{renderInitiatives()}
			</div>
		</div>
	)
}

const Initiative = ({ initiative, index }) => {

	const [show, setShow] = useState(false);
	const { _id, name, category, hood, province, emergency } = initiative;

	// Show after a delay, which changes according to the index.
	// This creates a "cascading effect"
	useEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 100*index);
	}, []);

	// If emergency is true, use associated class
	let emergency_class = '';
	if(emergency) {
		emergency_class = ' emergency';
	}

	if (show) {
		return (
			<div className='initiative-wrapper'>
				<EmergencyBadge emergency={emergency} />
				<h2 className={`initiative-name${emergency_class}`}>
					{name}
				</h2>
				<Category category={category}
						  emergency_class={emergency_class} />
				<p className='initiative-location'>{`${hood}, ${province}`}</p>
				<Link to={`initiative/${_id}`}>
					<button className={`button-default${emergency_class}`}>Ver</button>
				</Link>
			</div>
		);
	}
	else {
		return null;
	}
}

const Category = ({ category, emergency_class }) => {
	let { categoryDisplay, icon } = getCategoryDisplay(category);

	return (
		<div className='initiative-category'>
			<p className={`icon${emergency_class}`}>{icon}</p>
			<p className='category'>{categoryDisplay}</p>
		</div>
	)
}

const EmergencyBadge = ({ emergency }) => {
	if(emergency) {
		return <div className='emergency-badge'><p>!</p></div>;
	}
	else {
		return null;
	}
}

/* ------------------ */

export default SearchResultsView;