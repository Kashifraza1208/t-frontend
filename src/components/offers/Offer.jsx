import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const serverURL = process.env.BASE_API_URL;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/offer/getAllOffers`);
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [serverURL]);

  useEffect(() => {
    const fetchProducts = async (productIds) => {
      try {
        const uniqueProductIds = [...new Set(productIds)]; // Remove duplicates
        const productsResponse = await Promise.all(
          uniqueProductIds.map((productId) =>
            axios.get(`${serverURL}/api/v1/products/${productId}`)
          )
        );
        const fetchedProducts = productsResponse.map((response) => response.data);
        setProducts(fetchedProducts);
        console.log('Fetched Products:', fetchedProducts); // Log the fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const productIds = offers.reduce((ids, offer) => [...ids, ...offer.applicableProducts], []);
    if (productIds.length > 0) {
      fetchProducts(productIds);
    }
  }, [offers, serverURL]);
  const Column = ({ title, description, time, applicableProducts }) => (
	
	  <div className="py-1">
		<div className="px-2">
		
		  {applicableProducts.map((productId, index) => {
			const product = products.find((p) => p._id === productId);
			//<section className="m-2 hover:border-blue-700 w-full overflow-hidden shadow-md border-[2px]"></section>
			return (
				
			  product && (
				<div key={productId} className={`block relative flex rounded py-2 hover:border-blue-700 shadow-md border-[2px] overflow-hidden ${index > 0 ? 'mt-4' : ''}`}>
				  {/* <div className="w-full  lg:py-2 px-4 lg:bg-white"> */}
				  <div className="flex flex-col w-full lg:bg-white lg:py-2 px-4">
					
					<p className="text-[14px] font-semibold">{title}</p>
					<p className="text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
					  {description}
					</p>
					<p className="text-[#7C7C7C] text-[12px] py-1">{time}</p>
				  </div>
				  <div className=' '>
					<Image
					  height={100}
					  width={100}
					  alt="product"
					  className="p-2 mr-5 lg:h-[80px] lg:w-[100px] object-cover w-5/6 h-5/6 rounded"
					  src={product.images[0].url}
					/>
				  </div>
				</div>
			  )
			);


		  })}
		</div>
		</div>
	
  );
   
  return (
    <>
      <div className="m-4 text-[18px] font-semibold"> Offers</div>
      <div className="flex flex-row w-full px-5 m-3">
        <span className="flex justify-center w-1/2 lg:w-fit">
          <Link href={'/account/notifications'}>
            <span className="px-5 underline">All</span>
          </Link>
        </span>
        <span className="flex justify-center w-1/2 lg:w-fit">
          <Link href={'/account/notifications/offers'}>
            <span className="underline text-[#F19305] ">Offers</span>
          </Link>
        </span>
      </div>
      <div>
        {offers.map((offer, index) => (
          <Column key={index} {...offer} />
        ))}
      </div>
    </>
  );
};

export default Offer;


