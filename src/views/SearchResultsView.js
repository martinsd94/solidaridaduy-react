import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  useLocation
} from "react-router-dom";

import '../main.css';
import '../styles/search-results.css';


const SearchResultsView = () => {
	const query = new URLSearchParams(useLocation().search);
	const [search, setSearch] = useState(query.get('search'));

	return (
		<React.Fragment>
			<SearchBar value={search}
					   _setValue={(value) => setSearch(value)} />
			<SearchResults />
		</React.Fragment>
	)
}

/* Local components */

const SearchBar = ({ value, _setValue }) => {
	return (
		<div className='search-bar-wrapper'>
			<div className='search-bar-fields'>
				<input value={value}
					   placeholder='Buscar por nombre...'
					   onChange={(e) => _setValue(e.target.value)} />
				
				<button><FaSearch /></button> 

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

const SearchResults = () => {
	return (
		<div className='results-container'>
			{dummy_data.initiatives.map(({ name, category, hood, city}, index) => (
				<div className='initiative-link-wrapper'>
					<h2 className='initiative-name'>{name}</h2>
					<p className='initiative-category'>{category}</p>
					<p className='initiative-location'>{`${hood}, ${city}`}</p>
				</div>
			))}
		</div>
	)
}

const dummy_data = {
	initiatives: [
		{
			name: 'Ateneo Cerro',
			category: 'PUNTO_DONACION',
			hood: 'Cerro',
			city: 'Montevideo'
		},
		{
			name: 'Iniciativa Vecinal',
			category: 'PUNTO_DONACION',
			hood: 'La Teja',
			city: 'Montevideo'
		},
		{
			name: 'La Pascua',
			category: 'PUNTO_DONACION',
			hood: 'Cruz de Carrasco',
			city: 'Montevideo'
		},
		{
			name: 'Club de la Alegría',
			category: 'PUNTO_DONACION',
			hood: 'La Teja',
			city: 'Montevideo'
		},
		{
			name: 'Bar DALE GAUCHO',
			category: 'OLLA',
			hood: 'La Teja',
			city: 'Montevideo'
		},
		{
			name: 'Comisión Fomento',
			category: 'MERIENDA',
			hood: 'Los Bulevares',
			city: 'Montevideo'
		},
		{
			name: 'Escuela Legado Box',
			category: 'CANASTA',
			hood: 'Lagomar',
			city: 'Canelones'
		}
	]
}

export default SearchResultsView;