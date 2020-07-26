import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

/* Context hooks */
import { useAuth } from '../context/auth';

const AdminLogout = () => {

	const { setAuthTokens, setCurrentAdmin } = useAuth();

	useEffect(() => {
		setCurrentAdmin(null);
		setAuthTokens(null);
	}, [setAuthTokens, setCurrentAdmin]);

	// -----------------------------------------------------------------

	return <Redirect to='/' />
}

export default AdminLogout;