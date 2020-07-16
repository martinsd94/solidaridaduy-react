import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/auth';
import { checkStatus } from '../helpers/checkStatus';

import '../main.scss';
import '../styles/admin-control-panel.scss';

const AdminControlPanelView = () => {

	const { setAuthTokens, authHeaders } = useAuth();
	
	useEffect(() => {
		fetch('http://localhost:5000/admin/verify', {
					crossDomain: true,
					method: 'GET',
					headers: authHeaders()
			})	
			.then(checkStatus)
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				setAuthTokens(null);
			})
	})

	return (
		<div className='panel-container'>
			<div className='panel-wrapper'>
				<Link to='/admin/initiatives'>
					<button className='button-default'>Administrar Iniciativas</button>
					<button className='button-default'>Otras opciones</button>
				</Link>
			</div>
		</div>
	)
}

export default AdminControlPanelView;