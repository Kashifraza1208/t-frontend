import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';

import axios from 'axios';
import Link from 'next/link';

const ProductCard = ({ product }) => {
	// const [categories, setCategories] = useState([]);

	// const serverURL = process.env.BASE_API_URL;
	// useEffect(() => {
	// 	const api = `${serverURL}/api/v1/categories`;
	// 	axios
	// 		.post(api, {
	// 			filters: {
	// 				parent: '64b9004688cb61a80b5cf509',
	// 			},
	// 		})
	// 		.then((res) => setCategories(res.data))
	// 		.catch((err) => console.error(err));
	// }, [serverURL]);

	const discountedPrice =
		product?.price - (product?.price * product?.discount) / 100;
	const serverURL = process.env.BASE_API_URL;
	return (
		<Link
			href={`/products/details?productId=${product._id}`}
			className="h-full">
			<div className="flex flex-col items-start justify-between h-full w-52 shadow-lg p-2 shrink-0 hover:border">
				<div className="w-full h-2/3 relative">
					<Image
						src={
							product?.images?.length > 0
								? `${serverURL}${product.images[0]} `
								: '/images/img-5.jpg'
						}
						alt=""
						className="w-full h-full object-cover"
						width={200}
						height={200}
					/>
					<div className="w-5 h-5 absolute top-2 right-2">
						<Image
							src={'/images/heart.svg'}
							width={20}
							height={20}
							className="w-full h-full"
							alt="heart"
						/>
					</div>
				</div>

				<div className="flex flex-col w-full">
					<h2 className="font-semibold">{product.productName}</h2>
					<p className="font-light">{product.shortDescription}</p>
					<div className="flex flex-row items-center justify-between w-full">
						<div className="flex flex-row gap-4">
							<p className="font-bold">₹{discountedPrice}</p>
							<p className="font-light line-through">₹{product.price}</p>
						</div>

						<p className="text-[green]">{product.discount}% off</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

const Jewellery = () => {
	const [products, setProducts] = useState([]);
	const serverURL = process.env.BASE_API_URL;

	useEffect(() => {
		const api = `${serverURL}/api/v1/products`;
		axios
			.post(api, {
				filters: {
					categories: ['64b9004688cb61a80b5cf509'],
				},
			})
			.then((res) => {
				// console.log(res.data);
				setProducts(res.data.data);
			})
			.catch((err) => console.error(err));
	}, []);
	return (
		<>
			<div className="mt-5 flex flex-col lg:flex-row  items-center gap-4 w-full">
				<div className="flex flex-col  gap-2 items-start lg:justify-between lg:h-80 w-full lg:w-2/5">
					<h1 className="w-full text-xl uppercase font-bold underline underline-offset-8 decoration-red-700">
						new arrival women jewellery
					</h1>
					<div className="mt-4 lg:m-0 flex flex-row gap-2 items-center lg:flex-col lg:items-start">
						<Image
							src="/images/arrival_jew_vector.svg"
							alt=""
							className="h-[84px] w-[68px]"
							width={200}
							height={200}
						/>
						<h2 className="">Hundred of latest arrivals all in one place</h2>
					</div>
					<Link href={'/category/64b9004688cb61a80b5cf509'}>
						<button className=" hidden lg:block bg-[#F50208] lg:bg-[#ff8c00fc] uppercase hover:bg-blue-900 mt-2 shadow-lg text-white  text-sm px-4 py-2">
							shop all
						</button>
					</Link>
				</div>
				<div className="flex flex-row items-center justify-between w-full h-80 gap-4  overflow-auto grid-container">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
				<div className="lg:hidden flex items-center justify-start w-full">
					{/* <button className=" bg-[#F50208] lg:bg-[#ff8c00fc] uppercase hover:bg-blue-900 mt-2 shadow-lg text-white rounded-lg text-sm px-4 py-2">
						shop all
					</button> */}
					<Link href={'/category/64b9004688cb61a80b5cf509'}>
						<button className=" m-auto bg-[#ff8c00fc] uppercase my-2 shadow-lg text-white  text-sm px-4 py-2">
							shop all
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Jewellery;
