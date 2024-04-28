import React from 'react';

const SelectCountry = ({ toggleDropdown }) => {
	return (
		<select
			id="select2"
			className="font-poppins focus:outline-none border-none " onChange={toggleDropdown}>
			<option value="option1" >
				India
			</option>
			{/* <option value="option2">CHINA</option>
			<option value="option3">AMERICA</option> */}
		</select>
	);
};

export default SelectCountry;
