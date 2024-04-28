// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import BrandGrid1 from './BrandGrid1';
// import { useUser } from '../../../UserContext';

// const BrandDetailsPage = () => {
//     const [data, setData] = useState([]);
//     const [productDetails, setProductDetails] = useState([]);
//     const [brandsToShow, setBrandsToShow] = useState([]);
//     const serverURL = process.env.BASE_API_URL;
//     const router = useRouter();
//     const { user, setUser } = useUser();

//     const { category: categoryName, categoryId } = router.query;

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
//         if (categoryId) {
//             const brands = data.filter((brand) => brand.categories.includes(categoryId));
//             setBrandsToShow(brands);
//         }
//     }, [data, categoryId]);

//     const isFavourite = (productId) => {
//         return user.wishList && user.wishList.includes(productId);
//     };

//     const handleFavouriteClick = (productId) => {
//         const isCurrentlyFavourite = isFavourite(productId);
//         const updatedWishList = isCurrentlyFavourite
//             ? user.wishList.filter((id) => id !== productId)
//             : [...user.wishList, productId];

//         const api = isCurrentlyFavourite
//             ? `${serverURL}/api/v1/deleteWishList/${user._id}/${productId}`
//             : `${serverURL}/api/v1/addWishList/${user._id}/${productId}`;

//         axios[isCurrentlyFavourite ? 'delete' : 'post'](api)
//             .then((res) => {
//                 setUser(res.data);
//                 console.log('Wishlist updated:', res.data);
//             })
//             .catch((err) => console.error('Error updating wishlist:', err));
//     };

//     return (
//         <>
//             <div>
//                 <div className='ml-2 sm:hidden'></div>
//                 <div className=''>
//                     <h1 className="text-xl mt-4 font-semibold text-[28px]">
//                         Popular Brand
//                     </h1>
//                     <h1 className='font-poppins mt-2 underline decoration-[#ed8605] underline-offset-[5px] decoration-2 lg:text-[16px] text-[14px] font-fontMedium w-full ml-3 lg:ml-0'>
//                         Brand For {categoryName}
//                     </h1>
//                 </div>
//             </div>

//             <div className="w-full border-4 mt-4 overflow-auto lg:mt-4 grid-container">
//                 <BrandGrid1 products={brandsToShow} />
//             </div>

//             {brandsToShow.map((brand, index) => (
//                 <div key={index} className="items-center md:h-ful mt-4">
//                     <div className="text-lg ml-2">{brand.name}</div>
//                     <div className='flex gap-4 ml-2 w-full overflow-auto grid-container '>
//                         {brand.products && brand.products.length > 0 && (
//                             <div className='flex md:gap-5 gap-4 ml-2'>
//                                 {productDetails
//                                     .filter(product => brand.products.includes(product._id))
//                                     .map((product, productIndex) => (
//                                         <div key={productIndex} className="items-center mt-2 md:w-[260px] w-[180px]">
//                                             {product.images && product.images.length > 0 && (
//                                                 <div className='relative ml-[-10px] block w-full overflow-hidden'>
//                                                     <Image
//                                                         src={product.images[0].url}
//                                                         alt={product.productName}
//                                                         width={200}
//                                                         height={200}
//                                                         className='md:w-full  md:h-[250px] h-[160px] object-cover'
//                                                     />
//                                                     <div className="absolute text-black py-0.5 lg:py-2 px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px]  ml-2 bottom-20 md:bottom-24">
//                                                         <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
//                                                             <span className="">{product.rating?.rating}</span>
//                                                             <span className="">
//                                                                 <Image
//                                                                     alt="heart"
//                                                                     width={25}
//                                                                     height={25}
//                                                                     className="w-2 h-2 lg:w-4 lg:h-4 mb-1"
//                                                                     src={'/images/vector2.svg'}
//                                                                 />
//                                                             </span>
//                                                             <span className="pl-1 border-l border-gray-400">{product.rating?.count}</span>
//                                                         </h2>
//                                                     </div>
//                                                     <div className="absolute text-black  md:right-2 top-2 right-1">
//                                                         <h2 className="">
//                                                             <button onClick={() => handleFavouriteClick(product._id)}>
//                                                                 <Image
//                                                                     width={25}
//                                                                     height={25}
//                                                                     alt="ecommerce"
//                                                                     className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
//                                                                     src={
//                                                                         isFavourite(product._id)
//                                                                         ? '/images/heart.svg'
//                                                                         : '/images/vector3.svg'
//                                                                     }
//                                                                 />
//                                                             </button>
//                                                         </h2>
//                                                     </div>
//                                                     <div className='px-1'>
//                                                         <h3 className="font-poppins whitespace-nowrap lg:text-[20px] text-[14px] md:font-semibold font-fontMedium">
//                                                             {product.productName}
//                                                         </h3>
//                                                         <span className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
//                                                             {product.shortDescription}
//                                                         </span>
//                                                         <span className="flex flex-row items-center gap-1 mb-2">
//                                                             {product.discount > 0 ? (
//                                                                 <>
//                                                                     <div className='flex flex-col sm:flex-row'>
//                                                                         <div className='flex '>
//                                                                             <span className="pr-1 text-xs font-bold lg:text-sm">₹{product.discountedPrice}</span>
//                                                                             <span className="px-1 text-xs font-light line-through lg:text-sm">₹{product.price}</span>
//                                                                             <span className=" text-[#388E3C]  text-xs lg:text-sm">({product.discount}% Off)</span>
//                                                                         </div>
//                                                                     </div>
//                                                                 </>
//                                                             ) : (
//                                                                 <span className="text-xs font-fontMedium lg:text-sm">₹{product.price}</span>
//                                                             )}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default BrandDetailsPage;



import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { useUser } from '../../../UserContext';
import BrandGrid1 from './BrandGrid1';
import ProductCard from '../../ProductCards/ProductCard'; // Import ProductCard component
import SkeletonLoader from '../../ProductCards/SkeletonLoader';
const BrandDetailsPage = () => {
    const [data, setData] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
    const [brandsToShow, setBrandsToShow] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const serverURL = process.env.BASE_API_URL;
    const router = useRouter();
    const { user, setUser } = useUser();

    const { category: categoryName, categoryId } = router.query;

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
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchPopularBrands();
        fetchProductDetails();
    }, [serverURL]);

    useEffect(() => {
        if (categoryId) {
            const brands = data.filter((brand) => brand.categories.includes(categoryId));
            setBrandsToShow(brands);
        }
    }, [data, categoryId]);

    const isFavourite = (productId) => {
        return user.wishList && user.wishList.includes(productId);
    };

    const handleFavouriteClick = (productId) => {
        const isCurrentlyFavourite = isFavourite(productId);
        const updatedWishList = isCurrentlyFavourite
            ? user.wishList.filter((id) => id !== productId)
            : [...user.wishList, productId];

        const api = isCurrentlyFavourite
            ? `${serverURL}/api/v1/deleteWishList/${user._id}/${productId}`
            : `${serverURL}/api/v1/addWishList/${user._id}/${productId}`;

        axios[isCurrentlyFavourite ? 'delete' : 'post'](api)
            .then((res) => {
                setUser(res.data);
                console.log('Wishlist updated:', res.data);
            })
            .catch((err) => console.error('Error updating wishlist:', err));
    };

    return (
        <>
            <div>
                <div className='ml-2 sm:hidden'></div>
                <div className=''>
                    <h1 className="text-xl mt-4 font-semibold text-[28px]">
                        Popular Brand
                    </h1>
                    <h1 className='font-poppins mt-2 underline decoration-[#ed8605] underline-offset-[5px] decoration-2 lg:text-[16px] text-[14px] font-fontMedium w-full ml-3 lg:ml-0'>
                        Brand For {categoryName}
                    </h1>
                </div>
            </div>

            <div className="w-full  mt-4 overflow-auto lg:mt-4 grid-container">
                <BrandGrid1 products={brandsToShow} />
            </div>

            {brandsToShow.map((brand, index) => (
                <div key={index} className="items-center md:h-ful mt-4">
                    <div className="text-lg ml-2">{brand.name}</div>
                    {loading ? (
                        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                            {Array.from(Array(brand.products.length).keys()).map((index) => (
                                <SkeletonLoader key={index} width={200} height={200} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex gap-4 ml-2 w-full overflow-auto grid-container '>
                            {brand.products && brand.products.length > 0 && (
                                <div className='flex md:gap-5 gap-4'>
                                    {productDetails
                                        .filter(product => brand.products.includes(product._id))
                                        .map((product, productIndex) => (
                                            <ProductCard key={productIndex} productDetails={product} defaultImage={{ url: '/path/to/default/image' }} />
                                        ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export default BrandDetailsPage;
