// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import { useUser } from '../../../UserContext';
// import BrandGrid1 from './BrandGrid1';
// import SkeletonLoader from '../../ProductCards/SkeletonLoader';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import BrandDetails from './BrandDetails';
// import 'slick-carousel/slick/slick-theme.css';
// import SkeletonLoader1 from './SkeletonLoader1';

// const AllBrandDetailsPage = ({ CategoryId }) => {
//   const [data, setData] = useState([]);
//   const [productDetails, setProductDetails] = useState([]);
//   const [activeTab, setActiveTab] = useState('');
//   const [brandsToShow, setBrandsToShow] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // State to manage loading state
//   const serverURL = process.env.BASE_API_URL;
//   const router = useRouter();
//   const { user, setUser } = useUser();
//   const [categories, setCategories] = useState([]);
//   const [favourite, setFavourite] = useState(false);
//   const [favourites, setFavourites] = useState([]);
//   const [renderedCategories, setRenderedCategories] = useState(new Set());
//   const [firstCategoryLoaded, setFirstCategoryLoaded] = useState(false);
// 	const [showCategories, setShowCategories] = useState(false);
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
  
//     const fetchCategories = async () => {
//       const api = `${serverURL}/api/v1/homeCategories`;
//       try {
//         const response = await axios.get(api);
//         console.log('Response Data:', response.data); // Log entire response data
//         const allCategories = response.data.reduce((acc, category) => {
//           if (category.children) {
//             return acc.concat(category.children);
//           }
//           return acc;
//         }, []);
//         setCategories(allCategories);
//         console.log('All Categories Data:', allCategories); // Log all categories data
  
//         // Set the active tab to the first category if not already loaded
//         if (allCategories.length > 0 && !firstCategoryLoaded) {
//           setFirstCategoryLoaded(true);
//           handleCategoryClick(allCategories[0]._id); // <-- Call handleCategoryClick for the first category
//         }
  
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
  
//     fetchCategories();
//   }, [serverURL, firstCategoryLoaded]);
  


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
//       setIsLoading(false); // Set loading state to false once data is fetched
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

//   const handleCategoryClick = (categoryId) => {
//     const brands = data.filter((brand) => brand.categories.includes(categoryId));
//     setBrandsToShow(brands);
//   };

//   const toggleCategories = () => {
// 		setShowCategories(!showCategories);
// 	};

//   return (
//     <>
//       <div>
//         <div className='ml-2 sm:hidden '>
//         </div>

//         <div className=''>
//           <h1 className="text-xl mt-4 font-semibold text-[28px]">
//             Popular Brand
//           </h1>
// {/* Menu bar on the left */}
//     <div className="cursor-pointer md:hidden" onClick={toggleCategories}>
// 					<svg
// 						xmlns="http://www.w3.org/2000/svg"
// 						className="h-6 w-6"
// 						fill="none"
// 						viewBox="0 0 24 24"
// 						stroke="currentColor">
// 						<path
// 							strokeLinecap="round"
// 							strokeLinejoin="round"
// 							strokeWidth="2"
// 							d="M4 6h16M4 12h16m-7 6h7"
// 						/>
// 					</svg>
// 				</div>
//           <div className='hidden md:flex gap-4 mt-2 overflow-auto'>
//             {categories.map((category) => {
//               const matchedBrand = data.find(brand => brand.categories.includes(category._id));
//               if (matchedBrand) {
//                 return (
//                   <h1
//                     key={category._id}
//                     onClick={() => {
                     
//                       setActiveTab(category._id);
//                       handleCategoryClick(category._id);
//                     }}
//                     className={`cursor-pointer inline-block ${
//                       activeTab === category._id ? 'font-bold hover:font-bold hover:text-[18px] text-[18px] underline decoration-[#ed8605] underline-offset-[5px] decoration-2' :  ' hover:font-bold text-[18px]'
                  
//                     }`}
//                   >
//                     Brands for {category.name}
//                   </h1>
//                 );
//               }
//               return null;
//             })}
//           </div>
// {/* Dropdown content for smaller screens */}
// {showCategories && (
//   <div className="md:hidden absolute z-50 mt-[1rem] bg-white p-4 rounded-md shadow-lg">
//     <div>
//       {categories.map((category) => {
//         const matchedBrand = data.find(brand => brand.categories.includes(category._id));
//         if (matchedBrand) {
//           return (
//             <div
//               key={category._id}
//               onClick={() => {
//                 // Close the dropdown after clicking a category if needed
//                 setShowCategories(false);
//                 setActiveTab(category._id);
//                 handleCategoryClick(category._id);
//               }}
//               className={`cursor-pointer ${
//                 activeTab === category._id ? 'font-bold hover:font-bold hover:text-[18px] text-[18px] underline decoration-[#ed8605] underline-offset-[5px] decoration-2' :  ' hover:font-bold text-[18px]'
//               }`}
//             >
//               Brands for {category.name}
//             </div>
//           );
//         }
//         return null;
//       })}
//     </div>
//   </div>
// )}

//         </div>
//       </div>
//       <div className="w-full  mt-4 overflow-auto lg:mt-4 grid-container">
//         {isLoading ? (
//           // Render SkeletonLoader while data is loading
//           <SkeletonLoader1 />
//         ) : (
//           // Render BrandGrid1 component with products data
//           <BrandGrid1 products={brandsToShow} />
//         )}
//       </div>

//       <BrandDetails
//         brandsToShow={brandsToShow}
//         productDetails={productDetails}
//         isFavourite={isFavourite}
//         handleFavouriteClick={handleFavouriteClick}
//       />

//     </>
//   );
// };

// export default AllBrandDetailsPage;



import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../../UserContext';
import BrandGrid1 from './BrandGrid1';
import SkeletonLoader from '../../ProductCards/SkeletonLoader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick-theme.css';
import SkeletonLoader1 from './SkeletonLoader1';
import ProductCard from '../../ProductCards/ProductCard';

const AllBrandDetailsPage = ({ CategoryId }) => {
  const [data, setData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [brandsToShow, setBrandsToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state
  const serverURL = process.env.BASE_API_URL;
  const router = useRouter();
  const { user, setUser } = useUser();
  const [categories, setCategories] = useState([]);
  const [favourite, setFavourite] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [renderedCategories, setRenderedCategories] = useState(new Set());
  const [firstCategoryLoaded, setFirstCategoryLoaded] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

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
        try {
          const response = await axios.get(`${serverURL}/api/v1/homeCategories`);
          const allCategories = response.data.reduce((acc, category) => {
            if (category.children) {
              return acc.concat(category.children);
            }
            return acc;
          }, []);
          setCategories(allCategories);
      
          // Set the active tab to the first category
          if (allCategories.length > 0) {
            setActiveTab(allCategories[0]._id);
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      
  
    fetchCategories();
  }, [serverURL, firstCategoryLoaded]);
  
  
  
  
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
      setIsLoading(false); // Set loading state to false once data is fetched
    };

    // Fetch product details when the component mounts or when user's wishlist changes
    fetchProductDetails();
  }, [serverURL,user.wishList]);


  useEffect(() => {
    setFavourites(user.wishList || []);
  }, [user.wishList]);

const handleCategoryClick = (categoryId) => {
    const brands = data.filter((brand) => brand.categories.includes(categoryId));
    setBrandsToShow(brands);
  };

  const toggleCategories = () => {
		setShowCategories(!showCategories);
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
          <div className="cursor-pointer md:hidden" onClick={toggleCategories}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <div className='hidden md:flex gap-4 mt-2 overflow-auto'>
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
                      activeTab === category._id ? 'font-bold hover:font-bold hover:text-[18px] text-[18px] underline decoration-[#ed8605] underline-offset-[5px] decoration-2' :  ' hover:font-bold text-[18px]'
                    }`}
                  >
                    Brands for {category.name}
                  </h1>
                );
              }
              return null;
            })}
          </div>
          {showCategories && (
            <div className="md:hidden absolute z-50 mt-[1rem] bg-white p-4 rounded-md shadow-lg">
              {categories.map((category) => {
                const matchedBrand = data.find(brand => brand.categories.includes(category._id));
                if (matchedBrand) {
                  return (
                    <div
                      key={category._id}
                      onClick={() => {
                        setShowCategories(false);
                        setActiveTab(category._id);
                        handleCategoryClick(category._id);
                      }}
                      className={`cursor-pointer ${
                        activeTab === category._id ? 'font-bold hover:font-bold hover:text-[18px] text-[18px] underline decoration-[#ed8605] underline-offset-[5px] decoration-2' :  ' hover:font-bold text-[18px]'
                      }`}
                    >
                      Brands for {category.name}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>
      <div className="w-full  mt-4 overflow-auto lg:mt-4 grid-container">
        {isLoading ? (
          <SkeletonLoader1 />
        ) : (
          <BrandGrid1 products={brandsToShow} />
        )}
      </div>
      {isLoading ? (
  <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8'>
    {Array.from(Array(brandsToShow.length).keys()).map((index) => (
        <SkeletonLoader key={index} width={200} height={200} />
    ))}
  </div>
) : (

        brandsToShow.map((brand, index) => (
          <div key={index} className="items-center md:h-ful mt-4">
            <div className="text-lg ml-2">{brand.name}</div>
            <div className='flex gap-4 ml-2 w-full overflow-auto grid-container '>
              {brand.products && brand.products.length > 0 && (
                <div className='flex  md:gap-5 gap-4 ml-2'>
                  {brand.products.map((productId, productIndex) => {
                    const product = productDetails.find(product => product._id === productId);
                    return (
                      <ProductCard key={productIndex} productDetails={product} />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default AllBrandDetailsPage;
