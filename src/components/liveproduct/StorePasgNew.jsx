

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '../../UserContext';
import Pagination from '../pagination/Pagination';

import ShopNowCard from './ShopNowCard';

function StorePasgNew() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [changeImage, setChangeImage] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const productId = router.query.productId;
  const serverURL = process.env.BASE_API_URL;
  const [fetchedProducts, setfetchedProducts] = useState([]);

  const [selectedStoreProducts, setSelectedStoreProducts] = useState([]);

  const { user, setUser, authenticated, setAuthenticated } = useUser();
 

	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 8; // Change this value as needed
  
	const totalPages = Math.ceil(products.length / productsPerPage);
  
	const startIndex = (currentPage - 1) * productsPerPage;
	const endIndex = startIndex + productsPerPage;
	const displayedProducts = products.slice(startIndex, endIndex);
  
	const handlePageChange = (page) => {
	  setCurrentPage(page);
	};
  
  const [liveDemoProducts, setLiveDemoProducts] = useState([]);
 
  const fetchLiveDemoProducts = async () => {
    const customerId = user?._id || localStorage.getItem('customerId');
    try {
      const response = await axios.get(
        `${serverURL}/api/v1/liveDemo/${customerId}`
      );
      const data = response.data;
      console.log('Live Demo Products Data:', data);

      if ( data.items) {
        setLiveDemoProducts(data.items);
      } else {
        console.warn('Invalid live demo products data format:', data);
      }
    } catch (error) {
      console.error('Error fetching live demo products:', error);
    }
  };
  useEffect(() => {
    const customerId = user?._id || localStorage.getItem('customerId');
    const fetchProductData = async () => {
      setLoading(true);
      const { storeName } = router.query;

      try {
        // Make an API call to fetch live demo products
        const response = await axios.get(
          `${serverURL}/api/v1/liveDemo/${customerId}`
        );

        const data = response.data;
        console.log('Live Demo Data:', data);

        if (data.items) {
          // Filter products based on storeName
          const filteredProducts = storeName
            ? data.items.filter(
                (liveDemoProduct) =>
                  liveDemoProduct.storeId.storeName === storeName
              )
            : data.items;

          setProducts(filteredProducts);
        } else {
          console.warn('Invalid live demo products data format:', data);
        }
      } catch (error) {
        console.error('Error fetching live demo products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [user, router.query, serverURL]);

	const uniqueStoreNames = [
    ...new Set(products.map((product) => product.storeId.storeName)),
  ];
  
  console.log('Unique Store Names:', uniqueStoreNames);

	return (
		<>
			<div className="w-full px-7 mt-6">
				<div className="">
					<div className="font-Poppins text-xl leading-36 tracking-normal text-left ">
						<p>Selected product</p>
					</div>
                 <div className="flex flex-row mb-4 -ml-2 rounded">
					<Link href="/account" className="py-3 flex flex-row">
						<Image
							width={100}
							height={100}
							src={
								authenticated && user?.profilePic
									? user?.profilePic?.url
									: '/images/man.svg'
							}
							className="rounded-[50%] h-12 w-12 my-auto mx-2"
							alt="user"
						/>
						{authenticated ? (
							<div className="flex flex-col items-start justify-center">
								
          <div className="text-[16px] mr-3 flex text-gray-900 font-Poppins">
          {user.name}
          </div>

          <div className="font-semibold text-[16px] mr-3 flex text-gray-900 font-Poppins ">
          <span className="text-gray-900 font-Poppins text-16 font-normal mt-2">
          Product
          </span>
          <span className="text-[#FE7B2E] font-Poppins text-[24px] font-medium ml-1">
          {products.length}
          </span>
          </div>
          </div>
						) : (
							<div className="flex flex-col items-start justify-center">
								
								<div className="font-semibold text-[16px] mr-3 flex text-gray-900 font-Poppins">
									Wade Warren
								</div>
                <div>
                  <span>Product</span>
                  <span>{products.length}</span>
                </div>
							</div>
						)}
					</Link>
          <div className="flex ml-auto items-center">
        {uniqueStoreNames.map((storeName) => (
          <div key={storeName}>
            <button className="text-[16px] flex font-Poppins">
              <Link href={`ShopNowPage/?storeName=${encodeURIComponent(storeName)}`}>
                See All
              </Link>
            </button>
          </div>
        ))}
      </div>
				</div>
                </div>
				<div className='w-full'>
        <ShopNowCard products={selectedStoreProducts} />
            </div>
			<Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
			</div>	
			
		</>


	);
}

export default StorePasgNew;