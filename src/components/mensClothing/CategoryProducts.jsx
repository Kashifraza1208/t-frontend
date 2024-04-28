import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import FiltersMenu from '../filterMenu/FiltersMenu';
import Loading from '../Loading';
import axios from 'axios';
import AllProductsGrid from '../ProductCards/AllProductsGrid';
import Pagination from '../pagination/Pagination';
import { sampleProducts } from './cardsData';
import SkeletonLoader from '../ProductCards/SkeletonLoader';
const CategoryProducts = ({ CategoryProductsId }) => {
	// console.log("🚀 ~ file: CategoryProducts.jsx:14 ~ CategoryProductsId:", CategoryProductsId)

	// const CategoryProducts = ({ CategoryProductsId = "64cf85f5a192afa1c0232116" }) => {

	// const [selectedFilters, setSelectedFilters] = useState(null);
	// const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
	const [activeImage, setActiveImage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState(sampleProducts);
	const [cardTitle, setCardTitle] = useState([]);
	const [fetchedProducts, setfetchedProducts] = useState([]);
	// console.log("🚀 ~ file: CategoryProducts.jsx:554 ~ CategoryProducts ~ fetchedProducts:", fetchedProducts)
	const serverURL = process.env.BASE_API_URL;
	//Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 16;

	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const displayedProducts = fetchedProducts.slice(startIndex, endIndex);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	//Fetching Title and Products accorting to Particular Id
	useEffect(() => {
		const fetchTitle = async () => {
			setLoading(true);
			try {
				console.log(
					'🚀 ~ file: CategoryProducts.jsx:50 ~ fetchTitle ~ CategoryProductsId:',
					CategoryProductsId
				);
				const responseTitle = await axios.get(
					`${serverURL}/api/v1/categories/${CategoryProductsId}`
				);
				const extractedName = responseTitle.data.data.name;
				console.log(
					'🚀 ~ file: CategoryProducts.jsx:53 ~ fetchTitle ~ responseTitle:',
					extractedName
				);
				setCardTitle(extractedName);
			} catch (error) {
				console.error('Error fetching title:', error);
			}
		};

		const fetchProducts = async () => {
			setLoading(true);
			try {
				const response = await axios.post(`${serverURL}/api/v1/products`, {
					filters: {
						categories: [CategoryProductsId],
					},
				});
				setfetchedProducts(response.data.data);
				console.log('product', response.data.data);
			} catch (error) {
				console.error('Error fetching Products:', error);
			}

			setLoading(false);
		};

		// fetchTitle();
		fetchProducts();
	}, [CategoryProductsId, serverURL]);

	// function toggleFilterMenu() {
	// 	setFilterMenuOpen(!isFilterMenuOpen);
	// }
	useEffect(() => {
		const timer = setInterval(() => {
			setActiveImage((activeImage + 1) % 4);
		}, 1500);
		return () => clearInterval(timer);
	}, [activeImage]);
	return (
		<>
			{loading ? (
				<div className="flex flex-col gap-2 my-3">
					<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4">
						{Array.from({ length: productsPerPage }, (_, index) => (
							<SkeletonLoader key={index} />
						))}
					</div>
				</div>
			) : (
				<div>
					<div className="w-full px-5 lg:p-0">
						{fetchedProducts.length > 0 ? (
							<>
								<AllProductsGrid
									title={cardTitle || 'Title Here'}
									cards={displayedProducts}
									loading={loading}
								/>
								<Pagination
									currentPage={currentPage}
									totalPages={Math.ceil(
										fetchedProducts.length / productsPerPage
									)}
									onPageChange={handlePageChange}
								/>
							</>
						) : (
							<div className="">
								<div className="my-3 text-2xl font-semibold lg:block">
									{cardTitle || 'Title Here'}
								</div>
								<h2>No Products</h2>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default CategoryProducts;
