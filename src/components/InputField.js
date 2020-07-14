import React, { useState } from 'react';

const InputField = ({ error, placeholder, type, value, _onChange }) => {

	const [fieldClass, setFieldClass] = useState('valid-field');

	if (!!error) {
		setFieldClass('invalid-field');
	}

	return (
		<React.Fragment>
			<input className={fieldClass}
				   placeholder={placeholder}
				   type={type}
				   value={value} 
				   onChange={ (e) => _onChange(e.target.value) } />
			<div className='validation-errors'>Validation error placeholder</div>
		</React.Fragment>
	)
}

export default InputField;