import React from 'react';
import { useRouter } from 'next/router';
import FilterMenuLayout from '../../src/layouts/FilterMenuLayout';
import AllBrandDetailsPage from '../../src/components/homepage/branddeals/AllBrandDetailsPage';
const MensClothing = () => {
	const router = useRouter();
	const { categoryId } = router.query;
	return (
		<>
			<FilterMenuLayout>
				<AllBrandDetailsPage />
			</FilterMenuLayout>
		</>
	);
};

export default MensClothing;
