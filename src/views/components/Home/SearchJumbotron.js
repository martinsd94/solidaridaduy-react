import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

/* Styles */
import '../../../main.css';
import '../../../styles/home.css';

const SearchJumbotron = () => {

	let [search, setSearch] = useState('');

	return (
		<div className='jumbotron-1'>
			<div className='jumbotron-1-inner'>
				<h2>Buscar iniciativas solidarias</h2>

				<div className='search-fields'>
					<SearchBar value={search}
							   _setValue={(value) => setSearch(value)} />

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

/* Local components */

const SearchBar = ({ value, _setValue }) => {
	return (
		<div className='input-wrapper'>
			<input placeholder='Buscar por nombre...'
				   value={value}
				   onChange={(e) => _setValue(e.target.value)}/>
			<Link to={`/search-results?search=${value}`}>
				<button className='search-button'
						disabled={!(value.length > 0)}>
					<FaSearch />
				</button>
			</Link>
		</div>
	)
}

export default SearchJumbotron;