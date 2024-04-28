import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const Otp = ({ setIsOtp, mobileNumber }) => {
    const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));

	const [otp, setOTP] = useState('');
	const [verificationMessage, setVerificationMessage] = useState('');
	const router = useRouter();
   // const mobileNumber = typeof window !== 'undefined' ? localStorage.getItem('userEmailOrMobile') : null;

const serverURL = process.env.BASE_API_URL;

const handleInputChange = (index, event) => {
    const newOTP = [...otp];
    newOTP[index] = event.target.value;
    setOTP(newOTP.join(''));

    if (event.target.value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].current.focus();
    }
};
	const handleInputKeyPress = (index, event) => {
		if (event.key === 'Backspace' && index > 0 && !otp[index]) {
			inputRefs.current[index - 1].current.focus();
		}
	};

	const handleOTPVerification = async () => {
		if (otp.length !== 4) {
			setVerificationMessage('Invalid OTP length. Please enter a 4-digit OTP.');
			return;
		}
		try {
			const response = await axios.post(
				`${serverURL}/api/v1/verify-otp`,
				{
					mobileNumber,
					otp,
				}
			);
			if (response.data.message === 'OTP verified successfully') {
				// console.log('OTP verified successfully');
				router.push('/account/');
			} else {
				console.log('not verified');
				setVerificationMessage('Invalid OTP');
			}
		} catch (error) {
			setVerificationMessage(error.response.data.message);
		}
	};

	const [timeInSeconds, setTimeInSeconds] = useState(60);

	useEffect(() => {
		const interval = setInterval(() => {
			if (timeInSeconds <= 0) {
				clearInterval(interval);
				setIsOtp(false);
			} else {
				setTimeInSeconds((prevTime) => prevTime - 1);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [timeInSeconds, router]);

	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
    return (
        <>
            <div className="flex items-center justify-center sm:h-screen h-[50vh] sm:justify-start sm:items-center ">
                <div className="flex items-center justify-center gap-5 p-0 m-0 text-black ">
                    <div className="sm:pl-4 flex sm:w-[480px] h-fit sm:ml-20 w-[340px] bg-white flex-col mx-29 p-3 justify-center rounded-md">
                        <div className="flex justify-center items-center sm:w-[440px]  mt-4 mb-3">
                            <Image
                                width={20}
                                height={20}
                                src={'/images/NameLogo.svg'}
                                className="ml-[-100px] sm:w-[260px] w-[210px] h-[47px] sm:ml-0 sm:h-[60px] sm:justify-center sm:items-center"
                                alt="Logo"
                            />
                        </div>
                        <div className="flex w-full flex-col sm:max-w-[450px]  justify-between">
                            <div className="flex flex-col w-full mb-2">
                                <p className="flex-wrap items-center my-2 mb-2 text-xl text-center">
                                An OTP has been					</p>
                                <p className="flex-wrap mb-2 text-xs text-center text-gray-500">
                                {/* Sent to 9********3 */}
                                Sent to {mobileNumber}
						       </p>
                            </div>
                <div className="flex justify-center grid-cols-6 gap-3 mx-2 my-3">
                         {Array.from({ length: 4 }).map((_, index) => (
                                 <input
                                 key={index}
                                 type="text"
                                 maxLength="1"
                                 className="sm:w-[40px] sm:h-[40px] h-[40px] w-[40px] mx-[5px] text-2xl text-center rounded-[6px] border-[1px] border-[#A1A1AA] "
                             onChange={(e) => {
                              if (e.target.value.length === 1) {
                                 const nextInput = e.target.nextElementSibling;
                                 if (nextInput) {
                              nextInput.focus();
                                 }
                                 }
                                 }}
                             />
                         ))}
                </div>
                <Link href={'/account/ChangePwd'}> <button
                                className="flex flex-col w-full my-1"
                                type="submit"
                            >
                                <div className="w-full text-white my-2 bg-orange-400  rounded-md h-[48px] p-1 text-center flex items-center justify-center">
                                SUBMIT					</div>
                            </button>
                            </Link>
                <div className='text-[14px] text-[#7C7C7C] flex justify-center my-2 pr-2'>
                <p className="text-[14px] mb-1 text-center text-gray-400 font-normal">
						Resend OTP in
						<button className="font-semibold hover:font-fontBold text-[16px] mb-2 ml-1 text-black">
							{formattedTime}
						</button>
					</p>
                    </div>
                 </div>
                 <div className='text-[16px] text-[#7C7C7C] flex justify-center my-2 '>
                    Log in using<div className='px-2 text-[#EB8105]'>
                        <Link href="/account/login">
                        Password
                        </Link>
                        
                    </div>
                 </div>
                 <div className='text-[16px] text-[#7C7C7C] flex justify-center my-2'>Having trouble logging in? <div className='px-2 text-[#EB8105]'> Get help</div>
                 </div>    
                 
                   
                           
                            <div className="flex flex-row justify-center mt-12 mb-1">
                               
                            </div>
                        </div>
                    </div>
                </div>
         

        </>

    );
}

export default Otp
