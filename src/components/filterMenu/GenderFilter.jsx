import { useState } from 'react';
import Image from 'next/image';

const GenderFilter = ({ setSelectedFilters }) => {
	const [selectedGender, setSelectedGender] = useState('');

	const handleGenderSelect = (gender) => {
		setSelectedGender(gender);
		setSelectedFilters({ gender }); // Communicate the selected gender to the parent component
		console.log(`Selected gender: ${gender}`);
	};

	return (
		
			<div className="flex flex-col items-start justify-start w-full gap-2">
				<div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm">
					<h4 className="font-bold mb-2">Gender</h4>
					<div className="flex gap-4">
						<button
							className={`border rounded-full px-4 py-2 ${
								selectedGender === 'female' ? 'bg-gray-700 text-white' : ''
							}`}
							onClick={() => handleGenderSelect('female')}>
							Female
						</button>
						<button
							className={`border rounded-full px-4 py-2 ${
								selectedGender === 'male' ? 'bg-gray-700 text-white' : ''
							}`}
							onClick={() => handleGenderSelect('male')}>
							Male
						</button>
					</div>
				</div>
			</div>
		
	);
};

export default GenderFilter;
