import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const ProductCard = ({ productDetails }) => {
	const { name, image, description, rating, numberOfRating, price, discount } =
		productDetails;
	const discountedPrice = (price - (price * discount) / 100).toFixed(2);
	return (
		<section className="body-font">
			<div className="">
				<div className="flex flex-col items-center gap-2 w-full">
					<div className="relative w-full">
						<Link href={'#'} className="block relative overflow-hidden">
							<Image
								alt="ecommerce"
								width={500}
								height={500}
								className="block min-w-[132px] w-full object-cover"
								src={`/images/${image}`}
							/>
						</Link>
						<div className="absolute text-black py-0.5 lg:py-1  px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
							<h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
								<span className="">{rating}</span>
								<span className="">
									<Image
										alt="ecommerce"
										width={25}
										height={25}
										className="w-2 h-2 lg:w-4 lg:h-4 "
										src="/images/vector2.svg"
									/>
								</span>
								{/* <span>
									<img
										alt="ecommerce"
										className=" md:mx-0  block px-1  lg:h-[3vh] h-[2vh]  md:h-full]"
										src="/images/line.svg"
									/>
								</span> */}
								<span className="border-l pl-1 border-gray-400">
									{numberOfRating}
								</span>
							</h2>
						</div>
						<div className="absolute text-black right-1 lg:right-2 top-1 lg:top-2 ">
							<h2 className="">
								<Image
									width={25}
									height={25}
									alt="ecommerce"
									className="h-5 lg:h-6 w-5 lg:w-6"
									src="/images/vector3.svg"
								/>
							</h2>
						</div>
					</div>

					<div className="flex flex-col items-start gap-1 w-full">
						<h3 className="font-poppins text-sm lg:text-[20px] font-semibold">
							{name}
						</h3>
						<p className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
							{description}
						</p>
						<span className="flex flex-row items-center gap-2">
							<span className="font-bold text-xs lg:text-sm">
								₹{discountedPrice}
							</span>
							<span className="font-light line-through  text-xs lg:text-sm">
								₹{price}
							</span>
							<span className=" text-[#EB8105]  text-xs lg:text-sm">
								({discount}% Off)
							</span>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductCard;
