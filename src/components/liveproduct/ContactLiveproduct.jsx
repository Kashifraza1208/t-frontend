import React from 'react'
import Image from 'next/image'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { AiOutlineRight } from 'react-icons/ai'
import Modal from '../../Modal'
import { useState } from 'react'

function ContactLiveproduct() {
    const [show, setShow] = useState(false)

    return (
        <>
            {show && <Modal />}
            <div className=' lg:w-1/4 md:w-1/2'>
                <div className='flex flex-col gap-4 p-2 border-2 border-gray-200 '>
                    <div className='flex items-center gap-2 text-sm '>
                        <Image width={500} height={500} src="/images/mouse.jpeg" alt="" className='w-6 ' />
                        <p>Order Online or Schedule a Pickup</p>
                    </div>
                    <div className='px-4 '>
                        <button className=' bg-[#EB8105] w-full p-2'>Contact Us</button>
                    </div>
                </div>
                <div className='flex flex-col items-center border-2 border-gray-200 '>
                    <div>
                        <p className='font-bold '>How we can help you today?</p>
                        <p className='text-xs '>Select the option below so that we can serve you better.</p>
                    </div>
                    <div className='m-2 border-2 border-gray-200 '>
                        <div className='flex items-center gap-3 p-2 '>
                            <div className='w-1/3 '><Image width={500} height={500} src="/images/video.png" alt="" /></div>
                            <div>
                                <p>Live Video shopping</p>
                                <p className=' text-[#7C7C7C] text-sm'>Have a one on one 60 min live virtual shopping experience with our team via Video Call to see your favorite product live!</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex p-1 justify-evenly'>
                                <button className=' bg-[#333333] px-2 py-1'>Live Video</button>
                                <button className=' bg-white border-[#CDCDCD] border-2 px-3 py-1' >Upload Video</button>
                            </div>
                            <div className='flex flex-col gap-1 p-1 '>
                                <button className='bg-white p-1 border-[#CDCDCD] border-2'
                                    onClick={() => {
                                        setShow(true)

                                    }}>Upload Photo</button>
                                <button className='bg-white p-1 border-[#CDCDCD] border-2'>Upload Profile photo</button>
                                <button className='bg-white p-1 border-[#CDCDCD] border-2'> Short Video</button>
                                <button className=' bg-[#339900] p-1'>Accept All Invitation</button>
                                <button className=' bg-[#CC3300] p-1'>Accept All Invitation</button>
                            </div>
                        </div>

                    </div>
                    <div className='flex items-center gap-2 p-1 m-2 border-2 border-gray-200'>
                        <div className=''>
                            <AiOutlineWhatsApp className='text-4xl text-[#5B5B5B]' />
                        </div>
                        <div className='flex flex-col gap-1 '>
                            <p className='font-bold '>Chat with us</p>
                            <p className=' text-sm text-[#7C7C7C]'>Have all your queries conveniently answered by our customer support
                                executives via Whatsapp Chat!</p>
                        </div>
                        <div className=''>
                            <AiOutlineRight className='text-3xl ' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactLiveproduct