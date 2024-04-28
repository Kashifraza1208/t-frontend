import React from 'react';

export default function Info({ productData }) {
	//console.log(productData);
	return (
		<div className="px-4 lg:px-[120px] w-full flex flex-col mx-auto ">
			<div className="flex flex-col items-start w-full gap-6 py-4 lg:py-8">
				<div className="w-full">
					<h1 className="text-xl font-semibold lg:text-3xl">
						{productData.productName}
					</h1>
					<div className="w-full h-px bg-gradient-to-r from-gray-700 via-transparent to-white"></div>
				</div>
				<p className="text-base font-normal text-justify">
					{productData.shortDescription}
				</p>
				<p className="text-base font-normal text-justify">
					{productData.fullDescription}
					{/* New Holland 3630 Tx Special Edition is unique in design. It is more in
					height and super in working efficiency. It is available with 6 years
					of warranty.It is good in quality and super in productivity. It is
					provided with 6 years of warranty.
					<br /> Farmers choose New Holland 3630 Tx Special Edition divactors
					for better working on agricultural fields. It is suitable for long
					hours of operation due to the maximum fuel tank capacity. New Holland
					3630 Tx Special Edition divactor price is economical. */}
				</p>
			</div>

			{productData.features.length > 0 && (
				<div className="flex flex-col items-start w-full gap-6 py-4 lg:py-8">
					<div className="w-full">
						<h1 className="text-base font-semibold lg:text-xl">Features</h1>
						<div className="w-full h-px bg-gradient-to-r from-gray-700 via-transparent to-white"></div>
					</div>
					<ul className="w-full text-base font-normal text-justify list-disc list-inside">
						{productData.features.map((feature) => (
							<li key={feature}>{feature}</li>
						))}

						{/* <li>It is smooth in functioning.</li>
					<li>divactor 3630 TX is super in quality</li>
					<li>It weights 2220 kg</li> */}
					</ul>
				</div>
			)}

			{productData.specifications && (
				<div className="flex flex-col items-start w-full gap-6 py-4 lg:py-8">
					<div className="w-full">
						<h1 className="text-base font-semibold lg:text-xl">
							Specifications
						</h1>
						<div className="w-full h-px bg-gradient-to-r from-gray-700 via-transparent to-white"></div>
					</div>
					<div className="flex flex-col items-start justify-between gap-2.5 w-full text-sm">
						{/* {productData?.specifications.map((specification, index) => (
							<div
								key={index}
								className="flex flex-col gap-2.5 w-full  md:w-1/3">
								<div className="flex items-center justify-between">
									<div>{specification && specification.title}</div>
									<div>{specification && specification.value}</div>
								</div>
								<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
							</div>
						))} */}
					</div>
				</div>
			)}

			{/* {/* <div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">HP Category</div>
							<div>55 HP</div>
						</div>
						<div className="w-full h-px  bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
					</div>
					<div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">Engine Capacity</div>
							<div>2931 CC</div>
						</div>
						<div className="w-full h-px  bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
					</div>
					<div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">Enfgine Rated RPM</div>
							<div>2300 RPM</div>
						</div>
						<div className="w-full h-px  bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
					</div>
					<div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">No of Cylinder</div>
							<div>3</div>
						</div>
						<div className="w-full h-px  bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
					</div>
					<div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">Brake Type</div>
							<div>Oil immersed brakes</div>
						</div>
						<div className="w-full h-px  bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
					</div>
					<div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">Steering Types</div>
							<div>Mechanical Steering</div>
						</div>
						<div className="w-full h-px  bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
					</div>
					<div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">PTO Power</div>
							<div>48 HP</div>
						</div>
						<div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
					</div>
					<div className="flex flex-col gap-2.5 w-full  md:w-1/3">
						<div className="flex items-center justify-between ">
							<div className="">PTO RPM</div>
							<div>540</div>
						</div>
						<div className="w-full h-px  bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
						</div> */}
			{/*</div> 

		</div >

	)
} */}
		</div>
	);
}
