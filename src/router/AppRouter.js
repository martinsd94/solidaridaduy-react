import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

/* Routes */
import PublicRoute  from './PublicRoute';
import PrivateRoute from './PrivateRoute';

/* Views for the router */
import AboutView         from '../views/AboutView';
import ContactView       from '../views/ContactView';
import CollaborateView   from '../views/CollaborateView';
import HomeView          from '../views/HomeView';
import InitiativeView    from '../views/InitiativeView';
import SearchResultsView from '../views/SearchResultsView';
import AdminLoginView	 	   from '../views/AdminLoginView';
import AdminLogout 			   from '../views/AdminLogout';
import AdminControlPanelView   from '../views/AdminControlPanelView';
import AdminInitiativeEditView from '../views/AdminInitiativeEditView';
import AdminInitiativeListView from '../views/AdminInitiativeListView';

const AppRoutes = ({ history }) => {

	return (
		<React.Fragment>
			<Switch>
				<Route exact={true} path="/"  		component={HomeView} />
				<PublicRoute path="/about"          component={AboutView} />
				<PublicRoute path="/contact"        component={ContactView} />
				<PublicRoute path="/collaborate"    component={CollaborateView} />
				<PublicRoute path="/search-results" component={SearchResultsView} />
				<PublicRoute path="/initiative/:id" component={InitiativeView} />
				<PublicRoute path="/admin-login"	component={AdminLoginView} />

				<PrivateRoute exact={true} path='/admin' 		component={AdminControlPanelView} />
				<PrivateRoute path='/admin/initiatives'  		component={AdminInitiativeListView} />
				<PrivateRoute path='/admin/initiative/:id/edit' component={AdminInitiativeEditView} />
				<PrivateRoute path='/admin-logout'		 		component={AdminLogout} />
			</Switch>
		</React.Fragment>
	)
}

export default AppRoutes;