// ProductDetails.js

import React from 'react';
import Image from 'next/image';

const ProductDetails = ({ product }) => {
  const {
    images,
    productName,
    shortDescription,
    discountedPrice,
  } = product;

  return (
    <div className="flex flex-col items-start w-full gap-1 md:mt-8">
      <h3 className="font-poppins lg:text-[20px] text-[14px] md:font-semibold font-fontMedium">
        {productName}
      </h3>
      <p className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
        {shortDescription}
      </p>
      <span className="flex flex-row items-center gap-1 mb-2">
        <>
          <div className='flex flex-col sm:flex-row'>
            <div className='flex '>
              <span className="pr-1 text-xs font-bold lg:text-sm">
                ₹{discountedPrice}
              </span>
              {/* Add other details such as original price, discount, etc. */}
            </div>
          </div>
        </>
      </span>
      <div className="relative block w-full overflow-hidden">
        <Image
          alt={productName}
          width={400}
          height={400}
          className="block min-w-[80px] w-full h-[130px] lg:h-[261px] object-cover"
          src={images[0].url} // Assuming images is an array and we are using the first image
        />
      </div>
    </div>
  );
};

export default ProductDetails;
