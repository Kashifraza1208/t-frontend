import React, { useEffect, useState } from 'react';
import Payment from './Payment';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../../UserContext';
import { MdModeEditOutline } from 'react-icons/md';
import Details from '../profile/Details';
import Wishlist from '../wishlist/Wishlist';

const Profile = () => {
	const { user, setUser, authenticated, setAuthenticated } = useUser();
	const [activeTab, setActiveTab] = useState('overview');
	return (
		<>
			<main className="w-full">
				<div className="lg:px-24 px-5 my-5">
					<div className="grid -2 grid-cols-1 md:grid-cols-4 w-full  gap-4">
						<div className="col-span-1">
							<Details />
						</div>
						<div className="border w-[100%] col-span-1 md:col-span-3">
							<Payment />
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Profile;
