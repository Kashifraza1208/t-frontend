import React, { useState } from 'react';
import FormFields from './FormFields';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MainBasicInfo = () => {
	const [errorform, setErrorform] = useState('');
	const [sellerDetails, setSellerDetails] = useState({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		alternatePhoneNumber: '',
		password: '',
	}); //sellerDetails

	const [addressDetails, setAddressDetails] = useState({
		addressLine: '',
		city: '',
		pincode: '',
		state: '',
		country: '',
	}); //addressDetails

	const [formData, setFormData] = useState({
		sellerDetails,
		addressDetails
	});

	const handleChange1 = (newValue, fieldName) => {

		setFormData((prevData) => ({
			...prevData,
			sellerDetails: {
				...prevData.sellerDetails,
				[fieldName]: newValue
			}
		}));
	};

	const handleChange2 = (newValue, fieldName) => {
		setFormData((prevData) => ({
			...prevData,
			addressDetails: {
				...prevData.addressDetails,
				[fieldName]: newValue
			}
		}));
	};

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requiredFields = [
			'firstName',
			'lastName',
			'email',
			'phoneNumber',
			'pincode',
			'addressLine',
			'country',
			'state',
			'city',
			'password',
		];

		const isEmptyField = requiredFields.some((fieldName) => {
			return (
				!formData.sellerDetails[fieldName] &&
				!formData.addressDetails[fieldName]
			);
		});

		if (isEmptyField) {
			setErrorform('Please fill all fields having *');
			return;
		}
		try {
			const api = `${process.env.BASE_API_URL}/api/v1/sellerAdd`;
			// const api = 'http://localhost:7000/api/v1/sellerAdd';

			const response = await axios.post(
				api,
				formData
			);
			//router.push('become-seller/business'); it shuld be with query params response.id
			console.log(response.data);
			const id = response.data.data._id;

			router.push({
				pathname: 'become-seller/business',
				query: { sellerId: id },
			});
		} catch (error) {
			console.error('Error saving form data:', error);
		}
	};

	return (
		<div className="overflow-x-hidden">
			<div className=" w-full  my-10 flex flex-row justify-center items-center gap-0  ">
				<div className="flex flex-col items-center p-0 gap-4 h-[90px]">
					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gradient-to-br from-gray-400 to-gray-900">
						1
					</div>
					<text className="w-[99px] sm:h-[30px] sm:font-poppins font-normal sm:text-base leading-6 sm:font-semibold text-center text-gray-800">
						Basic Info
					</text>
				</div>
				<div className="hidden sm:inline mt-[-10px] sm:mt-0 w-20  border border-gray-300"></div>
				<div className="flex flex-col items-center p-0 gap-4 h-[90px]">
					<div className="flex flex-col justify-center items-center p-10 gap-10 w-[50px] h-[50px] rounded-full bg-gray-300">
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
			<div className="my-20    flex  items-center  justify-center">
				<div className=" p-5">
					<form
						onSubmit={handleSubmit}
						className=" flex flex-col justify-center items-center ">
						<div className="flex  flex-col lg:flex-row justify-center">
							<FormFields
								labelText={
									formData.sellerDetails.firstName ? (
										'First Name'
									) : (
										<span>
											First Name <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border  flex flex-row justify-center items-center p-2 gap-2 h-44   border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="Enter Name"
								value={formData.sellerDetails.firstName}
								name="firstName"
								onChangeFun={handleChange1}
							/>

							<FormFields
								labelText="Middle Name"
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="Enter Name"
								value={formData.sellerDetails.middleName}
								onChangeFun={handleChange1}
								name="middleName"
							/>
							<FormFields
								labelText={
									formData.sellerDetails.lastName ? (
										'Last Name'
									) : (
										<span>
											Last Name <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="Enter Name"
								value={formData.sellerDetails.lastName}
								name="lastName"
								onChangeFun={handleChange1}
							/>
						</div>

						<div className="flex flex-col lg:flex-row">
							<FormFields
								labelText={
									formData.sellerDetails.email ? (
										'Email'
									) : (
										<span>
											Email <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="email"
								placeholder="user@gmail.com"
								value={formData.sellerDetails.email}
								name="email"
								onChangeFun={handleChange1}
							/>
							<FormFields
								labelText={
									formData.sellerDetails.phoneNumber ? (
										'Phone Number'
									) : (
										<span>
											Phone Number <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border  flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="tel"
								placeholder="(304) 555-0108"
								value={formData.sellerDetails.phoneNumber}
								name="phoneNumber"
								onChangeFun={handleChange1}
							/>
							<FormFields
								labelText="Alternate Phone Number"
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="tel"
								placeholder="(304) 555-0108"
								value={formData.sellerDetails.alternatePhoneNumber}
								name="alternatePhoneNumber"
								onChangeFun={handleChange1}
							/>
						</div>

						<div className="flex flex-col lg:flex-row">
							<FormFields
								labelText={
									formData.addressDetails.pincode ? (
										'Pincode'
									) : (
										<span>
											Pincode <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="430023"
								value={formData.addressDetails.pincode}
								name="pincode"
								onChangeFun={handleChange2}
							/>
							<FormFields
								labelText={
									formData.addressDetails.addressLine ? (
										'Address Line'
									) : (
										<span>
											Address line <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="address"
								value={formData.addressDetails.addressLine}
								name="addressLine"
								onChangeFun={handleChange2}
							/>
							<FormFields
								labelText="City"
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="city"
								value={formData.addressDetails.city}
								name="city"
								onChangeFun={handleChange2}
							/>
						</div>

						<div className="flex flex-col lg:flex-row">
							<FormFields
								labelText={
									formData.addressDetails.country ? (
										'Country'
									) : (
										<span>
											Country <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="India"
								value={formData.addressDetails.country}
								name="country"
								onChangeFun={handleChange2}
							/>
							<FormFields
								labelText={
									formData.addressDetails.state ? (
										'State'
									) : (
										<span>
											State <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="state"
								value={formData.addressDetails.state}
								name="state"
								onChangeFun={handleChange2}
							/>
							<FormFields
								labelText={
									formData.sellerDetails.password ? (
										'Password'
									) : (
										<span>
											Password <span style={{ color: 'red' }}>*</span>
										</span>
									)
								}
								classes="w-[300px] sm:w-[380px]  lg:w-[300px]  box-border flex flex-row justify-center items-center p-2 gap-2 h-44 bg-white border-b border-gray-500 text-gray-700 "
								type="text"
								placeholder="Create Password"
								value={formData.sellerDetails.password}
								name="password"
								onChangeFun={handleChange1}
							/>
						</div>
						<div className="mt-6 flex justify-center text-[red]">
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
			</div>
			{/* <Link href={'become-seller/business'}>
				<div
					className="my-5 flex flex-row rounded-lg justify-center items-center px-4 py-2 gap-[10px] bg-gradient-to-b from-[#EB8105] to-[#FAAC06] "
					onClick={handleSubmit}>
					NEXT
				</div>
			</Link> */}
			<div className="md:mt-24 sm:mt-24"></div>
		</div>
	);
};

export default MainBasicInfo;
