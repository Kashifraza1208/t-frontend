import React from 'react'
import Image from 'next/image'



const Become_sheller_otp = () => {
  return (
    <>
      <div>
      <div className="flex flex-row-reverse w-full h-full pt-12 bg-no-repeat lg:px-16 ">
      
      <div className=" absolute justify-center px-2.5 lg:left-0 ml-1 lg:flex flex-col w-full lg:w-1/2 lg:px-[5vw]   pt-[5vh] lg:pt-[15vh]">
      <div className="p-4 bg-white ">

        <div className='text-[30px] font-fontMedium '>Welcome To Trialshopy</div>
        <div className='text-[14px] text-gray-700 pb-4'>Create your account to start selling</div>
        {/* <div className="my-2">Enter Mobile number</div> */}
              <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px] py-1 my-4 border-[0.5px] mt-2 rounded-[5px]">
                <input
                  type="number"
                  name="number"
                  placeholder="Email your mobile number"
                  className="w-full p-2 px-6 py-2 rounded placeholder:text-[#667086]"
                //   onChange={handleChange}
                  required
                />
                <button className='bg-[#F19305] w-[180px] font-fontMedium   rounded-[15px] px-2 '>Send OTP</button>
            </div>
          <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px] py-1 my-4 border-[0.5px] mt-2 rounded-[5px]">
              <input
                type="number"
                name="opt"
                placeholder="Enter OTP"
                className="w-full p-2 px-6 py-1 rounded placeholder:text-[#667086]"
              //   onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px] py-1 my-4 border-[0.5px] mt-2 rounded-[5px]">
                <input
                  type="email"
                  name="email"
                  placeholder="Email your email"
                  className="w-full p-2 px-6 py-2 rounded placeholder:text-[#667086]"
                //   onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-row border-gray-400 placeholder:text-[#667086] placeholder:text-[16px] my-4  border-[0.5px] mt-2 rounded-[5px]">
                <input
                  type="password"
                  name="password"
                  placeholder="Set  Password"
                  className="w-full h-[47px] rounded-[5px] text-[16px] pl-4 "
                />
                {/* onChange={handleChange} */}
                {/* required */}
                <Image width={50} height={50} alt="=" src="/images/eyeoff.svg" className="px-4" />
              </div>
              
            <div className="w-full mt-4 ">
            <button className="w-full rounded-[10px]   py-[8px] px-[16px] font-fontMedium text-white bg-[#F19305] mb-4 font-medium">
             Create Account
            </button>
            </div>
     
     
          {/* <div className="w-full mt-4 md:w-3/4">
            <button className="w-full  py-[16px] px-[16px] text-white bg-[#F19305] mb-4 font-medium">
              Sign In
            </button>
            </div> */}
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
      </div>
    </>
  )
}

export default Become_sheller_otp
