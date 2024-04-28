// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import { useUser } from '../../../UserContext';
// import SkeletonLoader from '../../ProductCards/SkeletonLoader';
// const CategoryProducts = () => {
//     const [data, setData] = useState([]);
//     const [productDetails, setProductDetails] = useState([]);
//     const [brandsToShow, setBrandsToShow] = useState([]);
//     const serverURL = process.env.BASE_API_URL;
//     const router = useRouter();
//     const [favourites, setFavourites] = useState([]);
//     const { brandId } = router.query;
//     const { user, setUser } = useUser();

//     useEffect(() => {
//         const fetchPopularBrands = async () => {
//             try {
//                 const response = await axios.get(`${serverURL}/api/v1/getPopularBrand`);
//                 setData(response.data);
//             } catch (error) {
//                 console.error('Error fetching popular brands:', error);
//             }
//         };

//         const fetchProductDetails = async () => {
//             try {
//                 const response = await axios.get(`${serverURL}/api/v1/products`);
//                 setProductDetails(response.data);
//             } catch (error) {
//                 console.error('Error fetching product details:', error);
//             }
//         };

//         fetchPopularBrands();
//         fetchProductDetails();
//     }, [serverURL]);

//     useEffect(() => {
//         if (brandId) {
//             const brands = data.filter((brand) => brand._id === brandId);
//             setBrandsToShow(brands);
//         }
//     }, [data, brandId]);

//     const isFavourite = (productId) => {
//         // Implement your logic to check if productId is in the user's wishlist
//         return user.wishList && user.wishList.includes(productId);
//     };
    
//     const handleFavouriteClick = (productId) => {
//         const isCurrentlyFavourite = isFavourite(productId);
//         const updatedFavourites = isCurrentlyFavourite
//           ? favourites.filter((id) => id !== productId)
//           : [...favourites, productId];
      
//         setFavourites(updatedFavourites);
      
//         let api = '';
      
//         if (!isCurrentlyFavourite) {
//           api = `${serverURL}/api/v1/addWishList/${user._id}/${productId}`;
//           axios
//             .post(api)
//             .then((res) => {
//               console.log(res.data);
//               setUser(res.data);
//               console.log('pro add', res.data);
//             })
//             .catch((err) => console.error(err));
//         } else {
//           api = `${serverURL}/api/v1/deleteWishList/${user._id}/${productId}`;
//           axios
//             .delete(api)
//             .then((res) => {
//               console.log('wishlist', res.data);
//               setUser(res.data);
//               console.log('pro remove', res.data);
//             })
//             .catch((err) => console.error(err));
//         }
//       };
//     return (
//         <>
//             {brandsToShow.map((brand) => (
//                 <div key={brand._id} className="items-center md:h-ful mt-4">
//                     <div className="text-lg ml-2 font-bold">{brand.name}</div>
//                     <div className='flex gap-4 ml-2 w-full '>
//                         {brand.products && brand.products.length > 0 && (
                            
//                             <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'>
//                             {brand.products.map((productId) => {
//                             const product = productDetails.find((product) => product._id === productId);
    
//                           if (!product) return null; 
//                           return (
//                         <div key={productId} className="items-center mt-2 md:w-[260px] w-[180px]">
//                         <div className='relative ml-[-10px] block w-full overflow-hidden'>
                        
//                         {product && product.images && product.images.length > 0 && (
//                         <Image
//                           src={product.images[0].url}
//                           alt={product.productName}
//                           width={200}
//                           height={200}
//                           className='md:w-full  md:h-[250px] h-[160px] object-cover'
//                         />
//                       )}
                     
//                       {product && (
//                         <>
//                           <div className="absolute text-black py-0.5 lg:py-2 px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px]  ml-2 bottom-20 md:bottom-24">
//                             <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
//                               <span className="">{product.rating?.rating}</span>
//                               <span className="">
//                                 <Image
//                                   alt="heart"
//                                   width={25}
//                                   height={25}
//                                   className="w-2 h-2 lg:w-4 lg:h-4 mb-1"
//                                   src={'/images/vector2.svg'}
//                                 />
//                               </span>
//                               <span className="pl-1 border-l border-gray-400">{product.rating?.count}</span>
//                             </h2>
//                           </div>
//                           <div className="absolute text-black  md:right-2 top-2 right-1">
//                             <h2 className="">
//                               <button onClick={() => handleFavouriteClick(product._id)}>
//                                 <Image
//                                   width={25}
//                                   height={25}
//                                   alt="ecommerce"
//                                   className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
//                                   src={
//                                     isFavourite(product._id)
//                                     ? '/images/heart.svg'
//                                     : '/images/vector3.svg'
//                                   }
//                                 />
//                               </button>
//                             </h2>
//                           </div>
//                           <div className='px-1'>
//                             <h3 className="font-poppins whitespace-nowrap lg:text-[20px] text-[14px] md:font-semibold font-fontMedium">
//                               {product.productName}
//                             </h3>

//                             <span className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
//                               {product.shortDescription}
//                             </span>
//                             <span className="flex flex-row items-center gap-1 mb-2">
//                               {product.discount > 0 ? (
//                                 <>
//                                   <div className='flex flex-col sm:flex-row'>
//                                     <div className='flex '>
//                                       <span className="pr-1 text-xs font-bold lg:text-sm">
//                                         ₹{product.discountedPrice}
//                                       </span>
//                                       <span className="px-1 text-xs font-light line-through lg:text-sm">
//                                         ₹{product.price}
//                                       </span>
//                                       <span className=" text-[#388E3C]  text-xs lg:text-sm">
//                                         ({product.discount}% Off)
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </>
//                               ) : (
//                                 <span className="text-xs font-fontMedium lg:text-sm">₹{product.price}</span>
//                               )}
//                             </span>
//                           </div>
//                         </>
//                       )}
//                     </div>
//             {/* Rest of the product details */}
//         </div>
//     );
// })}


//                             </div>
//                         )}
                        
//                     </div>
//                 </div>
//             ))}
           
//         </>
//     );
// };

// export default CategoryProducts;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useUser } from '../../../UserContext';
import ProductCard from '../../ProductCards/ProductCard';
import SkeletonLoader from '../../ProductCards/SkeletonLoader';

const CategoryProducts = () => {
    const [data, setData] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [brandsToShow, setBrandsToShow] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const serverURL = process.env.BASE_API_URL;
    const router = useRouter();
    const { brandId } = router.query;
    const { user, setUser } = useUser();

    useEffect(() => {
        const fetchPopularBrands = async () => {
            try {
                const response = await axios.get(`${serverURL}/api/v1/getPopularBrand`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching popular brands:', error);
            }
        };

        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${serverURL}/api/v1/products`);
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false); // Set loading to false when data is fetched
            }
        };

        fetchPopularBrands();
        fetchProductDetails();
    }, [serverURL]);

    useEffect(() => {
        if (brandId) {
            const brands = data.filter((brand) => brand._id === brandId);
            setBrandsToShow(brands);
        }
    }, [data, brandId]);
   
    // if (loading) {
    //     return <SkeletonLoader width={200} height={200} />;
    // }

    return (
        <>
         {brandsToShow.map((brand) => (
    <div key={brand._id} className="items-center md:h-ful mt-4">
        <div className="text-lg ml-2 font-bold">{brand.name}</div>
        <div className='flex gap-4 ml-2 w-full '>
            
        {loading ? (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8'>
    {Array.from(Array(brand.products.length).keys()).map((index) => (
        <SkeletonLoader key={index} width={200} height={200} />
    ))}
</div>
) : (
    brand.products && brand.products.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {brand.products.map((productId) => {
                const product = productDetails.find((product) => product._id === productId);
                if (!product) return null;

                return (
                    <ProductCard
                        key={productId}
                        productDetails={product}
                        defaultImage={{ url: '/path/to/default/image' }}
                    />
                );
            })}
        </div>
    ) : (
        <p>No products found</p>
    )
)}

        </div>
    </div>
))}


        </>
    );
};

export default CategoryProducts;

