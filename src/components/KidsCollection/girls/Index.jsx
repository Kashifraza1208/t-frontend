import React from 'react';
import GirlsCollection from '../../homepage/boysAndGirlsCollection/GirlsCollection';
import Tops from './Tops';
import TShirts from './TShirts';
import BrandDeals from './BrandDeals';
import Pants from './Pants';
import Shorts from './Shorts';
const GirlCollection = () => {
	return (
		<div className="flex flex-col items-start gap-4 lg:gap-8 w-full">
			<GirlsCollection />
			<Tops />
			<TShirts />
			<BrandDeals />
			<Pants />
			<Shorts />
		</div>
	);
};

export default GirlCollection;
