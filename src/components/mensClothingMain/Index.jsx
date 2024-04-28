import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FiltersMenu from '../filterMenu/FiltersMenu';
import ProductGrid from '../ProductCards/ProductGrid';
import {
	cardsmen,
	tshirts,
	semiformaltshirts,
	pants,
	suits,
} from './cardsData';

import BrandDeals from './BrandDeals';
import DealsByCategory from './DealsByCategory';
import CircularCardGrid from '../ProductCards/CircularCardGrid';

const MensClothing = ({}) => {
	const [selectedFilters, setSelectedFilters] = useState(null);
	const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
	const [activeImage, setActiveImage] = useState(1);

	const [products, setProducts] = useState(semiformaltshirts);

	useEffect(() => {
		fetch('https://trialshopy-backend.onrender.com/api/v1/products')
			.then((res) => res.json())
			.then((data) => {
				data = data['data'];
				data = data.map((product) => {
					product.productName = product.name;
					product.image = product.images.length
						? product.images[0].url
						: '/images/img-1.jpg';
					product.description = product.shortDescription;
					product.numberOfRating = product.rating;

					delete product.name;
					delete product.images;
					delete product.shortDescription;
					delete product.rating;

					return product;
				});
				setProducts(data);
			}, []);
	}, []);

	function toggleFilterMenu() {
		setFilterMenuOpen(!isFilterMenuOpen);
	}
	useEffect(() => {
		const timer = setInterval(() => {
			setActiveImage((activeImage + 1) % 4);
		}, 1500);
		return () => clearInterval(timer);
	}, [activeImage]);
	return (
		<div className="grid w-full grid-cols-1 gap-4 overflow-auto lg:grid-cols-5 grid-container">
			<div
				className={`col-span-1 ${
					isFilterMenuOpen ? 'translate-y-0 top-0' : 'lg:block hidden'
				} w-full h-min bg-gray-100 pt-9 pb-4 transition-transform duration-[425ms] ease-in-out`}>
				<div className="flex flex-row items-center justify-end w-full px-4 lg:hidden">
					<div
						className="p-1 text-white bg-black rounded lg:hidden"
						onClick={toggleFilterMenu}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							className="bi bi-x"
							viewBox="0 0 16 16">
							{' '}
							<path
								d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
								fill="white"></path>{' '}
						</svg>
					</div>
				</div>
				<FiltersMenu
					selectedFilters={selectedFilters}
					setSelectedFilters={setSelectedFilters}
				/>
			</div>
			<div
				className={`col-span-1 md:col-span-4 ${
					isFilterMenuOpen ? 'hidden' : 'block'
				} w-full lg:w-auto p-2 lg:p-5`}>
				<div className={`block lg:hidden w-full`}>
					<div className="flex flex-row items-center justify-end w-full">
						<div
							className="flex flex-row justify-center items-center gap-2.5 px-4 py-1 border border-black cursor-pointer"
							onClick={toggleFilterMenu}>
							<button>Filter</button>
							<Image
								src="/images/filtericon.svg"
								width={20}
								height={20}
								alt="filter icon"/>
						</div>
					</div>
				</div>
				<CircularCardGrid title={"Men's Clothing"} cards={cardsmen} />

				<div className="w-full px-5 lg:p-0">
					<ProductGrid title={'T-Shirts'} cards={products} />
				</div>

				<div className="w-full px-5 lg:p-0">
					<ProductGrid title={'Semi-formal Shirts'} cards={products} />
				</div>

				<div className="flex flex-col items-start w-full gap-8">
					<div className="order-1 w-full px-5 lg:order-2 lg:p-0">
						<DealsByCategory />
					</div>
					<div className="order-2 w-full px-5 lg:order-3 lg:p-0">
						<ProductGrid title={'Pants'} cards={products} />
					</div>
					<div className="order-3 w-full overflow-x-auto lg:order-1">
						<BrandDeals />
					</div>

					<div className="order-4 w-full px-5 lg:order-4 lg:p-0">
						<ProductGrid title={'Suits'} cards={products} />
					</div>
				</div>
				<div className="w-full px-5 lg:p-0">
					<div className="w-full lg:hidden">
						<Image
							src="/images/start-img.jpg"
							width={200}
							height={200}
							alt=""
							className="w-full h-full"
						/>
					</div>
				</div>

				<div className="flex items-center justify-center w-full px-5 md:justify-start lg:p-0">
					<div className="flex flex-col items-center justify-center gap-2 p-6 border rounded-sm md:flex-row md:justify-between lg:w-2/3">
						<div className="flex flex-col items-center gap-2 md:flex-row">
							<svg
								width="32"
								height="33"
								viewBox="0 0 32 33"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M28.6316 4.48885H1.68421V0.93329H28.6316V4.48885ZM16.8421 21.3777C16.8421 23.4044 17.5663 25.5733 18.5263 27.6V29.3777H1.68421V18.7111H0V15.1555L1.68421 6.26662H28.6316L29.8105 12.4888C28.6316 11.92 27.4189 11.6 26.1053 11.6C21.0526 11.6 16.8421 16.0444 16.8421 21.3777ZM15.1579 18.7111H5.05263V25.8222H15.1579V18.7111ZM32 21.3777C32 26 26.1053 32.9333 26.1053 32.9333C26.1053 32.9333 20.2105 26 20.2105 21.3777C20.2105 18 22.9053 15.1555 26.1053 15.1555C29.3053 15.1555 32 18 32 21.3777ZM28.1263 21.5555C28.1263 20.4888 27.1158 19.4222 26.1053 19.4222C25.0947 19.4222 24.0842 20.3111 24.0842 21.5555C24.0842 22.6222 24.9263 23.6888 26.1053 23.6888C27.2842 23.6888 28.2947 22.6222 28.1263 21.5555Z"
									fill="#7C7C7C"
								/>
							</svg>
							<div className="flex flex-col items-center justify-start gap-1">
								<h3 className="w-2/3 text-lg font-bold md:w-full">
									Can&apos;t find the Business
								</h3>
								<p className="w-2/3 font-thin text-center md:w-full md:text-left">
									Adding a business to Trialshopy is always free.{' '}
								</p>
							</div>
						</div>
						<Link href={'#'}>
							<button className="bg-[#EB8105] text-white px-4 py-1 rounded">
								Add Business
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MensClothing;
