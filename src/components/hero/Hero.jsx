import Link from 'next/link';
import {
	Carousel,
	Typography,
	Button,
	IconButton,
} from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function useWindowWidth() {
	const [windowWidth, setWindowWidth] = useState(
		typeof window !== 'undefined' ? window.innerWidth : 0
	);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []); // Empty dependency array means this effect runs once after the initial render

	return windowWidth;
}

export default function Hero() {
	const smallImageURL1 = '/images/hero_background.jpg';
	const largeImageURL1 = '/images/hero_background.jpg';
	const screenWidth = useWindowWidth();
	const imageUrl1 = screenWidth > 600 ? largeImageURL1 : smallImageURL1;
	//2nd Page
	const smallImageURL2 = '/images/BannerMega.svg';
	const largeImageURL2 = '/images/Banner1.svg';
	// const screenWidth = useWindowWidth();
	const imageUrl2 = screenWidth > 600 ? largeImageURL2 : smallImageURL2;

	//3rd Page
	const smallImageURL3 = '/images/BannerSuper.svg';
	const largeImageURL3 = '/images/Banner5.svg';
	// const screenWidth = window.innerWidth;
	const imageUrl3 = screenWidth > 600 ? largeImageURL3 : smallImageURL3;

	//4th Page
	const smallImageURL4 = '/images/BannerBig.svg';
	const largeImageURL4 = '/images/Banner6.svg';
	// const screenWidth = window.innerWidth;
	const imageUrl4 = screenWidth > 600 ? largeImageURL4 : smallImageURL4;

	//5th Page
	const smallImageURL5 = '/images/BannerFlash.svg';
	const largeImageURL5 = '/images/Banner7.svg';
	// const screenWidth = window.innerWidth;
	const imageUrl5 = screenWidth > 600 ? largeImageURL5 : smallImageURL5;
	return (
		<>
			<div className="  object-cover w-full lg:h-[60vh] h-[180px] ]  ">
				<Carousel
					className=""
					transition={{ duration: 2 }}
					autoplay={true}
					loop={true}
					nexticon=""
					nextlabel=""
					//prev arrow
					prevArrow={({ handlePrev }) => (
						<IconButton
							variant="text"
							color="white"
							size="lg"
							onClick={handlePrev}
							className="!absolute top-2/4 left-4 -translate-y-2/4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 0 0"
								strokeWidth={2}
								stroke="currentColor"
								className="w-0 h-0">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
						</IconButton>
					)}
					//next Arrow
					nextArrow={({ handlePrev }) => (
						<IconButton
							variant="text"
							color="white"
							size="lg"
							onClick={handlePrev}
							className="!absolute top-2/4 left-4 -translate-y-2/4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 0 0"
								strokeWidth={2}
								stroke="currentColor"
								className="w-0 h-0">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
						</IconButton>
					)}>
					{/* <div
						// style={{
						// 	backgroundImage: `url("images/hero_background.jpg")`,
						// 	backgroundRepeat: 'no-repeat',
						// 	backgroundSize: 'cover',
						// }}
						className="flex items-center justify-start w-full h-full lg:justify-center ">
						<div className="flex flex-col items-start justify-between px-5 lg:px-[120px] py-6 lg:py-[120px]  w-full h-full">
							<h2 className="hero-text text-white text-[20px] lg:text-[32px] font-semibold">
								YOUR OWN TRIAL ROOM
							</h2>
							<h2 className="text-white text-[18px] lg:text-[22px] font-medium">
								ANYWHERE ANYTIME
							</h2>
							<p className="hidden lg:block text-white text-[18px]">
								Enhancing the online shopping experience to mirror the reality
								<br />
								of physical retail
							</p>
							<Link
								href="/products"
								className="text-base font-normal text-black py-auto font-poppins">
								<button className="flex flex-row items-center justify-center rounded-md py-2 px-4 bg-gradient-to-t from-[#FAAC06]  to-[#EB8105]">
									<p className="flex gap-1 font-medium captilize lg:uppercase">
										Explore <span className="hidden lg:flex">Now</span>
									</p>
									<div className="flex items-center">
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
													<rect width="24" height="24" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</div>
								</button>
							</Link>
						</div>
					</div> */}
					<div className="relative w-full h-full ">
						<Image
							src={imageUrl1}
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
							{/* <div className="w-full text-center md:w-2/4">
            <div className="flex justify-start mr-auto ">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div> */}
							<div className="flex flex-col items-start justify-between px-5 lg:px-[120px] py-6 lg:py-[90px]  w-full h-full">
								<h2 className="hero-text text-white text-[20px] lg:text-[32px] font-semibold">
									YOUR OWN TRIAL ROOM
								</h2>
								<h2 className="text-white text-[18px] lg:text-[22px] font-medium">
									ANYWHERE ANYTIME
								</h2>
								<p className="hidden lg:block text-white text-[18px]">
									Enhancing the online shopping experience to mirror the reality
									<br />
									of physical retail
								</p>
								<Link
									href="/products"
									className="text-base font-normal text-black py-auto font-poppins">
									<button className="flex flex-row items-center justify-center rounded-md py-2 px-4 bg-gradient-to-t from-[#FAAC06]  to-[#EB8105]">
										<p className="flex gap-1 font-medium captilize lg:uppercase">
											Explore <span className="hidden lg:flex">Now</span>
										</p>
										<div className="flex items-center">
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
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="relative w-full h-full ">
						<Image
							src={imageUrl2}
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
							{/* <div className="w-full text-center md:w-2/4">
            <div className="flex justify-start mr-auto ">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div> */}
							<div className="absolute left-0 px-6 md:bottom-12 md:left-20 bottom-4">
								<Link
									href="/products"
									className="text-base font-normal text-black py-auto font-poppins">
									<button className="flex flex-row items-center justify-center px-4 py-1 text-white bg-black rounded-md md:py-2">
										<p className="flex gap-1 font-medium captilize lg:uppercase">
											Shop <span className="hidden lg:flex">Now</span>
										</p>
										<div className="flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<g clipPath="url(#clip0_4893_5386)">
													<path
														d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0_4893_5386">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="relative w-full h-full ">
						<Image
							src={imageUrl3}
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={500}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
							{/* <div className="w-full text-center md:w-2/4">
            <div className="flex justify-start mr-auto ">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div> */}
							<div className="absolute left-0 px-6 lg:bottom-10 md:left-20 bottom-4">
								<Link
									href="/products"
									className="text-base font-normal text-black py-auto font-poppins">
									<button className="flex flex-row items-center justify-center px-4 py-1 text-white bg-black rounded-md md:py-2">
										<p className="flex gap-1 font-medium captilize lg:uppercase">
											Shop <span className="hidden lg:flex">Now</span>
										</p>
										<div className="flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<g clipPath="url(#clip0_4893_5386)">
													<path
														d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0_4893_5386">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="relative w-full h-full ">
						<Image
							src={imageUrl4}
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
							{/* <div className="w-full text-center md:w-2/4">
            <div className="flex justify-start mr-auto ">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div> */}
							<div className="absolute left-0 px-6 md:bottom-10 md:left-20 bottom-4">
								<Link
									href="/products"
									className="text-base font-normal text-black py-auto font-poppins">
									<button className="flex flex-row items-center justify-center px-4 py-1 text-white bg-black rounded-md md:py-2">
										<p className="flex gap-1 font-medium captilize lg:uppercase">
											Shop <span className="hidden lg:flex">Now</span>
										</p>
										<div className="flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<g clipPath="url(#clip0_4893_5386)">
													<path
														d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0_4893_5386">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="relative w-full h-full ">
						<Image
							src={imageUrl5}
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
							{/* <div className="w-full text-center md:w-2/4">
            <div className="flex justify-start mr-auto ">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div> */}
							<div className="absolute left-0 px-6 md:bottom-10 md:left-20 bottom-4">
								<Link
									href="/products"
									className="text-base font-normal text-black py-auto font-poppins">
									<button className="flex flex-row items-center justify-center px-4 py-1 text-white bg-black rounded-md md:py-2">
										<p className="flex gap-1 font-medium captilize lg:uppercase">
											Shop <span className="hidden lg:flex">Now</span>
										</p>
										<div className="flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none">
												<g clipPath="url(#clip0_4893_5386)">
													<path
														d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0_4893_5386">
														<rect width="24" height="24" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</Carousel>
			</div>
		</>
	);
}
