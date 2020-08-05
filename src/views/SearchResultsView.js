import React, { useEffect, useState } from 'react';

import { 
	FaExclamation,
} from 'react-icons/fa';

import { 
	useLocation,
	Link
} from "react-router-dom";

/* Components */
import LoadingAnimation from '../components/LoadingAnimation';

/* Helpers */
import { getCategoryDisplay } from '../helpers/getCategoryDisplay';
import { filterByName } from '../helpers/filterByName';

/* Styles */
import '../main.scss';
import '../styles/search-results.scss';

/* Data hooks */
import { useData } from '../context/data';

const SearchResultsView = () => {
	const query = new URLSearchParams(useLocation().search);
	const [search,   setSearch]   = useState(query.get('search'));
	const [province, setProvince] = useState(undefined);
	const [hood, 	 setHood]     = useState(undefined);

	return (
		<React.Fragment>
			<SearchBar value={search}
					   hood={hood}
					   province={province}
					   _setValue={(value) => setSearch(value)} />
			<SearchResults search={search} />
		</React.Fragment>
	)
}

/* Local components */

const SearchBar = ({ hood, province, value, _setValue }) => {

	const [options, setOptions] = useState(false);

	return (
		<div className='searchbar'>
			<input value={value}
				   placeholder='Buscar por nombre...'
				   onChange={(e) => _setValue(e.target.value)}/>
			{(options) ? (
				<React.Fragment>
					<div className='advanced-options'>
						<div className='select-wrapper'>
							<label>Departamento</label>
							<select value={province}>
								<option>Ciudad...</option>
								<option></option>
								<option></option>
							</select>
						</div>
						<div className='select-wrapper'>
							<label>Barrio</label>
							<select value={hood}>
								<option>Ciudad...</option>
								<option></option>
								<option></option>
							</select>
						</div>
					</div>
					<button onClick={() => setOptions(false)}>Menos opciones</button>
				</React.Fragment>
			):( 
				<button onClick={() => setOptions(true)}>Opciones avanzadas</button>
			)}
		</div>
	)
}

//

const SearchResults = ({ search }) => {
	const [initiatives, setInitiatives] = useState(null);

	const { data, isDataFetching } = useData();
	const [filteredData, setFilteredData] = useState([]);

	// Fetch initiative data
	useEffect(() => {
		setFilteredData(filterByName(data, search));
		/*fetch('http://localhost:5000/initiatives/search', {
			crossDomain: true,
			method: 'GET'
		})
			.then(response => response.json())
			.then(data => setInitiatives(data));*/
	}, [setFilteredData, data, search]);

	const renderInitiatives = () => {
		if (!isDataFetching) {
			return (
				<div className='results-container'>
					<div className='results-inner'>
						<div className='initiatives-container'>
							{filteredData.slice(0,20).map((init, index) => (
								<Initiative initiative={init} index={index} key={index} />
							))}
						</div>
					</div>
				</div>
			)
		}

		else {
			return <LoadingAnimation />
		}
	}

	return (
		<React.Fragment>
			{renderInitiatives()}
		</React.Fragment>	
	)
}

const Initiative = ({ initiative, index }) => {

	const { _id, name, category, hood, province, emergency } = initiative;

	// If emergency is true, use associated class
	let emergency_class = '';
	if(emergency) {
		emergency_class = ' emergency';
	}

	return (
		<Link to={`/initiative/${_id}`} className={`initiative-card${emergency_class}`}>
			<CategoryIcon category={category} emergency_class={emergency_class} />
			<h4 className='location'>{`${hood},`}<br />{province}</h4>
			<p className='name'>{name}</p>
			{ emergency ? <EmergencyNotice /> : null }
		</Link>
	);
}

const CategoryIcon = ({ category, emergency_class }) => {
	let { icon } = getCategoryDisplay(category);

	return (
		<p className={`icon${emergency_class}`}>{icon}</p>
	)
}

const EmergencyNotice = () => {
	return <p className='emergency-notice'><FaExclamation /></p>;
}

/* ------------------ */

export default SearchResultsView;