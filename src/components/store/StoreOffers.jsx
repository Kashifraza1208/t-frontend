import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const StoreOffers = ({ storeId }) => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const serverURL = process.env.BASE_API_URL;

  useEffect(() => {
    console.log('Received storeId in StoreOffers:', storeId);
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/offer/getAllOffers`);
        setOffers(response.data);
        console.log('Fetched Offers:', response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [serverURL, storeId]);

  const fetchProducts = async (productIds) => {
    try {
      const uniqueProductIds = [...new Set(productIds)]; // Remove duplicates
      const productsResponse = await Promise.all(
        uniqueProductIds.map((productId) =>
          axios.get(`${serverURL}/api/v1/products/${productId}`)
        )
      );
      console.log('Unique Product IDs:', uniqueProductIds);

      // Debugging: Log the product data before filtering
      const fetchedProducts = productsResponse.map((response) => response.data);
      console.log('Fetched Products before filtering:', fetchedProducts);

      // Filter products based on the storeId
    // Filter products based on the storeId
const filteredProducts = fetchedProducts.filter((product) => {
  const productStoreId = product.storeId._id; // Adjust this based on your data structure
  console.log('Product Store ID:', productStoreId);
  console.log('Component Store ID:', storeId);
  return productStoreId === storeId;
});


      setProducts(filteredProducts);
      console.log('Filtered Products:', filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    const productIds = offers.reduce((ids, offer) => [...ids, ...offer.applicableProducts], []);
    if (productIds.length > 0) {
      fetchProducts(productIds);
    }
  }, [offers, serverURL, storeId]);

  const Column = ({ title, description, time, applicableProducts }) => (
    <div className="py-1">
      <div className="px-2">
        {applicableProducts.map((productId, index) => {
          const product = products.find((p) => p._id === productId);

          return (
            product && (
              <div
                key={productId}
                className={`block relative flex rounded py-2 hover:border-blue-700 shadow-md border-[2px] overflow-hidden ${
                  index > 0 ? 'mt-4' : ''
                }`}
              >
                <div className="flex flex-col w-full lg:bg-white lg:py-2 px-4">
                  <p className="text-[14px] font-semibold">{title}</p>
                  <p className="text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
                    {description}
                  </p>
                  <p className="text-[#7C7C7C] text-[12px] py-1">{time}</p>
                </div>
                <div className="w-2/5 px-2 sm:w-1/5 lg:w-fit">
                  <a className="relative block overflow-hidden rounded-lg">
                    {/* Assuming `product.images[0]` exists; adjust as needed */}
                    <Image
                      width={200}
                      height={200}
                      alt="ecommerce"
                      className="mx-1 lg:h-[20vh] lg:w-[20vh] w-5/6 h-5/6 rounded-lg"
                      src={product.images[0].url}
                    />
                  </a>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );

  return (
    <div className='w-full'>
      <div className="m-4 text-[18px] font-semibold">
         Offers 
        {/* ({offers.length}) */}
      </div>
      <div>
        {offers.map((offer) => (
          <Column key={offer._id} {...offer} />
        ))}
      </div>
    </div>
  );
};

export default StoreOffers;






// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import axios from 'axios';

// const StoreOffers = ({storeId}) => {
//   const [offers, setOffers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const serverURL = process.env.BASE_API_URL;

//   useEffect(() => {
//     console.log('Received storeId in StoreOffers:', storeId);
//     const fetchOffers = async () => {
//       try {
//         const response = await axios.get(`${serverURL}/api/v1/offer/getAllOffers`);
//         setOffers(response.data);
//       } catch (error) {
//         console.error('Error fetching offers:', error);
//       }
//     };

//     fetchOffers();
//   }, [serverURL,storeId]);

//   useEffect(() => {
//     const fetchProducts = async (productIds) => {
//       try {
//         const uniqueProductIds = [...new Set(productIds)]; // Remove duplicates
//         const productsResponse = await Promise.all(
//           uniqueProductIds.map((productId) =>
//             axios.get(`${serverURL}/api/v1/products/${productId}`)
//           )
//         );
//         const fetchedProducts = productsResponse.map((response) => response.data);
//         setProducts(fetchedProducts);
//         console.log('Fetched Products:', fetchedProducts); // Log the fetched products
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     const productIds = offers.reduce(
//       (ids, offer) => [...ids, ...offer.applicableProducts],
//       []
//     );
//     if (productIds.length > 0) {
//       fetchProducts(productIds);
//     }
//   }, [offers, serverURL]);

 


//   const Column = ({ title, description, time, applicableProducts }) => (
//     <div className="py-1">
//       <div className="px-2">
//         {applicableProducts.map((productId, index) => {
//           const product = products.find((p) => p._id === productId);

//           return (
//             product && (
//               <div
//                 key={productId}
//                 className={`block relative flex rounded py-2 hover:border-blue-700 shadow-md border-[2px] overflow-hidden ${
//                   index > 0 ? 'mt-4' : ''
//                 }`}
//               >
//                 <div className="flex flex-col w-full lg:bg-white lg:py-2 px-4">
//                   <p className="text-[14px] font-semibold">{title}</p>
//                   <p className="text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
//                     {description}
//                   </p>
//                   <p className="text-[#7C7C7C] text-[12px] py-1">{time}</p>
//                 </div>
// 				<div className="w-2/5 px-2 sm:w-1/5 lg:w-fit">
// 						<a className="relative block overflow-hidden rounded-lg">
							
// 								<Image
// 									width={200}
// 									height={200}
// 									alt="ecommerce"
// 									className="mx-1 lg:h-[20vh]  lg:w-[20vh] w-5/6 h-5/6 rounded-lg"
// 									src={product.images[0].url}
// 								/>
// 							</a>
// 						</div>
//                 {/* <div className=" rounded-lg border-4">
//                   <Image
//                     height={200}
//                     width={200}
//                     alt="product"
// 					className=" p-2 mx-1 lg:h-[20vh] rounded-lg lg:w-[20vh] w-5/6 h-5/6 rounded"
//                     src={product.images[0].url}
//                   />
//                 </div> */}
//               </div>
//             )
//           );
//         })}
//       </div>
//     </div>
//   );

//   return (
//     <>
// 	<div className='w-full'>
//       <div className="m-4 text-[18px] font-semibold">
//         All Offers ({offers.length})
//       </div>
//       <div>
//         {offers.map((offer) => (
//           <Column key={offer._id} {...offer} />
//         ))}
//       </div>
// 	  </div>
//     </>
//   );
// };

// export default StoreOffers;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StoreOffers = ({ storeId }) => {
//   const [offers, setOffers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const serverURL = process.env.BASE_API_URL;

//   useEffect(() => {
//     console.log('Received storeId in StoreOffers:', storeId);

//     const fetchOffers = async () => {
//       try {
//         const response = await axios.get(`${serverURL}/api/v1/offer/getAllOffers`);
//         setOffers(response.data);
//       } catch (error) {
//         console.error('Error fetching offers:', error);
//       }
//     };

//     fetchOffers();
//   }, [serverURL, storeId]);

//   useEffect(() => {
//     const fetchProducts = async (productIds) => {
//       try {
//         const uniqueProductIds = [...new Set(productIds)];
//         const productsResponse = await Promise.all(
//           uniqueProductIds.map((productId) =>
//             axios.get(`${serverURL}/api/v1/products/${productId}`)
//           )
//         );

//         const filteredProducts = productsResponse
//           .map((response) => response.data)
//           .filter((product) => product.storeId === storeId);

//         console.log('Filtered Products:', filteredProducts);
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     const productIds = offers.reduce(
//       (ids, offer) => [...ids, ...offer.applicableProducts],
//       []
//     );

//     if (productIds.length > 0) {
//       fetchProducts(productIds);
//     }
//   }, [offers, serverURL, storeId]);

//   useEffect(() => {
//     const fetchProducts = async (productIds) => {
//       try {
//         const uniqueProductIds = [...new Set(productIds)];
//         const productsResponse = await Promise.all(
//           uniqueProductIds.map((productId) =>
//             axios.get(`${serverURL}/api/v1/products/${productId}`)
//           )
//         );

//         const filteredProducts = productsResponse
//           .map((response) => response.data)
//           .filter((product) => product.storeId === storeId);

//         console.log('Filtered Products:', filteredProducts);
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     const productIds = offers.reduce(
//       (ids, offer) => [...ids, ...offer.applicableProducts],
//       []
//     );

//     if (productIds.length > 0) {
//       fetchProducts(productIds);
//     }
//   }, [offers, serverURL, storeId]);

//   const Column = ({ title, description, time, applicableProducts }) => (
//     <div className="py-1">
//       <div className="px-2">
//         {applicableProducts.map((productId, index) => {
//           const product = products.find((p) => p._id === productId);

//           return (
//             product && (
//               <div
//                 key={productId}
//                 className={`block relative flex rounded py-2 hover:border-blue-700 shadow-md border-[2px] overflow-hidden ${
//                   index > 0 ? 'mt-4' : ''
//                 }`}
//               >
//                 <div className="flex flex-col w-full lg:bg-white lg:py-2 px-4">
//                   <p className="text-[14px] font-semibold">{title}</p>
//                   <p className="text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
//                     {description}
//                   </p>
//                   <p className="text-[#7C7C7C] text-[12px] py-1">{time}</p>
//                 </div>
//                 <div className="w-2/5 px-2 sm:w-1/5 lg:w-fit">
//                   <a className="relative block overflow-hidden rounded-lg">
//                     <img
//                       width={200}
//                       height={200}
//                       alt="product"
//                       className="mx-1 lg:h-[20vh] lg:w-[20vh] w-5/6 h-5/6 rounded-lg"
//                       src={product.images[0].url}
//                     />
//                   </a>
//                 </div>
//               </div>
//             )
//           );
//         })}
//       </div>
//     </div>
//   );

//   return (
//     <div className='w-full'>
//       <div className="m-4 text-[18px] font-semibold">
//         All Offers ({offers.length})
//       </div>
//       <div>
//         {offers.map((offer) => (
//           <Column key={offer._id} {...offer} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StoreOffers;


