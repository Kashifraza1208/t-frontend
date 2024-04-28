import React from 'react';

import { useRouter } from 'next/router';
import FilterMenuLayout from './../../src/layouts/FilterMenuLayout';
import CategoryProducts from '../../src/components/homepage/branddeals/CategoryProducts';
const ProductsByCategory = () => {
	const router = useRouter();
	


	return (
		<>
			<FilterMenuLayout>
			
					<CategoryProducts  />
				
			</FilterMenuLayout>
		</>
	);
};

export default ProductsByCategory;
