import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth';

import AdminHeader from '../components/AdminHeader';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authTokens } = useAuth();

	return (
		<Route {...rest}>
			{
				(authTokens) ? (
					<React.Fragment>
						<AdminHeader />
						<Component />
					</React.Fragment>
				) : (
					<Redirect to='/admin-login' />
				)
			}
		</Route>
	);
}

export default PrivateRoute;