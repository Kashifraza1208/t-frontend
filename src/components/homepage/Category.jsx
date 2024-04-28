import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
const serverURL = process.env.BASE_API_URL;

const SubCatCol = ({ subCategories, id }) => {
	return (
		<div className="grid w-full grid-cols-2 lg:grid-cols-1 ">
			{subCategories.slice(0, 4).map((subCat) => (
				<Link
					href={`/subcategory/${subCat.id}`}
					key={subCat._id}
					className="text-[14px] md:text-[16px] text-gray-700 ">
					{subCat.name}
				</Link>
			))}
		</div>
	);
};

const Category = () => {
	const [categories, setCategories] = useState([]);
	
	useEffect(() => {
		// let isApiSubscribed = true;
		// if (isApiSubscribed) {
		const api = `${serverURL}/api/v1/getFeatured`;
		// const api = 'http://localhost:7000/api/v1/getFeatured';
		axios
			.get(api)
			.then((response) => {
				setCategories(response.data); // Re-render
				console.log('From Categogy.jsx: ', response.data);
			})
			.catch((error) => {
				console.error(error);
			});
		// }

		// return () => {
		// 	isApiSubscribed = false; // Clean up when the component unmounts
		// };
	}, []);

	return (
		<>
			<div className="w-full">
				<div className="text-xl font-bold text-left">
					<Link href={`/category/${categories[0]?._id ?? null}`}>
						<h2 className="inline-block mb-5 uppercase border-b-2 border-red-700 ">
							Featured Categories
						</h2>
					</Link>
				</div>
				
				{/* <div className="grid w-full grid-cols-1 gap-6 py-4 overflow-auto md:grid-cols-2 lg:grid-cols-3 lg:gap-x-20 max-h-72 md:max-h-max lg:max-h-max grid-container">
					{categories.map((category) => (
						<div key={category._id} className="flex flex-row w-full gap-4">
							<div className="w-20 h-20 overflow-hidden rounded-full shrink-0 md:w-24 lg:w-32 md:h-24 lg:h-32 lg:rounded-sm">
								<Image
									alt={category.name}
									className="object-cover w-full h-full"
									src={`${serverURL}/api/v1${category.image.url}`}
									width={150}
									height={150}
								/>
							</div>
							<div className="flex flex-col items-start justify-center w-full gap-2 pr-1 lg:justify-start">
								<Link href={`/category/${category._id}`}>
									<h2 className="text-base font-semibold tracking-widest ">
										{category.name}
									</h2>
								</Link>
								<SubCatCol
									subCategories={category.children}
									id={category._id}
								/>
							</div>
						</div>
					))}
					
				</div> */}
			</div>
		</>
	);
};

export default Category;
