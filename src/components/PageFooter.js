import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import '../main.scss';

const PageFooter = () => {
	return (
		<footer className='main-footer'>
			<div className='social-links'>
				<a href='https://www.facebook.com/solidaridadUY/'><FaFacebook /></a>
				<a href='https://www.instagram.com/solidaridadUY/'><FaInstagram /></a>
				<a href='https://twitter.com/SolidaridadUY'><FaTwitter /></a>
			</div>
			<div className='info'>
				<p>Facultad de Ingeniería, 2020</p>
				<Link to='/admin-login'>Admin login</Link>
			</div> 
		</footer>
	);
}

export default PageFooter;