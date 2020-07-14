import React from 'react';
import { 
	FaMapMarkerAlt,
	FaMugHot,
	FaShoppingBasket,
	FaTrash
} from 'react-icons/fa';

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



export const getCategoryDisplay = (category_const) => {
	let text = '';
	let icon = null;

	switch (category_const) {
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

	return {
		categoryDisplay: text,
		icon
	};
}
