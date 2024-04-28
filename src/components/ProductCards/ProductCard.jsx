import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '../../UserContext';
import axios from 'axios';

const ProductCard = ({ productDetails, defaultImage }) => {
  const {
    _id,
    productName,
    images,
    shortDescription,
    price,
    rating,
    discount,
  } = productDetails;

  const discountedPrice = (
    parseFloat(price) - (parseFloat(price) * parseFloat(discount)) / 100
  ).toFixed(2);

  const { user, setUser } = useUser();

  const [favourite, setFavourite] = useState(false);
useEffect(() => {
  //console.log("useEffect triggered with user.wishList and _id:", user.wishList, _id);
  setFavourite(user.wishList && user.wishList.includes(_id));
}, [user.wishList, _id]);


  const serverURL = process.env.BASE_API_URL;

  const handleFavouriteClick = () => {
    setFavourite(!favourite);

    let api = '';

    if (!favourite) {
      api = `${serverURL}/api/v1/addWishList/${user._id}/${_id}`;
      axios
        .post(api)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          console.log('pro add', res.data);
        })
        .catch((err) => console.error(err));
    } else {
      api = `${serverURL}/api/v1/deleteWishList/${user._id}/${_id}`;
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
    <section className="w-40 py-2 rounded body-font lg:w-64 hover:shadow-lg">
      <div className="w-full">
        <div className="flex flex-col items-center w-full gap-2">
          <div className="relative w-full">
            <Link href={`/products/details?productId=${_id}`}>
              <div 
              className="relative block w-full overflow-hidden"
              >
                <Image
                  alt={productName}
                  width={400}
                  height={400}
                  className="block min-w-[80px] pt-1 w-full h-[120px] lg:h-[256px] object-cover"
                  src={images[0]?.url || defaultImage?.url}
                />
              </div>
            </Link>
            <div className="absolute text-black py-0.5 lg:py-1  px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
              <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
                <span className="">{rating?.rating}</span>
                <span className="">
                  <Image
                    alt="heart"
                    width={25}
                    height={25}
                    className="w-2 h-2 lg:w-4 lg:h-4 "
                    src={'/images/vector2.svg'}
                  />
                </span>
                <span className="pl-1 border-l border-gray-400">
                  {rating?.count}
                </span>
              </h2>
            </div>
            <div className="absolute text-black right-2 lg:right-7 top-2 lg:top-3 ">
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
                    onClick={handleFavouriteClick}
                  />
                </button>
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start w-full gap-1">
            <Link href={`/products/details?productId=${_id}`}>
              <h3 className="font-poppins  lg:text-[20px] text-[14px] md:font-semibold font-fontMedium">
                {productName}
              </h3>
            </Link>
            <p className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
              {shortDescription}
            </p>
            <span className="flex flex-row items-center gap-1 mb-2">
              {discount > 0 ? (
                <>
                  <div className='flex flex-col sm:flex-row'>
                    <div className='flex '>
                      <span className="pr-1 text-xs font-bold lg:text-sm">
                        ₹{discountedPrice}
                      </span>
                      <span className="px-1 text-xs font-light line-through lg:text-sm">
                        ₹{price}
                      </span>
                      <span className=" text-[#388E3C]  text-xs lg:text-sm">
                        ({discount}% Off)
                      </span>
                    </div>
                    <div>
                    
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-xs font-fontMedium lg:text-sm">₹{price}</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
