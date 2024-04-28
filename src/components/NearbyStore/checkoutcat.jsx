import { useState, useEffect } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function Checkoutcat() {
	const [userLocation, setUserLocation] = useState(null);
	const router = useRouter();
	const Column = ({ imageName, text, route }) => (
		<>
			<div
				className="flex flex-col rounded cursor-pointer "
				onClick={() => handleRequestLocationAccess(route)}>
				<div className="w-[260px]  relative p-0 -mx-2 overflow-hidden  rounded-[8px] h-32 md:w-24 lg:w-48 md:h-24 lg:h-44 lg:rounded-sm">
					{/* <button className= 'bg-yellow-400 '>Checkout</button> */}
					<Image
						className="w-[260px] h-full px-3 rounded-md "
						src={`/images/${imageName}`}
						width={300}
						height={300}
						alt=""
					/>
					{/* <div className="absolute text-black py-1 px-2  rounded-[16px] left-8 bottom-6">
						<div className='text-white text-[14px] py-1 font-fontMedium '>Sale Upto 15% Off</div>
						<button className= 'bg-[#EB8105] text-[16px] rounded-[12px] py-[5px] px-[6px] flex flex-row '>
							Checkout
							<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<g clipPath="url(#clip0_4893_5386)">
													<path
														d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
														fill="black"
													/>
												</g>
												<defs>
													<clipPath id="clip0_4893_5386">
														<rect width="24" height="24" fill="black" />
													</clipPath>
												</defs>
											</svg>
							</button>
						
					</div> */}
				</div>
				{/* <div className="p-2">
					<p className="text-sm text-center lg:text-base">{text}</p>
				</div> */}
			</div>
		</>
	);

	useEffect(() => {
		const storedLocation = localStorage.getItem('userLocation');
		if (storedLocation) {
			setUserLocation(JSON.parse(storedLocation));
		}
	}, []);

	const handleRequestLocationAccess = (route) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const { latitude, longitude } = position.coords;

				localStorage.setItem(
					'userLocation',
					JSON.stringify({ latitude, longitude })
				);

				console.log(latitude, longitude);
				setUserLocation({ latitude, longitude });

				router.push(route);
			});
		} else {
			// Geolocation not available
		}
	};
	return (
		<>
			<div className="flex flex-row justify-start w-full mt-4 mb-2 overflow-auto grid-container pr-[140px]">
			<div className="absolute text-black py-8 px-8  rounded-[16px] z-40 ">
						<div className='text-white text-[14px] py-1 font-fontMedium '>Sale Upto 15% Off</div>
						<button className= 'bg-[#EB8105] text-[16px] rounded-[12px] py-[5px] px-[6px] flex flex-row '>
							Checkout
							<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<g clipPath="url(#clip0_4893_5386)">
													<path
														d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
														fill="black"
													/>
												</g>
												<defs>
													<clipPath id="clip0_4893_5386">
														<rect width="24" height="24" fill="black" />
													</clipPath>
												</defs>
											</svg>
							</button>
						
					</div>
				<div className="rounded-[8px]">
					{/* <Link href="/nearByStore/fashion"> */}
					<Column
						imageName="design2.svg"
						text="Nearby Fashion"
						route="/nearByStore/fashion"
					/>
					{/* </Link> */}
				</div>
				<div className="">
					{/* <Link href="/nearByStore/jewellery"> */}
					<Column
						imageName="design1.svg"
						text="Nearby Jewellery"
						route="/nearByStore/jewellery"
					/>
					{/* </Link> */}
				</div>
				<div className="">
					<Column
						imageName="design1.svg"
						text="Nearby Beauty & Cosmetics"
						route="/nearByStore/beauty"
					/>
				</div>
				<div className="">
					<Column
						imageName="design1.svg"
						text="Nearby Beauty & Cosmetics"
						route="/nearByStore/beauty"
					/>
				</div>
				{/* <div className=""> */}
				                    	{/* <Link href="/nearByStore/electronics"> */}
					{/* <Column
						imageName="arrival5.svg"
						text="Nearby Electronics"
						route="/nearByStore/electronics"
					/> */}
					{/* </Link> */}
				{/* </div> */}
				{/* <div className=""> */}
					{/* <Link href="/nearByStore/furniture"> */}
					{/* <Column
						imageName="arrival6.svg"
						text="Nearby Furniture"
						route="/nearByStore/furniture"
					/> */}
					{/* </Link> */}
				{/* </div> */}
				<div className="">
					{/* <Link href="/nearByStore"> */}
					{/* <Column
						imageName="arrival7.svg"
						text="Nearby All Shops"
						route="/nearByStore"
					/> */}
					{/* </Link> */}
					{/* <Column imageName="nearByAllShops.png" text="Near by All Shops" /> */}
				</div>
			</div>
		</>
	);
}
