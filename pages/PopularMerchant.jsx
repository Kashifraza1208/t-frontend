// pages/PopularMerchants
import React from 'react';
import FilterMenuLayout from '../src/layouts/FilterMenuLayout';
//import AllPopularMerchants from '../src/components/homepage/popularMerchantsNearYou/AllPopularMerchants';
import { useRouter } from 'next/router';
import AllPopularMerchants from '../src/components/homepage/popularMerchantsNearYou/AllPopularMerchants';

const PopularMerchants = () => {
	const router = useRouter();
	const { categoryId } = router.query;
	return (
		<>
			<FilterMenuLayout>
				<AllPopularMerchants id={categoryId} />
			</FilterMenuLayout>
		</>
	);
};

export default PopularMerchants;
