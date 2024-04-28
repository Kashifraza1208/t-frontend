import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from './../../UserContext';
import axios from 'axios';
import Link from 'next/link';

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed  inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center backdrop-blur">
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="bg-white mx-3 md:mx-0  border-2 border-[#EB8105]   px-1 py-3 rounded-md">
					<div className="">{children}</div>

					<button
						className="px-5 bg-[#EB8105] py-2 font-bold flex ml-4 rounded-md"
						onClick={onClose}>
						Ok
					</button>
				</div>
			</div>
		</div>
	);
};

export default function Wishlist() {
	const { user, setUser } = useUser();
	const [isEmpty, setIsEmpty] = useState(false);
	// const [cartData, setCartData] = useState([]);
	const [wishlistData, setWishlistData] = useState([]);
	const [showAddToLiveViewModal, setShowAddToLiveViewModal] = useState(false);
	const [showAlreadyAddedModal, setShowAlreadyAddedModal] = useState(false);
	const serverURL = process.env.BASE_API_URL;
	const userId = user._id;
	const [loading, setLoading] = useState(true);
	// console.log('USER IS WISHLIST DATA', user);

	useEffect(() => {
		const fetchData = async () => {
			const wishList = user.wishList || [];

			if (wishList.length === 0) {
				// Wishlist is empty, no need to make API request
				setIsEmpty(true);
				return;
			}

			try {
				const fetchProductsData = async () => {
					const productPromises = wishList.map(async (prodId) => {
						const res = await axios.get(
							`${serverURL}/api/v1/products/${prodId}`
						);
						return res.data;
					});

					const products = await Promise.all(productPromises);

					setWishlistData((prev) => {
						const uniqueProducts = products.filter(
							(product) => !prev.some((item) => item.id === product.id)
						);
						return [...prev, ...uniqueProducts];
					});

					setLoading(false);
				};

				fetchProductsData();
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		fetchData();
	}, [user, serverURL]);

	const handleRemoveFromWishlist = async (productId) => {
		try {
			const res = await axios.delete(
				`${serverURL}/api/v1/deleteWishList/${user._id}/${productId}`
			);
			console.log('res', res);
			// Update the user context with the modified wishlist
			setUser((prevUser) => ({
				...prevUser,
				wishList: prevUser.wishList.filter((id) => id !== productId),
			}));

			// Use functional update to ensure that we have the latest state
			setWishlistData((prevWishlistData) =>
				prevWishlistData.filter((item) => item._id !== productId)
			);

			// Log the state after updating
			console.log('After removal - Wishlist IDs:', user.wishList);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddToCart = async (productId) => {
		const apiURL = `${serverURL}/api/v1/cart/addItem`;

		try {
			const currentCartData = await axios.get(
				`${serverURL}/api/v1/cart/${userId}`
			);
			const isProductAlreadyInCart = currentCartData.data[0].items?.some(
				(item) => item.productId._id === productId
			);

			if (isProductAlreadyInCart) {
				console.log('Product is already in the cart.');
				setShowAlreadyAddedModal(true);
				return;
			}
			const addToCart = {
				productId,
				customerId: userId,
			};

			const response = await axios.post(apiURL, addToCart);
			console.log('Response:', response.data);

			setShowAddToLiveViewModal(true);
		} catch (err) {
			console.log(err);
		}
	};

	const closeModal = () => {
		setShowAddToLiveViewModal(false);
		setShowAlreadyAddedModal(false);
	};

	const Column = ({
		_id,
		images,
		productName,
		price,
		discount,
		fullDescription,
	}) => (
		<>
			{/* <Link href={`/products/details?productId=${_id}`}>  */}
			<section className="flex rounded items-center m-2 lg:px-4 lg:w-full w-[95vw] overflow-hidden shadow-md hover:shadow-lg  transition-all duration-300">
				<div className="py-2 w-full">
					<div className="flex flex-row  ">
						<div className="">
							<a className=" block overflow-hidden rounded">
								<Image
									width={100}
									height={100}
									alt={productName}
									className="object-cover lg:w-[20vh] lg:p-2 lg:h-[20vh] w-full h-full rounded "
									src={images[0]?.url}
								/>
							</a>
						</div>
						{/* end */}

						<div className=" w-full bg-[#F1F1F180] py-4 px-4 lg:bg-white  ">
							<h2 className="text-[14px font-semibold pt-1 ">{productName}</h2>
							<div className="flex flex-row">
								<span className=" text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
									{fullDescription}
								</span>
							</div>
							<div className="pt-2 lg:pt-0 text-[14px]">
								<span className="font-semibold ">₹{price}</span>
								<span className=" px-2 text-[#7C7C7C]">({discount}% OFF)</span>
							</div>
							<div className=" mt-4">
								<button
									className="text-red-400 mr-3 hover:underline"
									onClick={() => handleRemoveFromWishlist(_id)}>
									Remove
								</button>
								<button
									className="bg-[#f59e05]  px-2 py-1 rounded-lg"
									onClick={() => handleAddToCart(_id, userId)}>
									Add to cart
								</button>
							</div>
						</div>
					</div>
				</div>
				<span className="flex justify-end">
					<Image
						width={50}
						height={60}
						alt="arrow"
						className="w-4 h-4 "
						src="/images/Vector5.svg"
					/>
				</span>
			</section>
			{/* </Link> */}
		</>
	);
	const WishlistItemLoader = () => (
		<div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
			{/* Your skeleton loader UI here */}
			<div className="py-5    w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
				<div className="flex flex-row">
					<div className="w-20 h-20 bg-gray-300 rounded"></div>
					<div className="flex flex-col flex-grow ml-4">
						<div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
						<div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
						<div className="h-3 bg-gray-300 rounded w-2/3"></div>
					</div>
				</div>
				<div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
			</div>
			<span className="flex justify-end">
				<div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
			</span>
		</div>
	);

	const EmptyWishlist = () => {
		return (
			<div className="flex flex-col items-center justify-center">
				<div className="h-fit my-3">
					<Image
						width={20}
						height={20}
						alt="empty_live_demo"
						loading="eager"
						unoptimized={true}
						src={'/images/cart/Empty_box.gif'}
						className="w-[70vw] md:w-[40vw] lg:w-[20vw]"
					/>
					<div className="text-center">Wishlist is empty!</div>
				</div>{' '}
				<Link
					href="/products"
					className=" bg-gradient-to-t from-[#FAAC06] to-[#EB8105] px-3 py-2 rounded w-fit">
					Add Products
				</Link>
			</div>
		);
	};
	return (
		<>
			<div className="p-4 -pb-2 font-semibold text-[18px]">Wishlist</div>
			<div className="flex flex-col py-1 lg:py-0">
				{loading ? (
					!isEmpty ? (
						Array.from({ length: wishlistData?.length || 3 }, (_, index) => (
							<WishlistItemLoader key={index} />
						))
					) : (
						<EmptyWishlist />
					)
				) : (
					wishlistData?.map((item, index) => <Column key={index} {...item} />)
				)}
			</div>
			<Modal isOpen={showAddToLiveViewModal} onClose={closeModal}>
				<div className="p-4">
					<p className="text-lg font-semibold">
						Product added to Cart successfully!
					</p>
				</div>
			</Modal>

			<Modal isOpen={showAlreadyAddedModal} onClose={closeModal}>
				<div className="p-4">
					<p className="text-lg font-semibold">
						Product is already added in cart!
					</p>
				</div>
			</Modal>
		</>
	);
}
