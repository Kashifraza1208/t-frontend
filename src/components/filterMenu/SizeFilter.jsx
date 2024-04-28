import { useState } from 'react';
import Image from 'next/image';

const PriceFilter = ({ setSelectedFilters }) => {
	const [selectedSize, setSelectedSize] = useState('0-5');
	const [filterMenuOpen, setFilterMenuOpen] = useState(true);

	const handleFilterMenuOpen = () => {
		setFilterMenuOpen(!filterMenuOpen);
	};

	const handleSizeChange = (value) => {
		setSelectedSize(value);
		setSelectedFilters({ size: value });
		console.log(`Selected size range: ${value}`);
	};

	return (
		<div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
			<div className="flex flex-row justify-between w-full">
				<h4 className="font-bold">Size</h4>
				<Image
					className={`${
						!filterMenuOpen ? 'transform rotate-90 ' : ''
					} duration-200`}
					onClick={handleFilterMenuOpen}
					src="/images/keyboard_arrow_down.svg"
					width={20}
					height={20}
					alt="SVG map icon"
				/>
			</div>
			<div
				className={`flex flex-col items-start justify-start w-full gap-2 ${
					filterMenuOpen ? '' : 'hidden'
				} `}>
				<div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm">
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="sizeRange"
							value="0-5"
							checked={selectedSize === '0-5'}
							onChange={() => handleSizeChange('0-5')}
						/>
						<span>0-5 years</span>
					</div>
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="sizeRange"
							value="6-10"
							checked={selectedSize === '6-10'}
							onChange={() => handleSizeChange('6-10')}
						/>
						<span>6-10 years</span>
					</div>
					
                    <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="sizeRange"
							value="10-15"
							checked={selectedSize === '10-15'}
							onChange={() => handleSizeChange('10-15')}
						/>
						<span>10-15 years</span>
					</div>
                    <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="sizeRange"
							value="15-20"
							checked={selectedSize === '10-15'}
							onChange={() => handleSizeChange('10-15')}
						/>
						<span>15-20 years</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;
