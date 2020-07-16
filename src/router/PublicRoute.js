import React from 'react';
import { Route } from 'react-router-dom';

import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const PublicRoute = ({ component: Component, ...rest }) => {

	return (
		<Route {...rest}>
			<PageHeader />
			<Component />
			<PageFooter />
		</Route>
	);
}

export default PublicRoute;