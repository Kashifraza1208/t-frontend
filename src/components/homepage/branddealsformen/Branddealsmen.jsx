import React from 'react';
import Image from 'next/image';
const Branddealsmen = ({ data }) => {
	return (
		<div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 w-full">
			{data.map((item, index) => (
				<div
					className="relative flex flex-col items-center justify-start w-full h-full"
					key={index}>
					<div className="shrink-0 w-full h-[90%]">
						<Image
							src={item.imageUrl}
							width={200}
							height={200}
							alt=""
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute -bottom-4 bg-white px-1 md:px-2 py-2 md:py-4 w-4/5 shadow-lg rounded-sm">
						<h2 className="font-semibold text-sm md:text-base text-center">
							{item.title}
						</h2>
						<p className="text-xs md:text-sm text-center">{item.description}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Branddealsmen;
