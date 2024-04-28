// import React, { useEffect, useState } from 'react';
// import { AiOutlineRight, AiOutlineStar, AiFillCheckCircle } from 'react-icons/ai';
// import { BsFillRecordFill } from 'react-icons/bs';
// import Image from 'next/image';
// import Link from 'next/link';
// import axios from 'axios';
// //import { useUser } from './../../UserContext';

// const WishlistItemLoader = () => (
//   <>
//   <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
//     <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
//       <div className="flex flex-row">
//         <div className="w-20 h-24 bg-gray-300 rounded"></div>
//         <div className="flex flex-col flex-grow ml-4">
//           <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
//           <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
//           <div className="h-3 bg-gray-300 rounded w-2/3"></div>
//         </div>
//       </div>
//       <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
//     </div>
//     <span className="flex justify-end">
//       <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
//     </span>
//   </div>
//   <div className='my-4'></div>
//   <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
//     <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
//       <div className="flex flex-row">
//         <div className="w-20 h-24 bg-gray-300 rounded"></div>
//         <div className="flex flex-col flex-grow ml-4">
//           <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
//           <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
//           <div className="h-3 bg-gray-300 rounded w-2/3"></div>
//         </div>
//       </div>
//       <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
//     </div>
//     <span className="flex justify-end">
//       <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
//     </span>
//   </div>
//   </>
// );
// const Orders = () => {
//   const [orderData, setOrderData] = useState([]);
//   let iconStyles = { color: '#7C7C7C', fontSize: '8px' };
//   //const { user, setUser } = useUser();
//   const [loading, setLoading] = useState(true);
//   const userId = '64b161653d8484b51874229c';
//   const [currentPage, setCurrentPage] = useState(1); // Track current page
//   const ordersPerPage = 3;

//   useEffect(() => {
//     axios
//       .get(`https://trialshopy-backend.onrender.com/api/v1/${userId}/myOrders`)
//       .then(async (response) => {
//         if (response.data.data) {
//           console.log('ord', response.data.data);
//           const formattedOrders = await Promise.all(
//             response.data.data.map(async (order) => {
//               console.log('order', order);
//               const detailedProducts = await Promise.all(
//                 order.products.map(async (product) => {
//                   const productId = product.product;
//                   console.log('productId', productId);
//                   try {
//                     const productDetails = await axios.get(
//                       `https://trialshopy-backend.onrender.com/api/v1/products/${productId}`
//                     );
//                     console.log('productDetails',productDetails)

//                     return {
//                       ...product,
//                       details: productDetails.data, 
//                     };
//                   } catch (error) {
//                     if (error.response && error.response.status === 404) {
//                       console.warn(`Product details not found for product ID ${productId}`);
//                       return {
//                         ...product,
//                         details: null,
//                       };
//                     } else {
//                       console.error(`Error fetching product details for product ID ${productId}:`, error);
//                       throw error;
//                     }
//                   }
//                 })
//               );
//               return {
//                 ...order,
//                 products: detailedProducts,
//                 orderDate: new Date(order.orderDate).toLocaleDateString('en-US', {
//                   weekday: 'short',
//                   day: 'numeric',
//                   month: 'short',
//                 }),
//               };
//             })
//           );
//           setOrderData(formattedOrders);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, [userId]);

//   const formatExchangeReturnDate = (dateString) => {
//     const date = new Date(dateString);
//     const monthNames = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//     ];

//     const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}`;
//     return `Exchange/Return window closed on ${formattedDate}`;
//   };

//     // Pagination logic
//     const indexOfLastOrder = currentPage * ordersPerPage;
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//     const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <>
//       <div className="md:flex mx-4">
//         <div className="w-full md:w-full md:ml-6 p-4 bg-gray-100 h-full flex flex-col justify-">
//         {orderData.length === 0 && (
//           <WishlistItemLoader />
//         )}
//         {currentOrders.map((item, index) => (
  
//   <Link
//   href={{
//     pathname: '/account/orders/OrderDetailsPage',
//     query: {
//       ...item,
//       productId: item.products[0].product,
//     },
//   }}
//   key={index}
//   className="md:w-full mb-4 bg-white p-6 rounded-md"
// >
//               <div className="flex items-center">
//                 <div className="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center">
//                   <Image
//                     width={30}
//                     height={30}
//                     className=""
//                     src={'/images/orderlogo.svg'}
//                     alt="Product Image1"
//                   />
//                 </div>

//                 <div className="ml-4">
//                   <div className="flex items-center text-[#059669]">
//                     <div className="mr-1 md:text-[16px] text-[14px]">
//                       {item.products[0].orderStatus}{' '}
//                     </div>
//                     <AiFillCheckCircle />
//                   </div>
//                   <p className="md:text-[14px] text-[12px] text-[#7C7C7C]">
//                     On {item.orderDate}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center my-3 justify-between">
//                 <div className=''>
//                   {item.products.map((product, productIndex) => (
//                     <div key={productIndex} className="flex items-center p-1">
//                       <div className="">
//                         <Image
//                           width={100}
//                           height={80}
//                           className="w-[86px] h-[98px]"
//                           src={product.details?.images?.[0]?.url || '/default-image.jpg'}
//                           alt="Product Image"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="md:text-[18px] text-[16px]">
//                           {product.details?.productName || 'Product Name Not Available'}
//                         </div>
//                         <div className="md:text-[14px] text-[12px] text-[#7C7C7C]">
//                           {product.details?.shortDescription || 'Description Not Available'}
//                         </div>
//                         <div className="flex flex-row items-center text-[#7C7C7C]">
//                           <Image
//                             width={40}
//                             height={80}
//                             className="w-5 h-5"
//                             src={'/images/order/HalfStar.svg'}
//                             alt="imgg"
//                           />
//                           {product.details?.rating?.rating || 'Rating Not Available'}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="text-[#7C7C7C] w-[7.14px] h-[12px]">
//                   <AiOutlineRight />
//                 </div>
//               </div>
//               <div className="bg-[#F3F3F3] text-[#7C7C7C] pl-2 my-2 flex items-center">
//                 <div>
//                   <BsFillRecordFill {...iconStyles} />
//                 </div>
//                 <div className="md:text-[14px] py-2 ml-2 text-[12px]">
//                   {formatExchangeReturnDate(item.exchangeReturnWindowClosedOn)}
//                 </div>
//               </div>
              
//               <div className="flex items-center bg-[#F3F3F3] text-[#7C7C7C] py-2 pl-2 my-2">
//   <div className="md:text-[14px] text-[12px]">Rate Product</div>
//   <div className="flex items-center ml-3">
//     {/* Display the product's rating in stars */}
//     {item.products.map((product, productIndex) => {
//       // Check if product.details is available before accessing rating
//       if (product.details) {
//         // Calculate the percentage of filled stars based on the decimal part
//         const decimalPart = product.details.rating.rating % 1;
//         const percentageFilled = decimalPart * 100;

//         // Create an array of stars JSX elements
//         const stars = [...Array(5)].map((star, i) => (
//           <AiOutlineStar
//             key={i}
//             style={{
//               color: i < Math.floor(product.details.rating.rating)
//                 ? '#FFD700' // Filled star for whole numbers
//                 : i === Math.floor(product.details.rating.rating)
//                   ? `linear-gradient(90deg, #C4C4C4 ${percentageFilled}%, #FFD700 ${percentageFilled}%)` // Gradient for decimal part
//                   : '#C4C4C4', // Empty star
//             }}
//           />
//         ));

//         return (
//           <React.Fragment key={productIndex}>
//             {stars}
//           </React.Fragment>
//         );
//       }
//       return null; // Return null if product.details is not available
//     })}
//   </div>
// </div>


//           </Link>
//         ))}

//          {/* Pagination */}
//       <div className="flex justify-center mt-4">
//         {orderData.length > 0 && (
//           <>
          
//           <ul className="flex">
//           <button
// 				className="mr-2"
// 				disabled={currentPage === 1}
// 				onClick={() => onPageChange(currentPage - 1)}>
// 				&lt;
// 			</button>
//             {Array.from({ length: Math.ceil(orderData.length / ordersPerPage) }).map((_, index) => (
//               <li key={index} className="mx-1">
//                 <button
//                   onClick={() => paginate(index + 1)}
//                   className={`text-blue-500 hover:text-blue-800 focus:outline-none ${currentPage === index + 1 ? 'font-bold' : ''}`}
//                 >
//                   {index + 1}
//                 </button>
//               </li>
//             ))}
//             <button
// 				className=" ml-2"
// 				//disabled={currentPage === totalPages}
// 				onClick={() => onPageChange(currentPage + 1)}>
// 				&gt;
// 			</button>
//           </ul>
//           </>
//         )}
//       </div>
       
//       </div>
//     </div>
//     </>
//   );
// };

// export default Orders;
import React, { useEffect, useState } from 'react';
import { AiOutlineRight, AiOutlineStar, AiFillCheckCircle } from 'react-icons/ai';
import { BsFillRecordFill } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Pagination from '../pagination/Pagination';
//import { useUser } from './../../UserContext';

const WishlistItemLoader = () => (
  <>
  <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
    <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
      <div className="flex flex-row">
        <div className="w-20 h-24 bg-gray-300 rounded"></div>
        <div className="flex flex-col flex-grow ml-4">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
    </div>
    <span className="flex justify-end">
      <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
    </span>
  </div>
  <div className='my-4'></div>
  <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
    <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
      <div className="flex flex-row">
        <div className="w-20 h-24 bg-gray-300 rounded"></div>
        <div className="flex flex-col flex-grow ml-4">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
    </div>
    <span className="flex justify-end">
      <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
    </span>
  </div>
  </>
);
const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  let iconStyles = { color: '#7C7C7C', fontSize: '8px' };
  //const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const userId = '64b161653d8484b51874229c';
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const ordersPerPage = 3;
  const serverURL = process.env.BASE_API_URL;

  useEffect(() => {
    axios
      .get(`${serverURL}/api/v1/${userId}/myOrders`)
      .then(async (response) => {
        if (response.data.data) {
          console.log('ord', response.data.data);
          const formattedOrders = await Promise.all(
            response.data.data.map(async (order) => {
              console.log('order', order);
              const detailedProducts = await Promise.all(
                order.products.map(async (product) => {
                  const productId = product.product;
                  console.log('productId', productId);
                  try {
                    const productDetails = await axios.get(
                      `${serverURL}/api/v1/products/${productId}`
                    );
                    console.log('productDetails',productDetails)

                    return {
                      ...product,
                      details: productDetails.data, 
                    };
                  } catch (error) {
                    if (error.response && error.response.status === 404) {
                      console.warn(`Product details not found for product ID ${productId}`);
                      return {
                        ...product,
                        details: null,
                      };
                    } else {
                      console.error(`Error fetching product details for product ID ${productId}:`, error);
                      throw error;
                    }
                  }
                })
              );
              return {
                ...order,
                products: detailedProducts,
                orderDate: new Date(order.orderDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                }),
              };
            })
          );
          setOrderData(formattedOrders);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [userId]);

  const formatExchangeReturnDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}`;
    return `Exchange/Return window closed on ${formattedDate}`;
  };

// Pagination logic
const indexOfLastOrder = currentPage * ordersPerPage;
   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
   const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="md:flex mx-4">
        <div className="w-full md:w-full md:ml-6 p-4 bg-gray-100 h-full flex flex-col justify-">
        {orderData.length === 0 && (
          <WishlistItemLoader />
        )}
        {currentOrders.map((item, index) => (
  
  <Link
  href={{
    pathname: '/account/orders/OrderDetailsPage',
    query: {
      ...item,
      productId: item.products[0].product,
    },
  }}
  key={index}
  className="md:w-full mb-4 bg-white p-6 rounded-md"
>
              <div className="flex items-center">
                <div className="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center">
                  <Image
                    width={30}
                    height={30}
                    className=""
                    src={'/images/orderlogo.svg'}
                    alt="Product Image1"
                  />
                </div>

                <div className="ml-4">
                  <div className="flex items-center text-[#059669]">
                    <div className="mr-1 md:text-[16px] text-[14px]">
                      {item.products[0].orderStatus}{' '}
                    </div>
                    <AiFillCheckCircle />
                  </div>
                  <p className="md:text-[14px] text-[12px] text-[#7C7C7C]">
                    On {item.orderDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center my-3 justify-between">
                <div className=''>
                  {item.products.map((product, productIndex) => (
                    <div key={productIndex} className="flex items-center p-1">
                      <div className="">
                        <Image
                          width={100}
                          height={80}
                          className="w-[86px] h-[98px]"
                          src={product.details?.images?.[0]?.url || '/default-image.jpg'}
                          alt="Product Image"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="md:text-[18px] text-[16px]">
                          {product.details?.productName || 'Product Name Not Available'}
                        </div>
                        <div className="md:text-[14px] text-[12px] text-[#7C7C7C]">
                          {product.details?.shortDescription || 'Description Not Available'}
                        </div>
                        <div className="flex flex-row items-center text-[#7C7C7C]">
                          <Image
                            width={40}
                            height={80}
                            className="w-5 h-5"
                            src={'/images/order/HalfStar.svg'}
                            alt="imgg"
                          />
                          {product.details?.rating?.rating || 'Rating Not Available'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[#7C7C7C] w-[7.14px] h-[12px]">
                  <AiOutlineRight />
                </div>
              </div>
              <div className="bg-[#F3F3F3] text-[#7C7C7C] pl-2 my-2 flex items-center">
                <div>
                  <BsFillRecordFill {...iconStyles} />
                </div>
                <div className="md:text-[14px] py-2 ml-2 text-[12px]">
                  {formatExchangeReturnDate(item.exchangeReturnWindowClosedOn)}
                </div>
              </div>
              
              <div className="flex items-center bg-[#F3F3F3] text-[#7C7C7C] py-2 pl-2 my-2">
  <div className="md:text-[14px] text-[12px]">Rate Product</div>
  <div className="flex items-center ml-3">
    {/* Display the product's rating in stars */}
    {item.products.map((product, productIndex) => {
      // Check if product.details is available before accessing rating
      if (product.details) {
        // Calculate the percentage of filled stars based on the decimal part
        const decimalPart = product.details.rating.rating % 1;
        const percentageFilled = decimalPart * 100;

        // Create an array of stars JSX elements
        const stars = [...Array(5)].map((star, i) => (
          <AiOutlineStar
            key={i}
            style={{
              color: i < Math.floor(product.details.rating.rating)
                ? '#FFD700' // Filled star for whole numbers
                : i === Math.floor(product.details.rating.rating)
                  ? `linear-gradient(90deg, #C4C4C4 ${percentageFilled}%, #FFD700 ${percentageFilled}%)` // Gradient for decimal part
                  : '#C4C4C4', // Empty star
            }}
          />
        ));

        return (
          <React.Fragment key={productIndex}>
            {stars}
          </React.Fragment>
        );
      }
      return null; // Return null if product.details is not available
    })}
  </div>
</div>


          </Link>
        ))}

         {/* Pagination */}
      {/* <div className="flex justify-center mt-4">
        {orderData.length > 0 && (
          <>
          
          <ul className="flex">
          <button
				className="mr-2"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}>
				&lt;
			</button>
            {Array.from({ length: Math.ceil(orderData.length / ordersPerPage) }).map((_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`text-blue-500 hover:text-blue-800 focus:outline-none ${currentPage === index + 1 ? 'font-bold' : ''}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <button
				className=" ml-2"
				//disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}>
				&gt;
			</button>
          </ul>
          </>
        )}
      </div> */}
       
      </div>
    </div>
    {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(orderData.length / ordersPerPage)}
                onPageChange={paginate}
              />
    </>
  );
};

export default Orders;




