import React, { useEffect, useState } from 'react';
import { 
	FaSearch,
} from 'react-icons/fa';

import { 
	useLocation,
	Link
} from "react-router-dom";

/* Context */
import { useAuth } from '../context/auth';

/* Helpers */
import { getCategoryDisplay } from '../helpers/getCategoryDisplay';

/* Styles */
import '../main.scss';
import '../styles/search-results.scss';


const AdminInitiativeListView = () => {
	return (
		<InitiativesList />
	)
}

/* Local components */

const InitiativesList = () => {
	const [initiatives, setInitiatives] = useState([]);
	const { authTokens } = useAuth();

	// Fetch initiative data
	useEffect(() => {
		fetch('http://localhost:5000/initiatives/list', {
			crossDomain: true,
			method: 'GET',
			headers: {
				authorization: `Bearer ${authTokens}`
			}
		})
			.then(response => response.json())
			.then(data => setInitiatives(data));
	}, []);

	return (
		<div className='results-container'>
			{initiatives.map((init, index) => (
				<p key={index}>{init.name}</p>
			))}
		</div>
	)
}

export default AdminInitiativeListView;