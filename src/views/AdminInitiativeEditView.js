import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAuth } from '../context/auth';
import { checkStatus } from '../helpers/checkStatus';

import '../main.scss';
import '../styles/admin-initiative-edit.scss';

const AdminInitiativeEditView = () => {

	const { id } = useParams();
	const { setAuthTokens, authHeaders } = useAuth();
	const [initiative, setInitiative] = useState(null);	

	// Fetch initiative data
	useEffect(() => {
		fetch(`http://localhost:5000/admin/initiative/${id}`, {
			crossDomain: true,
			method: 'GET',
			headers: authHeaders()
		})
			.then(response => response.json())
			.then(data => setInitiative(data))
			.catch(err => setAuthTokens(null));
	}, []);

	// ------------------------------------------------------------------

	if(initiative) {
		let { 
			name, 
			category, 
			description,
			hood, 
			province,
			address,
			activities,
			contact_phones,
			emergency,
			geolocation
		} = initiative;
		return(
			<div className='admin-initiative-container'> {/* Maybe use admin-container to be more general? */}
				<h1>Edición de iniciativa</h1>
				<div className='all-forms'>
					
					<div className='form-container'>
						<div className='form-inner'>
							<h3>Información basica</h3>
							<input value={name} />
							<input value={address} />
							<select>
								<option value='PUNTO_DONACION'>Punto de donación</option>
								<option value='CANASTA'>Canasta</option>
								<option value='OLLA' selected>Olla</option>
								<option value='MERIENDA'>Merienda</option>
							</select>
							<input type='checkbox' value={emergency} />
						</div>
					</div>

					<div className='form-container'>
						<div className='form-inner'>
							<h3>Información basica</h3>
							<input value={name} />
							<input value={address} />
							<select>
								<option value='PUNTO_DONACION'>Punto de donación</option>
								<option value='CANASTA'>Canasta</option>
								<option value='OLLA' selected>Olla</option>
								<option value='MERIENDA'>Merienda</option>
							</select>
							<input type='checkbox' value={emergency} />
						</div>
					</div>


				</div>
			</div>
		)
	}
	else {
		return null; // TODO: Show initiative not found
	}
}

export default AdminInitiativeEditView;