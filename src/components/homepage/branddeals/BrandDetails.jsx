import React from 'react';
import Image from 'next/image';
import SkeletonLoader from '../../ProductCards/SkeletonLoader';

const BrandDetails = ({ brandsToShow, productDetails, isFavourite, handleFavouriteClick }) => (
  <div>
    {brandsToShow.map((brand, index) => (
      <div key={index} className="items-center md:h-ful mt-4">
        <div className="text-lg ml-2">{brand.name}</div>
        <div className='flex gap-4 ml-2 w-full overflow-auto grid-container '>
          {brand.products && brand.products.length > 0 && (
            <div className='flex  md:gap-5 gap-4 ml-2'>
              {brand.products.map((productId, productIndex) => {
                const product = productDetails.find(product => product._id === productId);
                return (
                  <div key={productIndex} className="items-center mt-2 md:w-[260px] w-[180px]">
                    <div className='relative ml-[-10px] block w-full overflow-hidden'>
                      {product && product.images && product.images.length > 0 && (
                        <Image
                          src={product.images[0].url}
                          alt={product.productName}
                          width={200}
                          height={200}
                          className='md:w-full  md:h-[250px] h-[160px] object-cover'
                        />
                      )}
                      {/* Render SkeletonLoader if product details are not available */}
                      {!product && (
                        <SkeletonLoader width={200} height={200} />
                      )}

                      {/* Render product details if available */}
                      {product && (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default BrandDetails;
