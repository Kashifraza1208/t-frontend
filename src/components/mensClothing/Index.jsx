// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import BrandGrid1 from '../homepage/branddeals/BrandGrid1';
// import { useUser } from '../../UserContext';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const MensClothing = ({ CategoryId }) => {
//   const [data, setData] = useState([]);
//   const [productDetails, setProductDetails] = useState([]);
//   const [activeTab, setActiveTab] = useState('man');
//   const serverURL = process.env.BASE_API_URL;
//   const router = useRouter();
//   const { user, setUser } = useUser();
//   const [categories, setCategories] = useState([]);
//   const [favourite, setFavourite] = useState(false);
//   const [favourites, setFavourites] = useState([]);
//   const [brandsToShow, setBrandsToShow] = useState([]);

//   useEffect(() => {
//     // Fetch popular brands data
//     axios.get(`${serverURL}/api/v1/getPopularBrand`)
//       .then((response) => {
//         setData(response.data);
//         console.log('setData', response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching brand deals:', error);
//       });
   

//       const fetchCategories = async () => {
//         const api = 	`${serverURL}/api/v1/homeCategories`;
//         axios
//             .get(api)
//             .then((response) => {
//                 console.log('Response Data:', response.data); // Log entire response data
//                 const allCategories = response.data.reduce((acc, category) => {
//                     if (category.children) {
//                         return acc.concat(category.children);
//                     }
//                     return acc;
//                 }, []);
//                 setCategories(allCategories);
//                 console.log('All Categories Data:', allCategories); // Log all categories data
//             })
//             .catch((error) => {
//                 console.error('Error fetching categories:', error);
//             });
//       };
      

// 		fetchCategories();
//   }, [serverURL]);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       const productDetailsArray = [];

//       try {
//         const response = await axios.get(`${serverURL}/api/v1/products`);
//         const products = response.data;
//         console.log('products',response.data)
//         productDetailsArray.push(...products);
        
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }

//       // Set the product details state
//       setProductDetails(productDetailsArray);
//       setFavourites(user.wishList);
//     };

//     // Fetch product details when the component mounts or when user's wishlist changes
//     fetchProductDetails();
//   }, [serverURL,user.wishList]);


//   useEffect(() => {
//     setFavourites(user.wishList || []);
//   }, [user.wishList]);
//   const isFavourite = (productId) => {
//     return favourites && favourites.includes(productId);
//   };
  
//   const handleFavouriteClick = (productId) => {
//     const isCurrentlyFavourite = isFavourite(productId);
//     const updatedFavourites = isCurrentlyFavourite
//       ? favourites.filter((id) => id !== productId)
//       : [...favourites, productId];
  
//     setFavourites(updatedFavourites);
  
//     let api = '';
  
//     if (!isCurrentlyFavourite) {
//       api = `${serverURL}/api/v1/addWishList/${user._id}/${productId}`;
//       axios
//         .post(api)
//         .then((res) => {
//           console.log(res.data);
//           setUser(res.data);
//           console.log('pro add', res.data);
//         })
//         .catch((err) => console.error(err));
//     } else {
//       api = `${serverURL}/api/v1/deleteWishList/${user._id}/${productId}`;
//       axios
//         .delete(api)
//         .then((res) => {
//           console.log('wishlist', res.data);
//           setUser(res.data);
//           console.log('pro remove', res.data);
//         })
//         .catch((err) => console.error(err));
//     }
//   };
//    const handleCategoryClick = (categoryId) => {
//       const brands = data.filter((brand) => brand.categories.includes(categoryId));
//       setBrandsToShow(brands);
//     };
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 6000,
//   };

//   return (
//     <div>
//       <div className='ml-2 sm:hidden '>
//       </div>
  
//       <div className='ml-2 ml-5'>
//         <h1 className="text-xl font-semibold text-[28px]">
//           Popular Brand
//         </h1>
  
//         <div className='flex gap-4'>
//           {data.map((brand, index) => (
//         <div key={index} >
//          {brand.categories && brand.categories.map((categoryId, catIndex) => (
//         <div key={catIndex}>
//           {/* Assuming you have access to the list of all categories */}
//           {categories.map((category) => {
//             if (category._id === categoryId) {
//               return <div key={category._id}>
//             <h1
//       key={index}
//       onClick={() => {
//         setActiveTab(category._id);
//         handleCategoryClick(category._id);
//     }}
    
//       className={`cursor-pointer inline-block ${
//         activeTab === category._id ? 'pb-2 font-bold border-b-2 border-[#EB8105]' : ''
//       }`}
//     >
//                 {category.name}
//               </h1> 
//               </div>;
//             }
//             return null;
//           })}
//         </div>
//         ))}
//         </div>
//         ))}
//         </div>
  
//         <div className="w-full mt-4 overflow-auto lg:mt-4 grid-container">
//           <BrandGrid1 products={data} />
//         </div>
  
//         {data.map((brand, index) => (
//           <div key={index} className="items-center md:h-ful">
//             <div className="text-lg ml-2">
//               {brand.name}
//             </div>
//             <div className='flex gap-4 ml-2 w-full overflow-auto grid-container'>
//               {brand.products && brand.products.length > 0 && (
//                 <div className='flex md:gap-5 gap-4 ml-2'>
//                   {productDetails
//                     .filter(product => brand.products.includes(product._id))
//                     .map((product, productIndex) => (
//                       <div key={productIndex} className="items-center mt-2 md:w-[260px] w-[180px]">
//                         {product.images && product.images.length > 0 && (
//                           <div className='relative ml-[-10px] block w-full overflow-hidden'>
//                             <Image
//                               src={product.images[0].url}
//                               alt={product.productName}
//                               width={200}
//                               height={200}
//                               className='md:w-full  md:h-[250px] h-[160px] object-cover'
//                             />
  
//                            <div className="absolute text-black py-0.5 lg:py-2 px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px]  ml-2 bottom-20 md:bottom-24">
//                               <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
//                                 <span className="">{product.rating?.rating}</span>
//                                 <span className="">
//                                   <Image
//                                     alt="heart"
//                                     width={25}
//                                     height={25}
//                                     className="w-2 h-2 lg:w-4 lg:h-4 mb-1"
//                                     src={'/images/vector2.svg'}
//                                   />
//                                 </span>
//                                 <span className="pl-1 border-l border-gray-400">{product.rating?.count}</span>
//                               </h2>
//                             </div>
//                             <div className="absolute text-black  md:right-2 top-2 right-1">
//                               <h2 className="">
//                                 <button onClick={() => handleFavouriteClick(product._id)}>
//                                   <Image
//                                     width={25}
//                                     height={25}
//                                     alt="ecommerce"
//                                     className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
//                                     src={
//                                       isFavourite(product._id)
//                                       ? '/images/heart.svg'
//                                       : '/images/vector3.svg'
//                                     }
//                                   />
//                                 </button>
//                               </h2>
//                             </div>
//                             <div className='px-1'>
//                               <h3 className="font-poppins whitespace-nowrap lg:text-[20px] text-[14px] md:font-semibold font-fontMedium">
//                                 {product.productName}
//                               </h3>
  
//                               <span className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
//                                 {product.shortDescription}
//                               </span>
//                               <span className="flex flex-row items-center gap-1 mb-2">
//                                 {product.discount > 0 ? (
//                                   <>
//                                     <div className='flex flex-col sm:flex-row'>
//                                       <div className='flex '>
//                                         <span className="pr-1 text-xs font-bold lg:text-sm">
//                                           ₹{product.discountedPrice}
//                                         </span>
//                                         <span className="px-1 text-xs font-light line-through lg:text-sm">
//                                           ₹{product.price}
//                                         </span>
//                                         <span className=" text-[#388E3C]  text-xs lg:text-sm">
//                                           ({product.discount}% Off)
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </>
//                                 ) : (
//                                   <span className="text-xs font-fontMedium lg:text-sm">₹{product.price}</span>
//                                 )}
//                               </span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
  
//       </div>
//     </div>
//   );
//   };

// export default MensClothing;




import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Image from 'next/image';
import Image from '../../../utils/Image';
import BrandGrid1 from '../homepage/branddeals/BrandGrid1';
import { useUser } from '../../UserContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MensClothing = ({ CategoryId }) => {
  const [data, setData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('man');
  const [brandsToShow, setBrandsToShow] = useState([]);
  const serverURL = process.env.BASE_API_URL;
  const router = useRouter();
  const { user, setUser } = useUser();
  const [categories, setCategories] = useState([]);
  const [favourite, setFavourite] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [renderedCategories, setRenderedCategories] = useState(new Set());


  useEffect(() => {
    // Fetch popular brands data
    axios.get(`${serverURL}/api/v1/getPopularBrand`)
      .then((response) => {
        setData(response.data);
        console.log('setData', response.data);
      })
      .catch((error) => {
        console.error('Error fetching brand deals:', error);
      });

     
     
        const fetchCategories = async () => {
          const api = `${serverURL}/api/v1/homeCategories`;
          try {
            const response = await axios.get(api);
            console.log('Response Data:', response.data); // Log entire response data
            const allCategories = response.data.reduce((acc, category) => {
              if (category.children) {
                return acc.concat(category.children);
              }
              return acc;
            }, []);
            setCategories(allCategories);
            console.log('All Categories Data:', allCategories); // Log all categories data
      
            // If categories are fetched successfully and there's at least one category
            if (allCategories.length > 0) {
              setActiveTab(allCategories[0]._id); // Set the active tab to the first category
              handleCategoryClick(allCategories[0]._id); // Fetch data for the first category
            }
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
      
        fetchCategories();
      }, [serverURL]);
      
      // Add this useEffect to ensure data for the first category is fetched when the component mounts
      useEffect(() => {
        // Fetch data for the first category when the component mounts
        if (categories.length > 0) {
          handleCategoryClick(categories[0]._id);
        }
      }, [categories]);
      

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetailsArray = [];

      try {
        const response = await axios.get(`${serverURL}/api/v1/products`);
        const products = response.data;
        console.log('products',response.data)
        productDetailsArray.push(...products);
        
      } catch (error) {
        console.error('Error fetching product details:', error);
      }

      // Set the product details state
      setProductDetails(productDetailsArray);
      setFavourites(user.wishList);
    };

    // Fetch product details when the component mounts or when user's wishlist changes
    fetchProductDetails();
  }, [serverURL,user.wishList]);


  useEffect(() => {
    setFavourites(user.wishList || []);
  }, [user.wishList]);

  const isFavourite = (productId) => {
    return favourites && favourites.includes(productId);
  };
  
  const handleFavouriteClick = (productId) => {
    const isCurrentlyFavourite = isFavourite(productId);
    const updatedFavourites = isCurrentlyFavourite
      ? favourites.filter((id) => id !== productId)
      : [...favourites, productId];
  
    setFavourites(updatedFavourites);
  
    let api = '';
  
    if (!isCurrentlyFavourite) {
      api = `${serverURL}/api/v1/addWishList/${user._id}/${productId}`;
      axios
        .post(api)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          console.log('pro add', res.data);
        })
        .catch((err) => console.error(err));
    } else {
      api = `${serverURL}/api/v1/deleteWishList/${user._id}/${productId}`;
      axios
        .delete(api)
        .then((res) => {
          console.log('wishlist', res.data);
          setUser(res.data);
          console.log('pro remove', res.data);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleCategoryClick = (categoryId) => {
    const brands = data.filter((brand) => brand.categories.includes(categoryId));
    setBrandsToShow(brands);
  };


  return (
    <>
    <div>
      <div className='ml-2 sm:hidden '>
      </div>
  
      <div className=''>
        <h1 className="text-xl mt-4 font-semibold text-[28px]">
          Popular Brand
        </h1>

     
        <div className='flex gap-4 mt-2'>
            {categories.map((category) => {
              const matchedBrand = data.find(brand => brand.categories.includes(category._id));
              if (matchedBrand) {
                return (
                  <h1
                    key={category._id}
                    onClick={() => {
                      setActiveTab(category._id);
                      handleCategoryClick(category._id);
                    }}
                    className={`cursor-pointer inline-block ${
                      activeTab === category._id ? 'pb-2 font-bold border-b-2 border-[#EB8105]' : ''
                    }`}
                  >
                    Brands for {category.name}
                  </h1>
                );
              }
              return null;
            })}
          </div>
      </div>
  
      
  
    </div>
    <div className="w-full mt-4 overflow-auto lg:mt-4 grid-container">
        <BrandGrid1 products={brandsToShow} />
    </div>

  {brandsToShow.map((brand, index) => (
  <div key={index} className="items-center md:h-ful mt-4">
    <div className="text-lg ml-2">
      {brand.name}
    </div>
    <div className='flex gap-4 ml-2 w-full overflow-auto grid-container '>
      {brand.products && brand.products.length > 0 && (
        <div className='flex md:gap-5 gap-4 ml-2'>
          {productDetails
            .filter(product => brand.products.includes(product._id))
            .map((product, productIndex) => (
              <div key={productIndex} className="items-center mt-2 md:w-[260px] w-[180px]">
                {product.images && product.images.length > 0 && (
                  <div className='relative ml-[-10px] block w-full overflow-hidden'>
                    <Image
                      src={product.images[0].url}
                      alt={product.productName}
                      width={200}
                      height={200}
                      className='md:w-full  md:h-[250px] h-[160px] object-cover'
                    />

                    <div className="absolute text-black py-0.5 lg:py-2 px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px]  ml-2 bottom-20 md:bottom-24">
                      <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
                        <span className="">{product.rating?.rating}</span>
                        <span className="">
                          <Image
                            alt="heart"
                            width={25}
                            height={25}
                            className="w-2 h-2 lg:w-4 lg:h-4 mb-1"
                            src={'/images/vector2.svg'}
                          />
                        </span>
                        <span className="pl-1 border-l border-gray-400">{product.rating?.count}</span>
                      </h2>
                    </div>
                    <div className="absolute text-black  md:right-2 top-2 right-1">
                      <h2 className="">
                        <button onClick={() => handleFavouriteClick(product._id)}>
                          <Image
                            width={25}
                            height={25}
                            alt="ecommerce"
                            className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
                            src={
                              isFavourite(product._id)
                              ? '/images/heart.svg'
                              : '/images/vector3.svg'
                            }
                          />
                        </button>
                      </h2>
                    </div>
                    <div className='px-1'>
                      <h3 className="font-poppins whitespace-nowrap lg:text-[20px] text-[14px] md:font-semibold font-fontMedium">
                        {product.productName}
                      </h3>

                      <span className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
                        {product.shortDescription}
                      </span>
                      <span className="flex flex-row items-center gap-1 mb-2">
                        {product.discount > 0 ? (
                          <>
                            <div className='flex flex-col sm:flex-row'>
                              <div className='flex '>
                                <span className="pr-1 text-xs font-bold lg:text-sm">
                                  ₹{product.discountedPrice}
                                </span>
                                <span className="px-1 text-xs font-light line-through lg:text-sm">
                                  ₹{product.price}
                                </span>
                                <span className=" text-[#388E3C]  text-xs lg:text-sm">
                                  ({product.discount}% Off)
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <span className="text-xs font-fontMedium lg:text-sm">₹{product.price}</span>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  </div>
))}

    </>
  );
};

export default MensClothing;

