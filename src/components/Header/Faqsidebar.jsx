import React from 'react'
import Link from 'next/link';

function Faq() {
    return (
        <>
          
                <div className=" md:w-1/5  flex-row ml-6 border-2 ">
                    <h1 className=" text-[#EB8105] text-lg mt-5 px-3 ">
                        Top queries
                    </h1>
                    <div className=" mt-3 px-3">
                        <Link href="/account/terms&conditions" className=" ">
                        Terms and conditions
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="/account/orders" className=" ">
                            Shipping, Order Tracking & Delivery
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="#" className=" mt-2">
                            Cancellations and Modifications
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="/account/login" className="">
                            Sign Up and Login
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="/account/payments" className="">
                            Payments
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            Trailshopy Credit
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            PhonePe Wallet
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            Gift Cards
                        </Link></div>
                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            Gift Wrapping
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="/account/policy" className="">
                            E-mail verification policy
                        </Link>
                    </div>

                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            Donations
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">

                        <Link href="#" className="">
                            Enable Ecom Transactions
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">

                        <Link href="#" className="">
                            Card Tokenization
                        </Link>
                    </div>

                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            Trailshopy Kotak Credit Card
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">

                        <Link href="#" className="">
                            Instant Cashback Recovery
                        </Link>
                    </div>

                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            Fine Jewellery
                        </Link>
                    </div>
                    <div className=" mt-3 px-3">
                        <Link href="#" className="">
                            Open Box Delivery
                        </Link>
                    </div>
                </div>
                
           
        </>
    )
}

export default Faq