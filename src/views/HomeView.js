import React from 'react';
import { FaSearch } from 'react-icons/fa';

import SearchJumbotron 	   from './components/Home/SearchJumbotron';
import HighlightsJumbotron from './components/Home/HighlightsJumbotron';

const HomeView = () => {
	return (
		<React.Fragment>
			<SearchJumbotron />
			<HighlightsJumbotron />
		</React.Fragment>
	)
}

export default HomeView;