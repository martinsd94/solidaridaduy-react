import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

/* Context */
import { AuthContext } from './context/auth'; 

/* Router */
import AppRoutes from './router/AppRouter';

/* Styles */
import './main.scss';

//
//

const App = () => {

	// Load existing tokens any exist
	const existingTokens = JSON.parse(localStorage.getItem('tokens'));
	const existingAdmin  = JSON.parse(localStorage.getItem('admin'));

	const [authTokens, setAuthTokens] = useState(existingTokens);
	const [currentAdmin, setCurrentAdmin] = useState(existingAdmin);

	const setTokens = (data) => {
		// Update tokens on local storage
		localStorage.setItem('tokens', JSON.stringify(data));
		setAuthTokens(data);
	}

	const setAdmin = (data) => {
    	// Update tokens on local storage
    	localStorage.setItem('admin', JSON.stringify(data));
    	setCurrentAdmin(data);    
	}

	const authHeaders = () => {
		if (authTokens) {
			return {
				authorization: `Bearer ${authTokens}`
			}
		}
		else {
			return {};
		}
	}

	return (
		<AuthContext.Provider value={{ 
										authTokens, 
										setAuthTokens: setTokens,
										authHeaders: authHeaders,
                    					currentAdmin: currentAdmin,
                    					setCurrentAdmin: setAdmin
									}}>
			<Router>
				<AppRoutes />
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
