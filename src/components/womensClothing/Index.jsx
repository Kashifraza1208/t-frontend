import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FiltersMenu from '../filterMenu/FiltersMenu';
import DealsByCategory from './DealsByCategory';
import { cardswomen } from '../homepage/womensclothing/cardswomen';
import CircularCardGrid from '../ProductCards/CircularCardGrid';
import ProductGrid from '../ProductCards/ProductGrid';
import DealsCardGrid from '../ProductCards/DealsCardGrid';
import axios from 'axios';

const tops = [
	{
		name: 'Product 1',
		image: '/images/clothing/Skirt.svg',
		description: 'This is the description of Product 1.',
		rating: 4.5,
		numberOfRating: 10,
		price: 19.99,
		discount: 10,
	},
	{
		name: 'Product 2',
		image: '/images/clothing/Skirt.svg',
		description: 'This is the description of Product 2.',
		rating: 4.2,
		numberOfRating: 8,
		price: 29.99,
		discount: 20,
	},
	{
		name: 'Product 1',
		image: '/images/clothing/Skirt.svg',
		description: 'This is the description of Product 1.',
		rating: 4.5,
		numberOfRating: 10,
		price: 19.99,
		discount: 10,
	},
	{
		name: 'Product 2',
		image: '/images/clothing/Skirt.svg',
		description: 'This is the description of Product 2.',
		rating: 4.2,
		numberOfRating: 8,
		price: 29.99,
		discount: 20,
	},
	{
		name: 'Product 3',
		image: '/images/clothing/Skirt.svg',
		description: 'This is the description of Product 3.',
		rating: 4.7,
		numberOfRating: 15,
		price: 39.99,
		discount: 15,
	},
	{
		name: 'Product 4',
		image: '/images/clothing/Skirt.svg',
		description: 'This is the description of Product 4.',
		rating: 4.0,
		numberOfRating: 6,
		price: 49.99,
		discount: 25,
	},
];

const WomensClothing = ({ CategoryId = '64cf87eea192afa1c0232158' }) => {
	const [selectedFilters, setSelectedFilters] = useState(null);
	const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);

	const [circularCard, setCircularCard] = useState([]);
	console.log(
		'🚀 ~ file: Index.jsx:75 ~ WomensClothing ~ circularCard:',
		circularCard
	);
	const [cardTitle, setCardTitle] = useState('');
	const [seletedCategory, setSeletedCategory] = useState();
	const [catgProducts, setcatgProducts] = useState([]);
	const [iscircularCardLoaded, setIscircularCardLoaded] = useState(false);

	function toggleFilterMenu() {
		setFilterMenuOpen(!isFilterMenuOpen);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post(
					'https://trialshopy-backend.onrender.com/api/v1/categories',
					{
						filters: { parent: CategoryId },
					}
				);
				setCircularCard(response.data);
				setIscircularCardLoaded(true);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};
		fetchData();
	}, [CategoryId]);

	useEffect(() => {
		if (iscircularCardLoaded && circularCard.length > 0) {
			setCardTitle(circularCard[0].name);
			setSeletedCategory(circularCard[0]._id);
		}
	}, [iscircularCardLoaded, circularCard]);

	const handleSelectedCatg = (cardId, cardTitle) => {
		setCardTitle(cardTitle);
		setSeletedCategory(cardId);
	};

	return (
		<div className="flex w-full gap-4 overflow-auto ">
			<div
				className={`${
					isFilterMenuOpen
						? 'translate-y-0 top-0'
						: 'translate-y-[50%] right-full lg:right-0 lg:translate-y-0'
				} absolute lg:relative w-full lg:w-1/6 bg-gray-100 h-min pt-9 pb-4 transition-transform duration-[425ms] ease-in-out z-20`}>
				<div className="flex flex-row items-center justify-end w-full px-4">
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
				className={`${
					isFilterMenuOpen ? 'hidden' : 'block'
				} w-full lg:w-5/6 p-2 lg:p-4 flex flex-col gap-8 `}>
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
								alt="filter icon"></Image>
						</div>
					</div>
				</div>
				<CircularCardGrid
					title={"Women's Clothing"}
					cards={circularCard}
					handleSelectedCatg={handleSelectedCatg}
					seletedCategory={seletedCategory}
				/>
				<div className="w-full px-5 overflow-x-auto lg:p-0">
					<ProductGrid title={'Tops'} cards={tops} />
					<ProductGrid title={'Shirts'} cards={tops} />
					<ProductGrid title={'Shorts'} cards={tops} />
					<DealsCardGrid title={'Brand Deals for Women'} cards={cardswomen} />
					<DealsByCategory />
				</div>

				<div className="flex items-center justify-center w-full md:justify-start">
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

export default WomensClothing;
