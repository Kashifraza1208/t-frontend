import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdModeEditOutline } from 'react-icons/md';

const Details = () => {
	const { pathname } = useRouter();
	const [activeTab, setActiveTab] = useState('overview');

	useEffect(() => {
		if (pathname === '') setActiveTab('overview');
		else if (pathname === '/account') setActiveTab('overview');
		else if (pathname === '/account/edit') setActiveTab('edit');
		else if (pathname === '/account/orders') setActiveTab('orders');
		else if (pathname === '/account/orders/order-details')
			setActiveTab('orders');
		else if (pathname === '/account/address') setActiveTab('address');
		else if (pathname === '/account/notifications')
			setActiveTab('notifications');
		else if (pathname === '/account/notifications/offers')
			setActiveTab('notifications');
		else if (pathname === '/account/wishlist') setActiveTab('wishlist');
		else if (pathname === '/account/payments') setActiveTab('payments');
		else if (pathname === '/account/coupons') setActiveTab('coupons');
		else if (pathname === '/account/support&help') setActiveTab('support&help');
		else if (pathname === '/account/terms&conditions')
			setActiveTab('terms&conditions');
		else if (pathname === '/account/policy') setActiveTab('policy');
	}, [pathname, activeTab]);

	return (
		<>
			<div className="w-full h-full bg-white">
				<div className="flex flex-row mb-4 border rounded">
					<Image
						width={25}
						height={25}
						src="/images/man.svg"
						className="rounded-[50%] h-12 w-12 my-auto mx-2"
						alt="user"
					/>
					<div className="flex flex-col items-start justify-center">
						<div>Hello</div>
						<div className="font-semibold text-[16px] mr-3 flex">
							Wade Warren
						</div>
					</div>
					<Link
						href="/account/edit"
						className="grid justify-end pr-2 my-6 items-between ml-auto">
						<MdModeEditOutline
							className={
								activeTab === 'edit' ? 'text-[#EB8105] text-2xl' : ' text-2xl'
							}
						/>
					</Link>
				</div>

				<div className="flex flex-col items-start p-2 border rounded hidden lg:flex">
					<div>
						<Link
							href="/account"
							className={
								activeTab === 'overview'
									? 'text-[#EB8105]'
									: 'hover:text-[#EB8105]'
							}>
							Overview
						</Link>
					</div>
					<div className="w-full flex flex-col items-start border-gray-300 border-b-2 my-2 pb-2">
						<div className="text-gray-400">Orders</div>
						<Link
							href="/account/orders"
							className={
								activeTab === 'orders'
									? 'text-[#EB8105]'
									: '' + 'hover:text-[#EB8105]'
							}>
							Orders & Returns
						</Link>
					</div>
					<div className="w-full flex flex-col items-start border-gray-300 border-b-2 my-2 pb-2">
						<div className="text-gray-400">Account</div>
						<Link
							href="/account/edit"
							className={activeTab === 'edit' ? 'text-[#EB8105]' : ''}>
							Profile
						</Link>
						<Link
							href="/account/wishlist"
							className={activeTab === 'wishlist' ? 'text-[#EB8105]' : ''}>
							Wishlist
						</Link>
						<Link
							href="/account/payments"
							className={activeTab === 'payments' ? 'text-[#EB8105]' : ''}>
							Payment Method
						</Link>
						<Link
							href="/account/address"
							className={activeTab === 'address' ? 'text-[#EB8105]' : ''}>
							Addresses
						</Link>
					</div>
					<div className="w-full flex flex-col items-start border-gray-300 border-b-2 my-2 pb-2">
						<div className="text-gray-400">My Stuffs</div>
						<Link
							href="/account/coupons"
							className={activeTab === 'coupons' ? 'text-[#EB8105]' : ''}>
							Coupons
						</Link>
						<Link
							href="/account/notifications"
							className={activeTab === 'notifications' ? 'text-[#EB8105]' : ''}>
							All notifications
						</Link>
					</div>
					<div className="w-full flex flex-col items-start border-gray-300 my-2 pb-2">
						<div className="text-gray-400">Legal</div>
						<Link
							href="/account/support&help"
							className={activeTab === 'support&help' ? 'text-[#EB8105]' : ''}>
							Support & Help
						</Link>
						<Link
							href="/account/terms&conditions"
							className={
								activeTab === 'terms&conditions' ? 'text-[#EB8105]' : ''
							}>
							Terms & Conditions
						</Link>
						<Link
							href="/account/policy"
							className={activeTab === 'policy' ? 'text-[#EB8105]' : ''}>
							Privacy Policy
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Details;
