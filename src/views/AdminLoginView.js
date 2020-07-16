import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

/* Components */
import InputField from '../components/InputField';

/* Context hooks */
import { useAuth } from '../context/auth';

import '../main.scss';
import '../styles/admin-login.scss';

const AdminLoginView = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { authTokens, setAuthTokens, 
			setCurrentUser, setCurrentAdmin } = useAuth();

	const [email, setEmail] 	  = useState({ field: '', error: null });
	const [password, setPassword] = useState({ field: '', error: null });

	const setEmailField = (val) => {
		setEmail(Object.assign({}, email, {
			field: val,
			error: null // Reset errors on change
		}));
	}

	const setPasswordField = (val) => {
		setPassword(Object.assign({}, password, {
			field: val,
			error: null // Reset errors on change
		}));
	}

	const setEmailError = (val) => {
		setEmail(Object.assign({}, email, {
			error: val
		}));
	}

	const setPasswordError = (val) => {
		setPassword(Object.assign({}, password, {
			error: val
		}));
	}

	// -----------------------------------------------------------------

	const tryLogin = () => {
		let data = { email: email.field, password: password.field };
		fetch('http://localhost:5000/admin/login', {
			crossDomain: true,
			method: 'post',
			body: JSON.stringify( data ),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(response => response.json()) // Response is a Promise
		.then(data => handleLoginResponse(data));
	}

	const handleLoginResponse = (data) => {
		// Display validation errors
		if (Object.keys(data).indexOf('validation_errors') !== -1) {
			for(let field in data.validation_errors) {
				switch (field) {
					case 'password':
						setPasswordError(data.validation_errors[field]);
						break;
					case 'email':
						setEmailError(data.validation_errors[field]);
						break;
					default:
				}
			}
		}
		else {
			// Log admin in!
			setCurrentAdmin(data.admin);
			setAuthTokens(data.access_token);
			setIsLoggedIn(true);
		}
	}

	// -----------------------------------------------------------------
	if (isLoggedIn) {
		return <Redirect to='/admin' />
	}
	else if (authTokens) {
		return <Redirect to='/admin' />		
	}
	else {
		return (
			<div className='login-jumbotron'>
				<div className='login-wrapper'>
					<h2>Acceso de administradores</h2>
					<InputField value={email.field}
								error={email.error}
								placeholder='Nombre de usuario...'
								type='default'
								_onChange={(val) => setEmailField(val) } />
					
					<InputField value={password.field}
								error={password.error}
								placeholder='Contraseña...'
								type='password'
								_onChange={(val) => setPasswordField(val) } />
		
					<button className='login-button' 
							onClick={() => { tryLogin() }}>Ingresar</button>
					<div className='options'>
						<button className='button-link'>Quiero participar</button>
					</div>
				</div>
			</div>
		)
	}
}

export default AdminLoginView;