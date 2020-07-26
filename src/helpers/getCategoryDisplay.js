import React from 'react';
import { 
	FaMapMarkerAlt,
	FaMugHot,
	FaShoppingBasket,
	FaTrash
} from 'react-icons/fa';

export const getCategoryDisplay = (category) => {
	let icon = null;

	switch (category) {
		case 'Punto de Donación':
			icon = <FaMapMarkerAlt />;
			break;
		case 'Olla':
			icon = <FaTrash />;
			break;
		case 'Merienda':
			icon = <FaMugHot />;
			break;
		case 'Canasta':
			icon = <FaShoppingBasket />;
			break;
		default:
	}

	return {
		categoryDisplay: category,
		icon
	};
}
