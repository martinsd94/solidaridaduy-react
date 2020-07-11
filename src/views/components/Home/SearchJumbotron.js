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

					<Link to={`/search-results?search=${search}`}>
						<button className='search-button'>
							<FaSearch />
						</button>
					</Link>	
				</div>
			</div>
		</div>
	)

}

/* Local components */

const SearchBar = ({ value, _setValue }) => {
	return (
		<div className='input-wrapper'>
			<FaSearch />
			<input placeholder='Buscar por nombre...'
				   value={value}
				   onChange={(e) => _setValue(e.target.value)}/>
		</div>
	)
}

export default SearchJumbotron;