


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { HiEye } from 'react-icons/hi';
// import { useAuth } from '../../context/AuthContext';
// import Link from 'next/link';
// import { useUser } from '../../UserContext';
// import cookie from 'js-cookie';

// const LoginwithPwd = () => {
//   const { setAuthenticated } = useAuth();
//   const setAuthenticated1 = useUser().setAuthenticated;
//   const { setUser } = useUser();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const userType = 'customer';
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [emailValid, setEmailValid] = useState(true);

//   useEffect(() => {
//     const storedRememberedEmail = localStorage.getItem('rememberedEmail');
//     const storedRememberedPassword = localStorage.getItem('rememberedPassword');

//     if (storedRememberedEmail && storedRememberedPassword) {
//       setEmail(storedRememberedEmail);
//       setPassword(storedRememberedPassword);
//       setRememberMe(true); // Optional: Set the state to true if you want to show the checkbox as checked
//     }
//   }, []);


//   const validateEmail = (value) => {
//     const lowercaseEmail = value.toLowerCase();

//     if (!lowercaseEmail || !/^\S+@\S+\.\S+$/.test(lowercaseEmail)) {
//       setEmailValid(false);
//       return false;
//     }

//     setEmailValid(true);
//     return true;
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleRememberMeChange = (e) => {
//     const isChecked = e.target.checked;
//     setRememberMe(isChecked);
//   };

//   const handleLogin = async () => {
// 	setEmailError('');
// 	setPasswordError('');
// 	setLoginError('');
  
// 	if (!email) {
// 	  setEmailError('Email is required');
// 	  return;
// 	}
  
// 	if (!password) {
// 	  setPasswordError('Password is required');
// 	  return;
// 	}
  
// 	try {
// 	  // Your login API call logic here
// 	  const response = await axios.post(
// 		`${process.env.BASE_API_URL}/api/v1/login`,
// 		{
// 		  email: email.toLowerCase(),
// 		  password,
// 		  userType: 'customer',
// 		}
// 	  );
  
// 	  if (response?.data?.result?.Login !== 'Successful') {
// 		setLoginError(response.data.error);
// 	  } else {
// 		const authToken = response.data.token;

// 		if (rememberMe) {
// 		  localStorage.setItem('rememberedEmail', email);
// 		  localStorage.setItem('rememberedPassword', password);
// 		} else {
// 		  localStorage.removeItem('rememberedEmail');
// 		  localStorage.removeItem('rememberedPassword');
// 		}
  
// 		localStorage.setItem('email', email);
// 		localStorage.setItem('customerId', response.data.result.UserData._id);
  
// 		setAuthenticated(true);
// 		setUser(response.data.result.UserData);
  
// 		if (router.pathname === '/account/login') {
// 		  router.push('/');
// 		} else {
// 		  window.location.reload();
// 		}
// 	  }
// 	} catch (error) {
// 	  console.error('Error logging in:', error);
// 	  setLoginError('Error logging in. Please try again.');
// 	} finally {
// 	  setLoading(false);
// 	}
//   };
  

//   return (
//     <>
//       <div className="flex w-full flex-col mb-2">
//         <p className="flex-wrap text-xl text-center items-center font-semibold my-2">
//           Login
//         </p>
//         <p className="flex-wrap text-xs mb-2 text-center text-gray-500">
//           Continue to Trialshopy
//         </p>
//       </div>

//       <div className="flex w-full flex-col">
//         <input
//           type="email"
//           placeholder="Email"
//           className={`w-full h-[47px] px-2 py-1 border border-gray-400 rounded-md ${
//             emailError ? 'border-red-500' : ''
//           }`}
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//             validateEmail(e.target.value);
//           }}
//           required
//         />
//         {!emailValid && (
//           <p className="text-red-500 text-xs">Invalid email address</p>
//         )}
//         {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
//       </div>

//       <div className="grid-flow-col max-md:gap-3 justify-between">
//         <div className="relative flex">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Password"
//             className={`flex border w-full h-[47px] border-gray-400 py-1 px-2 rounded-md my-2 ${
//               passwordError ? 'border-red-500' : ''
//             }`}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <HiEye
//             name="eye-fill"
//             onClick={togglePasswordVisibility}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
//           />
//         </div>
//         {passwordError && (
//           <p className="text-red-500 text-xs">{passwordError}</p>
//         )}
//         {loginError && <p className="text-red-500 text-xs">{loginError}</p>}

//         <div className="flex justify-between">
//           <Link
//             href={'/account/forgotPwd'}
//             className="text-xs mb-2 text-[14px] text-gray-900 cursor-pointer"
//           >
//             Forgot Password ?
//           </Link>
//           <div className="flex justify-center">
//             <input
//               type="checkbox"
//               className="w-4 h-4 mr-2 accent-orange-400"
//               checked={rememberMe}
//               onChange={handleRememberMeChange}
//             />
//             <span className="text-xs mb-2 text-[14px] text-gray-900">
//               Remember Me
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex flex-col my-1">
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className={`${
//             loading ? 'opacity-30 !important' : 'opacity-100'
//           }w-full text-white my-2 bg-orange-400 rounded-md h-[48px] text-center flex items-center justify-center`}
//         >
//           {loading ? 'Loading...' : 'Login'}
//         </button>
//       </div>
//     </>
//   );
// };

// export default LoginwithPwd;



//import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { HiEye } from 'react-icons/hi';
// import { useUser } from '../../UserContext';
// import { useAuth } from '../../context/AuthContext';
// import Link from 'next/link';
// import cookie from 'js-cookie';
// import { hash } from 'bcryptjs'; // Importing bcryptjs for password hashing

// const LoginwithPwd = () => {
//   const { setAuthenticated } = useAuth();
//   const { setUser } = useUser();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const userType = 'customer';
//   const router = useRouter();

//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [emailValid, setEmailValid] = useState(true);

//   useEffect(() => {
//     const rememberedEmail = cookie.get('rememberedEmail');
//     const rememberedPassword = cookie.get('rememberedPassword');

//     if (rememberedEmail && rememberedPassword) {
//       setEmail(rememberedEmail);
//       setPassword(rememberedPassword);
//       setRememberMe(true);
//     }
//   }, []);

//   const validateEmail = (value) => {
//     const lowercaseEmail = value.toLowerCase();

//     if (!lowercaseEmail || !/^\S+@\S+\.\S+$/.test(lowercaseEmail)) {
//       setEmailValid(false);
//       return false;
//     }

//     setEmailValid(true);
//     return true;
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleRememberMeChange = (e) => {
//     const isChecked = e.target.checked;
//     setRememberMe(isChecked);
//   };

//   const handleLogin = async () => {
//     setEmailError('');
//     setPasswordError('');
//     setLoginError('');

//     if (!email) {
//       setEmailError('Email is required');
//       return;
//     }

//     if (!password) {
//       setPasswordError('Password is required');
//       return;
//     }

//     try {
//       // Your login API call logic here
//       const response = await axios.post(
//         `${process.env.BASE_API_URL}/api/v1/login`,
//         {
//           email: email.toLowerCase(),
//           password,
//           userType: 'customer',
//         }
//       );

//       if (response?.data?.result?.Login !== 'Successful') {
//         setLoginError(response.data.error);
//       } else {
//         const authToken = response.data.token;

//         if (rememberMe) {
//           // Hashing the password before storing it in the cookie
//           const hashedPassword = await hash(password, 10);
//           cookie.set('rememberedEmail', email, { expires: 365 });
//           cookie.set('rememberedPassword', hashedPassword, { expires: 365 });
//         } else {
//           cookie.remove('rememberedEmail');
//           cookie.remove('rememberedPassword');
//         }

//         cookie.set('email', email);
//         cookie.set('customerId', response.data.result.UserData._id);

//         setAuthenticated(true);
//         setUser(response.data.result.UserData);

//         if (router.pathname === '/account/login') {
//           router.push('/');
//         } else {
//           window.location.reload();
//         }
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setLoginError('Error logging in. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <>
//       <div className="flex w-full flex-col mb-2">
//         <p className="flex-wrap text-xl text-center items-center font-semibold my-2">
//           Login
//         </p>
//         <p className="flex-wrap text-xs mb-2 text-center text-gray-500">
//           Continue to Trialshopy
//         </p>
//       </div>

//       <div className="flex w-full flex-col">
//         <input
//           type="email"
//           placeholder="Email"
//           className={`w-full h-[47px] px-2 py-1 border border-gray-400 rounded-md ${
//             emailError ? 'border-red-500' : ''
//           }`}
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//             validateEmail(e.target.value);
//           }}
//           required
//         />
//         {!emailValid && (
//           <p className="text-red-500 text-xs">Invalid email address</p>
//         )}
//         {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
//       </div>

//       <div className="grid-flow-col max-md:gap-3 justify-between">
//         <div className="relative flex">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Password"
//             className={`flex border w-full h-[47px] border-gray-400 py-1 px-2 rounded-md my-2 ${
//               passwordError ? 'border-red-500' : ''
//             }`}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <HiEye
//             name="eye-fill"
//             onClick={togglePasswordVisibility}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
//           />
//         </div>
//         {passwordError && (
//           <p className="text-red-500 text-xs">{passwordError}</p>
//         )}
//         {loginError && <p className="text-red-500 text-xs">{loginError}</p>}

//         <div className="flex justify-between">
//           <Link
//             href={'/account/forgotPwd'}
//             className="text-xs mb-2 text-[14px] text-gray-900 cursor-pointer"
//           >
//             Forgot Password ?
//           </Link>
//           <div className="flex justify-center">
//             <input
//               type="checkbox"
//               className="w-4 h-4 mr-2 accent-orange-400"
//               checked={rememberMe}
//               onChange={handleRememberMeChange}
//             />
//             <span className="text-xs mb-2 text-[14px] text-gray-900">
//               Remember Me
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="w-full flex flex-col my-1">
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className={`${
//             loading ? 'opacity-30 !important' : 'opacity-100'
//           }w-full text-white my-2 bg-orange-400 rounded-md h-[48px] text-center flex items-center justify-center`}
//         >
//           {loading ? 'Loading...' : 'Login'}
//         </button>
//       </div>
//     </>
//   );
// };

// export default LoginwithPwd;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { HiEye } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { useUser } from '../../UserContext';
import cookie from 'js-cookie';

const LoginwithPwd = () => {
  const { setAuthenticated } = useAuth();
  const setAuthenticated1 = useUser().setAuthenticated;
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userType = 'customer';
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    const rememberedEmail = cookie.get('rememberedEmail');
    const rememberedPassword = cookie.get('rememberedPassword');

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (value) => {
    const lowercaseEmail = value.toLowerCase();

    if (!lowercaseEmail || !/^\S+@\S+\.\S+$/.test(lowercaseEmail)) {
      setEmailValid(false);
      return false;
    }

    setEmailValid(true);
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
  };
  useEffect(() => {
    const { email: queryEmail, password: queryPassword } = router.query;
    if (queryEmail && queryPassword) {
        setEmail(queryEmail.toString());
        setPassword(queryPassword.toString());
    }
}, [router.query]);

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setLoginError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      // Your login API call logic here
      const response = await axios.post(
        `${process.env.BASE_API_URL}/api/v1/login`,
        {
          email: email.toLowerCase(),
          password,
          userType: 'customer',
        }
      );

      if (response?.data?.result?.Login !== 'Successful') {
        setLoginError(response.data.error);
      } else {
        const authToken = response.data.token;

        if (rememberMe) {
          cookie.set('rememberedEmail', email, { expires: 365 });
          cookie.set('rememberedPassword', password, { expires: 365 });
        } else {
          cookie.remove('rememberedEmail');
          cookie.remove('rememberedPassword');
        }

        cookie.set('email', email);
        cookie.set('customerId', response.data.result.UserData._id);

        setAuthenticated(true);
        setUser(response.data.result.UserData);

        if (router.pathname === '/account/login') {
          router.push('/');
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Error logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col mb-2">
        <p className="flex-wrap text-xl text-center items-center font-semibold my-2">
          Login
        </p>
        <p className="flex-wrap text-xs mb-2 text-center text-gray-500">
          Continue to Trialshopy
        </p>
      </div>

      <div className="flex w-full flex-col">
        <input
          type="email"
          placeholder="Email"
          className={`w-full h-[47px] px-2 py-1 border border-gray-400 rounded-md ${
            emailError ? 'border-red-500' : ''
          }`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          required
        />
        {!emailValid && (
          <p className="text-red-500 text-xs">Invalid email address</p>
        )}
        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
      </div>

      <div className="grid-flow-col max-md:gap-3 justify-between">
        <div className="relative flex">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={`flex border w-full h-[47px] border-gray-400 py-1 px-2 rounded-md my-2 ${
              passwordError ? 'border-red-500' : ''
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <HiEye
            name="eye-fill"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs">{passwordError}</p>
        )}
        {loginError && <p className="text-red-500 text-xs">{loginError}</p>}

        <div className="flex justify-between">
          <Link
            href={'/account/forgotPwd'}
            className="text-xs mb-2 text-[14px] text-gray-900 cursor-pointer"
          >
            Forgot Password ?
          </Link>
          <div className="flex justify-center">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 accent-orange-400"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span className="text-xs mb-2 text-[14px] text-gray-900">
              Remember Me
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col my-1">
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`${
            loading ? 'opacity-30 !important' : 'opacity-100'
          }w-full text-white my-2 bg-orange-400 rounded-md h-[48px] text-center flex items-center justify-center`}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </>
  );
};

export default LoginwithPwd;

