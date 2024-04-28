import React from 'react';
import SidebarLayout from '../../../src/layouts/SidebarLayout';
import OrderDetails from '../../../src/components/orders/OrderDetails';

export default function orderDetails() {
	return (
		<SidebarLayout>
			<OrderDetails />
		</SidebarLayout>
	);
}
