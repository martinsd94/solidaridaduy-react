import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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

const App = () => {

	return (
		<Router>
			<PageHeader />
			<Switch>
				<Route exact={true} path="/">
					<HomeView />
				</Route>

				<Route path="/contact">
					<ContactView />
				</Route>

				<Route path="/collaborate">
					<CollaborateView />
				</Route>

				<Route path="/search-results">
					<SearchResultsView />
				</Route>

				<Route path="/initiative/:id">
					<InitiativeView />
				</Route>

				<Route path="/admin/login">
					<AdminLoginView />
				</Route>
			</Switch>
			<PageFooter />
		</Router>
	);
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
				<Link to='/admin/login'>Admin login</Link>
			</div> 
		</footer>
	);
}

export default App;
