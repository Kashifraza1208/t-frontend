import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
import Image from '../../../utils/Image';
import Link from 'next/link';
import NearBy from './nearby/NearBy';
import Category from './Category';
import Arrivalmen from './arrival/ArrivalMen';
import Arrivalwomen from './arrival/ArrivalWomen';
import Electronics from './electronics/Electronics';
import Mensclothing from './mensclothing/Mensclothing';
import Furniture from './furniture/Furniture';
import Womensclothing from './womensclothing/Womensclothing';
import Arrival from './womensclothing/Arrival';
import { cards } from './electronics/cards.js';
import NewArrival from './arrival/NewArrival';

import { cardsmen } from './mensclothing/cardsmen';
import { cardswomen } from './womensclothing/cardswomen';
import { cardsfurniture } from './furniture/cardsfurniture';

import PopularMerchant from './popularMerchantsNearYou/index';
import BrandNewDeals from './branddeals/index';
import Branddealsmen from './branddealsformen/Branddealsmen';
import BoysCollection from './boysAndGirlsCollection/BoysCollection';
import GirlsCollection from './boysAndGirlsCollection/GirlsCollection';
import Jewellery from './arrival/Jewellery';



import axios from 'axios';

const HomePage = () => {
	const [categoriesData, setCategoriesData] = useState([]);
	const [mensClothing, setMensClothing] = useState([]);
	const [womensClothing, setWomensClothing] = useState([]);
	const [electronics, setElectronics] = useState([]);
	const [furniture, setFurniture] = useState([]);
	const [boysCollection, setBoysCollection] = useState([]);
	const [girlsCollection, setGirlsCollection] = useState([]);
	// const [jewellery, setJewellery] = useState([]);

	const serverURL = process.env.BASE_API_URL;

	const loaderProp = ({ src }) => {
		return src;
	};

	// useEffect(() => {
	// 	const api = `${serverURL}/api/v1/homePageCategories`;
	// 	// const api = 'http://localhost:7000/api/v1/homePageCategories';

	// 	axios
	// 		.get(api)
	// 		.then((res) => {
	// 			setCategoriesData(res.data);
	// 			setMensClothing(res.data.mensClothing);
	// 			setWomensClothing(res.data.womensClothing);
	// 			setElectronics(res.data.electronic);
	// 			setFurniture(res.data.furniture);
	// 			setBoysCollection(res.data.boysCollection);
	// 			setGirlsCollection(res.data.girlsCollection);
	// 			// console.log(res.data);
	// 		})
	// 		.catch((err) => console.error(err));
	// }, [serverURL]);

	useEffect(() => {
		if (sessionStorage.getItem('homeCategories')) {
			setCategoriesData(JSON.parse(sessionStorage.getItem('homeCategories')));
		} else {
			const api = `${serverURL}/api/v1/homeCategories`;

			axios
				.get(api)
				.then((response) => {
					setCategoriesData(response.data);

					sessionStorage.setItem(
						'homeCategories',
						JSON.stringify(response.data)
					);
				})
				.catch((error) => {
					console.error('Error fetching categories:', error);
				});
		}
	}, [serverURL]);

	return (
		<div className="flex flex-col items-start gap-2 py-4 lg:gap-8 lg:py-12 ">
			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<div className="text-xl font-bold text-left ">
					<h2 className="inline-block mb-5 border-b-2 border-red-700 ">
						Nearby Products
					</h2>
				</div>
				<NearBy />
				{/* <Category /> */}
			</div>
			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				
			</div>
			{categoriesData &&
				categoriesData?.length > 0 &&
				categoriesData.map((category, index) => (
					<div
						key={category._id}
						className="px-4 md:px-12 lg:px-[120px] w-full">
						<div>
							<Link href={`/nearByStore/${category._id}`} className="">
								<div className="text-xl font-bold text-left">
									<h2 className="inline-block mb-5 border-b-2 border-red-700 ">
										{category.name}
									</h2>
								</div>
							</Link>
							{category.children?.length > 0 && (
								<div className="flex flex-row items-center justify-between gap-4 lg:gap-6 w-full overflow-auto grid-container">
									{category.children.map((card, index) => (
										<Link
											key={index}
											href={`/subcategory/${card._id}`}
											className="">
											<div className="flex flex-col items-center gap-3 shrink-0 hover:font-semibold">
												<div className="w-36 md:w-48 lg:w-[220px] h-36 md:h-48 lg:h-[220px] overflow-auto hover:shadow-lg rounded-[6px] border-[1px] p-2 border-[#EEEEEE]">
													<Image
														width={300}
														height={300}
														src={card?.image.url}
														alt={card.name}
														className="w-full h-full object-cover"
														loader={loaderProp}
													/>
												</div>

												<div className="w-full">
													<p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] font-[600]">
														{card.name}
													</p>
													<p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] text-[#888888]">
														10% discount
													</p>
												</div>
											</div>
										</Link>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			{/* 
			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<div>
					<Link href={'/category/64bf871dd330d15fd844948c'} className="">
						<div className="text-xl font-bold text-left">
							<h2 className="inline-block mb-5 border-b-2 border-red-700 ">
								MEN&apos;S CLOTHING
							</h2>
						</div>
					</Link>
					{mensClothing.length > 0 && <Mensclothing cards={mensClothing} />}
				</div>
			</div> */}
			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<div>
					<Link href={'/category/64cf8488a192afa1c02320f5'} className="">
						<div className="text-xl font-bold text-left">
							<h2 className="inline-block mb-5 border-b-2 border-red-700 ">
								WOMEN&apos;S CLOTHING
							</h2>
						</div>
					</Link>

					
					{womensClothing.length > 0 && (
						<Womensclothing cards={womensClothing} />
					)}
				</div>
			</div> */}

			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<Image
					width={1000}
					height={100}
					src="/images/diwali2.svg"
					alt="ads"
					className="w-full m-auto"
				/>
			</div>

			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<Arrivalmen />
			</div> */}

			{/* Arrival */}
			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<div>
					<Link href={'/category/64cf8488a192afa1c02320f5'} className="">
						<div className="text-xl font-bold text-left">
							<h2 className="inline-block mb-5 border-b-2 border-red-700 ">
											NEW ARRIVALS
							</h2>
						</div>
					</Link>

					<DealsCardGrid title={''} cards={cardswomen} />
					{womensClothing.length > 0 && (
						<Arrival cards={womensClothing} />
					)}
				</div>
			</div> */}

			{/* Arrival */}

			<div className="px-4 md:px-12 lg:px-[118px] w-full">
				<Link href={'/category/64cf8488a192afa1c02320f5'} className="">
					<div className="text-xl font-bold text-left">
						<h2 className="inline-block mt-2 mb-1 border-b-2 border-red-700 ">
							NEW ARRIVALS
						</h2>
					</div>
				</Link>
				<NewArrival />
			</div>

			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<Arrivalwomen />
			</div> */}

			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<div>
					<BrandDeals data={cardbd} />
				</div>
			</div>
			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<DealsCardGrid title={'BRAND DEALS FOR WOMEN'} cards={cardswomen} />
			</div> */}
			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<div>
					<div className="text-xl font-bold text-left">
						<h2 className="inline-block mb-5 border-b-2 border-red-700 ">
							ELECTRONICS
						</h2>
					</div>

					{electronics.length > 0 && <Electronics cards={electronics} />}
				</div>
			</div> */}
			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<BrandNewDeals />
			</div>
			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<Image
					width={1000}
					height={100}
					src="/images/ads2.png"
					alt="ads"
					className="w-full m-auto"
					loader={loaderProp}
				/>
			</div>
			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<PopularMerchant />
			</div>

			<div className="w-full bg-gradient-to-b from-transparent h-full to-[#DCDFFA]">
                <BoysCollection />
            </div>

			<div className='bg-gradient-to-b from-transparent to-[#FBD0F1] h-full w-full'>
				<GirlsCollection />
			</div>

		   
			{/* <div className="bg-gradient-to-t from-[#DCDFFA] to-[rgba(246, 246, 252, 0)] w-full">
				<div className="px-4 md:px-12 lg:px-[120px] w-full">
					{boysCollection && boysCollection.length > 0 && (
						<BoysCollection cards={boysCollection} />
					)}
				</div>
			</div> */}

			{/* <div className="bg-gradient-to-t from-[#FBD0F1] to-[rgba(246, 246, 252, 0)] w-full">
				<div className="px-4 md:px-12 lg:px-[120px] w-full">
					{girlsCollection && girlsCollection.length > 0 && (
						<GirlsCollection cards={girlsCollection} />
					)}
				</div>
			</div> */}

			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<Jewellery />
			</div> */}

			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<div>
					<Link href={'/nearByStore/furniture'} className="">
						<div className="text-xl font-bold text-left">
							<h2 className="inline-block mb-5 border-b-2 border-red-700 ">
								FURNITURE
							</h2>
						</div>
					</Link>

					{furniture.length > 0 && <Furniture cards={furniture} />}
				</div>
			</div> */}

			{/* <div className="px-4 md:px-12 lg:px-[120px] w-full">
				<Image
					width={1000}
					height={100}
					src="/images/ads3.png"
					alt="ads"
					className="w-full m-auto"
				/>
			</div> */}

			<div className="px-4 md:px-12 lg:px-[120px] w-full">
				<Image
					width={1000}
					height={100}
					src="/images/ads4.png"
					alt="ads"
					className="w-full m-auto"
				/>
			</div>
		</div>
	);
};

export default HomePage;
