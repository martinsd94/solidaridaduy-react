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
import AdminLoginView	 	   from './views/AdminLoginView';
import AdminControlPanelView   from './views/AdminControlPanelView';
import AdminInitiativeListView from './views/AdminInitiativeListView';

/* Other components */
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

/* Styles */
import './main.scss';

//
//

const App = () => {

	// Load existing tokens any exist
	const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  	const [authTokens, setAuthTokens] = useState(existingTokens);
  	const setTokens = (data) => {
  		// Update tokens on local storage
  		localStorage.setItem('tokens', JSON.stringify(data));
  		setAuthTokens(data);
  	}

  	// TODO: Add token EXPIRATION

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
					<PrivateRoute exact={true} path='/admin' component={AdminControlPanelView} />
					<PrivateRoute path='/admin/initiatives'  component={AdminInitiativeListView} />
				</Switch>
				<PageFooter />
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
