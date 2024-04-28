import React from 'react';
import { useRouter } from 'next/router';
//import BrandDetailsPage from '../../src/components/mensClothing/BrandDetailsPage';
import BrandDetailsPage from '../../src/components/homepage/branddeals/BrandDetailsPage';
import FilterMenuLayout from '../../src/layouts/FilterMenuLayout';
const BrandDetailsPages = () => {
	const router = useRouter();
	const { categoryId } = router.query;
	// console.log(router.query);
	return (
		<>
			<FilterMenuLayout>
				<BrandDetailsPage />
			</FilterMenuLayout>
		</>
	);
};

export default BrandDetailsPages;
