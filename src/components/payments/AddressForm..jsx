import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const AddressForm = ({ onAddressSubmit, isEditEnabled, Address,user }) => {
	const serverURL = process.env.BASE_API_URL;
	const indianStates = [
		'Andhra Pradesh',
		'Arunachal Pradesh',
		'Assam',
		'Bihar',
		'Chhattisgarh',
		'Goa',
		'Gujarat',
		'Haryana',
		'Himachal Pradesh',
		'Jharkhand',
		'Karnataka',
		'Kerala',
		'Madhya Pradesh',
		'Maharashtra',
		'Manipur',
		'Meghalaya',
		'Mizoram',
		'Nagaland',
		'Odisha',
		'Punjab',
		'Rajasthan',
		'Sikkim',
		'Tamil Nadu',
		'Telangana',
		'Tripura',
		'Uttar Pradesh',
		'Uttarakhand',
		'West Bengal',
	];
	const [formData, setFormData] = useState({
		fullName: '',
		PhoneNumber: '',
		roadName: '',
		landmark: '',
		pincode: '',
		state: '',
		city: '',
	});

	useEffect(() => {
		if (isEditEnabled) {
			setFormData({
				fullName: Address.fullName,

				PhoneNumber: Address.PhoneNumber,
				roadName: Address.addressLine,
				landmark: Address.landmark,
				pincode: Address.pincode,
				state: Address.state,
				city: Address.city,
			});
		}
	}, [isEditEnabled]);
	console.log(isEditEnabled);
	const AddnewAddress = async (e) => {
		e.preventDefault();
		const requiredFields = [
			'fullName',
			'PhoneNumber',
			'roadName',
			'pincode',
			'state',
			'city',
		];
		const emptyFields = requiredFields.filter(
			(field) => !formData[field].trim()
		);

		if (emptyFields.length > 0) {
			const emptyFieldsMessage = `Please fill in the following required fields: ${emptyFields.join(
				', '
			)}`;
			alert(emptyFieldsMessage);
			return;
		}

		if (isEditEnabled) {
			const formDetails = {
				fullName: formData.fullName,
				PhoneNumber: formData.PhoneNumber,
				addressLine: formData.roadName,
				landmark: formData.landmark,
				pincode: formData.pincode,
				state: formData.state,
				city: formData.city,
				type:  user.role==="customer"?"user":user.role,
				refId: user._Id,
			};
			console.log(formDetails);
			try {
				// Use _id from the Address prop to construct the update URL
				//const updateUrl = `http://localhost:7000/api/v1/address/${Address._id}`;
				const updateUrl = `${serverURL}/api/v1/address/updateAddress/${Address._id}`;

				// Use axios.put for updating the address
				const response = await axios.put(updateUrl, formDetails);

				console.log('Address updated successfully:', response.data);

				// Optionally, reset the form state after successful submission
				e.target.reset();
				setFormData({
					fullName: '',
					PhoneNumber: '',
					roadName: '',
					landmark: '',
					pincode: '',
					state: '',
					city: '',
				});
				onAddressSubmit();
			} catch (error) {
				console.error('Error updating address:', error);
			}
		} else {
			const formDetails = {
				fullName: formData.fullName,
				PhoneNumber: formData.PhoneNumber,
				addressLine: formData.roadName,
				landmark: formData.landmark,
				pincode: formData.pincode,
				state: formData.state,
				city: formData.city,
				type:  user.role==="customer"?"user":user.role,
				refId: user._id,
			};
			console.log(formData);
			try {
				// Example: Send data to the server using fetch
				const response = await axios.post(
					`${serverURL}/api/v1/addressCreation`,
					formDetails
				);

				console.log('Address saved successfully:', response.data);

				// Optionally, reset the form state after successful submission
				e.target.reset();
				setFormData({
					fullName: '',
					PhoneNumber: '',
					roadName: '',
					landmark: '',
					pincode: '',
					state: '',
					city: '',
				});
				onAddressSubmit();
			} catch (error) {
				console.error('Error saving address:', error);
			}
		}
	};

	return (
		<form onSubmit={AddnewAddress} className="overflow-hidden ps-3 sm:ps-0">
			<div>
				<h6>Add New Location</h6>
			</div>
			<div className="flex justify-between sm:gap-2 sm:flex-row flex-col mt-3 w-3/4 ">
				<div className="flex flex-col">
					<p>Full Name</p>
					<input
						type="text"
						name="fullName"
						placeholder="Full Name required*"
						className="focus:outline-none p-2"
						value={formData.fullName}
						onChange={(e) =>
							setFormData({ ...formData, fullName: e.target.value })
						}
					/>
					<hr className="border-t-2"></hr>
				</div>
				<div className="flex flex-col">
					<p>Phone Number</p>
					<input
						type="text"
						name="PhoneNumber"
						placeholder="Phone Number required*"
						className="focus:outline-none p-2"
						value={formData.PhoneNumber}
						onChange={(e) =>
							setFormData({ ...formData, PhoneNumber: e.target.value })
						}
					/>
					<hr className="border-t-2 "></hr>
				</div>
			</div>
			<div className="flex flex-col w-3/4 mt-2">
				<p>Road name, Area, Colony</p>
				<input
					type="text"
					name="roadName"
					placeholder="Road name, Area, Colony"
					className="focus:outline-none p-2"
					value={formData.roadName}
					onChange={(e) =>
						setFormData({ ...formData, roadName: e.target.value })
					}
				/>
				<hr className="border-t-2 "></hr>
			</div>
			<div className="flex justify-between sm:gap-2 sm:flex-row flex-col mt-3 w-3/4">
				<div className="flex flex-col">
					<p>Add Landmark</p>
					<input
						type="text"
						name="landmark"
						placeholder="Not required*"
						className="focus:outline-none p-2"
						value={formData.landmark}
						onChange={(e) =>
							setFormData({ ...formData, landmark: e.target.value })
						}
					/>
					<hr className="border-t-2"></hr>
				</div>
				<div className="flex flex-col">
					<p>Enter Pinocode</p>
					<input
						type="text"
						name="pincode"
						placeholder="Enter Pincode required*"
						className="focus:outline-none p-2"
						value={formData.pincode}
						onChange={(e) => {
							setFormData({ ...formData, pincode: e.target.value });
						}}
					/>
					<hr className="border-t-2 "></hr>
				</div>
			</div>
			<div className="flex justify-between  sm:sm:gap-2 sm:flex-row flex-col mt-3 w-3/4">
				<div className="flex flex-col">
					<p>Enter Your City</p>
					<input
						type="text"
						name="city"
						placeholder="Enter City required*"
						className="focus:outline-none p-2"
						value={formData.city}
						onChange={(e) => setFormData({ ...formData, city: e.target.value })}
					/>
					<hr className="border-t-2 "></hr>
				</div>
				<div className="flex flex-col">
					<p>State</p>
					<select
						name="state"
						className="border border-gray-300 focus:border-transparent focus:outline-none p-2"
						value={formData.state} // Add this line to make it a controlled component
						onChange={(e) =>
							setFormData({ ...formData, state: e.target.value })
						}>
						<option value="" disabled selected>
							Select a State
						</option>
						<option value="" disabled selected>
							Select a State
						</option>
						{indianStates.map((state) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</select>
					<hr className="border-t-2"></hr>
				</div>
			</div>
			<div>
				<button
					type="submit"
					className="px-2 p-2 font-body bg-[#eb8105] rounded-lg mt-4">
					{isEditEnabled ? 'Update Address' : 'Add New Address'}
				</button>
			</div>
		</form>
	);
};

export default AddressForm;
