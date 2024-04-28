import React, {useEffect} from 'react';
import { cardbd } from '../homepage/branddealsformen/cardbd';
import DealsCard from '../ProductCards/DealsCard';


const DealsByCategory = () => {
	const data = cardbd;
	
	return (
		<>
			<div className="text-xl font-semibold  underline underline-offset-8 decoration-[#EB8105] ">
				Deals By Category
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

export default DealsByCategory;
