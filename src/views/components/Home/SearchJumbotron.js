import React from 'react';
import { FaSearch } from 'react-icons/fa';

/* Styles */
import '../../../main.css';
import '../../../styles/home.css';

const SearchJumbotron = () => {
	return (
		<div className='jumbotron-1'>
			<div className='jumbotron-1-inner'>
				<h2>Buscar iniciativas solidarias</h2>

				<div className='search-fields'>
					<div className='input-wrapper'>
						<FaSearch />
						<input placeholder='Buscar por nombre...' />
					</div>

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
		</div>
	)
}

export default SearchJumbotron;