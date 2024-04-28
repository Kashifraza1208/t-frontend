import  { useState } from 'react';
import Image from 'next/image';

const PriceFilter = ({ setSelectedFilters }) => {
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(500);
	const [filterMenuOpen, setFilterMenuOpen] = useState(true);

	const handleFilterMenuOpen = () => {
		setFilterMenuOpen(!filterMenuOpen);
	};

	const handleMinPriceChange = (value) => {
		setMinPrice(Number(value));
		setSelectedFilters({ minPrice: Number(value) });
	};

	const handleMaxPriceChange = (value) => {
		setMaxPrice(Number(value));
		setSelectedFilters({ maxPrice: Number(value) });
	};

	const handleFilterClick = (event) => {
		const selectedPriceRange = event.target.value;
		const [min, max] = selectedPriceRange.split('-').map(Number);
		setMinPrice(min);
		setMaxPrice(max);
		setSelectedFilters({ minPrice: min, maxPrice: max }); // Communicate the selected price range to the parent component
		console.log(`Filtering products between ₹${min} and ₹${max}`);
	};

	return (
		<div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
			<div className="flex flex-row justify-between w-full">
				<h4 className="font-bold">Price</h4>
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
				<div className="flex flex-col items-start gap-2 w-full">
					<div className="flex flex-row justify-between bg-gray-700 text-white w-full p-1 rounded">
						<p>₹{minPrice}</p>
						<p className="font-bold">to</p>
						<p>₹{maxPrice}</p>
					</div>
					<div className="flex w-full py-1">
						<input
							type="range"
							className="w-1/2 bg-[#B3B3B3] h-0.5 rounded-full accent-gray-700"
							min={0}
							max={500} // Set the appropriate max value for your price range
							value={minPrice}
							onChange={(e) => {
								handleMinPriceChange(e.target.value);
							}}
						/>
						<input
							type="range"
							className="w-1/2 bg-[#B3B3B3] h-0.5 rounded-full accent-gray-700"
							min={0}
							max={5000} // Set the appropriate max value for your price range
							value={maxPrice}
							onChange={(e) => {
								handleMaxPriceChange(e.target.value);
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm">
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="0-149"
							checked={minPrice === 0 && maxPrice === 150}
							onChange={handleFilterClick}
						/>
						<span>Under ₹150</span>
					</div>
					
                    <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="0-149"
							checked={minPrice === 0 && maxPrice === 300}
							onChange={handleFilterClick}
						/>
						<span>Under ₹300</span>
					</div>
                    <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="0-149"
							checked={minPrice === 0 && maxPrice === 500}
							onChange={handleFilterClick}
						/>
						<span>Under ₹500</span>
					</div>
                    <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="0-149"
							checked={minPrice === 0 && maxPrice === 1000}
							onChange={handleFilterClick}
						/>
						<span>Under ₹1000</span>
					</div>
                    <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="0-149"
							checked={minPrice === 0 && maxPrice === 1500}
							onChange={handleFilterClick}
						/>
						<span>Under ₹1500</span>
					</div>
                    <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="0-149"
							checked={minPrice === 0 && maxPrice === 2000}
							onChange={handleFilterClick}
						/>
						<span>Above ₹2000</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;
