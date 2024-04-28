import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
const serverURL = process.env.BASE_API_URL;
import { useUser } from '../../UserContext';
const Paymentpage = () => {
	// const [showMore, setShowMore] = useState(false);

	// const bankOffers = [
	// 	'15% Instant Discount on HDFC Bank Credit and Debit Cards on min spend on Rs. 2,000',
	// 	'Offer 2',
	// 	'Offer 3',
	// 	'Offer 4',

	// ];

	// const visibleOffers = showMore ? bankOffers : bankOffers.slice(0, 1);
    const {user}=  useUser();
	const [selectedMode, setSelectedMode] = useState('');
	const [formDetails, setFormDetails] = useState({});

	const handleModeChange = (mode) => {
		setSelectedMode(mode);
		setFormDetails({});
	};

	const handleFormChange = (e) => {
		setFormDetails((prevDetails) => ({
			...prevDetails,
			[e.target.name]: e.target.value,
		}));
	};

	const renderFormDetails = () => {
		switch (selectedMode) {
			case 'UPI ID':
				return (
					<div>
						<label htmlFor="upiId"></label>
						<input
							type="text"
							placeholder="name@paytm"
							id="upiId"
							name="upiId"
							value={formDetails.upiId || ''}
							onChange={handleFormChange}
							className="w-full p-2 mt-1 border rounded border-gray"
						/>
					</div>
				);
			case 'Debit':
			case 'Credit':
				return (
					<div className="grid grid-cols-2 gap-4">
						<div>
							<input
								type="text"
								id="cardNumber"
								name="cardNumber"
								placeholder="Card Number"
								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
								pattern="\d{0,4}-?\d{0,4}-?\d{0,4}-?\d{0,4}"
								maxLength="16"
								inputmode="numeric"
							/>
						</div>
						<div>
							<input
								type="text"
								id="ownerName"
								name="ownerName"
								placeholder="Owner's Name"
								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
							/>
						</div>
						<div>
							<input
								type="text"
								id="expiryDate"
								name="expiryDate"
								placeholder="Expiry Date (MM/YY)"
								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
							/>
						</div>
						<div>
							<input
								type="text"
								id="cvv"
								name="cvv"
								placeholder="CVV"
								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
							/>
						</div>
					</div>
				);
			case 'NetBanking':
				return (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<input
								type="text"
								id="customerId"
								name="customerId"
								placeholder="Customer ID"
								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
							/>
						</div>
						<div>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
							/>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	const router = useRouter();
	const { productId, total, totaldiscount, tobepaid,discountonmrp } = router.query;
     
	const handleOpenRazorpay = (data) => {
		const orderData = {
			products: [
				{
					product: productId,
					quantity: 1,
					orderStatus: 'pending',
					amount: tobepaid, // Replace with the actual amount for product_id_2
				},
				// Add more products as needed
			],
			totalPrice: tobepaid,
			phone_number: '1234567890',
			shippingAddress: '123 Main St, City, Country',
		};
        console.log(user);
		const options = {
			key: 'rzp_test_rgthju6crbP1Sv',
			amount: Number(tobepaid * 100),
			currency: data.currency,
			name: 'TrialShoppy',
			description: 'Created by SK',
			order_id: data.id,
			handler: function (response) {
				// Use axios to make a POST request to your server
				axios

					.post(
						`${serverURL}/api/v1/${user._id}/addOrder`,
						orderData
					)
					.then((res) => {
						console.log(res);
						alert('Payment success');
						router.push({
							pathname:'/checkout/confirmation',
						   
						});
					})
					.catch((err) => {
						console.log(err);
						alert('Error processing payment');
					});
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();

		paymentObject.on('payment.failed', function (response) {
			alert('Payment failed. Please try again. Contact support for help');
		});
	};
	const handlePayment = (amount) => {
		/*const data = { amount: amount };
		axios
			.post('http://localhost:7000/api/v1/orderpayment', data)
			.then((res) => {
				// console.log(res.data.data);
				// handleOpenRazorpay(res.data.data);
				router.push()
			})
			.catch((err) => {
				console.log(err);
			});*/

		axios
			.post(`${serverURL}/api/payment`)
			.then((res) => {
				console.log('request sent successful');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			<div className="flex  mt-[40px]  justify-center items-center">
				{/* <Image
					height={20}
					width={20}
					alt="Logo"
					src="/images/logo.svg"
					className="hidden sm:block"></Image> */}
					<div className="flex">
					<h3 className="text-[#7C7C7C] font-poppins ml-[2px] text-[14px] sm:text-[17px] ">
					SHOPPING CART 
					</h3>
					<hr className="border border-dashed md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />
					<div className="">
						<h3 className="text-[#EB8105] font-semibold font-poppins ml-[2px]   text-[14px] sm:text-[17px] ">
							PAYMENT
						</h3>
						<hr className=" border-[#EB8105] border-[1.5px] w-full  mt-[1px] " />
					</div>

					<hr className="border border-dashed  md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />
					
					<div>
						<h3 className=" text-[#7C7C7C]  font-poppins ml-[4px] text-[14px] sm:text-[17px] ">
							CONFIRMATION
						</h3>
					</div>
				</div>
				
			</div>

			<div className="px-3 md:px-[120px] xl:mx-[200px] mt-[10px] flex flex-col md:flex-row overflow-hidden">
				
				<div className="w-full">
					<h3 className="font-normal text-[#7C7C7C] text-[13px] ml-[10px] mt-[15px]">
						Prices Detail(1 item)
					</h3>
					<div className="flex justify-between my-5">
						<div className="flex flex-col items-start justify-start ml-[10px] gap-3">
							<h3 className="font-poppins font-thin text-[14px]">TOTAL MRP</h3>
							<h3 className="font-poppins font-thin text-[14px]">
								Discount on MRP
							</h3>
							<h3 className="font-poppins font-thin text-[14px]">
								Coupon Discount
							</h3>
							<div className="flex">
								<h3 className="font-poppins font-thin text-[14px]">
									Convivence Fee
								</h3>
								<h3 className="font-poppins text-[#EB8105] font-normal pt-[1.5px] text-[13px] ml-[4px] cursor-pointer">
									Know More
								</h3>
							</div>
						</div>
						<div className="flex flex-col mr-[20px] items-end justify-end gap-3">
							<h3 className="font-poppins font-normal text-[14px]">
								₹ {total}
							</h3>
							<h3 className="font-poppins font-normal text-[14px] text-[#059669]">
								-₹ {discountonmrp}
							</h3>
							<h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer">
								{totaldiscount}%
							</h3>
							<h3 className="font-poppins font-normal text-[14px]">Free</h3>
						</div>
					</div>

					<hr className="mt-[20px]" />

					<div className="flex justify-between my-5">
						<div className="flex flex-col items-start justify-start ml-[10px] gap-3">
							<h3 className="font-normal">Total Amount</h3>
						</div>
						<div className="flex font-normal flex-col mr-[20px] items-end justify-end gap-3">
							<h3>₹ {tobepaid}</h3>
						</div>
					</div>

					{/* <Link href="/checkout/confirmation">
						<div className="w-full px-3 py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary">
							Pay Now
						</div>
					</Link> */}

					<button
						className="w-full px-3 py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary"
						onClick={() => handleOpenRazorpay(total - totaldiscount)}>
						Pay Now
					</button>
					<Link href="/checkout/confirmation"></Link>

					<hr className="mt-[20px]" />
				</div>
			</div>
		</>
	);
};

export default Paymentpage;


// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// const serverURL = process.env.BASE_API_URL;
// import { useUser } from '../../UserContext';
// const Paymentpage = () => {
// 	// const [showMore, setShowMore] = useState(false);

// 	// const bankOffers = [
// 	// 	'15% Instant Discount on HDFC Bank Credit and Debit Cards on min spend on Rs. 2,000',
// 	// 	'Offer 2',
// 	// 	'Offer 3',
// 	// 	'Offer 4',

// 	// ];

// 	// const visibleOffers = showMore ? bankOffers : bankOffers.slice(0, 1);
//     const {user}=  useUser();
// 	const [selectedMode, setSelectedMode] = useState('');
// 	const [formDetails, setFormDetails] = useState({});

// 	const handleModeChange = (mode) => {
// 		setSelectedMode(mode);
// 		setFormDetails({});
// 	};

// 	const handleFormChange = (e) => {
// 		setFormDetails((prevDetails) => ({
// 			...prevDetails,
// 			[e.target.name]: e.target.value,
// 		}));
// 	};

// 	const renderFormDetails = () => {
// 		switch (selectedMode) {
// 			case 'UPI ID':
// 				return (
// 					<div>
// 						<label htmlFor="upiId"></label>
// 						<input
// 							type="text"
// 							placeholder="name@paytm"
// 							id="upiId"
// 							name="upiId"
// 							value={formDetails.upiId || ''}
// 							onChange={handleFormChange}
// 							className="w-full p-2 mt-1 border rounded border-gray"
// 						/>
// 					</div>
// 				);
// 			case 'Debit':
// 			case 'Credit':
// 				return (
// 					<div className="grid grid-cols-2 gap-4">
// 						<div>
// 							<input
// 								type="text"
// 								id="cardNumber"
// 								name="cardNumber"
// 								placeholder="Card Number"
// 								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
// 								pattern="\d{0,4}-?\d{0,4}-?\d{0,4}-?\d{0,4}"
// 								maxLength="16"
// 								inputmode="numeric"
// 							/>
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								id="ownerName"
// 								name="ownerName"
// 								placeholder="Owner's Name"
// 								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
// 							/>
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								id="expiryDate"
// 								name="expiryDate"
// 								placeholder="Expiry Date (MM/YY)"
// 								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
// 							/>
// 						</div>
// 						<div>
// 							<input
// 								type="text"
// 								id="cvv"
// 								name="cvv"
// 								placeholder="CVV"
// 								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
// 							/>
// 						</div>
// 					</div>
// 				);
// 			case 'NetBanking':
// 				return (
// 					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// 						<div>
// 							<input
// 								type="text"
// 								id="customerId"
// 								name="customerId"
// 								placeholder="Customer ID"
// 								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
// 							/>
// 						</div>
// 						<div>
// 							<input
// 								type="password"
// 								id="password"
// 								name="password"
// 								placeholder="Password"
// 								className="block w-full px-3 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
// 							/>
// 						</div>
// 					</div>
// 				);
// 			default:
// 				return null;
// 		}
// 	};

// 	const router = useRouter();
// 	const { productId, total, totaldiscount, tobepaid,discountonmrp } = router.query;
     
// 	const handleOpenRazorpay = (data) => {
// 		const orderData = {
// 			products: [
// 				{
// 					product: productId,
// 					quantity: 1,
// 					orderStatus: 'pending',
// 					amount: tobepaid, // Replace with the actual amount for product_id_2
// 				},
// 				// Add more products as needed
// 			],
// 			totalPrice: tobepaid,
// 			phone_number: '1234567890',
// 			shippingAddress: '123 Main St, City, Country',
// 		};
//         console.log(user);
// 		const options = {
// 			key: 'rzp_test_rgthju6crbP1Sv',
// 			amount: Number(tobepaid * 100),
// 			currency: data.currency,
// 			name: 'TrialShoppy',
// 			description: 'Created by SK',
// 			order_id: data.id,
// 			handler: function (response) {
// 				// Use axios to make a POST request to your server
// 				axios

// 					.post(
// 						`${serverURL}/api/v1/${user._id}/addOrder`,
// 						orderData
// 					)
// 					.then((res) => {
// 						console.log(res);
// 						alert('Payment success');
// 						router.push({
// 							pathname:'/checkout/confirmation',
						   
// 						});
// 					})
// 					.catch((err) => {
// 						console.log(err);
// 						alert('Error processing payment');
// 					});
// 			},
// 		};

// 		const paymentObject = new window.Razorpay(options);
// 		paymentObject.open();

// 		paymentObject.on('payment.failed', function (response) {
// 			alert('Payment failed. Please try again. Contact support for help');
// 		});
// 	};
// 	const handlePayment = (amount) => {
// 		/*const data = { amount: amount };
// 		axios
// 			.post('http://localhost:7000/api/v1/orderpayment', data)
// 			.then((res) => {
// 				// console.log(res.data.data);
// 				// handleOpenRazorpay(res.data.data);
// 				router.push()
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});*/

// 		axios
// 			.post(`${serverURL}/api/payment`)
// 			.then((res) => {
// 				console.log('request sent successful');
// 			})
// 			.catch((error) => {
// 				console.error(error);
// 			});
// 	};

// 	return (
// 		<>
// 			<div className="flex  mt-[40px]  justify-center items-center">
// 				{/* <Image
// 					height={20}
// 					width={20}
// 					alt="Logo"
// 					src="/images/logo.svg"
// 					className="hidden sm:block"></Image> */}
// 					<div className="flex">
// 					<h3 className="text-[#7C7C7C] font-poppins ml-[2px] text-[14px] sm:text-[17px] ">
// 					SHOPPING CART 
// 					</h3>
// 					<hr className="border border-dashed md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />
// 					<div className="">
// 						<h3 className="text-[#EB8105] font-semibold font-poppins ml-[2px]   text-[14px] sm:text-[17px] ">
// 							PAYMENT
// 						</h3>
// 						<hr className=" border-[#EB8105] border-[1.5px] w-full  mt-[1px] " />
// 					</div>

// 					<hr className="border border-dashed  md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />
					
// 					<div>
// 						<h3 className=" text-[#7C7C7C]  font-poppins ml-[4px] text-[14px] sm:text-[17px] ">
// 							CONFIRMATION
// 						</h3>
// 					</div>
// 				</div>
				
// 			</div>

// 			<div className="px-3 md:px-[120px] mt-[70px] flex flex-col md:flex-row overflow-hidden">
// 				<div className="w-full basis-2/3 md:pr-20">
// 					<div className="font-medium font-poppins">Choose Payment Mode</div>
// 					<div className="py-4">
// 						<ul className="list-none pl-0 space-y-[20px]">
// 							<li
// 								className={`cursor-pointer flex items-center' ${
// 									selectedMode === 'UPI ID' ? '' : ''
// 								}`}
// 								onClick={() => handleModeChange('UPI ID')}>
// 								<span
// 									className={`mr-2 h-4 w-4 rounded-full ${
// 										selectedMode === 'UPI ID'
// 											? 'bg-orange-500  border-black border-2'
// 											: 'border border-gray-400'
// 									}`}
// 									style={{
// 										padding: selectedMode === 'UPI ID' ? '' : '0',
// 									}}></span>
// 								<div className="flex ml-[5px] mt-[-4px]">
// 									{/* <img src="/images/VectorUPI.svg" /> */}
// 									<Image width={20} height={20} alt='upi' src="/images/VectorUPI.svg" />
// 									<h3 className="">UPI ID</h3>
// 								</div>
// 							</li>
// 							{selectedMode === 'UPI ID' && (
// 								<li className="pl-6">{renderFormDetails()}</li>
// 							)}

// 							<li
// 								className={`cursor-pointer flex items-center ${
// 									selectedMode === 'Debit' ? 'font-bold' : ''
// 								}`}
// 								onClick={() => handleModeChange('Debit')}>
// 								<span
// 									className={`mr-2 h-4 w-4 rounded-full ${
// 										selectedMode === 'Debit'
// 											? 'bg-orange-500 border-black border-2'
// 											: 'border border-gray-400'
// 									}`}
// 									style={{
// 										padding: selectedMode === 'Debit' ? '1px' : '0',
// 									}}></span>
// 								<div className="flex ml-[5px]">
// 									{/* <img src="/images/VectorCard.svg" /> */}
// 									<Image width={20} height={20} alt='card' src="/images/VectorCard.svg" />
// 									<h3 className="ml-[3px]">Debit</h3>
// 								</div>
// 							</li>
// 							{selectedMode === 'Debit' && (
// 								<li className="pl-6">{renderFormDetails()}</li>
// 							)}

// 							<li
// 								className={`cursor-pointer flex items-center ${
// 									selectedMode === 'Credit' ? 'font-bold' : ''
// 								}`}
// 								onClick={() => handleModeChange('Credit')}>
// 								<span
// 									className={`mr-2 h-4 w-4 rounded-full ${
// 										selectedMode === 'Credit'
// 											? 'bg-orange-500 border-black border-2'
// 											: 'border border-gray-400'
// 									}`}
// 									style={{
// 										padding: selectedMode === 'Credit' ? '1px' : '0',
// 									}}></span>
// 								<div className="flex ml-[5px]">
// 									{/* <img src="/images/VectorCard.svg" /> */}
// 									<Image width={20} height={20} alt='card' src="/images/VectorCard.svg" />
// 									<h3 className="ml-[3px]">Credit</h3>
// 								</div>
// 							</li>
// 							{selectedMode === 'Credit' && (
// 								<li className="pl-6">{renderFormDetails()}</li>
// 							)}

// 							<li
// 								className={`cursor-pointer flex items-center ${
// 									selectedMode === 'NetBanking' ? 'font-bold' : ''
// 								}`}
// 								onClick={() => handleModeChange('NetBanking')}>
// 								<span
// 									className={`mr-2 h-4 w-4 rounded-full ${
// 										selectedMode === 'NetBanking'
// 											? 'bg-orange-500 border-black border-2'
// 											: 'border border-gray-400'
// 									}`}
// 									style={{
// 										padding: selectedMode === 'NetBanking' ? '1px' : '0',
// 									}}></span>
// 								<div className="flex ml-[5px]">
// 									{/* <img src="/images/VectorBank.svg" /> */}
// 									<Image width={20} height={20} alt='bank' src="/images/VectorBank.svg" />
// 									<h3 className="ml-[3px]">NetBanking</h3>
// 								</div>
// 							</li>
// 							{selectedMode === 'NetBanking' && (
// 								<li className="pl-6">{renderFormDetails()}</li>
// 							)}
// 						</ul>
// 					</div>
// 				</div>
// 				<div className="w-full">
// 					<div className="font-normal text-[#7C7C7C] ml-[10px]"> Coupons</div>
// 					{/* <div className="relative flex w-fit mt-[10px]">
// 						<input
// 							type="text"
// 							className="px-4 py-2 border border-orange-500 "
// 						/>
// 						<button className="absolute top-2 right-2 bottom-2 mr-[20px] flex items-center justify-center  bg-orange-500 text-white">
// 							<h4 className="p-[3px] text-black">Apply</h4>
// 						</button>
// 					</div> */}
// 					<div className="relative flex w-[300px] md:w-[340px] mt-[10px] mr-4">
// 						<input
// 							type="text"
// 							className="rounded px-4 py-2 border border-orange-500 w-[340px] "
// 						/>
// 						<button className="absolute rounded w-fit px-2 py-1 top-2 right-2 bottom-2 mr-[10px] flex items-center justify-center bg-orange-500 text-white">
// 							Apply
// 						</button>
// 					</div>
// 					<hr className="my-5" />

// 					<h3 className="font-normal text-[#7C7C7C] text-[13px] ml-[10px] mt-[15px]">
// 						Prices Detail(1 item)
// 					</h3>
// 					<div className="flex justify-between my-5">
// 						<div className="flex flex-col items-start justify-start ml-[10px] gap-3">
// 							<h3 className="font-poppins font-thin text-[14px]">TOTAL MRP</h3>
// 							<h3 className="font-poppins font-thin text-[14px]">
// 								Discount on MRP
// 							</h3>
// 							<h3 className="font-poppins font-thin text-[14px]">
// 								Coupon Discount
// 							</h3>
// 							<div className="flex">
// 								<h3 className="font-poppins font-thin text-[14px]">
// 									Convivence Fee
// 								</h3>
// 								<h3 className="font-poppins text-[#EB8105] font-normal pt-[1.5px] text-[13px] ml-[4px] cursor-pointer">
// 									Know More
// 								</h3>
// 							</div>
// 						</div>
// 						<div className="flex flex-col mr-[20px] items-end justify-end gap-3">
// 							<h3 className="font-poppins font-normal text-[14px]">
// 								₹ {total}
// 							</h3>
// 							<h3 className="font-poppins font-normal text-[14px] text-[#059669]">
// 								-₹ {discountonmrp}
// 							</h3>
// 							<h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer">
// 								{totaldiscount}%
// 							</h3>
// 							<h3 className="font-poppins font-normal text-[14px]">Free</h3>
// 						</div>
// 					</div>

// 					<hr className="mt-[20px]" />

// 					<div className="flex justify-between my-5">
// 						<div className="flex flex-col items-start justify-start ml-[10px] gap-3">
// 							<h3 className="font-normal">Total Amount</h3>
// 						</div>
// 						<div className="flex font-normal flex-col mr-[20px] items-end justify-end gap-3">
// 							<h3>₹ {tobepaid}</h3>
// 						</div>
// 					</div>

// 					{/* <Link href="/checkout/confirmation">
// 						<div className="w-full px-3 py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary">
// 							Pay Now
// 						</div>
// 					</Link> */}

// 					<button
// 						className="w-full px-3 py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary"
// 						onClick={() => handleOpenRazorpay(total - totaldiscount)}>
// 						Pay Now
// 					</button>
// 					<Link href="/checkout/confirmation"></Link>

// 					<hr className="mt-[20px]" />
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default Paymentpage;
