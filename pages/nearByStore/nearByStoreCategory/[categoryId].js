// // pages/category/[categoryId].js

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Pagination from '../../../src/components/pagination/Pagination';
// import FilterMenuLayout from '../../../src/layouts/FilterMenuLayout';
// import NearbyCard from '../../../src/components/ProductCards/NearbyCard';

// const Category = () => {
//   const router = useRouter();
//   const { categoryId } = router.query;
//   const [stores, setStores] = useState([]);
//   const [fetchedProducts, setFetchedProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 16; // Display four products per page

//   const startIndex = (currentPage - 1) * productsPerPage;
//   const endIndex = startIndex + productsPerPage;
//   const displayedProducts = fetchedProducts.slice(startIndex, endIndex);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     if (categoryId) {
//       // Fetch stores for the category
//       axios.post(`${process.env.BASE_API_URL}/api/v1/stores`, { categoryId })
//         .then((response) => {
//           setStores(response.data.data);
//           setFetchedProducts(response.data.data); // Update fetchedProducts with the new data
//         })
//         .catch((error) => {
//           console.error('Error fetching stores:', error);
//         });
//     }
//   }, [categoryId]);

//   return (
//     <div>
//       <FilterMenuLayout>
//       {displayedProducts.length > 0 ? (
//       <div className="flex flex-col gap-2 my-3  ">
//                     <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4">
//                       {stores
//                         .filter((item) => item.categories.includes(categoryId))
//                         .map((item, storeIndex) => (
//                           <NearbyCard
//                             key={storeIndex}
//                             like={item?.rating?.rating}
//                             count={item?.rating?.count}
//                             imageName="store1"
//                             shop={item?.storeName}
//                             logo="bxs_offer.png"
//                             discount="Flat 20% OFF "
//                             text={item?.status}
//                             location={item?.address1}
//                             distance="- 8km"
//                             store={item}
//                           />
//                         ))}
//                     </div>
//                   </div>
//     ) : (
//       <div className="">
       
//         <h2>No Products</h2>
//       </div>
//     )}

//         <Pagination
//             currentPage={currentPage}
//             totalPages={Math.ceil(fetchedProducts.length / productsPerPage)}
//             onPageChange={handlePageChange}
//           />
         
//       </FilterMenuLayout>
//     </div>
//   );
// };

// export default Category;

// pages/category/[categoryId].js

import React from 'react';
import FilterMenuLayout from '../../../src/layouts/FilterMenuLayout';
import CategoryPage from '../../../src/components/NearbyStore/NearByStoresCategoryPage';
const Category = () => {
  return (
    
    <>
    <FilterMenuLayout>
    <CategoryPage />
    </FilterMenuLayout>
    </>
  )
 
};

export default Category;
