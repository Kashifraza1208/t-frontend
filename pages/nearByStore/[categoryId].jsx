import React from 'react';
import { useRouter } from 'next/router';
import FilterMenuLayout from '../../src/layouts/FilterMenuLayout';
import NearByGen from './../../src/components/NearbyStore/nearby/NearByGen';
const NearBy = () => {
	const router = useRouter();
	const { categoryId } = router.query;
	return (
		<FilterMenuLayout>
			<NearByGen id={categoryId} />
		</FilterMenuLayout>
	);
};

export default NearBy;
