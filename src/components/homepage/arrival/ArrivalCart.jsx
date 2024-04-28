import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../../../UserContext';
import { useRouter } from 'next/router';
import SkeletonLoader from '../../ProductCards/SkeletonLoader';


const ArrivalCart = () => {
  const [arrivalData, setArrivalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const serverURL = process.env.BASE_API_URL;
  const [favourite, setFavourite] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();
  const { category: categoryName, categoryId } = router.query;

  const productsPerPage = 16; // Define productsPerPage constant

  useEffect(() => {
    const fetchNewArrivalData = async () => {
      try {
        if (!categoryId) {
          setArrivalData({ newArrivalProducts: [] });
          setLoading(false);
          return;
        }

        const response = await axios.get(`${serverURL}/api/v1/products/newArrivals/${categoryId}`);

        if (response.status !== 200) {
          throw new Error(`Error fetching new arrival data. Status: ${response.status}`);
        }

        const data = response.data;
        console.log('Fetched Data:', data);
        setArrivalData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching new arrival data:', error);
      }
    };

    fetchNewArrivalData();
  }, [serverURL, categoryId]);

  useEffect(() => {
    arrivalData && arrivalData.newArrivalProducts && arrivalData.newArrivalProducts.forEach(product => {
      setFavourite(user.wishList && user.wishList.includes(product._id));
    });
  }, [user.wishList, arrivalData]);

  const handleFavouriteClick = (productId) => {
    setFavourite(!favourite);

    let api = '';

    if (!favourite) {
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

  return (
    <>
      <h1 className='font-poppins lg:text-[22px] text-[14px]  font-fontMedium w-full'>
        New Arrivals {categoryName}
      </h1>
      {loading ? (
        <div className="flex flex-col gap-2 my-3">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: Math.min(productsPerPage, 1) }, (_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {arrivalData && arrivalData.newArrivalProducts && arrivalData.newArrivalProducts.length > 0 ? (
            arrivalData.newArrivalProducts.map(product => (
              <section key={product._id} className="w-40 py-2 rounded body-font lg:w-72 hover:shadow-lg">
                <div className="w-full">
                  <div className="flex flex-col items-center w-full gap-2">
                    <div className="relative w-full">
                      <Link href={`/products/details?productId=${product._id}`}>
                        <div className="relative block w-full overflow-hidden cursor-pointer">
                          <Image
                            alt={product.productName}
                            width={400}
                            height={400}
                            className="block min-w-[80px] pt-1 w-full h-[120px] lg:h-[256px] object-cover"
                            src={product.images[0]?.url}
                          />
                        </div>
                      </Link>
                      <div className="absolute text-black py-0.5 lg:py-1 px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
                        <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
                          <span className="">{product.rating?.rating}</span>
                          <span className="">
                            <Image
                              alt="heart"
                              width={25}
                              height={25}
                              className="w-2 h-2 lg:w-4 lg:h-4"
                              src={'/images/vector2.svg'}
                            />
                          </span>
                          <span className="pl-1 border-l border-gray-400">
                            {product.rating?.count}
                          </span>
                        </h2>
                      </div>
                      <div className="absolute text-black right-2 lg:right-7 top-2 lg:top-3">
                        <h2 className="">
                          <button>
                            <Image
                              width={25}
                              height={25}
                              alt="ecommerce"
                              className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
                              src={
                                favourite ? '/images/heart.svg' : '/images/vector3.svg'
                              }
                              onClick={() => handleFavouriteClick(product._id)}
                            />
                          </button>
                        </h2>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-full gap-1">
                      <h3 
                        className="font-poppins lg:text-[20px] text-[14px] md:font-semibold font-fontMedium w-full whitespace-nowrap overflow-hidden"
                      >
                        {product.productName}
                      </h3>
                      <p 
                        className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis"
                      >
                        {product.shortDescription}
                      </p>
                      <span className="flex flex-row items-center gap-1 mb-2">
                        {product.discount > 0 ? (
                          <>
                            <div className='flex flex-col sm:flex-row'>
                              <div className='flex '>
                                <span className="pr-1 text-xs font-bold lg:text-sm">
                                  ₹{(parseFloat(product.price) - (parseFloat(product.price) * parseFloat(product.discount)) / 100).toFixed(2)}
                                </span>
                                <span className="px-1 text-xs font-light line-through lg:text-sm">
                                  ₹{product.price}
                                </span>
                                <span className=" text-[#FF6060]  text-xs lg:text-sm">
                                  ({product.discount}% Off)
                                </span>
                              </div>
                              <div>
                                {/* Additional content */}
                              </div>
                            </div> 
                          </>
                        ) : (
                          <span className="text-xs font-fontMedium lg:text-sm">₹{product.price}</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <p>No product available</p>
          )}
        </div>
      )}
    </>
  );
};

export default ArrivalCart;
