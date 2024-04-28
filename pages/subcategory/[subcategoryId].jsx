import React from 'react';
import CategoryProducts from '../../src/components/mensClothing/CategoryProducts';
import { useRouter } from 'next/router';
import FilterMenuLayout from './../../src/layouts/FilterMenuLayout';

const ProductsByCategory = () => {
	const router = useRouter();
	const { subcategoryId } = router.query;
	console.log(
		'🚀 ~ file: [subcategoryId].jsx:8 ~ ProductsByCategory ~ subcategoryId:',
		subcategoryId
	);

	return (
		<>
			<FilterMenuLayout>
				{subcategoryId && (
					<CategoryProducts CategoryProductsId={subcategoryId} />
				)}
			</FilterMenuLayout>
		</>
	);
};

export default ProductsByCategory;
