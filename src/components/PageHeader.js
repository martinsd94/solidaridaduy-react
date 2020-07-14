import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

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
	// TODO: Make menu and display on button click
	return (
		<nav>
			<button className='menu-button'><p><FaBars /></p></button>

			<Link to='/collaborate' className='header-link'><p>¿CÓMO COLABORAR?</p></Link>
			<Link to='/contact'     className='header-link'><p>CONTACTO</p></Link>
		</nav>
	)
}

export default PageHeader;