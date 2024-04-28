import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const img_fashion = '/images/clothing/MShirt.svg';

const BrandCard = ({ productDetails }) => {
	return (
		<>
			<div className="flex flex-col gap-2 items-center my-3">
				<div className="flex flex-col items-center justify-center h-[180px] w-[170px] md:h-[200px] lg:h-[275px] md:w-[210px] lg:w-[285px] my-2">
					<Image
						width={100}
						height={100}
						src={img_fashion}
						alt="Deal imgee"
						className="w-full lg:h-[270px] lg:w-[270px]"
					/>
					<div className="relative w-[80%] rounded -mt-10">
						<div className="bg-white p-1 shadow-md">
							<div className="mt-1 font-medium uppercase justify-center flex text-sm md:text-base">
								Brands
							</div>
							<div className="mt-2 text-center text-sm text-[#22191C] font-400 pb-4">
								Up to 40% OFF
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BrandCard;
