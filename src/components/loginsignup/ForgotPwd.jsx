// import Image from 'next/image';
// import React, { useState } from 'react';
// import Link from 'next/link';
// import Otp from './Otp';

// const ForgotPwd = () => {
//     const [inputValue, setInputValue] = useState('');
//     const [error, setError] = useState('');
//     const [isValid, setIsValid] = useState(false);
//     const serverURL = process.env.BASE_API_URL;
//     const handleInputChange = (e) => {
//         const inputValue = e.target.value;
//         const isMobileNumber = /^\d{1,10}$/.test(inputValue);
    
//         const formattedInputValue = isMobileNumber ? '+91' + inputValue : inputValue;
    
//         setInputValue(formattedInputValue);
//         setError('');
//         setIsValid(false);
    
//       // Store both email and mobile number in localStorage
//       localStorage.setItem('userEmailOrMobile', formattedInputValue);
//     };

//     const validateInput = (input) => {
//         // Email validation regex
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     
//         const mobileRegex = /^\+?\d{12}$/;

        
//         if (emailRegex.test(input)) {
//             return 'email';
//         } else if (mobileRegex.test(input)) {
//             return 'mobile';
//         } else {
//             return false;
//         }
//     };

//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleRequestOTP = async () => {
//         if (!inputValue.trim()) {
//             setError('Please enter a valid mobile number.');
//             return;
//         }

//         // Make an HTTP request to send OTP with mobile number
//         try {
//             const response = await fetch(`${serverURL}/api/v1/send-otp`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ mobileNumber: inputValue }),
//             });

//             if (response.ok) {
//                 // If the request is successful, redirect to OTP sent page
//                 router.push('/account/Otpsent');
//             } else {
//                 const data = await response.json();
//                 setError(data.message || 'Failed to send OTP.');
//             }
//         } catch (error) {
//             setError('Failed to send OTP. Please try again later.');
//         }
//     };

//     return (
//         <>
//             <div className="flex items-center justify-center sm:h-screen h-[50vh] sm:justify-start sm:items-center ">
//                 <div className="flex items-center justify-center gap-5 p-0 m-0 text-black ">
//                     <div className="sm:pl-4 flex sm:w-[480px] h-fit sm:ml-20 w-[340px] bg-white flex-col mx-29 p-3 justify-center rounded-md">
//                         <div className="flex justify-center items-center sm:w-[440px]  mt-4 mb-3">
//                             <Image
//                                 width={20}
//                                 height={20}
//                                 src={'/images/NameLogo.svg'}
//                                 className="ml-[-100px] sm:w-[260px] w-[210px] h-[47px] sm:ml-0 sm:h-[60px] sm:justify-center sm:items-center"
//                                 alt="Logo"
//                             />
//                         </div>
//                         <div className="flex w-full flex-col sm:max-w-[450px]  justify-between">
//                             <div className="flex flex-col w-full mb-2">
//                                 <p className="flex-wrap items-center my-2 mb-4 text-xl font-semibold text-center">
//                                     Change Password
//                                 </p>
//                                 <p className="flex-wrap mb-2 text-xs text-center text-gray-500">
//                                     An OTP will be sent to your Registered Email or Mobile Number
//                                 </p>
//                             </div>
//                             <div className="flex flex-col w-full">
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Mobile number or Email"
//                                     value={inputValue}
//                                     onChange={handleInputChange}
//                                     className={`w-full h-[47px] px-2 py-1 border border-gray-400 rounded-md `}
//                                 />
//                                 {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//                             </div>
//                             <button
//                                 className="flex flex-col w-full my-1"
//                                 type="submit"
//                                 onClick={handleRequestOTP}
//                             >
//                                 <div className="w-full text-white my-2 bg-orange-400  rounded-md h-[48px] p-1 text-center flex items-center justify-center">
//                                     Request OTP
//                                 </div>
//                             </button>
//                             <div className="flex flex-row justify-center mt-20 mb-1">
//                                 <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
//                                     Help
//                                 </button>
//                                 <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
//                                     Privacy
//                                 </button>
//                                 <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
//                                     Terms
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ForgotPwd;




import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import Otp from './Otp';

const ForgotPwd = () => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        const isMobileNumber = /^\d{1,10}$/.test(inputValue);
    
        const formattedInputValue = isMobileNumber ? '+91' + inputValue : inputValue;
    
        setInputValue(formattedInputValue);
        setError('');
        setIsValid(false);
    
      // Store both email and mobile number in localStorage
      localStorage.setItem('userEmailOrMobile', formattedInputValue);
    };

    const validateInput = (input) => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     
        const mobileRegex = /^\+?\d{12}$/;

        
        if (emailRegex.test(input)) {
            return 'email';
        } else if (mobileRegex.test(input)) {
            return 'mobile';
        } else {
            return false;
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRequestOTP = () => {
        if (!inputValue.trim()) {
            setError('Please enter a valid mobile number or email.');
            return;
        }

        const validationType = validateInput(inputValue);

        if (validationType === 'email') {
            if (!validateEmail(inputValue)) {
                setError('Please enter a valid email.');
                return;
            }

            // If email is valid, proceed to OTP sent page
            window.location.href = `/account/Otpsent`;
        } else if (validationType === 'mobile') {
            // If mobile is valid, proceed to OTP sent page with query parameters
            window.location.href = `/account/Otpsent?type=${validationType}&value=${inputValue}`;
        } else {
            setError('Please enter a valid email or mobile number.');
        }
    };

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
                                <p className="flex-wrap items-center my-2 mb-4 text-xl font-semibold text-center">
                                    Change Password
                                </p>
                                <p className="flex-wrap mb-2 text-xs text-center text-gray-500">
                                    An OTP will be sent to your Registered Email or Mobile Number
                                </p>
                            </div>
                            <div className="flex flex-col w-full">
                                <input
                                    type="text"
                                    placeholder="Enter Mobile number or Email"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className={`w-full h-[47px] px-2 py-1 border border-gray-400 rounded-md `}
                                />
                                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            </div>
                            <button
                                className="flex flex-col w-full my-1"
                                type="submit"
                                onClick={handleRequestOTP}
                            >
                                <div className="w-full text-white my-2 bg-orange-400  rounded-md h-[48px] p-1 text-center flex items-center justify-center">
                                    Request OTP
                                </div>
                            </button>
                            <div className="flex flex-row justify-center mt-20 mb-1">
                                <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
                                    Help
                                </button>
                                <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
                                    Privacy
                                </button>
                                <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
                                    Terms
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPwd;




