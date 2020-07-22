import React from 'react';
import { Route } from 'react-router-dom';

import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const PublicRoute = ({ component: Component, ...rest }) => {

	return (
		<Route {...rest}>
			<div className='view-container'>
				<PageHeader />
				<Component />
				<PageFooter />
			</div>
		</Route>
	);
}

export default PublicRoute;