import React, { useState } from 'react';

const ProfileEditDetails = ({ initialValues = {} }) => {
	const [fullName, setFullName] = useState(initialValues.fullName || '');
	const [email, setEmail] = useState(initialValues.email || '');
	const [mobileNumber, setMobileNumber] = useState(
		initialValues.mobileNumber || ''
	);
	const [gender, setGender] = useState(initialValues.gender || '');
	const [birthday, setBirthday] = useState(initialValues.birthday || '');
	const [location, setLocation] = useState(initialValues.location || '');
	const [alternativeMobile, setAlternativeMobile] = useState(
		initialValues.alternativeMobile || ''
	);
	const [nickname, setNickname] = useState(initialValues.nickname || '');

	const handleSubmit = (e) => {
		alert('Account get updated');
		e.preventDefault();
		// Here, you can save the form data to the database
		// You can make an API call or use your preferred database integration

		// Example API call using fetch
		const formData = {
			fullName,
			email,
			mobileNumber,
			gender,
			birthday,
			location,
			alternativeMobile,
			nickname,
		};

		fetch('/api/saveFormData', {
			method: 'POST',
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Form data saved successfully:', data);
				// Handle success
			})
			.catch((error) => {
				console.error('Error saving form data:', error);
				// Handle error
			});
	};

	const handleMobileNumberChange = () => {
		// Add the logic to handle the change number button action
		// This can include displaying a modal, sending an OTP, etc.
		alert('Mobile Number changed');
	};

	return (
		<div className="w-full flex flex-col items-start gap-4 flex-none">
			<h className="w-full font-medium flex items-center text-[#18181B] px-1 md:px-6">
				Edit Details
			</h>
			<form onSubmit={handleSubmit} className="w-full px-1 md:px-6">
				<label>
					<input
						className="box-border flex flex-row items-start p-2 w-full border border-gray-500 mt-0"
						placeholder="Full Name"
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
					/>
				</label>
				<br />

				<label>
					<input
						className="box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-500 "
						placeholder="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<br />

				<div className="w-full border flex flex-row justify-between items-center p-2 border-gray-500 flex-none order-3 self-stretch">
					<label className="">
						<h className="w-full text-base leading-[150%] flex items-center text-gray-500 p-0">
							Mobile Number
						</h>
						<input
							className="font-normal text-base leading-[150%] flex items-center text-black p-0"
							placeholder="0123456789"
							type="tel"
							value={mobileNumber}
							onChange={(e) => setMobileNumber(e.target.value)}
						/>
					</label>
					<button
						type="button"
						onClick={handleMobileNumberChange}
						className="flex flex-row items-center justify-center w-32 h-10 gap-2 p-2 text-white bg-gray-800">
						Change No.
					</button>
				</div>
				<br />

				<label className="flex flex-row justify-start items-center p-0 gap-4">
					<div className="box-border flex flex-row items-center justify-center w-24 gap-2 p-2 border border-gray-400 rounded-md h-9">
						<input
							className="w-4 h-4 border-2 border-gray-800 rounded-full"
							type="radio"
							value="male"
							checked={gender === 'male'}
							onChange={() => setGender('male')}
						/>{' '}
						Male
					</div>
					<div className="box-border flex flex-row justify-center items-center p-2 gap-2 border border-gray-400 rounded-md">
						<input
							className="w-4 h-4 border-2 border-gray-800 rounded-full"
							type="radio"
							value="female"
							checked={gender === 'female'}
							onChange={() => setGender('female')}
						/>{' '}
						Female
					</div>
					<div className="box-border flex flex-row justify-center items-center p-2 gap-2 border border-gray-400 rounded-md">
						<input
							className="w-4 h-4 border-2 border-gray-800 rounded-full"
							type="radio"
							value="other"
							checked={gender === 'other'}
							onChange={() => setGender('other')}
						/>{' '}
						Other
					</div>
				</label>
				<br />

				<div className=" box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-400 ">
					<h className="flex items-center text-base font-normal leading-6 text-gray-700 w-168 h-21">
						Birthday
					</h>
					<label>
						<input
							placeholder="Birthday"
							type="date"
							value={birthday}
							onChange={(e) => setBirthday(e.target.value)}
						/>
					</label>
				</div>
				<br />

				<label>
					<input
						className="box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-400 "
						placeholder="Location"
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label>
				<br />
				<h className="w-full mb-3 font-medium text-base leading-6 flex items-center text-gray-900 ">
					Alternative Mobile Details
				</h>
				<label>
					<input
						className="box-border flex flex-row items-start p-2 gap-2 w-full h-[48px] border border-gray-400 "
						placeholder="Mobile Number"
						type="tel"
						value={alternativeMobile}
						onChange={(e) => setAlternativeMobile(e.target.value)}
					/>
				</label>
				<br />

				<label>
					<input
						className="box-border flex flex-row items-start p-3 gap-2 w-full h-[48px] border border-gray-400"
						placeholder="Hint name"
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
				</label>
				<button
					className="w-fit bg-gray-800 text-white my-4 mx-1 p-2"
					type="update">
					UPDATE ACCOUNT
				</button>
				<button
					className="w-fit border border-gray-800 text-gray-800 my-4 mx-1 p-2"
					type="submit">
					CHANGE PASSWORD
				</button>
			</form>
		</div>
	);
};

export default ProfileEditDetails;
