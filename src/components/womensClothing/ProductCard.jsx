import React from 'react';
import Image from 'next/image';
const ProductCard = ({ productDetails }) => {
	const { name, image, description, rating, numberOfRating, price, discount } =
		productDetails;
	const discountedPrice = (price - (price * discount) / 100).toFixed(2);
	return (
		<section className="shadow-lg body-font">
			<div className="p-1 mx-auto">
				<div className="flex flex-col items-center w-full gap-2">
					<div className="relative">
						<a className="block relative w-[60vw] md:w-fit  rounded overflow-hidden">
							<Image
								alt="ecommerce"
								className=" md:mx-0 block w-[58vw] h-[30vh] sm:p-2 md:h-full md:w-[36vw]"
								src={`/images/${image}`}
							/>
						</a>
						<div className="absolute text-black py-1 px-2 bg-white rounded-[16px] left-5 bottom-5">
							<h2 className="flex flex-row text-sm font-semibold">
								<span className="">{rating}</span>
								<span>
									{' '}
									<Image
										alt="ecommerce"
										className=" md:mx-0   block  lg:h-[3vh] h-[2vh]  md:h-full]"
										src="/images/vector2.svg"
									/>
								</span>
								<span>
									<Image
										alt="ecommerce"
										className=" md:mx-0  block px-1  lg:h-[3vh] h-[2vh]  md:h-full]"
										src="/images/line.svg"
									/>
								</span>
								<span>{numberOfRating}</span>
							</h2>
						</div>
						<div className="absolute text-black right-4 top-4 ">
							<h2 className="mt-1 text-lg ">
								<Image
									alt="ecommerce"
									className=" md:mx-0  block mt-1 lg:pt-1 lg:mt-0.5 lg:h-[5vh] h-[3vh]  md:h-full]"
									src="/images/vector3.svg"
								/>
							</h2>
						</div>
					</div>

					<div className="flex flex-col items-start w-full gap-1 p-2">
						<h3 className="font-poppins text-[20px] font-semibold">{name}</h3>
						<p className="text-[#7C7C7C] text-sm">{description}</p>
						<span className="flex flex-row items-center gap-2 ">
							<span className="font-bold ">₹{discountedPrice}</span>
							<span className="font-light line-through">₹{price}</span>
							<span className=" text-[#EB8105]">({discount}% Off)</span>
						</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductCard;
