import React, { useState, useEffect } from 'react';
import { HiCurrencyRupee } from 'react-icons/hi';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductCardLoader from '../../loaders/ProductCardLoader';

const ArrivalWomen = () => {
	const [activeCategory, setActiveCategory] = useState(0); // Default to the first category
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const router = useRouter();
	const serverURL = process.env.BASE_API_URL;
	const categories = [
		'Best of the week',
		'Featured',
		'Upperwears',
		'Jeans',
		'Accessories',
	];

	const categoryFilters = [
		{},
		{},
		{},
		{ category: 'jeans' },
		{ category: 'accessories' },
	];

	useEffect(() => {
		setLoading(true);
		// Fetch data for the active category using Axios
		const categoryEndpoints = categories.map((category, index) => ({
			endpoint: `${serverURL}/api/v1/products`,
			filter: categoryFilters[index],
		}));

		// Fetch data for the active category using Axios
		axios
			.post(categoryEndpoints[activeCategory].endpoint, {
				filters: categoryEndpoints[activeCategory].filter,
			})
			.then((response) => {
				const data = response.data['data'];
				// Assuming the API response returns an array of products
				setLoading(false);
				setProducts(data); // Show only the top 8 products
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	}, [activeCategory]);

	const handleCategoryClick = (index) => {
		setActiveCategory(index);
	};

	const calledimg = async (index) => {
		const id = products[index]._id;
		router.push(`/products/details?productId=${id}`);
	};

	return (
		<div className="w-full">
			<div className="flex flex-col w-full gap-6 my-5 overflow-hidden md:flex-row md:gap-4">
				<div className="w-full shrink-0 md:w-40 lg:w-52">
					<Image
						src="/images/start-img2.jpg"
						width={200}
						height={200}
						alt=""
						className="w-full h-full"
					/>
				</div>
				<div className="flex flex-col items-start justify-start w-full h-full gap-4">
					<div className="flex items-center justify-between w-full">
						<div className="flex flex-row items-center justify-start gap-5">
							{/* <h1 className="text-xl font-bold underline uppercase underline-offset- decoration-red-700">
								Best of the week
							</h1> */}

							<div className="flex-row items-center justify-start gap-5 cursor-pointer md:flex">
								{categories.map((category, index) => (
									<p
										key={index}
										className={`${
											index === 0
												? 'text-xl font-bold uppercase'
												: 'text-sm font-semibold uppercase md:text-base sm:text-sm lg:text-md hidden md:flex'
										} ${
											activeCategory === index
												? 'underline uppercase underline-offset- decoration-red-700'
												: ''
										}`}
										onClick={() => handleCategoryClick(index)}>
										{category}
									</p>
								))}
								{/* <p className="text-sm font-semibold uppercase md:text-base sm:text-sm lg:text-md">
									Featured
								</p>
								<p className="text-sm font-semibold uppercase md:text-base sm:text-sm lg:text-md">
									Upperwears
								</p>
								<p className="text-sm font-semibold uppercase md:text-base sm:text-sm lg:text-md">
									Jeans
								</p>
								<p className="text-sm font-semibold uppercase md:text-base sm:text-sm lg:text-md">
									Accessories
								</p> */}
							</div>
						</div>

						<div className="flex flex-row items-center ">
							<div>
								<Image
									src="/images/chevronleft.svg"
									width={24}
									height={24}
									alt=""
									className="w-[24px] h-[24px]"
								/>
							</div>
							<div>
								<Image
									src="/images/chevronright.svg"
									width={24}
									height={24}
									alt=""
									className="w-[24px] h-[24px]"
								/>
							</div>
						</div>
					</div>

					{/* <div className="flex items-center justify-end w-full gap-2 mt-2 md:hidden">
						<h3 className="uppercase">explore by category</h3>
						<div className="cursor-pointer">
							<Image
								src="/images/keyboard_arrow_down.svg"
								width={20}
								height={20}
								alt=""
							/>
						</div>
					</div> */}

					{!loading ? (
						<div className="flex flex-row items-center justify-between w-full gap-4 overflow-auto grid-container">
							{products.map((product, index) => (
								<div
									onClick={() => calledimg(index)}
									key={index}
									className="flex flex-col items-start justify- h-60 shrink-0 w-36 md:w-40 lg:w-44 cursor-pointer">
									<Image
										src={product?.images[0]?.url || '/images/imagebw2.png'}
										width={200}
										height={200}
										className="object-cover w-full h-40"
										alt=""
									/>
									<div className="text-sm font-semibold md:text-base my-1">
										{product.productName?.length > 16
											? product.productName?.slice(0, 16) + '...'
											: product.productName}
									</div>
									<div className="flex items-center text-xs md:text-sm">
										<HiCurrencyRupee size={20} />
										{product.price}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-row space-x-2">
							<ProductCardLoader />
							<ProductCardLoader />
							<ProductCardLoader />
							<ProductCardLoader />
							<ProductCardLoader />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ArrivalWomen;