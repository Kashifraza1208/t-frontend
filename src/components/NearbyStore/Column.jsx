import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Column({
	like,
	count,
	imageName,
	shop,
	logo,
	discount,
	text,
	location,
	distance,
}) {
	return (
		<>
			<Link
				href="/nearByStore/store"
				className="w-40 lg:w-60 mx-1 hover:shadow-md m-1 md:pb-2 rounded">
				<div className="relative">
					<Image
						width={20}
						height={20}
						src={`/images/store/${imageName}.svg`}
						alt=" random imgee"
						className=" md:mx-0 block sm:h-[30vh] h-[210px] w-[60vw] lg:p-2 md:p-1 md md:h-full md:w-[36vw]  "
					/>
					<div className="absolute text-black py-1 px-2 bg-white rounded-[16px] left-5 bottom-5">
						<h2 className="flex flex-row text-sm font-semibold">
							<div>{like}</div>
							<Image
								width={20}
								height={20}
								alt="ecommerce"
								src="/images/vector2.svg"
							/>
							<span className="mx-1 text-gray-400">|</span>
							{count}
						</h2>
					</div>
					<div className="absolute text-black right-4 top-4 ">
						<h2 className="mt-1 text-lg ">
							<Image
								width={20}
								height={20}
								alt="ecommerce"
								className="md:mx-0"
								src="/images/vector3.svg"
							/>
						</h2>
					</div>
				</div>

				<div className="mt-2 px-1 md:px-2">
					<h3 className="  font-serif md:text-[20px] mb-1">{shop}</h3>
					<div className="flex flex-row items-center">
						<Image
							width={20}
							height={20}
							alt="ecommerce"
							className="w-3 h-3 md:w-5 md:h-5"
							src={`/images/${logo}`}
						/>
						<span className="px-1 text-sm">{discount}</span>
						<span
							className={`ml-1 text-[12px] md:text-base ${
								text === 'open' ? 'text-green-500' : 'text-red-500'
							}`}>
							∙ {text === 'open' ? 'Open' : 'Closed'}
						</span>
					</div>
					<div className="flex flex-row">
						{location}
						{distance}
					</div>
				</div>
			</Link>
		</>
	);
}
