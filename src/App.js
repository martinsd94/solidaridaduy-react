import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';

/* Context */
import { AuthContext } from './context/auth'; 

/* Views for the router */
import ContactView       from './views/ContactView';
import CollaborateView   from './views/CollaborateView';
import HomeView          from './views/HomeView';
import InitiativeView    from './views/InitiativeView';
import SearchResultsView from './views/SearchResultsView';
import AdminLoginView	 from './views/AdminLoginView';

/* Other components */
import PageHeader from './components/PageHeader';

/* Styles */
import './main.scss';

//
//

/*const resetScroll = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}*/

const App = () => {

	// Load existing tokens any exist
	const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  	const [authTokens, setAuthTokens] = useState(existingTokens);
  	const setTokens = (data) => {
  		// Update tokens on local storage
  		localStorage.setItem('tokens', JSON.stringify(data));
  		setAuthTokens(data);
  	}

	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router>
				<PageHeader />
				<Switch>
					<Route exact={true} path="/"  component={HomeView} />
					<Route path="/contact" 		  component={ContactView} />
					<Route path="/collaborate" 	  component={CollaborateView} />
					<Route path="/search-results" component={SearchResultsView} />
					<Route path="/initiative/:id" component={InitiativeView} />
					<Route path="/admin-login"	  component={AdminLoginView} />
					<PrivateRoute path='/admin'   component={AdminHome} />
				</Switch>
				<PageFooter />
			</Router>
		</AuthContext.Provider>
	);
}

const AdminHome = () => {
	return <div>Hola</div>;
}

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

export default App;
