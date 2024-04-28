import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
	Carousel,
	Typography,
	Button,
	IconButton,
} from '@material-tailwind/react';

const Selling = () => {
  return (
    <>
    <div>
      <div className="flex flex-row-reverse w-full h-full pt-12 bg-no-repeat lg:px-16 ">
      
        <div className=" absolute justify-center px-2.5 lg:left-0 ml-1 lg:flex flex-col w-full lg:w-1/2 lg:px-[5vw]   pt-[5vh] lg:pt-[15vh]">
        <div className="p-4 bg-white ">
        <div className="mb-4 font-medium sm:text-[24px] text-[20px] ">Sell online to 14 Cr+ customers at 0% Commission</div>
        <div className='sm:text-[18px] text-[14px] my-2 mb-4  '>Become a Meesho seller and grow your business across India
            Do not have a GSTIN or have a Composition GSTIN?
            You can still sell on Meesho. Click here to know more.</div>
            <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px] py-1 border-[0.5px] mt-2 rounded-[5px]">
                <input
                  type="text"
                  name="email"
                  placeholder="Email or Mobile number"
                  className="w-full p-2 px-6 py-1 rounded placeholder:text-[#667086]"
                //   onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full mt-4 ">
                <Link href="/account/Become-sheller-growth">  <button className="w-full rounded-[10px]   py-[8px] px-[16px] font-fontMedium text-white bg-[#F19305] mb-4 font-medium">
                Start Selling
              </button>
              </Link>
              </div>
            </div>
      </div>
       
        <div
        // bg-[url('/Images/Selling.svg')]
          className="bg-fixed lg:flex lg:w-1/2 sm:bg-none"
          style={{
            backgroundImage: `url('Images/Selling.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "",
            className:"h-fit"

          }}
        >
           <Image width={1000} alt="=" height={1000} src="/Images/Selling.svg" className="lg:max-h-[100px] h-[500px] lg:min-h-screen" />
        </div>
        </div>

        {/* 2nd part */}
        <div className="w-full h-full ">
            <div className="grid grid-cols-1 md:px-16 pl-2 py-4 lg:grid-cols-4 sm:grid-cols-2 bg-[#D9D9D9]">
               
                <div className="">
                    <div className="text-[32px]">11 Lakh+</div>
                    <div className="text-[13px] font-semibold pb-2">Trust Meesho to sell online</div>
                </div>
                <div className="">
                    <div className="text-[32px]">14 Crore+</div>
                    <div className="text-[13px] font-semibold pb-2">Customers buying across India</div>
                </div>
                <div className="">
                    <div className="text-[32px]">14 Crore+</div>
                    <div className="text-[13px] font-semibold pb-2">Customers buying across India</div>
                </div>
                <div className="">
                    <div className="text-[32px]">700+</div>
                    <div className="text-[13px] font-semibold pb-2">Categories to sell online</div>
                </div>
              
            </div>
        </div>
        {/* 3rd part */}
        <div>
            <div className="flex flex-col-reverse w-full h-full px-3 py-16 md:px-16 md:flex-row ">
            <div className="w-full px-6 md:w-1/2" >
                 <div className="flex flex-col items-start px-3  justify-start bg-[#D9D9D9]  mb-6">
                        <div className="py-6">
                        <div className="text-[13px] font-semibold   ">
                        0% Commission Fee
                        </div>
                        <div className="text-[12px]">Suppliers selling on Meesho keep 100% of their profit by not paying any commission.
                        </div>
                        </div>   
                    </div>

                    <div className="flex flex-col items-start  justify-start px-3 bg-[#D9D9D9]  mb-6">
                        <div className="py-6">
                        <div className="text-[13px] font-semibold  ">
                        0 Penalty Charges
                        </div>
                        <div className="text-[12px]">Sell online without the fear of order cancellation charges with 0 Penalty for late dispatch or order cancellations.
                        </div>
                        </div>   
                    </div>

                    <div className="flex flex-col items-start  justify-start px-3 bg-[#D9D9D9]  mb-6">
                        <div className="py-6 mb-4">
                        <div className="text-[13px] font-semibold  ">
                        Growth for Every Supplier
                        </div>
                        <div className="text-[12px]">From small to large and unbranded to branded, and now open for Sellers who do not have a Regular GSTIN too, Meesho fuels growth for all suppliers.
                        </div>
                        </div>   
                    </div>

                    <div className="flex flex-col items-start  justify-start px-3 bg-[#D9D9D9] ">
                        <div className="py-6">
                        <div className="text-[13px] font-semibold  ">
                        Ease of Doing Business
                        </div>
                        <div className="text-[12px]">
                            <li>Easy Product Listing</li>
                            <li>Lowest Cost Shipping</li>
                            <li>7-Day Payment Cycle from the delivery date</li>
                        </div>
                        </div>   
                    </div>
                    
            </div>
            <div className="w-full px-8 py-4 md:py-1 md:w-1/2">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <div className="grid mx-auto ">
                            <div className="sm:w-[600px] h-[250px] w-full">
                            <Image src="/images/Sheller6.jpeg" width={500} height={250} alt="shop" className="w-[500px] h-[250px]"/>
                            </div>
                        <div className="text-[24px] font-fontMedium pb-3 ">
                        Why Suppliers Love Meesho
                        </div>
                        <div className="text-[18px]">All the benefits that come with selling on Meesho are designed 
                            to help you sell more, and make it easier to grow your business.
                        </div>
             
             <div className="sm:w-[500px] w-full h-[250px] flex justify-center items-center pt-4">        
                    <Carousel
					className=""
					transition={{ duration: 2 }}
					autoplay={true}
					loop={true}
					nexticon=""
					nextlabel=""
					//prev arrow
					prevArrow={({ handlePrev }) => (
						<IconButton
							variant="text"
							color="white"
							size="lg"
							onClick={handlePrev}
							className="!absolute top-2/4 left-4 -translate-y-2/4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 0 0"
								strokeWidth={2}
								stroke="currentColor"
								className="w-0 h-0">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
						</IconButton>
					)}
					//next Arrow
					nextArrow={({ handlePrev }) => (
						<IconButton
							variant="text"
							color="white"
							size="lg"
							onClick={handlePrev}
							className="!absolute top-2/4 left-4 -translate-y-2/4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 0 0"
								strokeWidth={2}
								stroke="currentColor"
								className="w-0 h-0">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
								/>
							</svg>
						</IconButton>
					)}>
					
					<div className="relative w-full h-full ">
						<Image
							src="/Images/Sheller1.jpeg"
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
						
							
						</div>
					</div>
					<div className="relative w-full h-full ">
						<Image
							src="/Images/Sheller2.jpeg"
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						
					</div>
					<div className="relative w-full h-full ">
						<Image
							src="/Images/Sheller3.jpeg"
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={500}
						/>
						
					</div>
					<div className="relative w-full h-full ">
						<Image
							src="/Images/Sheller4.jpeg"
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
						
							
						</div>
					</div>
					<div className="relative w-full h-full ">
						<Image
							src="/Images/Sheller5.jpeg"
							alt="image 1"
							className="object-cover w-full h-full "
							width={1000}
							height={1000}
						/>
						<div className="absolute inset-0 grid w-full h-full ">
						
							
						</div>
					</div>
				    </Carousel> 
             </div> 
            </div> 
                    </div>
            </div>
        </div>
        </div>
        {/* 4th part */}
        <div className="w-full h-full lg:px-[25vw] sm:px-[15vw] px-4 pb-6">
            <div className="flex flex-col items-center justify-center">
                <div className="text-[24px] font-fontMedium">How its works?</div>
                <div className="text-[16px] text-center">All the benefits that come with selling on Meesho are designed to help you sell more, and make it easier to grow your business.</div>
                {/* <div className="text-[16px]"> </div> */}
            </div>
        </div>
        {/* 5th part */}
        <div className="w-full h-full py-8">
            <div className="grid grid-cols-1 md:px-16 pl-2 py-4 lg:grid-cols-5 sm:grid-cols-2 bg-[#D9D9D9]">
               
                <div className="">
                    <div className="text-[32px] ">01</div>
                    <div className="text-[13px] font-semibold ">Create Account</div>
                    <div className="text-[13px] font-semibold ">All you need is :</div>
                    <div className="text-[13px] font-semibold ">•GSTIN (for GST sellers) or Enrolment ID / UIN (for non-GST sellers)</div>
                    <div className="text-[13px] font-semibold pb-2">Bank Account</div>
                   
                </div>
                <div className="">
                    <div className="text-[32px]">02</div>
                    <div className="text-[13px] font-semibold ">List Products</div>
                    <div className="text-[13px] font-semibold pb-2">List the products you want to sell in your supplier panel</div>
    
                </div>
                <div className="">
                    <div className="text-[32px]">03</div>
                    <div className="text-[13px] font-semibold ">Get Orders</div>
                    <div className="text-[13px] font-semibold pb-2">start getting orders from crores of Indians actively shopping on our platform.</div>
                </div>
                <div className="">
                    <div className="text-[32px]">04</div>
                    <div className="text-[13px] font-semibold ">Lowest Cost Shipping</div>
                    <div className="text-[13px] font-semibold pb-2">Products are shipped to customers at lowest costs</div>
                </div>
                <div className="">
                    <div className="text-[32px]">05</div>
                    <div className="text-[13px] font-semibold ">Lowest Cost Shipping</div>
                    <div className="text-[13px] font-semibold pb-2">Payments are deposited directly to your bank account following a 7-day payment cycle from order delivery.</div>
                </div>
              
            </div>
        </div>
        {/* 6th part */}
        <div>
            <div>
                <div className="flex justify-center 24px font-fontMedium "  >Popular Categories to Sell Online</div>
                <div className="grid lg:grid-cols-4 text-[18px] px-16 py-2 font-fontRegular sm:grid-cols-2 grid-cols">
                    <div className="py-2">Sell Sarees Online</div>
                    <div className="py-2">Sell Jwellery Online</div>
                    <div className="py-2">Sell T-shirts Online</div>
                    <div className="py-2">Sell Shirts Online</div>
                    <div className="py-2">Sell Watches Online</div>
                    <div className="py-2">Sell Electronics Online</div>
                    <div className="py-2">Sell Clothes Online</div>
                    <div className="py-2">Sell Scocks Online</div>
                    <div className="py-2">Sell Sarees Online</div>
                    <div className="py-2">Sell Jwellery Online</div>
                    <div className="py-2">Sell T-shirts Online</div>
                    <div className="py-2">Sell Shirts Online</div>
                    <div className="py-2">Sell Watches Online</div>
                    <div className="py-2">Sell Electronics Online</div>
                    <div className="py-2">Sell Clothes Online</div>
                    <div className="py-2">Sell Scocks Online</div>    
                </div>
                <div className="flex justify-center w-full mt-4 ">
                <Link href="/account/Become-sheller-growth">  <button className="w-full rounded-[10px]   py-[10px] px-[16px] font-fontMedium text-white bg-[#F19305] mb-4 font-medium">
                View more category
                      </button>
                 </Link>
                </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default Selling;

