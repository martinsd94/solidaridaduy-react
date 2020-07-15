import React from 'react';
import { Link } from 'react-router-dom';

const AdminControlPanelView = () => {
	return (
		<div>
			Hola, Franco
			<br />
			<Link to='/admin/initiatives'>Iniciativas</Link>
		</div>
	)
}

export default AdminControlPanelView;