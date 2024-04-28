import React from 'react';
import StorePage from '../../src/components/store/Index';
import { useRouter } from 'next/router';
const Store = () => {
	const router = useRouter();
	const storeId = router.query.storeId;
	return (
		<>
			<StorePage storeId={storeId} />
		</>
	);
};

export default Store;
