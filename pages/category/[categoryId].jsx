import React from 'react';
import { useRouter } from 'next/router';
import MensClothingComp from '../../src/components/mensClothing/Index';
import FilterMenuLayout from '../../src/layouts/FilterMenuLayout';

const MensClothing = () => {
	const router = useRouter();
	const { categoryId } = router.query;
	// console.log(router.query);
	return (
		<>
			<FilterMenuLayout>
				<MensClothingComp CategoryId={categoryId} />
			</FilterMenuLayout>
		</>
	);
};

export default MensClothing;
