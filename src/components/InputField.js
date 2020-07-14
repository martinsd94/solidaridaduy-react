import React from 'react';
import { ERROR_MESSAGES } from '../helpers/errorMessages'; 

const InputField = ({ error, placeholder, type, value, _onChange }) => {

	let fieldClass = 'valid-field';
	let textClass  = 'error-hidden';

	if (!!error) {
		fieldClass = 'invalid-field';
		textClass = 'error-visible';
	}

	return (
		<React.Fragment>
			<input className={fieldClass}
				   placeholder={placeholder}
				   type={type}
				   value={value} 
				   onChange={ (e) => _onChange(e.target.value) } />
			<p className={textClass}>{ERROR_MESSAGES[error]}</p>
		</React.Fragment>
	)
}

export default InputField;