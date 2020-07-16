import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

/* Context */
import { useAuth } from '../context/auth';

/* Styles */
import '../main.scss';

const PageHeader = () => {
	return (
		<React.Fragment>
			<header className="main-header">
				<Link to='/'className='home-link'>Solidaridad.uy</Link>
				<NavBar />      
			</header>
		</React.Fragment>
	)
}

const NavBar = () => {
	const { authTokens } = useAuth();

	// TODO: Make menu and display on button click
	return (
		<nav>
			<button className='menu-button'><p><FaBars /></p></button>
			{ 
				(authTokens) ? (
					<div className='menu-dropdown'>
						<Link to='/admin' className='header-link'><p>PANEL DE CONTROL</p></Link>
						<Link to='/admin-logout' className='header-link'><p>CERRAR SESIÓN</p></Link>
			  		</div>
			  	) : (
			  		<div className='menu-dropdown'>
			  			<Link to='/collaborate' className='header-link'><p>¿CÓMO COLABORAR?</p></Link>
						<Link to='/contact'     className='header-link'><p>CONTACTO</p></Link>
			  		</div>
			  	)
			}
		</nav>
	)
}

export default PageHeader;