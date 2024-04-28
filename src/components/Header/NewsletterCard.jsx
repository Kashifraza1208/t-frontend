import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const BrandCard = ({ img, clothname, discount }) => {
    return (
        <>
            <div className="flex flex-col items-center mx-2 border-2 border-gray-200 ">
                <div className="flex-col items-center justify-center my-2 lex" >
                    <Image
                        width={100}
                        height={100}
                        src={img}
                        alt="Deal imgee"
                        className="h-[170px] w-[170px] lg:h-[270px] lg:w-[270px]"
                    />
                    <div className='mt-6 '>
                        <h1 className='text-lg font-bold '>
                            {clothname}
                        </h1>
                        <p className='text-gray-700 '>
                            {discount}
                        </p>
                    </div>
                    <div className='flex bg-[#EB8105] p-2 w-40 items-center justify-center text-white mt-4 gap-3'>
                        <button>
                            SHOP NOW
                        </button>
                        <Image width={20} height={20} src='/images/chevronright.png' alt="right" className='h-3 text-white ' />
                    </div>
                </div>

            </div>
        </>
    );
};

export default BrandCard;
