import React from 'react';
import { FaBars } from 'react-icons/fa';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


/* Views for the router */
import AboutView         from './views/AboutView';
import ContactView       from './views/ContactView';
import CollaborateView   from './views/CollaborateView';
import HomeView          from './views/HomeView';
import InitiativeView    from './views/InitiativeView';
import JobBoardView      from './views/JobBoardView';
import JoinUsView        from './views/JoinUsView';
import SearchResultsView from './views/SearchResultsView';


/* Styles */
import './main.scss';

const Header = () => {
	return (
		<header className="main-header">
			<Link to='/'className='home-link'>Solidaridad.uy</Link>
			<NavBar />      
		</header>
	)
}

const NavBar = () => {
	// TODO: Make menu and display on button click
	return (
		<nav>
			<button className='menu-button'><p><FaBars /></p></button>

			<Link to='/job-board'   className='header-link'>BOLSA DE TRABAJO</Link>
			<Link to='/collaborate' className='header-link'>¿CÓMO COLABORAR?</Link>
			<Link to='/join-us'     className='header-link'>UNITE A LOS EQUIPOS</Link>
			<Link to='/about'       className='header-link'>¿QUIÉNES SOMOS?</Link>
			<Link to='/contact'     className='header-link'>CONTACTO</Link>
		</nav>
	)
}

//
//

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact={true} path="/">
					<HomeView />
				</Route>

				<Route path="/about">
					<AboutView />
				</Route>

				<Route path="/contact">
					<ContactView />
				</Route>

				<Route path="/collaborate">
					<CollaborateView />
				</Route>

				<Route path="/job-board">
					<JobBoardView />
				</Route>

				<Route path="/join-us">
					<JoinUsView />
				</Route>

				<Route path="/search-results">
					<SearchResultsView />
				</Route>

				<Route path="/initiative/:id">
					<InitiativeView />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
