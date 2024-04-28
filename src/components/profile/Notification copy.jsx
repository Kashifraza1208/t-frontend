import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import mock from './notificationsData.json';

const Notification = () => {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		// Set the data from the imported mock JSON file to the state
		setNotifications(mock);
	}, []);

	const Column = ({ imageName, Name, description, time }) => (
		<>
			<section className="m-2 hover:border-blue-700 w-full overflow-hidden shadow-md border-[2px]">
				<div className="py-1">
					<div className="flex flex-row">
						<div className="w-full bg-[#F1F1F180] lg:py-2 px-4 lg:bg-white">
							<h2 className="text-[14px] font-semibold pt-1 ">{Name}</h2>
							<div className="flex flex-row">
								<span className="text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
									{description}
								</span>
							</div>
							<div className="text-[#7C7C7C] text-[12px] py-1">{time}</div>
						</div>
						<div className="px-2">
							<a className="block relative rounded overflow-hidden">
								<Image
									height={20}
									width={20}
									alt="ecommerce"
									className="p-2 mx-1 lg:h-[20vh] lg:w-[20vh] w-5/6 h-5/6 rounded"
									src={`/images/order/${imageName}`}
								/>
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);

	return (
		<>
			<div className="m-4 text-[18px] font-semibold">
				{' '}
				All Notifications({notifications.length})
			</div>
			<div className="flex flex-row px-5 m-3">
				<Link href={'/account/notifications'}>
					<span className="px-5 underline text-[#F19305]">All</span>
				</Link>
				<Link href={'/account/notifications/offers'}>
					<span className="underline hover:text-[#F19305]">Offers</span>
				</Link>
			</div>
			<div>
				{notifications.map((notification, index) => (
					<Column key={index} {...notification} />
				))}
			</div>
		</>
	);
};

export default Notification;
