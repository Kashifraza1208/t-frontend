import React from 'react';
import { cardbd } from '../homepage/branddealsformen/cardbd';
import DealsCard from '../ProductCards/DealsCard';

const BrandDeals = () => {
	const data = cardbd;
	return (
		<>
			<div className="text-xl  font-semibold  underline underline-offset-8 decoration-[#EB8105] ">
				BRAND DEALS FOR MEN
			</div>
			<div className="flex flex-row px-3 my-4 mb-2 overflow-x-auto grid-container">
				{data.map((item, index) => (
					<DealsCard
						key={index}
						image={item.imageUrl}
						title={item.title}
						offer={item.description}
					/>
				))}
			</div>
		</>
	);
};

export default BrandDeals;
