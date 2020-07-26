import React, { useEffect, useState } from 'react';
import { 
	FaSearch,
	FaPencilAlt,
	FaTimes
} from 'react-icons/fa';

import { 
	Link
} from "react-router-dom";

/* Context */
import { useAuth } from '../context/auth';

/* Helpers */
//import { getCategoryDisplay } from '../helpers/getCategoryDisplay';

/* Styles */
import '../main.scss';
import '../styles/admin-initiative-list.scss';


const AdminInitiativeListView = () => {
	return (
		<div className='admin-initiatives-container'>
			<SearchBar />
			<InitiativesList />
		</div>	
	)
}

/* Local components */

const SearchBar = () => {
	return (
		<div className='admin-search-bar-wrapper'>
			<input className='search-bar'
				   placeholder='Buscar por nombre...' />
			<p><FaSearch /></p>
		</div>
	)
}

const InitiativesList = () => {
	
	// Verify identity while loading initiatives ------------------------
	const [initiatives, setInitiatives] = useState([]);
	const { setAuthTokens, authHeaders } = useAuth();

	// Fetch initiative data
	useEffect(() => {
		fetch('http://localhost:5000/admin/initiatives', {
			crossDomain: true,
			method: 'GET',
			headers: authHeaders()
		})
			.then(response => response.json())
			.then(data => setInitiatives(data))
			.catch(err => setAuthTokens(null));
	}, [authHeaders, setInitiatives, setAuthTokens]);
	// ------------------------------------------------------------------

	return (
		<div className='admin-initiatives-list'>
			{initiatives.map((init, index) => (
				<Initiative initiative={init} key={index} />
			))}
		</div>
	)
}

const Initiative = ({ initiative }) => {
	const {
		_id,
		name, 
	/*	category, 
		description,
		hood, 
		province,
		address,
		activities,
		contact_phones,
		geolocation*/
	} = initiative;

	return (
		<div className='initiative-edit-display-wrapper'>
			<div className='initiative-edit-display'>
				<p>{name}</p>
				<Link to={`/admin/initiative/${_id}/edit`}><button><FaPencilAlt /></button></Link>
				<Link to='/admin'><button><FaTimes /></button></Link>
			</div>
		</div>
	)
}

export default AdminInitiativeListView;