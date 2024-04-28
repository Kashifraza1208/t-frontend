import React from 'react';
import Image from 'next/image';

const BrandProductCard = () => {
  return (
    <div>
     
      <div className=" md:mb-6 mb-4 w-[60vw] md:w-fit m-0 hover:cursor-pointer text-gray-900">
        <div className="flex flex-col items-center justify-center  h-[180px] w-[170px] md:h-[200px] md:w-[225px]">
          {/* <Image
            width={200}
            height={200}
            src='/images/AllenSolly1.png' 
            alt="Deal image"
            className="w-52 h-52"
          /> */}
         
         <div className="relative w-full">
            
              <div className="relative border-4 block w-full overflow-hidden">
                <Image
                  alt='error'
                  width={400}
                  height={400}
                  className="block min-w-[80px] pt-1 w-full h-[120px] lg:h-[256px] object-cover"
                  src='/images/AllenSolly1.png'
                />
              </div>
           
            <div className="absolute text-black py-0.5 lg:py-1  px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
              <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
                <span className="">
                    {rating?.rating}
                </span>
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
        </div>
        <div className="absolute text-black py-0.5 lg:py-1  px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
              <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
                <span className="">
                    {/* {rating?.rating} */}
                    4.5
                </span>
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
                  {/* {rating?.count} */}
                  14
                </span>
              </h2>
            </div>
        <div className="w-full ml-2 mt-2">
		    <p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] font-[600]">
               Allen Solly
			</p>
            <p className='font-Poppins'>
            Men Solid Pure Cotton T-shirt
            </p>
			<p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] text-[#888888]">
				10% discount
			</p>
		</div>
      </div>
    </div>
  );
};

export default BrandProductCard;



