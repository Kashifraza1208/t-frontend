import React from 'react';
import { ProductDetails } from '../../src/components/productDetails/ProductDetails';
import { useRouter } from 'next/router';

const Details = () => {
	const router = useRouter();
	const productId = router.query.productId;
	return (
		<>
			<ProductDetails productId={productId}/>
		</>
	);
};

export default Details;
