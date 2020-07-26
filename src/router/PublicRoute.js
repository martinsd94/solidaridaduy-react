import React from 'react';
import { Route } from 'react-router-dom';

import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

const PublicRoute = ({ component: Component, ...rest }) => {

	return (
		<Route {...rest}>
			<React.Fragment>
				<PageHeader />
				<div className='view-container'>				
					<Component />
				</div>
				<PageFooter />
			</React.Fragment>
		</Route>
	);
}

export default PublicRoute;