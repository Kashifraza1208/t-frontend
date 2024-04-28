import { useState } from 'react';
import Bargain from './Bargain';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { useCart } from './../../context/cartProvider';
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

export default function ProductDetails({ productData }) {
	//console.log('productData', productData);
	
	const { _id } = productData;

	const serverURL = process.env.BASE_API_URL;
	const [bargain, setBargain] = useState(false);
	const [page, setPage] = useState(0);
	const [selectedImage, setSelectedImage] = useState(
		productData?.images[0]?.url
	);
	const [selectedSize, setSelectedSize] = useState('S');
	const router = useRouter();
	const { cartData, setCartData } = useCart();
	const [showAddToLiveViewModal, setShowAddToLiveViewModal] = useState(false);
	const [showAlreadyAddedModal, setShowAlreadyAddedModal] = useState(false);
	const [showAddToCartModal, setShowAddToCartModal] = useState(false);
	const [showAlreadyAddToCartModal, setShowAlreadyAddToCartModal] =
		useState(false);
	const [isProductAddedToLiveDemo, setIsProductAddedToLiveDemo] =
		useState(false);
	const { discount, price } = productData;
	const { inStock } = productData;

	// Calculate the discounted price
	const discountedPrice = price - (price * discount) / 100;

	// const addToLiveDemo = async () => {
	// 	try {
	// 	  if (!user || !user._id) {
	// 		console.error('User information is not available.');
	// 		return;
	// 	  }

	// 	  const response = await axios.post(`${serverURL}/api/v1/liveDemo/addItem`, {
	// 		productId: productData._id,
	// 		customerId:userId,
	// 	  });

	// 	  console.log('Live Demo API Response:', response.data);
	// 	  setShowAddToLiveViewModal(true);
	// 	} catch (error) {
	// 	  console.error('Error adding item to Live Demo:', error);

	// 	}
	//   };

	const addToLiveDemo = async () => {
		try {
			
			
			

			// Check if the product is already added to the live demo
			//   const response = await axios.get(`${serverURL}/api/v1/liveDemo/checkItem`, {
			// 	params: {
			// 	  productId: productData._id,
			// 	  customerId: userId,
			// 	},
			//   });

			const localURL = 'http://localhost:7000';
			const customerId = localStorage.getItem('customerId');
			if(!customerId){
				window.location = "/account/login";
			}

			// If not added, proceed to add the product
			axios
				.post(`${localURL}/api/v1/liveDemo/addItem`, {
					productId: productData._id,
					customerId: customerId,
				})
				.then((response) => {
					console.log(response.data)
					if (response.data.isProductAdded) {
						// Product is already added to Live Demo
						setIsProductAddedToLiveDemo(true);
						setShowAlreadyAddedModal(true);
						return;
					}
					console.log('Live Demo API Response:', response.data);
					setShowAddToLiveViewModal(true);
					setIsProductAddedToLiveDemo(true);
				});
		} catch (error) {
			console.error('Error adding item to Live Demo:', error);
		}
	};

	const handleAddCart = async (productId, userId) => {
		const apiURL = `${serverURL}/api/v1/cart/addItem`;

		try {
			const currentCartData = await axios.get(
				`${serverURL}/api/v1/cart/${userId}`
			);

			if (currentCartData.data && currentCartData.data.length > 0) {
				const isProductAlreadyInCart = currentCartData.data[0].items?.some(
					(item) => item.productId._id.toString() === productId.toString()
				);

				if (isProductAlreadyInCart) {
					console.log('Product is already in the cart.');
					setShowAlreadyAddToCartModal(true);
					return;
				}
			}

			// If the product is not in the cart or the cart is empty, proceed with the API request to add it
			const addToCart = {
				productId,
				customerId: userId,
			};

			const response = await axios.post(apiURL, addToCart);
			console.log('Response:', response.data);

			setShowAddToCartModal(true);
		} catch (err) {
			console.log(err);
		}
	};

	const closeModal = () => {
		// Close all modals
		setShowAddToLiveViewModal(false);
		setShowAlreadyAddedModal(false);
		setShowAddToCartModal(false);
		setShowAlreadyAddToCartModal(false);
	};

	const handleImageClick = (imageUrl) => {
		setSelectedImage(imageUrl);
	};

	const handleSizeClick = (size) => {
		setSelectedSize(size);
	};

	const [zoomStyle, setZoomStyle] = useState({
		transform: 'scale(1)',
		transformOrigin: '0 0',
	});

	const handleMouseMove = (e) => {
		const { left, top, width, height } = e.target.getBoundingClientRect();
		const x = (e.clientX - left) / width;
		const y = (e.clientY - top) / height;

		setZoomStyle({
			transform: 'scale(2)',
			transformOrigin: `${x * 100}% ${y * 100}%`,
		});
	};

	const handleMouseLeave = () => {
		setZoomStyle({
			transform: 'scale(1)',
			transformOrigin: '0 0',
		});
	};

	const addToShoppingCart = () => {
		setCartData({ ...cartData, productDetails: productData });

		router.push('/checkout');
	};

	return (
		<div className="px-4 lg:px-[120px] relative w-full">
			<div className="w-full mx-auto py-4 lg:py-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-[30px]">
				<div className="flex flex-col gap-2.5 items-center w-full">
					<div className="relative w-full">
						{productData?.images?.length === 1 ? null : (
							<button
								onClick={() => {
									if (page === 0) {
										setPage(productData?.images?.length - 1);
									} else {
										setPage(page - 1);
									}
									handleImageClick(productData?.images[page]?.url);
								}}
								className="absolute left-0 flex p-3 ml-2 bg-white rounded-full top-36">
								<AiOutlineLeft className="text-3xl font-bold " />
							</button>
						)}
						<div
							className="relative  overflow-hidden"
							onMouseMove={handleMouseMove}
							onMouseLeave={handleMouseLeave}>
							<Image
								width={500}
								height={300}
								src={selectedImage}
								alt={`${productData?.productName}`}
								className="w-full h-[400px] object-cover "
								style={zoomStyle}
							/>
						</div>
						{productData?.images?.length === 1 ? null : (
							<button
								onClick={() => {
									if (page === productData?.images?.length - 1) {
										setPage(0);
									} else {
										setPage(page + 1);
									}
									handleImageClick(productData?.images[page]?.url);
								}}
								className="absolute right-0 p-3 mr-2 bg-transparent bg-white rounded-full top-36">
								<AiOutlineRight className="text-3xl font-bold " />
							</button>
						)}
					</div>
					<div className="flex items-center w-full gap-4">
						{productData?.images?.map((image) => (
							<div
								className="border border-gray-400 w-[48px] h-[36px] md:w-[88px] md:h-[60px]"
								key={image}
								onClick={() => handleImageClick(image?.url)}>
								<Image
									width={200}
									height={200}
									src={`${image?.url}`}
									alt={image?.filename}
									className="object-cover w-full h-full "
								/>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col items-start justify-between w-full h-full">
					<div className="flex flex-col justify-start w-full itmes-start ">
						<div className="w-full">
							<h1 className="text-xl font-semibold lg:text-3xl">
								{productData?.productName}
							</h1>
							<h2 className="text-base font-semibold lg:text-xl">
								{productData?.shortDescription}
							</h2>
						</div>
						{/* <span className="pr-1 text-xs font-bold lg:text-sm">
                        ₹{discountedPrice}
                      </span>
                      <span className="px-1 text-xs font-light line-through lg:text-sm">
                        ₹{price}
                      </span>
                      <span className=" text-[#388E3C]  text-xs lg:text-sm">
                        ({discount}% Off)
                      </span> */}
						<div className="w-full h-px mt-2 bg-gray-400"></div>
						<div className="flex flex-col items-start justify-between w-full gap-5 py-2 text-sm">
							<div className="flex flex-row items-center justify-between  ">
								<span className="font-Poppins text-xl font-semibold">
									₹{discountedPrice}
								</span>

								<span className=" font-light text-gray-500 text-lg ml-2 line-through">
									{productData?.price}
								</span>
								<span className="text-red-500  ml-2 font-Poppins text-xl font-semibold">
									-{productData?.discount}% off
								</span>
							</div>

							<div className="w-full h-px  bg-gray-400"></div>

							<div className="relative flex  text-base font-semibold lg:text-xl">
								<h2 className="text-black">Color</h2>
								<h2 className="text-black">: Black</h2>
							</div>

							<div className="flex items-center w-full gap-4">
								{productData?.images?.map((image) => (
									<div
										className="border border-gray-400 w-[48px] h-[36px] md:w-[88px] md:h-[60px]"
										key={image?._id}
										onClick={() => handleImageClick(image?.url)}>
										<Image
											width={200}
											height={200}
											src={`${image?.url}`}
											alt={image?.filename}
											className="object-cover w-full h-full "
										/>
									</div>
								))}
							</div>

							<div className="w-full h-px  bg-gray-400"></div>

							<div className="relative flex  text-base font-semibold lg:text-xl">
								<h2 className="text-black">Select Size:</h2>
								{/* <h2 className="text-black">: {selectedSize}</h2> */}
							</div>

							<div className="flex w-full gap-3">
								{productData.sizes && productData.sizes.length > 0 ? (
									productData.sizes.map((size) => (
										<div
											key={size}
											className={`border border-gray-400 w-12 h-9 md:w-20 md:h-14 relative flex items-center justify-center ${
												selectedSize === size ? 'bg-gray-200' : ''
											}`}
											onClick={() => {
												handleSizeClick(size);
											}}>
											<span className="absolute text-sm md:text-base  font-Poppins">
												{size}
											</span>
										</div>
									))
								) : (
									<div className="border border-gray-400 w-20 h-9 md:w-20 md:h-14 relative flex items-center justify-center bg-gray-200">
										<span className="absolute text-sm md:text-base font-Poppins">
											Free Size
										</span>
									</div>
								)}
							</div>

							<div className="flex gap-5">
								<div className="mt-1">
									{inStock ? (
										<p className="text-green-500 text-[14px]">In Stock</p>
									) : (
										<p className="text-red-500 text-[14px]">Out of Stock</p>
									)}
								</div>

								<div>
									<label htmlFor="quantity">Quantity:</label>
									<select
										name="quantity"
										onChange={(e) => {
											console.log('Selected Quantity:', e.target.value);
										}}
										defaultValue="1"
										className="border-2 border-gray-400 px-1 py-1 rounded ml-2">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
								</div>
							</div>

							{productData.attributes.map((attribute) => (
								<div
									className="flex flex-row items-center justify-between w-full"
									key={attribute.title}>
									<span>{attribute.title}</span>
									<span>{attribute.value}</span>
								</div>
							))}
						</div>
					</div>

					<div className="flex flex-col items-start justify-between w-full gap-4">
						<div className="flex items-center justify-between w-full gap-4 ">
							<Link
								href={`/nearByStore/store?storeId=${productData.storeId._id}`}
								className="text-base border-2 border-[#EB8105] font-semibold text-center w-1/2 px-4 py-2">
								View Store
							</Link>

							<div
								onClick={addToShoppingCart}
								className="text-base bg-gradient-to-b from-[#FAAC06] to-[#EB8105] font-semibold hover:cursor-pointer text-center w-1/2 px-4 py-2">
								Buy Now
							</div>
						</div>
						<div className="flex  items-center justify-between w-full gap-4">
							<button
								className="text-base  bg-gradient-to-b from-[#FAAC06] to-[#EB8105] font-semibold  w-1/2 px-4 py-2"
								onClick={() => handleAddCart(_id, userId)}>
								Add to Cart
							</button>
							<button
								// onClick={handleAddToLiveView}
								onClick={addToLiveDemo}
								className="text-base border-2 border-[#EB8105] font-semibold w-1/2 px-4 py-2">
								Add to Live view
							</button>
						</div>
					</div>
				</div>
			</div>

			{bargain && <Bargain bargain={bargain} setBargain={setBargain} />}
			<Modal isOpen={showAddToCartModal} onClose={closeModal}>
				<div className="p-4">
					<p className="text-lg font-semibold">
						Product added to Cart successfully!
					</p>
				</div>
			</Modal>

			<Modal isOpen={showAlreadyAddToCartModal} onClose={closeModal}>
				<div className="p-4">
					<p className="text-lg font-semibold">
						Product is already added in cart!
					</p>
				</div>
			</Modal>

			<Modal isOpen={showAddToLiveViewModal} onClose={closeModal}>
				<div className="p-4">
					<p className="text-lg font-semibold">
						Product added to Live View successfully!
					</p>
				</div>
			</Modal>
			<Modal isOpen={showAlreadyAddedModal} onClose={closeModal}>
				<div className="p-4">
					<p className="text-lg font-semibold">
						Product is already added to Live View!
					</p>
				</div>
			</Modal>
		</div>
	);
}
