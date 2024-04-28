import React from 'react';
import PaymentProductCard from './paymentproductcard';
import OfferCard from './offercard';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from './../../context/cartProvider';

import SimilarProductCard from '../productDetails/SimilarProductCard';

import { useUser } from '../../UserContext';
import Address from './Address';
const serverURL = process.env.BASE_API_URL;
const ShoppingCart = () => {
	const router = useRouter();
	// const { productId } = router.query;
	const { user } = useUser();
	const { cartData } = useCart();
	const productId = cartData?.productDetails?._id;
	console.log('cartData:::::', cartData);

	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [loading, setLoading] = useState(false);
	const [cart, setCart] = useState([]);

	const [coupons, setCoupons] = useState([]);
	const [couponSelected, setCouponSelected] = useState(null);
	const [couponInputValue, setCouponInputValue] = useState('');
	const [couponApplied, setCouponApplied] = useState(null);
	const [couponFailed, setCouponFailed] = useState(false);
	const [couponAppliedSuccess, setCouponAppliedSuccess] = useState(false);
	const [similarProducts, setSimilarProducts] = useState([]);

	console.log('user', user);
	const handleAdressSubmit = () => {
		setNewAddress(false);
		setAddressEdit(false);
	};
	const handleCouponSelected = (coupon) => {
		setCouponSelected(coupon);
		setCouponInputValue(coupon.code);
		setCouponAppliedSuccess(false);
		setCouponFailed(false);
	};
	const handleCouponApply = () => {
		const selectedCoupon = coupons.find(
			(coupon) => coupon.code === couponInputValue
		);
		if (selectedCoupon) {
			// Set the applied coupon
			setCouponApplied(selectedCoupon);
			setCouponAppliedSuccess(true);
			setCouponFailed(false);
		} else {
			setCouponAppliedSuccess(false);
			setCouponFailed(true);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				

				// const apiUrl = `${serverURL}/api/v1/products/${productId}`;
				// const response = await axios.get(apiUrl);
				// setCart(response.data);
				setLoading(false);
				const apiUrl3 = `${serverURL}/api/v1/products`;

				axios
					.post(`${apiUrl3}`, {
						filters: { categories: cartData?.productDetails?.categories },
					})
					.then((response) => {
						setSimilarProducts(response.data.data);
						console.log('Similar product: ', response.data.data);
					})
					.catch((err) => {
						console.error(err);
					});
			} catch (error) {
				console.error(error);
			}
		};

		if (cartData) {
			fetchData();
		}
	}, [cartData]);

	// Fetch coupon data
	useEffect(() => {
		const fetchCoupons = async () => {
			try {
				const couponUrl = `${serverURL}/api/v1/coupons/getAll`;
				const response = await axios.get(couponUrl);
				setCoupons(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchCoupons();
	}, []);

	// Fetch customer address

	// useEffect(() => {
	// 	axios
	// 		.get(`http://localhost:7000/api/v1/cart/64b161653d8484b51874229c`)
	// 		.then((response) => {
	// 			setCart(response.data);
	// 		});
	// }, []);
	const signInClick = () => {
		router.push('/account/login');
	};
	let totalPrice = 0;
	let totalDiscount = 0;

	return (
		<>
			{cart && (
				<div className="w-full  overflow-x-hidden md:mx-10 lg:mx-36 ">
					<div className="flex flex-col md:flex-row md:px-0 px-4 lg:justify-center ">
						<div className="w-full flex-col lg:w-[62%] py-4">
							<div className="w-full ">
								{user._id && <Address />}
								{!user._id && (
									<button
										onClick={signInClick}
										className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins ">
										LOG IN/SIGN UP
									</button>
								)}
								
								<hr className="mt-[5px] w-full "></hr>
								<div className="relative">
									{cartData && (
										<div className="w-full flex-row relative">
											<div className="mt-[30px] flex">
												<div className="w-full">
													<PaymentProductCard
														productDetails={cartData.productDetails}
														onQuantityChange={(newQuantity) =>
															setSelectedQuantity(newQuantity)
														}
													/>
												</div>
												<Image
													className="absolute top-0 right-0  lg:right-3 max-sm:right-10% mt-[-22px] md:mt-1"
													src="/images/x.svg"
													alt="Image"
													width={20}
													height={20}
												/>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Coupon section */}

						<div className="flex flex-col w-full md:w-2/5 lg:w-2/5 md:ps-[1%]">
							<div className="w-full ">
								<h3 className="font-normal text-[#7C7C7C] "> Coupons</h3>
								<div className="relative flex w-full mt-[10px]">
									<input
										type="text"
										className="rounded py-2  w-full ps-2 border border-orange-500"
										value={couponInputValue}
										onChange={(e) => setCouponInputValue(e.target.value)}
									/>
									<button
										onClick={handleCouponApply}
										className="absolute rounded w-fit px-2 py-1 top-2 right-10 bottom-2 mr-[-30px] flex items-center justify-center bg-orange-500 text-white">
										Apply
									</button>
								</div>
								{couponFailed && (
									<p className="text-[red] text-[12px]">
										Coupon code {couponInputValue} not found. Please check and
										try again.
									</p>
								)}
								{couponAppliedSuccess && (
									<p className="text-[green] text-[12px]">
										Coupon code {couponInputValue} applied successfully!
									</p>
								)}

								<div className="flex flex-row items-center w-[250px] mt-[10px]">
									<Image
										className="mr-1"
										src="/images/Percent.svg"
										alt="Image"
										width={20}
										height={20}
									/>
									Available offers
								</div>
								<div className="max-h-[250px] overflow-x-hidden overflow-y-auto">
									{coupons && (
										<div>
											{coupons.map((coupon, index) => (
												<div
													className="mt-[10px] offer-card" // Add the offer-card class here
													key={index}
													// Call handleCouponSelected with the current coupon
												>
													<OfferCard
														coupon={coupon}
														handleCouponSelected={handleCouponSelected}
													/>
												</div>
											))}
										</div>
									)}
								</div>
								{/* <div className="mt-[10px]">
								<OfferCard />
							</div>
							<div className="mt-[10px]">
								<OfferCard />
							</div> */}
							</div>

							{/* price section */}

							<div className="w-full ">
								{/* <div className="relative flex w-fit mt-[10px]">
						<input
							type="text"
							className="px-4 py-2 border border-orange-500 "
						/>
						<button className="absolute top-2 right-2 bottom-2 mr-[20px] flex items-center justify-center  bg-orange-500 text-white">
							<h4 className="p-[3px] text-black">Apply</h4>
						</button>
					</div> */}

								<hr className="my-5" w-full />

								<h3 className="font-normal text-[#7C7C7C] text-[13px] ml-[10px] mt-[15px]">
									Prices Detail({selectedQuantity})
								</h3>
								<div className="flex justify-between my-5">
									<div className="flex flex-col items-start justify-start ml-[10px] gap-3">
										<h3 className="font-poppins font-thin text-[14px]">
											TOTAL MRP
										</h3>
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
											₹ {cartData?.productDetails?.price * selectedQuantity}
										</h3>
										<h3 className="font-poppins font-normal text-[14px] text-[#059669]">
											-₹{' '}
											{couponAppliedSuccess
												? (
														cartData?.productDetails?.discount +
														(cartData?.productDetails?.price * couponApplied.discount) / 100
												  ).toFixed(2) * selectedQuantity
												: cartData?.productDetails?.discount * selectedQuantity}
										</h3>
										<h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer">
											{couponAppliedSuccess
												? (
														(cartData?.productDetails?.discount / cartData?.productDetails?.price) * 100 +
														couponApplied.discount
												  ).toFixed(2)
												: ((cartData?.productDetails?.discount / cartData?.productDetails?.price) * 100).toFixed(2)}
											%
										</h3>
										<h3 className="font-poppins font-normal text-[14px]">
											Free
										</h3>
									</div>
								</div>

								<hr className="mt-[20px]" />

								<div className="flex justify-between my-5">
									<div className="flex flex-col items-start justify-start ml-[10px] gap-3">
										<h3 className="font-normal">Total Amount</h3>
									</div>
									<div className="flex font-normal flex-col mr-[20px] items-end justify-end gap-3">
										<h3>
											₹{' '}
											{(
												(cartData?.productDetails?.price * selectedQuantity).toFixed(2) -
												(couponAppliedSuccess
													? (
															(cartData?.productDetails?.discount +
																(cartData?.productDetails?.price * couponApplied.discount) / 100) *
															selectedQuantity
													  ).toFixed(2)
													: (cartData?.productDetails?.discount * selectedQuantity).toFixed(2))
											).toFixed(2)}{' '}
										</h3>
									</div>
								</div>

								{/* <Link href="/checkout/confirmation">
						<div className="w-full px-3 py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary">
							Pay Now
						</div>
					</Link> */}
								{user._id && (
									<Link
										href={{
											pathname: '/checkout/payment',
											query: {
												productId: productId,
												total: cartData?.productDetails?.price * selectedQuantity,
												discountonmrp: couponAppliedSuccess
													? (
															cartData?.productDetails?.discount +
															(cartData?.productDetails?.price * couponApplied.discount) / 100
													  ).toFixed(2) * selectedQuantity
													: cartData?.productDetails?.discount * selectedQuantity,
												totaldiscount: couponAppliedSuccess
													? (
															(cartData?.productDetails?.discount / cartData?.productDetails?.price) * 100 +
															couponApplied.discount
													  ).toFixed(2)
													: ((cartData?.productDetails?.discount / cartData?.productDetails?.price) * 100).toFixed(2),
												tobepaid:
													cartData?.productDetails?.price * selectedQuantity -
													(couponAppliedSuccess
														? (cartData?.productDetails?.discount +
																(cartData?.productDetails?.price * couponApplied.discount) / 100) *
														  selectedQuantity
														: cartData?.productDetails?.discount * selectedQuantity
													).toFixed(2),
											},
										}}>
										<button className="mx-auto block w-3/4 md:w-full py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary">
											Place Order
										</button>
									</Link>
								)}
								{!user._id && (
									<button
										onClick={signInClick}
										className="mx-auto block w-3/4 md:w-full py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary">
										Login To place an order
									</button>
								)}
								<hr className="mt-[20px]" />
							</div>
						</div>
					</div>
					<div className="w-full mt-5 mb-[] overflow-auto md:m-0 grid-container ">
						{similarProducts && similarProducts.length ? (
							<div className="flex items-center justify-between w-full gap-4 md:gap-8 min-w-max">
								{similarProducts.map((product, key) => (
									<SimilarProductCard key={key} productDetails={product} />
								))}
							</div>
						) : (
							<p>No Products to show!</p>
						)}
					</div>
					{/* {produc.map((it, index) => {
									totalPrice += it.proprice;
									totalDiscount += it.productId.discount;
									return (
										<div key={index} className="w-[300px]">
											<div className="mt-[30px] flex">
												<PaymentProductCard it={it} />
												<Image
													className="sm:ml-[295px] ml-10 mb-auto"
													src="/images/x.svg"
													alt="Image"
													width={20}
													height={20}
												/>
											</div>
										</div>
									);
								})} */}
				</div>
			)}
		</>
	);
};

export default ShoppingCart;
