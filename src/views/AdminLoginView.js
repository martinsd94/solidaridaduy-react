import React, { useEffect, useState } from 'react';

/* Components */
import InputField from '../components/InputField';

import '../main.scss';
import '../styles/admin-login.scss';

const AdminLoginView = () => {

	const [email,    setEmail] 	  = useState({ field: '', error: null });
	const [password, setPassword] = useState({ field: '', error: null });

	const setEmailField = (val) => {
		setEmail(Object.assign({}, email, {
			field: val
		}));
	}

	const setPasswordField = (val) => {
		setPassword(Object.assign({}, password, {
			field: val
		}));
	}

	const setEmailError = (val) => {
		// TODO: Solve this infinite loop...
		/*setEmail(Object.assign({}, email, {
			error: val
		}));*/
	}

	const setPasswordError = (val) => {
		/*setPassword(Object.assign({}, password, {
			error: val
		}));*/
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
		if (Object.keys(data).indexOf('validation_errors') !== -1) {
			for(let field in data.validation_errors) {
				switch (field) {
					case 'password':
						setPasswordError(data.validation_errors[field]);
						break;
					case 'email':
						setEmailField(data.validation_errors[field]);
						break;
					default:
				}
			}
		}
		else {
			// TODO: Log admin in!
			console.log('No hay errores');
		}
	}

	/*useEffect(() => {
		let element = document.getElementById('password');
		element.onpaste = function(e) {
			e.preventDefault();
		}
	}, []);*/

	// -----------------------------------------------------------------

	return (
		<div className='login-jumbotron'>
			<div className='login-wrapper'>
				<h2>Acceso de administradores</h2>
				<InputField value={email.field}
							error={email.error}
							placeholder='Nombre de usuario...'
							type='default'
							_onChange={(val) => { setEmailField(val) }} />
				
				<InputField value={password.field}
							error={password.error}
							placeholder='Contraseña...'
							type='password'
							_onChange={(val) => { setPasswordField(val) }} />
	
				<button className='login-button' onClick={tryLogin}>Ingresar</button>
				<div className='options'>
					<button className='button-link'>Quiero participar</button>
				</div>
			</div>
		</div>
	)
}

export default AdminLoginView;