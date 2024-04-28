import React from 'react'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'
import { AiOutlineStar } from 'react-icons/ai'
import ContactLiveproduct from './ContactLiveproduct'
import Sidebar from './ShopnowSide'
function Shopnow() {
    return (
        <>
            <div>
                <div className='flex items-end w-full h-full '>
                    <div className=' relative flex w-full h-[306px]'>
                        <Image width={500} height={500} src="/images/shopnow.png" alt="..." className='w-full h-auto ' />
                    </div>
                    
                    <div className='absolute mb-10 ml-5 text-xs  lg:ml-20'>

                        <div className='flex flex-col gap-3 '>
                            <p className='font-bold text-white  lg:text-xl'>SAJAL FASHION STORE</p>
                            <div className='flex items-center gap-2 text-white '>
                                <div className='text-center bg-green-800 border-2 border-gray-200 rounded-md  w-9'>
                                    4.0
                                </div>
                                <div className='flex gap-1 text-lg '>
                                    <AiFillStar className='text-yellow-800 ' />
                                    <AiFillStar className='text-yellow-800 ' />
                                    <AiFillStar className='text-yellow-800 ' />
                                    <AiFillStar className='text-yellow-800 ' />
                                    <AiOutlineStar />
                                </div>
                                <div >
                                    4554 Reviews
                                </div>
                            </div>
                            <div className='flex gap-2 text-white '>
                                <Image width={500} height={500} src="/images/gallary.svg" alt="" className='w-5 ' />
                                <p>231 Photos added</p>
                            </div>
                            <div className='flex items-center gap-2 text-white '>
                                <Image width={500} height={500} src="/images/rupees.png" alt="" className='w-10 ' />
                                <p>Men’s Clothing, Women Western More..</p>
                            </div>
                            <div className='flex gap-2 text-white '>
                                <p className='text-green-800 '>Open Now</p>
                                <p>Till 9:30pm, Danish Nagar Delhi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
           
                <div className='flex justify-end w-full p-10 '>
                    {/* <Sidebar/> */}
                    <ContactLiveproduct />
                </div>
          
        </>
    )
}

export default Shopnow