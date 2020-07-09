import React from 'react';

/* Styles */
import '../../../main.css';
import '../../../styles/home.css';

const HighlightsJumbotron = () => {
	return (
		<div className='jumbotron-2'>
			<h2>Iniciativas solidarias cerca de ti</h2>

			<div className='initiatives'>
				<div className='initiative-link-wrapper'>
					<h2 className='initiative-name'>Ateneo Cerro</h2>
					<p className='initiative-category'>Punto de Donación</p>
					<p className='initiative-location'>Cerro, Montevideo</p>
				</div>

				<div className='initiative-link-wrapper'>
					<h2 className='initiative-name'>Iniciativa Vecinal</h2>
					<p className='initiative-category'>Punto de Donación</p>
					<p className='initiative-location'>La Teja, Montevideo</p>
				</div>

				<div className='initiative-link-wrapper'>
					<h2 className='initiative-name'>La Pascua</h2>
					<p className='initiative-category'>Punto de Donación</p>
					<p className='initiative-location'>Cruz de Carrasco, Montevideo</p>
				</div>
			</div>
		</div>
	)
}

export default HighlightsJumbotron;