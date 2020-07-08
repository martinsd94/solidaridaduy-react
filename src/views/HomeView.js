import React from 'react';

/* Styles */
import '../main.css';
import '../styles/home.css';

const HomeView = () => {
	return (
		<div className='jumbotron'>
			<h2>Buscar iniciativas solidarias</h2>
			<div className='search-form'>
				<select>
					<option>Montevideo</option>
					<option>Maldonado</option>
					<option>Artigas</option>
					<option>Rocha</option>
				</select>
				<select>
					<option>Buceo</option>
					<option>Piedras Blancas</option>
					<option>Pocitos</option>
				</select>
				<select>
					<option>Canasta</option>
					<option>Olla</option>
					<option>Merendero</option>
				</select> 	
			</div>
		</div>
	)
}

export default HomeView;