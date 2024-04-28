import React from 'react';
import Tops from '../girls/Tops';
import TShirts from '../girls/TShirts';
import BrandDeals from '../girls/BrandDeals';
import Pants from '../girls/Pants';
import Shorts from '../girls/Shorts';

import BoysCollection from '../../homepage/boysAndGirlsCollection/BoysCollection';
const BoyCollection = () => {
	return (
		<div className="flex flex-col items-start gap-4 lg:gap-8 w-full">
			<BoysCollection />
			<Tops />
			<TShirts />
			<BrandDeals />
			<Pants />
			<Shorts />
		</div>
	);
};

export default BoyCollection;
