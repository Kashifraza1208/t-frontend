import React from 'react'
import Image from 'next/image';
import BRANDCARD from '../Header/NewsletterBrandcard'
import Newslettercard from "../Header/NewsletterCard"
function NewsletterDiwali() {
    return (

        <>
            <div>
                {/* <div className="px-4 md:px-12 lg:px-[120px] w-full mt-7 mb-7">
                    <Image
                        width={1000}
                        height={1000}
                        src="/images/ads5.jpeg"
                        alt="ads"
                        className="w-full"
                    />
                </div> */}
                 <div className=' lg:h-[493px] lg:w-max-[1440px] md:h-[393px] h-[200px] flex justify-center items-center mt-10 mb-5 '>
                    <Image width={500} height={500} src='/images/offerbg.jpeg' alt=".." className='  absolute  lg:h-[493px] lg:w-[1440px]' />
                
                        <h1 className='relative text-2xl text-white ' > Get 25% OFF </h1>
                        
                    </div>

                <div className='bg-[#FFA51D] ml-12 mr-12  mt-7 flex  justify-center items-center  text-white w-max-[1440px] h-[180px]'>
                    <div className='text-center '>
                        <h1 className='py-4 text-xl '>
                            Free Shipping

                        </h1>
                        Lorem ipsum dolor sit amet consectetur.
                    </div>

                </div>
                <div className=' flex justify-center items-center text-[#E88D0B] text-xl mt-7'>
                   
                    On Sale
                    
                </div>
                <div className='block gap-2 md:flex justify-evenly mt-7 mb-7'>
                    <BRANDCARD img={'/images/imagebd1.png'} />
                    <BRANDCARD img={'/images/imgbw3.jpeg'} />
                    <BRANDCARD img={'/images/imgbw5.jpeg'} />
                    <BRANDCARD img={'/images/imgbw5.jpeg'} />

                </div>
                {/* <div className=' lg:h-[493px] lg:w-max-[1440px] md:h-[393px] h-[200px] flex justify-center items-center mt-10 mb-5 '>
                    <img src='/images/offerbg.jpeg' alt=".." className='  absolute  lg:h-[493px] lg:w-[1440px]' />
                
                        <h1 className='relative text-2xl text-white ' > Get 25% OFF </h1>
                        
                    </div> */}
                    <div className="w-full px-4 md:px-12 lg:px-0 mt-7 mb-7">
                    <Image
                        width={1200}
                        height={1000}
                        src="/images/diwali2.svg"
                        alt="ads"
                        className="w-full"
                    />
                        </div>
                    <div>
                    <div className='block gap-2 md:flex justify-evenly mt-7 mb-7'>
                   <Newslettercard img={'/images/nlcard1.jpeg'} clothname={"T-Shart"} discount={"10% On Combos"}/>
                   <Newslettercard img={'/images/nalcard2.jpeg'}clothname={"Casual Shirts"} discount={"10% On Combos"}/>
                   <Newslettercard img={'/images/nalcard3.jpeg'}clothname={"Jeans"} discount={"10% On Combos"}/>
                   <Newslettercard img={'/images/nalcard4.jpeg'}clothname={"Jeans"} discount={"10% On Combos"}/>
                    </div>

                    <div className='block gap-2 md:flex justify-evenly mt-7 mb-7'>
                   <Newslettercard img={'/images/nlcard1.jpeg'} clothname={"T-Shart"} discount={"10% On Combos"}/>
                   <Newslettercard img={'/images/nalcard2.jpeg'}clothname={"Casual Shirts"} discount={"10% On Combos"}/>
                   <Newslettercard img={'/images/nalcard3.jpeg'}clothname={"Jeans"} discount={"10% On Combos"}/>
                   <Newslettercard img={'/images/nalcard4.jpeg'}clothname={"Jeans"} discount={"10% On Combos"}/>
                    </div>
                    </div>
                    

                </div>

           
        </>
    )
}

export default NewsletterDiwali