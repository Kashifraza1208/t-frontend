// SimilarProductCard.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../../UserContext';
import axios from 'axios';

const SimilarProductCard = ({ productDetails }) => {
	const { _id, productName, description, rating, price, images, discount } =
		productDetails;
	const [favourite, setFavourite] = useState(false);
	const { user, setUser } = useUser();
	const serverURL = process.env.BASE_API_URL;
	useEffect(() => {
		setFavourite(user.wishList && user.wishList.includes(_id));
	}, [user.wishList, _id]);

	const handleFavouriteClick = () => {
		setFavourite(!favourite);
		let api = '';

		if (!favourite) {
			api = `${serverURL}/api/v1/addWishList/${user._id}/${_id}`;
			axios
				.post(api)
				.then((res) => {
					console.log(res.data);
					setUser(res.data);
				})
				.catch((err) => console.error(err));
		} else {
			api = `${serverURL}/api/v1/deleteWishList/${user._id}/${_id}`;
			axios
				.delete(api)
				.then((res) => {
					console.log('wishlist', res.data);
					setUser(res.data);
				})
				.catch((err) => console.error(err));
		}
	};

	const checkUserWishlist = (id) => {
		const wishList = user.wishList;
		wishList.forEach((wish) => {
			if (wish == id) {
				return true;
			}
		});

		return false;
	};

	return (
		<div className="p-2 flex flex-col gap-2 items-center border shadow-lg rounded max-h-min w-[150px] md:w-[176px] lg:w-[280px]">
			<div className="h-[98px] lg:h-40  relative w-[128px] md:w-[156px] lg:w-[250px] m-auto">
				<div className="px-1 lg:px-2 py-0.5 lg:py-1 flex flex-row items-center gap-2 cursor-pointer text-[10px] lg:text-xs absolute bottom-1 left-1  lg:bottom-2 lg:left-2 bg-white border z-10 rounded-sm">
					<p className="p-0.5 bg-gray-600 text-white rounded-sm">
						{rating?.rating ? `⭐${rating.rating}` : 'No Rating'}
					</p>
					<p className="p-1">
						{rating?.count ? `${rating.count} Ratings` : 'No Ratings'}
					</p>
				</div>
				<div className="absolute inset-0">
					<Image
						className="w-full h-full object-cover"
						src={images[0]?.url || 'https://picsum.photos/200/300'}
						width={300}
						height={200}
						alt={productName}
					/>
				</div>
				<div className="absolute top-2 right-2">
					<button onClick={handleFavouriteClick}>
						<Image
							width={25}
							height={25}
							alt="heart"
							className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
							src={favourite ? '/images/heart.svg' : '/images/vector3.svg'}
							onClick={handleFavouriteClick}
						/>
					</button>
				</div>
			</div>

			<div className="flex w-[128px]   md:w-[156px] lg:w-[250px] items-start">
				<p className="font-semibold text-[12px] md:text-[14px] hover:underline whitespace-nowrap overflow-hidden">
					{productName}
				</p>
			</div>

			<div className="flex flex-col w-[128px] md:w-[156px] lg:w-[250px] p-0">
				<div className="flex flex-row items-center gap-2 text-xs">
					<div className="w-full  flex justify-between lg:inline lg:max-w-min lg:border-box p-2 lg:p-1 border border-gray-400 bg-gray-50 rounded-sm">
						<span className="font-bold">₹{price}</span>
						<span className="block lg:hidden">50% Off</span>
					</div>

					<p className="hidden lg:inline-block">{description}</p>
				</div>

				<ul className="text-xs hidden lg:block">
					<li className="flex items-center gap-1 w-60">
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
					<li className="flex items-center gap-1 w-60">
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

			<Link href={`/products/details?productId=${productDetails._id}`}>
				<button className="flex items-center justify-center gap-2 w-[128px] md:w-[156px] lg:w-[250px] py-1 lg:py-2 px-4 lg:px-6  border border-gray-400 bg-gray-50 rounded-sm hover:bg-black hover:text-white">
					<p className="font-semibold">View Details</p>
				</button>
			</Link>

			<div className="flex flex-col  items-start lg:flex-row lg:items-center justify-between text-xs w-[128px] md:w-[156px] lg:w-[250px]">
				<div className="flex flex-row items-center gap-1">
					<span className="text-green-600 font-bold">Open</span>
					<p className="font-light">until 10:30</p>
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

export default SimilarProductCard;
