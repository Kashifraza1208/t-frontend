// import React, { useState, useEffect, use } from 'react';
// // import Link from 'next/link';
// import axios from 'axios';
// import FormFields from './FormFields';
// import { useRouter } from 'next/router';

// const MainBusinessInfo = ({ initialValues = {} }) => {
// 	const router = useRouter();
// 	const sellerId = router.query;
// 	const [errorform, setErrorform] = useState('');
// 	const [formData, setFormData] = useState(
// 		initialValues || {
// 			storeName: '',
// 			storeDescription: '',
// 			pincode: '',
// 			address1: '',
// 			address2: '',
// 			pickupPincode: '',
// 			pickupAddress: '',
// 			gstId: '',
// 			state: '',
// 			country: '',
// 			district: '',
// 		}
// 	);

// 	const handleChange = (newValue, fieldName) => {
// 		setFormData((prevData) => ({
// 			...prevData,
// 			[fieldName]: newValue,
// 		}));
// 	};

// 	// useEffect(() => {
// 	// 	console.log(sellerId);
// 	// }
// 	// , []);

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const requiredFields = [
// 			'storeName',
// 			'storeDescription',
// 			'pincode',
// 			'address1',
// 			'pickupPincode',
// 			'pickupAddress',
// 			'gstId',
// 			'state',
// 			'country',
// 			'district',
// 		];

// 		const isEmptyField = requiredFields.some(
// 			(fieldName) => !formData[fieldName]
// 		);

// 		if (isEmptyField) {
// 			setErrorform('*Please fill all fields.');
// 			return;
// 		}

// 		try {
// 			const response = await axios.post(
// 				`${process.env.BASE_API_URL}/api/v1/${sellerId.sellerId}/addStore`,
// 				formData
// 			);
// 			router.push({pathname:'verification',query:{sellerId:sellerId.sellerId}});
// 		} catch (error) {
// 			console.error('Error saving form data:', error);
// 		}
// 	};

// 	return (

// 		<div className='mt-20 w-full h-full flex flex-col  overflow-x-hiddden  md:mb-[1100px]  lg:mb-64 '>
// 			<div className="flex flex-row items-center justify-center w-full gap-0 my-10 ">
// 				<div className="flex flex-col items-center p-0 gap-4 h-[90px]">
// 					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gradient-to-br from-gray-400 to-gray-900">
// 						1
// 					</div>
// 					<text className="w-[99px] sm:h-[30px] sm:font-poppins font-normal sm:text-base leading-6 sm:font-semibold text-center text-gray-800">
// 						Basic Info
// 					</text>
// 				</div>
// 				<div className="hidden sm:inline mt-[-10px] sm:mt-0 w-20  border border-gray-900"></div>
// 				<div className="flex flex-col items-center p-0 gap-4 h-[90px]">
// 					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gradient-to-br from-gray-400 to-gray-900">
// 						2
// 					</div>
// 					<text className="sm:h-[30px] sm:font-poppins font-normal sm:text-base leading-6 w-[129px] sm:font-normal text-center text-gray-400">
// 						Business Info
// 					</text>
// 				</div>
// 				<div className="hidden sm:inline mt-[-10px] sm:mt-0 w-20 sm:border-[1px] border border-gray-300"></div>
// 				<div className="flex flex-col items-center p-0 gap-4  h-[90px]">
// 					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gray-300">
// 						3
// 					</div>
// 					<text className="sm:h-[30px] sm:font-poppins font-normal sm:text-base leading-6 w-[100px] sm:font-normal text-center text-gray-400">
// 						Verification
// 					</text>
// 				</div>
// 			</div>

// 			<div className='flex items-center justify-center my-20'>

// 				<div className="flex flex-col items-center  font-poppins p-0 gap-[10px] w-[380px] sm:w-full sm:h-[372px] mt-8 mb-3">
// 					<form onSubmit={handleSubmit}>
// 						<div className='flex flex-col items-center justify-between lg:flex-row' >
// 							<FormFields
// 								labelText="Store:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="En/liveproduct/LiveproductPageter Name"
// 								value={formData.storeName}
// 								onChangeFun={handleChange}
// 								name="storeName"
// 							/>

// 							<FormFields
// 								labelText="Store Description:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
// 								type="text"
// 								placeholder="Enter Description"
// 								value={formData.storeDescription}
// 								onChangeFun={handleChange}
// 								name="storeDescription"
// 							/>

// 						</div>
// 						<br />
// 						<div className='flex flex-col justify-center lg:flex-row ' >
// 							<FormFields
// 								labelText="Pincode:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="430023"
// 								value={formData.pincode}
// 								onChangeFun={handleChange}
// 								name="pincode"
// 							/>
// 							<FormFields
// 								labelText="Address line 1:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="address1"
// 								value={formData.address1}
// 								onChangeFun={handleChange}
// 								name="address1"
// 							/>
// 							<FormFields
// 								labelText="Address line 2:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="address2"
// 								value={formData.address2}
// 								onChangeFun={handleChange}
// 								name="address2"
// 							/>
// 						</div>
// 						<br />
// 						<div className='flex flex-col justify-center lg:flex-row' >
// 							<FormFields
// 								labelText="Pickup Pincode:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="430023"
// 								value={formData.pickupPincode}
// 								onChangeFun={handleChange}
// 								name="pickupPincode"
// 							/>
// 							<FormFields
// 								labelText="Pickup Address:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="(304) 555-0108"
// 								value={formData.pickupAddress}
// 								onChangeFun={handleChange}
// 								name="pickupAddress"
// 							/>
// 							<FormFields
// 								labelText="Country:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="India"
// 								value={formData.country}
// 								onChangeFun={handleChange}
// 								name="country"
// 							/>
// 						</div>
// 						<br />
// 						<div className='flex flex-col justify-center lg:flex-row' >
// 							<FormFields
// 								labelText="Store GSTIN:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="Enter GSTIN"
// 								value={formData.gstId}
// 								onChangeFun={handleChange}
// 								name="gstId"
// 							/>
// 							<FormFields
// 								labelText="State:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="Punjab"
// 								value={formData.state}
// 								onChangeFun={handleChange}
// 								name="state"
// 							/>
// 							<FormFields
// 								labelText="District:"
// 								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "

// 								type="text"
// 								placeholder="Enter district"
// 								value={formData.district}
// 								onChangeFun={handleChange}
// 								name="district"
// 							/>
// 						</div>
// 						<div className="mt-6 flex justify-center text-[red]">{errorform}</div>
// 						<div className="flex justify-center">
// 							<button
// 								type="submit"
// 								className="my-3 flex flex-row justify-center items-center px-4 py-2 rounded-lg bg-gradient-to-b from-[#EB8105] to-[#FAAC06]"

// 								>
// 								NEXT
// 							</button>
// 						</div>
// 					</form>
// 				</div>
// 				{/* <Link href={'verification'}>
// 				<div
// 					className="my-5 flex flex-row rounded-lg justify-center items-center px-4 py-2 gap-[10px] bg-gradient-to-b from-[#EB8105] to-[#FAAC06] "
// 					type="submit">
// 					NEXT
// 				</div>
// 			</Link> */}
// 				<div className="md:mt-24 sm:mt-24"></div>
// 			</div>
// 		</div>

// 	);
// };
// export default MainBusinessInfo;

import React, { useState, useEffect, use } from 'react';
// import Link from 'next/link';
import axios from 'axios';
import FormFields from './FormFields';
import { useRouter } from 'next/router';

const MainBusinessInfo = () => {
	const router = useRouter();
	const sellerId = router.query;
	const [errorform, setErrorform] = useState('');
	const [storeDetails, setStoreDetails] = useState({
		storeName: '',
		storeDescription: '',
		gstId: '',
	});
	const [addressDetails, setAddressDetails] = useState({
		addressLine: '',
		city: '',
		pincode: '',
		state: '',
		country: '',
	}); //addressDetails

	const handleChange1 = (newValue, fieldName) => {
		setStoreDetails((prevData) => ({
			...prevData,
			[fieldName]: newValue,
		}));
	};

	const handleChange2 = (newValue, fieldName) => {
		setAddressDetails((prevData) => ({
			...prevData,
			[fieldName]: newValue,
		}));
	};

	// useEffect(() => {
	// 	console.log(sellerId);
	// }
	// , []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requiredFields = [
			'storeName',
			'storeDescription',
			'gstId',
			'pincode',
			'addressLine',
			'country',
			'state',
			'city',
		];

		const isEmptyField = requiredFields.some((fieldName) => {
			return !storeDetails[fieldName] && !addressDetails[fieldName];
		});

		if (isEmptyField) {
			setErrorform('*Please fill all fields.');
			return;
		}

		try {
			const api = `${process.env.BASE_API_URL}/api/v1/${sellerId.sellerId}/addStore`;
			// const api = `http://localhost:7000/api/v1/${sellerId.sellerId}/addStore`;
			const response = await axios.post(
				api,
				{ storeDetails, addressDetails }
			);
			console.log(response.data)
			router.push({
				pathname: 'verification',
				query: { sellerId: sellerId.sellerId },
			});
		} catch (error) {
			console.error('Error saving form data:', error);
		}
	};

	return (
		<div className="pt-20 w-full h-full flex flex-col   overflow-x-hidden  md:pb-[1100px]  lg:pb-64 ">
			<div className="flex flex-row items-center justify-center w-full gap-0 my-10 ">
				<div className="flex flex-col items-center p-0 gap-4 h-[90px]">
					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gradient-to-br from-gray-400 to-gray-900">
						1
					</div>
					<text className="w-[99px] sm:h-[30px] sm:font-poppins font-normal sm:text-base leading-6 sm:font-semibold text-center text-gray-800">
						Basic Info
					</text>
				</div>
				<div className="hidden sm:inline mt-[-10px] sm:mt-0 w-20  border border-gray-900"></div>
				<div className="flex flex-col items-center p-0 gap-4 h-[90px]">
					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gradient-to-br from-gray-400 to-gray-900">
						2
					</div>
					<text className="sm:h-[30px] sm:font-poppins font-normal sm:text-base leading-6 w-[129px] sm:font-normal text-center text-gray-400">
						Business Info
					</text>
				</div>
				<div className="hidden sm:inline mt-[-10px] sm:mt-0 w-20 sm:border-[1px] border border-gray-300"></div>
				<div className="flex flex-col items-center p-0 gap-4  h-[90px]">
					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gray-300">
						3
					</div>
					<text className="sm:h-[30px] sm:font-poppins font-normal sm:text-base leading-6 w-[100px] sm:font-normal text-center text-gray-400">
						Verification
					</text>
				</div>
			</div>

			<div className="flex items-center mx-[30px] justify-center my-20">
				<div className="flex flex-col items-center font-poppins p-0 gap-[5px] w-[380px] sm:w-full sm:h-[372px] mt-8 mb-3">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col items-center justify-between sm:px-4 lg:flex-row">
							<FormFields
								labelText="Store:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="En/liveproduct/LiveproductPageter Name"
								value={storeDetails.storeName}
								onChangeFun={handleChange1}
								name="storeName"
							/>

							<FormFields
								labelText="Store Description:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="Enter Description"
								value={storeDetails.storeDescription}
								onChangeFun={handleChange1}
								name="storeDescription"
							/>

							<FormFields
								labelText="Store GSTIN:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="Enter GSTIN"
								value={storeDetails.gstId}
								onChangeFun={handleChange1}
								name="gstId"
							/>
						</div>
						<br />
						<div className="flex flex-col justify-center lg:flex-row ">
							<FormFields
								labelText="Pincode:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="430023"
								value={addressDetails.pincode}
								onChangeFun={handleChange2}
								name="pincode"
							/>
							<FormFields
								labelText="Address line 1:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="address1"
								value={addressDetails.addressLine}
								onChangeFun={handleChange2}
								name="addressLine"
							/>
							<FormFields
								labelText="City:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="City"
								value={addressDetails.city}
								onChangeFun={handleChange2}
								name="city"
							/>
						</div>
						<br />
						{/* <div className="flex flex-col justify-center sm:px-3 lg:flex-row">
							<FormFields
								labelText="Pickup Pincode:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="430023"
								value={formData.pickupPincode}
								onChangeFun={handleChange}
								name="pickupPincode"
							/>
							<FormFields
								labelText="Pickup Address:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="(304) 555-0108"
								value={formData.pickupAddress}
								onChangeFun={handleChange}
								name="pickupAddress"
							/>
							
						</div>
						<br /> */}
						<div className="flex flex-col justify-center sm:px-3 lg:flex-row">
							<FormFields
								labelText="State:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="State"
								value={addressDetails.state}
								onChangeFun={handleChange2}
								name="state"
							/>

							<FormFields
								labelText="Country:"
								classes="w-[300px] sm:w-[380px]  lg:w-[280px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="India"
								value={addressDetails.country}
								onChangeFun={handleChange2}
								name="country"
							/>
						</div>
						<div className="mt-6 flex justify-center px-3 text-[red]">
							{errorform}
						</div>
						<div className="flex justify-center">
							<button
								type="submit"
								className="my-3 flex flex-row justify-center items-center px-4 py-2 rounded-lg bg-gradient-to-b from-[#EB8105] to-[#FAAC06]">
								NEXT
							</button>
						</div>
					</form>
				</div>
				{/* <Link href={'verification'}>
				<div
					className="my-5 flex flex-row rounded-lg justify-center items-center px-4 py-2 gap-[10px] bg-gradient-to-b from-[#EB8105] to-[#FAAC06] "
					type="submit">
					NEXT
				</div>
			</Link> */}
				<div className="md:mt-24 sm:mt-24"></div>
			</div>
		</div>
	);
};
export default MainBusinessInfo;
