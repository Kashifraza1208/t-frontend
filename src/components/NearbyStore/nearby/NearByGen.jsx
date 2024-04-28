import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularCardGrid from '../../ProductCards/CircularCardGrid';
import ProductCard from '../../ProductCards/ProductCard';
import Checkoutcat from '../checkoutcat';
import Link from 'next/link';

const NearByGen = ({ id }) => {
	const [userLocation, setUserLocation] = useState(null);
	const [categories, setCategories] = useState(null);
	const [products, setProducts] = useState([]);
	const serverURL = process.env.BASE_API_URL;

	useEffect(() => {
		const storedLocation = localStorage.getItem('userLocation');
		if (storedLocation) {
			setUserLocation(JSON.parse(storedLocation));
		}
	}, []);

	useEffect(() => {
		if (sessionStorage.getItem('homeCategories')) {
			const data = JSON.parse(sessionStorage.getItem('homeCategories'));
			const filteredData = data.filter((item) => item._id === id);
			console.log(filteredData);
			setCategories(filteredData[0]);
		} else {
			const api = `${serverURL}/api/v1/homeCategories`; // Corrected the template string
			axios
				.get(api)
				.then((response) => {
					sessionStorage.setItem(
						'homeCategories',
						JSON.stringify(response.data)
					);

					const filteredData = response.data.filter((item) => item._id === id);
					setCategories(filteredData[0]);
				})
				.catch((error) => {
					console.error('Error fetching categories:', error);
				});
		}
	}, [id, serverURL]);

	useEffect(() => {
		const api = `${serverURL}/api/v1/categoryProducts/${id}`; // Corrected the template string

		axios
			.get(api, {
				filters: {
					categories: id,
				},
			})
			.then((res) => {
				console.log(res.data);
				setProducts(res.data);
			})
			.catch((err) => console.error(err));
	}, [id, serverURL]);
	useEffect(() => {
		if (categories && categories.children) {
			console.log('Categories:');
			categories.children.forEach((category) => {
				console.log('category', category._id);
			});
		}
	}, [categories]);
	return (
		<div className="">
			<div className="ml-2 sm:hidden ">
				<Checkoutcat />
			</div>
			{categories && (
				<CircularCardGrid title={categories.name} cards={categories.children} />
			)}

			{products && categories ? (
				Object.keys(products).map((category) => (
					<div key={category}>
						<div className="flex px-4 font-poppins">
							<span className="mr-auto md:text-[20px] text-[16px] w-[80vw] font-medium  ">
								{category}
							</span>
							{categories.children.length > 0 && (
								<Link
									href={`/subcategory/${
										categories.children.find(
											(subCategory) => subCategory.name === category
										)?._id
									}`}
									key={category}>
									<div className="justify-end text-[14px] md:hidden ml-auto w-[15vw] text-black">
										See All
									</div>
								</Link>
							)}
						</div>

						<div className="flex flex-row px-4 mb-2 overflow-x-auto grid-container ">
							<div className="flex flex-row gap-4 py-4">
								{products[category].length > 0 &&
									products[category].map((item) => (
										<ProductCard
											productDetails={item}
											defaultImage={categories.image}
											key={item._id}
										/>
									))}
							</div>
						</div>
					</div>
				))
			) : (
				<p>NO STORES NEARBY</p>
			)}
		</div>
	);
};

export default NearByGen;
