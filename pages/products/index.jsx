import React from 'react';
import ProductReviews from '../../src/components/productReview/ProductReview';
import Arrivalmen from '../../src/components/homepage/arrival/ArrivalMen';
import ArrivalWomen from '../../src/components/homepage/arrival/ArrivalWomen';

export default function products() {
	return (
		<>
			<div className="px-4 md:px-12 lg:px-[120px]  w-full my-5">
				<Arrivalmen />
				<ArrivalWomen />
				<ProductReviews />
			</div>
		</>
	);
}
