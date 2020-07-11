import React, { useState } from 'react';
import { 
	FaMapMarkerAlt,
	FaMugHot,
	FaSearch,
	FaShoppingBasket,
	FaTrash
} from 'react-icons/fa';

import {
	GrBasket,
	GrCafeteria,
	GrJava,
	GrLocation,
} from 'react-icons/gr';

import { useLocation } from "react-router-dom";

import '../main.css';
import '../styles/search-results.css';

/* Constants */
import {
	PUNTO_DONACION,
	OLLA,
	MERIENDA,
	CANASTA,
	DISPLAY_PUNTO_DONACION,
	DISPLAY_OLLA,
	DISPLAY_MERIENDA,
	DISPLAY_CANASTA,
} from '../constants';


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
			<div className='results-inner'>
				{dummy_data.initiatives.map((init, index) => (
					<Initiative initiative={init} key={index} />
				))}
			</div>
		</div>
	)
}

const Initiative = ({ initiative }) => {
	const { name, category, hood, city } = initiative;

	return (
		<div className='initiative-wrapper'>
			<h2 className='initiative-name'>{name}</h2>
			<Category category={category} />
			<p className='initiative-location'>{`${hood}, ${city}`}</p>
			<button className='button-default'>Ver</button>
		</div>
	);
}

const Category = ({ category }) => {
	let text = '';
	let icon;
	switch (category) {
		case PUNTO_DONACION:
			text = DISPLAY_PUNTO_DONACION;
			icon = <FaMapMarkerAlt />;
			break;
		case OLLA:
			text = DISPLAY_OLLA;
			icon = <FaTrash />;
			break;
		case MERIENDA:
			text = DISPLAY_MERIENDA;
			icon = <FaMugHot />;
			break;
		case CANASTA:
			text = DISPLAY_CANASTA;
			icon = <FaShoppingBasket />;
			break;
		default:
	}

	return (
		<div className='initiative-category'>
			<p className='icon'>{icon}</p>
			<p className='category'>{text}</p>
		</div>
	)
}

/* ------------------ */

const dummy_data = {
	initiatives: [
		{
			id: 'abcdefgerq123',
			name: 'Ateneo Cerro',
			category: 'PUNTO_DONACION',
			hood: 'Cerro',
			city: 'Montevideo'
		},
		{
			id: 'askqwkeh912n1',
			name: 'Iniciativa Vecinal',
			category: 'PUNTO_DONACION',
			hood: 'La Teja',
			city: 'Montevideo'
		},
		{
			id: 'kqo19tnt63713',
			name: 'La Pascua',
			category: 'PUNTO_DONACION',
			hood: 'Cruz de Carrasco',
			city: 'Montevideo'
		},
		{
			id: '10465yhs26cba',
			name: 'Club de la Alegría',
			category: 'PUNTO_DONACION',
			hood: 'La Teja',
			city: 'Montevideo'
		},
		{
			id: 'mmnk5l274hf18',
			name: 'Bar DALE GAUCHO',
			category: 'OLLA',
			hood: 'La Teja',
			city: 'Montevideo'
		},
		{
			id: 'goy749bg90hy5',
			name: 'Comisión Fomento',
			category: 'MERIENDA',
			hood: 'Los Bulevares',
			city: 'Montevideo'
		},
		{
			id: 'lkgbvnmai4vh3',
			name: 'Escuela Legado Box',
			category: 'CANASTA',
			hood: 'Lagomar',
			city: 'Canelones'
		}
	]
}

export default SearchResultsView;