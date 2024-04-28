import React from 'react';
import SidebarLayout from '../../src/layouts/SidebarLayout';
import Wishlist from '../../src/components/wishlist/Wishlist';

export default function wishlist() {
	return (
		<SidebarLayout>
			<Wishlist />
		</SidebarLayout>
	);
}
