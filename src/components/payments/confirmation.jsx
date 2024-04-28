import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import React ,{useEffect} from 'react';
const serverURL = process.env.BASE_API_URL;
const Confirmation = () => {
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const apiUrl = `${serverURL}/api/v1/products/${productId}`;
	// 			const response = await axios.get(apiUrl);
	// 			setCart(response.data);
	// 			setLoading(false);
	// 			const apiUrl3 = `${serverURL}/api/v1/products`;

	// 			axios
	// 				.post(`${apiUrl3}`, {
	// 					filters: { categories: response.data.categories },
	// 				})
	// 				.then((response) => {
	// 					setSimilarProducts(response.data.data);
	// 					console.log('Similar product: ', response.data.data);
	// 				})
	// 				.catch((err) => {
	// 					console.error(err);
	// 				});
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};

	// 	if (productId) {
	// 		fetchData();
	// 	}
	// }, [productId]);
	return (
		<div>
			<div className="flex sm:ml-[140px]  p-5 mt-[40px]">
				<Image
					height={20}
					width={20}
					alt="Order"
					src="/images/logo.svg"
					className="hidden sm:block"/>
				<div className="">
					<h3 className="text-[#7C7C7C] font-semibold font-poppins sm:ml-[100px] text-[11px] sm:text-[17px] ">
						SHOPPING CART
					</h3>
				</div>

				<hr className="border border-dashed w-[100px] ml-[15px] mt-[12.5px] border-[#7C7C7C]" />
				<h3 className="text-[#7C7C7C] font-poppins ml-[15px] text-[11px] sm:text-[17px] ">
					PAYMENT
				</h3>
				<hr className="border border-dashed w-[100px] ml-[15px] mt-[12.5px] border-[#7C7C7C]" />
				<div>
					<h3 className=" text-[#EB8105]  font-poppins ml-[10px] text-[11px] sm:text-[17px]">
						CONFIRMATION
					</h3>
					<hr className=" border-[#EB8105] border-[1.5px] w-[90px] sm:w-[130px] ml-[15px] mt-[1px] " />
				</div>
			</div>

			<div className="flex items-center justify-center h-screen">
				<div className=" sm:w-[700px] w-[320px] bg-white shadow-lg sm:p-6">
					<div className="flex flex-col items-center justify-center">
						<Image
							height={20}
							width={20}
							alt="confirm"
							src="/images/VectorC.svg"
							className="w-[80px]"/>
						<Image
							height={20}
							width={20}
							alt="confirm"
							src="/images/OrderConfirmed.svg"
							className="w-[150px] mt-[20px]"/>
						<p className="text-center mt-[20px] w-[315px] sm:w-[450px]">
							Your order #12548 25364 64589 was placed with success. You can see
							the status of the order at anytime.
						</p>
						<div className="flex sm:gap-[40px] mt-[10px] ">
							<div className="flex w-[250px] sm:w-[330px] ml-[20px] ">
								<Image
									height={20}
									width={20}
									alt="confirm"
									className="h-[56px] w-[56px] sm:w-[125px] sm:h-[128px] "
									src="/images/Rectangle.jpg"/>
								<div className="sm:ml-[20px] ml-3 sm:mt-[30px]">
									<h2 className="font-poppins text-[12px] sm:text-[17px] font-medium">
										Nike Air Kicks
									</h2>
									<h6 className="mt-[6px] text-[10px] sm:font-[14px] text-[#7C7C7C]">
										Red Color
									</h6>
								</div>
							</div>
							<div className=" sm:mt-[5px]">
								<h3 className="font-semithin font-poppins sm:text-[18px] text-[10px]">
									Order No: 12548 25364 64589
								</h3>
								<h3 className="font-semithin font-poppins text-[8px] sm:text-[18px] mt-[3px]">
									Shipping to: 2972 Westheimer Rd. Santa Ana, Illinois 85486{' '}
								</h3>
								<div className="my-2 flex items-center gap-[5px]">
									<Image
										height={20}
										width={20}
										alt="tick"
										src="/images/VectorTick.svg"
										className="w-2 h-2 md:h-4 md:w-4"
									/>
									<div className="font-poppins text-[8px] sm:text-[18px]">
										Delivery by
									</div>
									<div className="font-poppins font-bold text-[8px] sm:text-[18px]">
										12 Jun 2023
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="sm:mt-[40px] gap-[5px] mt-[30px] pb-8 flex flex-row">
						<Link href="/categories">
							<div className="mx-2 sm:w-[300px]  h-[40px] border border-primary text-primary w-full px-3 py-2 rounded text-center my-5">
								Continue Shopping
							</div>
						</Link>
						<Link href="/account/orders">
							<div className="mx-2 sm:w-[300px] h-[40px] bg-gradient-to-b from-primary to-secondary w-full px-3 py-2 rounded text-center my-5">
								Track Order
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Confirmation;
