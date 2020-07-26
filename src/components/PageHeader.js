import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

/* Styles */
import '../main.scss';

const PageHeader = () => {

	const [dropdownVisible, setDropdownVisible] = useState(false);

	const showDropdown = () => {
		setDropdownVisible(true);
	}

	const hideDropdown = () => {
		setDropdownVisible(false);
	}

	return (
		<React.Fragment>
			<header className="main-header">
				<Link to='/'className='home-link'>Solidaridad.uy</Link>
				<nav>
					<div className='menu-widescreen'>
						<Link to='/about' 	    className='header-link'><p>NOSOTROS</p></Link>
						<Link to='/collaborate' className='header-link'><p>¿CÓMO COLABORAR?</p></Link>
						<Link to='/contact'     className='header-link'><p>CONTACTO</p></Link>
			  		</div>

					<button className='menu-button'
							onClick={showDropdown}>
						<p><FaBars /></p>
					</button>
				</nav>
			</header>
			{ dropdownVisible ? (
				<div className='menu-dropdown'>
					<Link to='/about'	    onClick={hideDropdown} className='dropdown-link'><p>NOSOTROS</p></Link>
					<Link to='/collaborate' onClick={hideDropdown} className='dropdown-link'><p>¿CÓMO COLABORAR?</p></Link>
					<Link to='/contact'     onClick={hideDropdown} className='dropdown-link'><p>CONTACTO</p></Link>
					<button className='dropdown-link' onClick={hideDropdown}>
						<p><FaTimes /></p>
					</button>
					<button className='dropdown-dim'
							onClick={() => { setDropdownVisible(false) }}></button>
		  		</div>
		  	) : (
		  		null
		  	) }
		</React.Fragment>
	);
}

export default PageHeader;