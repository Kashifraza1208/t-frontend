import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '../../../UserContext';
import Link from 'next/link';
const img_fashion = '/images/img_fashion.jpeg';
import axios from 'axios';

const ProductCard = ({ productDetails }) => {

	const [isFollowing, setIsFollowing] = useState(false);
	const [follow, setFollow] = useState(false);
	const { openingHours } = productDetails;
	// console.log(storeName,openingHours)
	const { user, token } = useUser();
	const currentDate = new Date();
	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const dayOfWeekIndex = currentDate.getDay();
	let dayName = daysOfWeek[dayOfWeekIndex];

	let closingTime;

	{
		openingHours.map((daytod) => {
			if (dayName == daytod.dayOfWeek) {
				closingTime = daytod.close;
			}
		});
	}

	const handleClick = () => {
		setIsFollowing(!isFollowing);
	};

	useEffect(() => {
		// Check if the current user is following the store
		const isFollowing = productDetails.followers && productDetails.followers.followers.includes(user._id);
		setFollow(isFollowing);
	  }, [productDetails.followers, user._id]);
	  
	  const handleFollow = async () => {
		try {
		  const response = await axios.post(
			`${process.env.BASE_API_URL}/api/v1/${productDetails._id}/${follow ? 'unfollow' : 'follow'}`,
			{},
			{
			  headers: {
				Authorization: `Bearer ${token}`,
			  },
			}
		  );
	  
		  console.log(response.data);
		  console.log(`${follow ? 'Unfollowed' : 'Followed'} store with ID ${productDetails._id}:`, response.data);
		  // Update the follow state
		  setFollow(!follow);
	  
		} catch (error) {
		  console.error(`Error ${follow ? 'unfollowing' : 'following'} store:`, error);
	  
		  // Handle errors if needed
		}
	  };

	return (
	
		<div className="p-4 flex flex-col gap-2 items-center shadow-md rounded lg:w-72 hover:border hover:shadow-lg">
			<div className="h-40 relative w-52 md:w-64 m-auto">
				<button
					onClick={handleFollow}
					className="hidden md:block px-4 py-1 absolute right-2 top-2 border z-10 bg-white rounded-sm hover:bg-opacity-25 hover:text-white">
						<p className="text-xs">{follow ? 'Unfollow..' : '+ Follow'}</p>
				</button>
				<div className="px-2 py-1 flex flex-row items-center gap-2 cursor-pointer p-1 text-xs absolute bottom-2 left-2 bg-white border z-10 rounded-sm">
					<p className="p-0.5 bg-gray-600 text-white rounded-sm">
						⭐ {productDetails.rating?.rating}
					</p>
					<p className="p-1">{productDetails.rating?.count} Ratings</p>
				</div>
				<div className="absolute inset-0">
					<Image
						className="w-full h-full object-cover"
						src={img_fashion}
						width={200}
						height={160}
						alt={productDetails.storeName}
					/>
				</div>
			</div>

			<Link href={'#'}>
				<div className="flex h-5 w-64 items-start">
					<p className="font-semibold">{productDetails.storeName}</p>
				</div>
			</Link>

			<div className="flex flex-col w-64 h-20 p-0">
				<div className="flex flex-row items-center gap-2 text-xs h-10">
					<span className="border-box p-1 border border-gray-400 bg-gray-50 rounded-sm">
						<p>₹ 239</p>
					</span>
					<p className="hidden">{productDetails.storeDescription}</p>
				</div>

				<ul className="text-xs">
					<li className="flex items-center gap-1 w-64">
						<div className="">
							<Image
								src="/images/listmarker.svg"
								width={10}
								height={10}
								alt="SVG List Marker"
							/>
						</div>
						<span>Shirts starting from $599</span>
					</li>
					<li className="flex items-center gap-1 w-64">
						<div className="">
							<Image
								src="/images/listmarker.svg"
								width={10}
								height={10}
								alt="SVG List Marker"
							/>
						</div>
						<span> Free Delivery</span>
					</li>
				</ul>
			</div>

			<Link href={`/nearByStore/store?storeId=${productDetails._id}`}>
				<button className="flex items-center justify-center gap-2 w-64 py-2  px-9  border border-gray-400 bg-gray-50 rounded hover:bg-black hover:text-white">
					<p className="font-semibold"> View Shop</p>
				</button>
			</Link>

			<div className="flex flex-row items-center justify-between text-xs w-64">
				<div className="flex flex-row items-center gap-1">
					<span className="text-green-600 font-bold">Open</span>
					<p className="font-light">until {closingTime}</p>
				</div>

				<div className="flex flex-row gap-1 items-center">
					<div className="">
						<Image
							src="/images/imap.svg"
							width={10}
							height={10}
							alt="SVG map icon"
						/>
					</div>
					<span className="font-light">10km away</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
