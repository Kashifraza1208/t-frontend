import React, { useEffect, useState } from 'react';
import PaymentProductCard from './paymentproductcard';
import OfferCard from './offercard';
import Image from 'next/image';
import axios from 'axios';

const ShoppingCartA = ({ initialValues = {} }) => {
	const [fullName, setFullName] = useState(initialValues.fullName || '');
	const [middleName, setMiddleName] = useState(initialValues.middleName || '');
	const [lastName, setLastName] = useState(initialValues.lastName || '');
	const [cartData, setCart] = useState([]);

	useEffect(() => {
		axios
			.get(`${serverURL}/api/v1/cart/64b161653d8484b51874229c`)
			.then((response) => {
				setCart(response.data);
			});
	}, []);

	let totalPrice = 0;
	let totalDiscount = 0;

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here, you can save the form data to the database
		// You can make an API call or use your preferred database integration

		// Example API call using fetch
		const formData = {
			fullName,
			middleName,
			lastName,
		};
	};
	return (
		<div className="overflow-x-hidden">
			<div className="flex sm:ml-[140px]  p-5 mt-[40px]">
				{/* <img src="/images/logo.svg" className="hidden sm:block"></img> */}
				<Image width={200} height={300} src="/images/logo.svg" alt='logo' className="hidden sm:block"/>
				<div className="">
					<h3 className="text-[#EB8105] font-semibold font-poppins sm:ml-[100px] text-[14px] sm:text-[17px] ">
						SHOPPING CART
					</h3>
					<hr className=" border-[#EB8105] border-[1.5px] w-[110px] sm:ml-[99px] mt-[1px] " />
				</div>

				<hr className="border border-dashed w-[100px] ml-[15px] mt-[12.5px] border-[#7C7C7C]" />
				<h3 className="text-[#7C7C7C] font-poppins ml-[15px] text-[14px] sm:text-[17px]  ">
					PAYMENT
				</h3>
				<hr className="border border-dashed w-[100px] ml-[15px] mt-[12.5px] border-[#7C7C7C]" />
				<div>
					<h3 className=" text-[#7C7C7C]  font-poppins ml-[15px] text-[14px] sm:text-[17px]  ">
						CONFIRMATION
					</h3>
				</div>
			</div>
			<div className="flex flex-col sm:flex sm:flex-row">
				<div className="w-3/5 p-4 sm:ml-[120px] mt-[30px] ">
					<div className="">
						<div className="">
							<div>
								<h2 className="text-base leading-8 font-poppins">
									Add new location
								</h2>
							</div>
							<div className="flex sm:ml-[610px] w-[60px] mt-[-30px]  ml-[270px]">
								<span>Close</span>
								<Image
									width={600}
									height={600}
									src="/images/x.svg"
									alt="Image"
									className="mb-auto ml-4"/>
							</div>
						</div>
						<div className="flex flex-col p-0 mb-3 mr-10 font-poppins">
							<form onSubmit={handleSubmit}>
								<div className=" sm:mr-10">
									<label className="flex flex-col items-start p-0 gap-[10px] w-[340px] h-[78px] pl-[10px]">
										<text className="text">Address</text>
										<input
											className="box-border flex flex-row justify-center items-center h-44 sm:w-[673px] bg-white border-b border-gray-500 text-gray-700 w-[340px]"
											type="text"
											value={fullName}
											placeholder="Enter Address"
											onChange={(e) => setFullName(e.target.value)}
										/>
									</label>
								</div>

								<div className="mt-2 sm:flex sm:flex-row ">
									<div className="">
										<label className="flex flex-col items-start p-0 w-[340px] h-[78px] pl-[10px]">
											<text className="text">State</text>
											<select
												className="box-border flex flex-row justify-center sm:w-[331px]  h-44 bg-white border-b border-gray-500 text-gray-700 w-[340px]"
												value={middleName}
												onChange={(e) => setMiddleName(e.target.value)}>
												<option value="" className="text-gray-200">
													Select State
												</option>
												<option value="state1">State 1</option>
												<option value="state2">State 2</option>
												<option value="state3">State 3</option>
												{/* Add more options for different states */}
											</select>
										</label>
									</div>

									<div className=" sm:mr-10">
										<label className="flex flex-col items-start p-0  w-[340px] h-[78px] pl-[10px]">
											<text className="text">Pincode</text>
											<input
												className="box-border flex flex-row justify-center sm:w-[331px] items-center   h-44 bg-white border-b border-gray-500 text-gray-700 w-[340px]"
												type="text"
												value={lastName}
												placeholder="Enter Pincode"
												onChange={(e) => setLastName(e.target.value)}
											/>
										</label>
									</div>
								</div>
								<button className="items-center ml-2 justify-center font-poppins sm:w-[165px] w-[340px] bg-[#EB8105] mt-[20px] p-2 text-[16px] text-black font-medium h-[35px]">
									ADD NEW ADDRESS
								</button>
							</form>
						</div>

						<div>
							{/* <img src="/images/AddNew.svg" className="cursor-pointer"></img> */}
							<Image width={200} height={200} src="/images/AddNew.svg" alt='addNew' className="cursor-pointer"/>
						</div>
						<hr className="mt-[5px] sm:w-[500px] w-[340px]"></hr>
					</div>

					{cartData.map((item, index) => {
						let nn = item.items;
						{
							nn.map((it, index) => {
								console.log(it, 'it');
								totalPrice += it.productId.price;
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
							});
						}
					})}
					<Image
						className="sm:ml-[295px] ml-10 mb-auto"
						src="/images/x.svg"
						alt="Image"
						width={20}
						height={20}
					/>
					{/* <div className="mt-[25px] flex">
						<PaymentProductCard /> 
						<Image
							className="sm:ml-[295px] ml-10 mb-auto"
							src="/images/x.svg"
							alt="Image"
							width={20}
							height={20}
						/>
					</div> */}
				</div>
				<hr className="mt-[5px] sm:w-[500px] w-[340px]"></hr>
			</div>
			<div className="w-2/5 p-4 ml-2 rightcolumn ">
				<h3 className="font-normal text-[#7C7C7C] ml-[10px]"> Coupons</h3>
				<div className="relative flex w-[340px] mt-[10px]">
					<input
						type="text"
						className="rounded px-4 py-2 border border-orange-500 w-[340px] "
					/>
					<button className="absolute rounded w-fit px-2 py-1 top-2 right-2 bottom-2 mr-[10px] flex items-center justify-center bg-orange-500 text-white">
						Apply
					</button>
				</div>
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
				<div className="mt-[10px]">
					<OfferCard />
				</div>
				<div className="mt-[10px]">
					<OfferCard />
				</div>
				<div className="mt-[10px]">
					<OfferCard />
				</div>

				<hr className="mt-[15px] sm:w-[500px] w-[340px]"></hr>

				<h3 className="font-normal text-[#7C7C7C] text-[13px] ml-[10px] mt-[15px]">
					Prices Detail(1 item)
				</h3>
				<div className="flex justify-between mt-[20px] ">
					<div className="flex flex-col items-start justify-start ml-[10px] gap-4">
						<h3 className="font-poppins font-thin w-[200px] text-[14px]">
							TOTAL MRP
						</h3>
						<h3 className="font-poppins font-thin text-[14px] w-[140px]">
							Discount on MRP
						</h3>
						<h3 className="font-poppins font-thin text-[14px] w-[140px]">
							Coupon Discount
						</h3>
						<div className="flex">
							<h3 className="font-poppins font-thin text-[14px] w-[140px]">
								Convivence Fee
							</h3>
							<h3 className="font-poppins text-[#EB8105] font-normal pt-[1.5px] text-[13px] ml-[-14px] cursor-pointer w-[140px]">
								Know More
							</h3>
						</div>
					</div>
					<div className="flex flex-col mr-[20px] items-end justify-end gap-3">
						<h3 className="font-poppins font-normal text-[14px] w-[115px]">
							₹ 2220
						</h3>
						<h3 className="font-poppins font-normal text-[14px] text-[#059669] w-[115px]">
							-₹ 1061
						</h3>
						<h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer w-[115px]">
							2%
						</h3>
						<h3 className="font-poppins font-normal text-[14px] w-[120px]">
							Free
						</h3>
					</div>
				</div>

				<hr className="mt-[20px] w-[340px] sm:w-[500px]" />

				<div className="flex justify-between mt-[10px] ">
					<div className="flex flex-col items-start justify-start ml-[10px] gap-3">
						<h3 className="font-normal w-[265px]">Total Amount</h3>
					</div>
					<div className="flex font-normal  sm:mr-[20px] items-end justify-end  w-[180px]">
						<h3 className="font-poppins font-normal text-[14px] w-[140px]">
							₹ 1159
						</h3>
					</div>
				</div>

				<button className="items-center sm:w-[500px] w-[340px] bg-[#EB8105] mt-[20px] text-black  h-[35px]">
					Place Order
				</button>
			</div>
		</div>
	);
};

export default ShoppingCartA;
