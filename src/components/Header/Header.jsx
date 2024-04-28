// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Select from '../Header/Select';
// import CategoryNavbar from '../Header/CategoryNavbar';
// import DropdownMenu from '../Header/MainMenu';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
// import Cart from '../cart/Cart';
// import { useRouter } from 'next/router';
// import SearchBox from './SearchBox';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import { useUser } from '../../UserContext';

// const Header = () => {
// 	const [cartItemsCount, setCartItemsCount] = useState(0);

// 	const serverURL = process.env.BASE_API_URL;
// 	const { pathname } = useRouter();
// 	const [isCart, setIsCart] = useState(false);
// 	const router = useRouter();
// 	const [showLogoutMessage, setShowLogoutMessage] = useState(false);
// 	const [logoutMessage, setLogoutMessage] = useState('');

// 	const { authenticated, setAuthenticated } = useAuth();
// 	const { user } = useUser();
// 	const [categories, setCategories] = useState([]);
// 	const [cartItems, setCartItems] = useState([]);

// 	useEffect(() => {
// 		const storedAuthenticated = localStorage.getItem('authenticated');
// 		if (storedAuthenticated) {
// 			setAuthenticated(storedAuthenticated === 'true');
// 		}

// 		const apiurl = `${serverURL}/api/v1/homeCategories`;

// 		axios
// 			.get(apiurl)
// 			.then((response) => {
// 				setCategories(response.data);
// 				console.log('setCategories',response.data)
// 				sessionStorage.setItem('homeCategories', JSON.stringify(response.data));
// 			})
// 			.catch((error) => {
// 				console.error('Error fetching categories:', error);
// 			});
// 	}, [authenticated, serverURL]);
	


// 	useEffect(() => {
// 		const fetchCartItems = async () => {
// 			const customerId = localStorage.getItem('customerId');	
// 			if (customerId) {
// 				try {
// 					setAuthenticated(true);
// 					const response = await axios.get(
// 						`${serverURL}/api/v1/cart/` + customerId
// 					);
// 					let cartItem = [];
// 					let items = response.data[0].items;
// 					for (let item of items) {
// 						const { productName, price } = item.productId;
// 						const qty = item.count || 0;
// 						const total = qty * price;
// 						cartItem.push({
// 							productName,
// 							price,
// 							qty,
// 							total,
// 						});
// 					}
// 					setCartItems(cartItem);
	
// 					const totalCount = cartItems.reduce((acc, cur) => acc + cur.qty, 0);
// 					// Update cartItemsCount state
// 					setCartItemsCount(totalCount);
	
// 					//console.log('CartItems: ', cartItems);
// 				} catch (err) {
// 					console.error('Error fetching cart items:', err);
// 				}
// 			}
// 		};
	
// 		fetchCartItems();
// 	}, [ authenticated, serverURL]);
	
// 	// Function to handle removing an item from the cart
// 	// const removeFromCart = (indexToRemove) => {
// 	// 	const updatedCartItems = [...cartItems];
// 	// 	updatedCartItems.splice(indexToRemove, 1); // Remove the item at the specified index
// 	// 	setCartItems(updatedCartItems);
	
// 	// 	// Update cartItemsCount state here
// 	// 	const totalCount = updatedCartItems.reduce((acc, cur) => acc + cur.qty, 0);
// 	// 	setCartItemsCount(totalCount);
// 	// };
	
// 	const signInClick = () => {
// 		router.push('/account/login');
// 	};

// 	const signOutClick = () => {
// 		try {
// 			localStorage.removeItem('user');
// 			localStorage.removeItem('email');
// 			localStorage.removeItem('customerId');
// 			setIsCart(false);
// 			setAuthenticated(false);
// 			setCartItems([]);
// 			setLogoutMessage('Logout successful!');
// 			setShowLogoutMessage(true);
// 			router.push('/');
// 			localStorage.setItem('authenticated', false);
// 			setTimeout(() => {
// 				setShowLogoutMessage(false);
// 			}, 2000);
// 		} catch (err) {
// 			console.error('Error logging out', err);
// 		}
// 	};

    

// 	return (
// 		<>
// 			<div className="hidden w-full lg:block">
// 				<div className="border box-border flex flex-row items-center justify-between font-poppins px-[120px] w-full">
// 					<div className="flex flex-row items-center justify-start">
// 						<div className="border border-b-0  p-2.5 box-border">
// 							<Select />
// 						</div>
// 						<div className="border border-b-0  p-2.5 box-border">INDIA</div>
// 					</div>
// 					<div className="flex items-center justify-start">
// 						<div className="border border-b-0  p-2.5 box-border">
// 							<Link href="/account/contactus" className="">
// 								CONTACT US
// 							</Link>
// 						</div>
// 						<div className="border border-b-0  p-2.5 box-border">
// 							<Link href="/account/newsletter" className="">
// 								NEWSLETTER
// 							</Link>
// 						</div>
// 						<div className="border border-b-0 p-2.5 box-border">
// 							<Link href="/account/faq" className="">
// 								FAQS
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="flex flex-col lg:flex-row  items-center lg:justify-between gap-2 lg:gap-4 px-4 py-4 xl:px-[120px] lg:py-[10px] w-full border bg-white">
// 				<div className="flex  items-center justify-between order-1 gap-1.5 w-full h-full lg:w-auto">
// 					<div className="flex items-center h-full gap-1">
// 						<span className="block lg:hidden ">
// 							<DropdownMenu
// 								signInClick={signInClick}
// 								signOutClick={signOutClick}
// 								authenticated={authenticated}
// 								isCart={isCart}
// 								setIsCart={setIsCart}
// 							/>
// 						</span>
// 						<Link
// 							href="/"
// 							className="lg:font-bold uppercase text-base md:text-lg lg:text-3xl text-[#18181B] font-poppins h-full">
// 							<Image
// 								src={'/images/logo/trialshoppy_mobile.svg'}
// 								width={232}
// 								height={44}
// 								alt="logo"
// 								className="hidden lg:block h-full w-full lg:min-w-[200px]"
// 							/>
// 							<Image
// 								src={'/images/logo/trialshoppy_mobile.svg'}
// 								width={80}
// 								height={25}
// 								alt="logo"
// 								className="block lg:hidden h-full w-full min-w-[100px]"
// 							/>
// 						</Link>
// 					</div>

// 					<div className="flex lg:hidden flex-row items-center justify-between gap-2.5 order-2 lg:order-4 w-full max-w-min ml-4">
// 						{authenticated ? <></> : <></>}
// 					</div>
// 				</div>

// 				<div className="hidden lg:flex lg:flex-row items-center justify-between gap-2.5 order-2 lg:order-4">
// 					{authenticated ? (
// 						<>
// 							<div className="flex gap-4">
// 								<Link
// 									href="/account/wishlist"
// 									className="block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white">
// 									<AiOutlineHeart size={20} />
// 								</Link>
// 								<div
// 									className="block border border-[#EB8105] px-[5px] lg:px-2.5 py-[5px] lg:py-2.5 bg-white transition-all hover:cursor-pointer rounded-md"
// 									onClick={() => setIsCart(!isCart)}>
// 									<MdOutlineShoppingCart size={20} />
// 									{cartItems.length > 0 && (
//                                    <span className="absolute top-14 ml-4 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
//                                  {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
//                               </span>
//                                  )}

// 								</div>
// 								<Link
// 									href="/account"
// 									className="block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white">
// 									<AiOutlineUser size={20} />
// 								</Link>
// 							</div>
// 							<button
// 								onClick={signOutClick}
// 								className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins ">
// 								LOG OUT
// 							</button>
// 						</>
// 					) : (
// 						pathname !== '/account/login' && (
// 							<button
// 								onClick={signInClick}
// 								className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins ">
// 								LOG IN/SIGN UP
// 							</button>
// 						)
// 					)}
// 				</div>

// 				<SearchBox />
// 			</div>

// 			<CategoryNavbar categories={categories} />
// 			{isCart && <Cart setIsCart={setIsCart} cartItems={cartItems} />}
// 			{showLogoutMessage && (
// 				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
// 					<div className="bg-white border-2 border-[#EB8105] p-7 rounded-md shadow-md z-60">
// 						<p className="text-black">{logoutMessage}</p>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default Header;

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Select from '../Header/Select';
// import CategoryNavbar from '../Header/CategoryNavbar';
// import DropdownMenu from '../Header/MainMenu';
// import { MdOutlineShoppingCart } from 'react-icons/md';
// import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
// import Cart from '../cart/Cart';
// import { useRouter } from 'next/router';
// import SearchBox from './SearchBox';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';
// import { useUser } from '../../UserContext';

// const Header = () => {
// 	const serverURL = process.env.BASE_API_URL;
// 	const { pathname } = useRouter();
// 	const [isCart, setIsCart] = useState(false);
// 	const router = useRouter();
// 	const [showLogoutMessage, setShowLogoutMessage] = useState(false);
// 	const [logoutMessage, setLogoutMessage] = useState('');

// 	const { authenticated, setAuthenticated } = useAuth();
// 	const { user } = useUser();
// 	const [categories, setCategories] = useState([]);
// 	const [cartItems, setCartItems] = useState([]);

// 	useEffect(() => {
// 		const storedAuthenticated = localStorage.getItem('authenticated');
// 		if (storedAuthenticated) {
// 			setAuthenticated(storedAuthenticated === 'true');
// 		}

// 		const apiurl = `${serverURL}/api/v1/homeCategories`;

// 		axios
// 			.get(apiurl)
// 			.then((response) => {
// 				setCategories(response.data);
// 				sessionStorage.setItem('homeCategories', JSON.stringify(response.data));
// 			})
// 			.catch((error) => {
// 				console.error('Error fetching categories:', error);
// 			});
// 	}, [authenticated, serverURL]);

// 	useEffect(() => {
// 		const fetchCartItems = async () => {
// 			const customerId = localStorage.getItem('customerId');
// 			console.log('customerId',customerId)
// 			if (customerId) {
// 				try {
// 					setAuthenticated(true);
// 					const response = await axios.get(
// 						`${serverURL}/api/v1/cart/` + customerId
// 					);
// 					let cartItem = [];
// 					let items = response.data[0].items;
// 					for (let item of items) {
// 						const { productName, price } = item.productId;
// 						const qty = item.count || 0;
// 						const total = qty * price;
// 						cartItem.push({
// 							productName,
// 							price,
// 							qty,
// 							total,
// 						});
// 					}
// 					setCartItems(cartItem);
// 					console.log('CartItems: ', cartItems);
// 				} catch (err) {
// 					console.error('Error fetching cart items:', err);
// 				}
// 			}
// 		};

// 		fetchCartItems();
// 	}, [authenticated, serverURL]);

// 	const signInClick = () => {
// 		router.push('/account/login');
// 	};

// 	const signOutClick = () => {
// 		try {
// 			localStorage.removeItem('user');
// 			localStorage.removeItem('email');
// 			localStorage.removeItem('customerId');
// 			setIsCart(false);
// 			setAuthenticated(false);
// 			setCartItems([]);
// 			setLogoutMessage('Logout successful!');
// 			setShowLogoutMessage(true);
// 			router.push('/');
// 			localStorage.setItem('authenticated', false);
// 			setTimeout(() => {
// 				setShowLogoutMessage(false);
// 			}, 2000);
// 		} catch (err) {
// 			console.error('Error logging out', err);
// 		}
// 	};

// 	return (
// 		<>
// 			<div className="hidden w-full lg:block">
// 				<div className="border box-border flex flex-row items-center justify-between font-poppins px-[120px] w-full">
// 					<div className="flex flex-row items-center justify-start">
// 						<div className="border border-b-0  p-2.5 box-border">
// 							<Select />
// 						</div>
// 						<div className="border border-b-0  p-2.5 box-border">INDIA</div>
// 					</div>
// 					<div className="flex items-center justify-start">
// 						<div className="border border-b-0  p-2.5 box-border">
// 							<Link href="/account/contactus" className="">
// 								CONTACT US
// 							</Link>
// 						</div>
// 						<div className="border border-b-0  p-2.5 box-border">
// 							<Link href="/account/newsletter" className="">
// 								NEWSLETTER
// 							</Link>
// 						</div>
// 						<div className="border border-b-0 p-2.5 box-border">
// 							<Link href="/account/faq" className="">
// 								FAQS
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="flex flex-col lg:flex-row  items-center lg:justify-between gap-2 lg:gap-4 px-4 py-4 xl:px-[120px] lg:py-[10px] w-full border bg-white">
// 				<div className="flex  items-center justify-between order-1 gap-1.5 w-full h-full lg:w-auto">
// 					<div className="flex items-center h-full gap-1">
// 						<span className="block lg:hidden ">
// 							<DropdownMenu
// 								signInClick={signInClick}
// 								signOutClick={signOutClick}
// 								authenticated={authenticated}
// 								isCart={isCart}
// 								setIsCart={setIsCart}
// 							/>
// 						</span>
// 						<Link
// 							href="/"
// 							className="lg:font-bold uppercase text-base md:text-lg lg:text-3xl text-[#18181B] font-poppins h-full">
// 							<Image
// 								src={'/images/logo/trialshoppy_mobile.svg'}
// 								width={232}
// 								height={44}
// 								alt="logo"
// 								className="hidden lg:block h-full w-full lg:min-w-[200px]"
// 							/>
// 							<Image
// 								src={'/images/logo/trialshoppy_mobile.svg'}
// 								width={80}
// 								height={25}
// 								alt="logo"
// 								className="block lg:hidden h-full w-full min-w-[100px]"
// 							/>
// 						</Link>
// 					</div>

// 					<div className="flex lg:hidden flex-row items-center justify-between gap-2.5 order-2 lg:order-4 w-full max-w-min ml-4">
// 						{authenticated ? <></> : <></>}
// 					</div>
// 				</div>

// 				<div className="hidden lg:flex lg:flex-row items-center justify-between gap-2.5 order-2 lg:order-4">
// 					{authenticated ? (
// 						<>
// 							<div className="flex gap-4">
// 								<Link
// 									href="/account/wishlist"
// 									className="block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white">
// 									<AiOutlineHeart size={20} />
// 								</Link>
// 								<div
// 									className="block border border-[#EB8105] px-[5px] lg:px-2.5 py-[5px] lg:py-2.5 bg-white transition-all hover:cursor-pointer rounded-md"
// 									onClick={() => setIsCart(!isCart)}>
// 									<MdOutlineShoppingCart size={20} />
// 								</div>
// 								<Link
// 									href="/account"
// 									className="block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white">
// 									<AiOutlineUser size={20} />
// 								</Link>
// 							</div>
// 							<button
// 								onClick={signOutClick}
// 								className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins ">
// 								LOG OUT
// 							</button>
// 						</>
// 					) : (
// 						pathname !== '/account/login' && (
// 							<button
// 								onClick={signInClick}
// 								className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins ">
// 								LOG IN/SIGN UP
// 							</button>
// 						)
// 					)}
// 				</div>

// 				<SearchBox />
// 			</div>

// 			<CategoryNavbar categories={categories} />
// 			{isCart && <Cart setIsCart={setIsCart} cartItems={cartItems} />}
// 			{showLogoutMessage && (
// 				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
// 					<div className="bg-white border-2 border-[#EB8105] p-7 rounded-md shadow-md z-60">
// 						<p className="text-black">{logoutMessage}</p>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default Header;




import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Select from '../Header/Select';
import CategoryNavbar from '../Header/CategoryNavbar';
import DropdownMenu from '../Header/MainMenu';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import Cart from '../cart/Cart';
import { useRouter } from 'next/router';
import SearchBox from './SearchBox';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../UserContext';
import Cookies from 'js-cookie';

const Header = () => {
	const [cartItemsCount, setCartItemsCount] = useState(0);

	const serverURL = process.env.BASE_API_URL;
	const { pathname } = useRouter();
	const [isCart, setIsCart] = useState(false);
	const router = useRouter();
	const [showLogoutMessage, setShowLogoutMessage] = useState(false);
	const [logoutMessage, setLogoutMessage] = useState('');

	const { authenticated, setAuthenticated } = useAuth();
	const { user } = useUser();
	const [categories, setCategories] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
        // Check if user is authenticated using cookie
        const isAuthenticated = Cookies.get('authenticated');
        if (isAuthenticated === 'true') {
            setAuthenticated(true);
        }

        const apiurl = `${serverURL}/api/v1/homeCategories`;

        axios
            .get(apiurl)
            .then((response) => {
                setCategories(response.data);
                sessionStorage.setItem('homeCategories', JSON.stringify(response.data));
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [serverURL]);


	useEffect(() => {
		const fetchCartItems = async () => {
			const customerId = Cookies.get('customerId');
			if (customerId) {
				try {
					setAuthenticated(true);
					const response = await axios.get(
						`${serverURL}/api/v1/cart/` + customerId
					);
					let cartItem = [];
					let items = response.data[0].items;
					for (let item of items) {
						const { productName, price } = item.productId;
						const qty = item.count || 0;
						const total = qty * price;
						cartItem.push({
							productName,
							price,
							qty,
							total,
						});
					}
					setCartItems(cartItem);
	
					const totalCount = cartItems.reduce((acc, cur) => acc + cur.qty, 0);
					setCartItemsCount(totalCount);
	
					//console.log('CartItems: ', cartItems);
				} catch (err) {
					console.error('Error fetching cart items:', err);
				}
			}
		};
	
		fetchCartItems();
	}, [ authenticated, serverURL]);
	
	// Function to handle removing an item from the cart
	// const removeFromCart = (indexToRemove) => {
	// 	const updatedCartItems = [...cartItems];
	// 	updatedCartItems.splice(indexToRemove, 1); // Remove the item at the specified index
	// 	setCartItems(updatedCartItems);
	
	// 	// Update cartItemsCount state here
	// 	const totalCount = updatedCartItems.reduce((acc, cur) => acc + cur.qty, 0);
	// 	setCartItemsCount(totalCount);
	// };
	
	const signInClick = () => {
		router.push('/account/login');
	};

	const signOutClick = () => {
		try {
			// Remove items from cookies
			Cookies.remove('user');
			Cookies.remove('email');
			Cookies.remove('customerId');
	
			setIsCart(false);
			setAuthenticated(false);
			setCartItems([]);
			setLogoutMessage('Logout successful!');
			setShowLogoutMessage(true);
			router.push('/');
			Cookies.set('authenticated', false); // Set authenticated as false using cookies
	
			setTimeout(() => {
				setShowLogoutMessage(false);
			}, 2000);
		} catch (err) {
			console.error('Error logging out', err);
		}
	};
    

	return (
		<>
			<div className="hidden w-full lg:block">
				<div className="border box-border flex flex-row items-center justify-between font-poppins px-[120px] w-full">
					<div className="flex flex-row items-center justify-start">
						<div className="border border-b-0  p-2.5 box-border">
							<Select />
						</div>
						<div className="border border-b-0  p-2.5 box-border">INDIA</div>
					</div>
					<div className="flex items-center justify-start">
						<div className="border border-b-0  p-2.5 box-border">
							<Link href="/account/contactus" className="">
								CONTACT US
							</Link>
						</div>
						<div className="border border-b-0  p-2.5 box-border">
							<Link href="/account/newsletter" className="">
								NEWSLETTER
							</Link>
						</div>
						<div className="border border-b-0 p-2.5 box-border">
							<Link href="/account/faq" className="">
								FAQS
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row  items-center lg:justify-between gap-2 lg:gap-4 px-4 py-4 xl:px-[120px] lg:py-[10px] w-full border bg-white">
				<div className="flex  items-center justify-between order-1 gap-1.5 w-full h-full lg:w-auto">
					<div className="flex items-center h-full gap-1">
						<span className="block lg:hidden ">
							<DropdownMenu
								signInClick={signInClick}
								signOutClick={signOutClick}
								authenticated={authenticated}
								isCart={isCart}
								setIsCart={setIsCart}
							/>
						</span>
						<Link
							href="/"
							className="lg:font-bold uppercase text-base md:text-lg lg:text-3xl text-[#18181B] font-poppins h-full">
							<Image
								src={'/images/logo/trialshoppy_mobile.svg'}
								width={232}
								height={44}
								alt="logo"
								className="hidden lg:block h-full w-full lg:min-w-[200px]"
							/>
							<Image
								src={'/images/logo/trialshoppy_mobile.svg'}
								width={80}
								height={25}
								alt="logo"
								className="block lg:hidden h-full w-full min-w-[100px]"
							/>
						</Link>
					</div>

					<div className="flex lg:hidden flex-row items-center justify-between gap-2.5 order-2 lg:order-4 w-full max-w-min ml-4">
						{authenticated ? <></> : <></>}
					</div>
				</div>

				<div className="hidden lg:flex lg:flex-row items-center justify-between gap-2.5 order-2 lg:order-4">
					{authenticated ? (
						<>
							<div className="flex gap-4">
								<Link
									href="/account/wishlist"
									className="block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white">
									<AiOutlineHeart size={20} />
								</Link>
								<div
									className="block border border-[#EB8105] px-[5px] lg:px-2.5 py-[5px] lg:py-2.5 bg-white transition-all hover:cursor-pointer rounded-md"
									onClick={() => setIsCart(!isCart)}>
									<MdOutlineShoppingCart size={20} />
									{cartItems.length > 0 && (
                                   <span className="absolute top-14 ml-4 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                 {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                              </span>
                                 )}

								</div>
								<Link
									href="/account"
									className="block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white">
									<AiOutlineUser size={20} />
								</Link>
							</div>
							<button
								onClick={signOutClick}
								className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins ">
								LOG OUT
							</button>
						</>
					) : (
						pathname !== '/account/login' && (
							<button
								onClick={signInClick}
								className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins ">
								LOG IN/SIGN UP
							</button>
						)
					)}
				</div>

				<SearchBox />
			</div>

			<CategoryNavbar categories={categories} />
			{isCart && <Cart setIsCart={setIsCart} cartItems={cartItems} />}
			{showLogoutMessage && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white border-2 border-[#EB8105] p-7 rounded-md shadow-md z-60">
						<p className="text-black">{logoutMessage}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;

