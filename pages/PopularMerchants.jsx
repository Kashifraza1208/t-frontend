import React from 'react';

import FilterMenuLayout from '../src/layouts/FilterMenuLayout';
import AllPopularMerchantsGrid from '../src/components/homepage/popularMerchantsNearYou/AllPopularMerchantsGrid';
import { useRouter } from 'next/router';

const PopularMerchants = () => {
	const router = useRouter();
	const { categoryId } = router.query;
	return (
		<>
			<FilterMenuLayout>
				<AllPopularMerchantsGrid id={categoryId} />
			</FilterMenuLayout>
		</>
	);
};

export default PopularMerchants;
