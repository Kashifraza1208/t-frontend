import React, { useState, useEffect } from 'react';
import LiveproductChat from './LiveproductChat';
import Image from 'next/image';
import LiveProductSide from './LiveProcuctSide';
import { useUser } from '../../UserContext';
import ShopnowSide from './ShopnowSide';
import axios from 'axios';
import StorePasgNew from './StorePasgNew';


function Liveproduct1() {
	const [isPlaying, setPlaying] = useState(false);
	const [selectedStoreProducts, setSelectedStoreProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 4; // Set the desired number of products per page

	const togglePlay = () => {
		setPlaying(!isPlaying);
	};

	const { user } = useUser();
	const serverURL = process.env.BASE_API_URL;

	const [liveDemoProducts, setLiveDemoProducts] = useState([]);

	const fetchLiveDemoProducts = async () => {
		const customerId = user?._id || localStorage.getItem('customerId');
		try {
			const response = await axios.get(
				`${serverURL}/api/v1/liveDemo/${customerId}`
			);
			const data = response.data;
			console.log('Live Demo Products Data:', data);

			if (Array.isArray(data) && data.length > 0 && data[0].items) {
				setSelectedStoreProducts(data[0].items);
			} else {
				console.warn('Invalid live demo products data format:', data);
			}
		} catch (error) {
			console.error('Error fetching live demo products:', error);
		}
	};

	useEffect(() => {
		fetchLiveDemoProducts();
	}, []);

	// Calculate the index of the first and last product on the current page
	// Calculate the index of the first and last product on the current page
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const displayedProducts = selectedStoreProducts.slice(startIndex, endIndex);

	// Calculate total pages
	const totalPages = Math.ceil(selectedStoreProducts.length / productsPerPage);

	// Function to handle page change
	const handlePageChange = (pageNumber) => {
		setCurrentPage();
	};

	return (
		<>
			<div className="md:mx-20">
				<div className="flex flex-col items-center justify-center p-1 mx-5 md:mx-37">
					<div className="w-full">
						{isPlaying ? (
							<div
								style={{
									position: 'relative',
									paddingBottom: '56.25%',
									height: 0,
								}}>
								<iframe
									title="YouTube Video"
									style={{
										position: 'absolute',
										width: '100%',
										height: '100%',
									}}
									src="https://www.youtube.com/embed/N3AkSS5hXMA"
									frameBorder="0"
									allowFullScreen></iframe>
							</div>
						) : (
							<Image
								width={500}
								height={500}
								src="/images/goLiveSale.png"
								alt=""
								className="w-full h-auto cursor-pointer"
								onClick={togglePlay}
							/>
						)}
					</div>
				</div>

				<div className="2xl:flex lg:flex mx-5 gap-[40px] px-1">
					<div className="">
						<LiveProductSide />
					</div>

					<div className="w-full">
						<div className="">
							<ShopnowSide />
						</div>

						<div className="mt-5">
							<LiveproductChat />
						</div>
					</div>
				</div>

				<div className="">
					<StorePasgNew />
					{/* <div className="w-full">
            <ShopNowCard products={displayedProducts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div> */}
				</div>
			</div>
		</>
	);
}

export default Liveproduct1;
