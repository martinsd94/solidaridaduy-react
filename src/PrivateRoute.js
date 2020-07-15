import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authTokens } = useAuth();

	// Route is available only when the admin is authenticated

	return (
		<Route
			{...rest}
			render={props =>
				authTokens ? (
					<Component {...props} />
				) : (
					<Redirect to='/admin-login' />
				)
			}
		/>
	);
}

export default PrivateRoute;