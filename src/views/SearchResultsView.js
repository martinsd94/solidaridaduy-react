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
		<input className='searchbar'
			   value={value}
			   placeholder='Buscar por nombre...'
			   onChange={(e) => _setValue(e.target.value)}/>	
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
				<div className='initiatives-container'>
					{initiatives.map((init, index) => (
						<Initiative initiative={init} index={index} key={index} />
					))}
				</div>
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

	const { _id, name, category, hood, province, emergency } = initiative;

	// If emergency is true, use associated class
	let emergency_class = '';
	if(emergency) {
		emergency_class = ' emergency';
	}

	return (
		<div className={`initiative-card${emergency_class}`}>
			<div className='info'>
				{ emergency ? <EmergencyBadge /> : null }
				<h4>{name}</h4>
				<p>{`${hood}, ${province}`}</p>
				<Category category={category} />
			</div>
			<Link to={`/initiative/${_id}`}><button>Ver</button></Link>
		</div>
	);
}

const Category = ({ category, emergency_class }) => {
	let { categoryDisplay, icon } = getCategoryDisplay(category);

	return (
		<div className='initiative-category'>
			<p className='icon'>{icon}</p>
			<p className='category'>{categoryDisplay}</p>
		</div>
	)
}

const EmergencyBadge = () => {
	return <div className='emergency-badge'><p></p></div>;
}

/* ------------------ */

export default SearchResultsView;