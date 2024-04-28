import React, { useState } from 'react';
import { useUser } from '../../UserContext';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import router from 'next/router';

import { MdOutlinePhotoCamera } from 'react-icons/md';
const ProfileEditDetails = () => {
	const { user, setUser } = useUser();

	const [imageInputHover, setImageInputHover] = useState(false);

	const [name, setName] = useState(user?.name || '');
	const [email, setEmail] = useState(user?.email || '');
	const [mobileNumber, setMobileNumber] = useState(user?.phone_number || '');
	const [gender, setGender] = useState(user?.gender || '');
	const [birthday, setBirthday] = useState(user?.dateOfBirth || '');
	const [password, setPassword] = useState('');
	// const [location, setLocation] = useState('');
	// const [profilePic, setProfilePic] = useState(user?.profilePic?.url || null);
	const [imageUpload, setImageUpload] = useState(null);
	const [image, setImage] = useState(user?.profilePic?.url || null);

	const serverURL = process.env.BASE_API_URL;
	const handleSubmit = (e) => {
		const api = `${serverURL}/api/v1/user/${user._id}`;
		// const api = `http://localhost:7000/api/v1/user/${user._id}`;

		axios
			.put(api, {
				name: name,
				email: email,
				phone_number: mobileNumber,
				gender: gender,
				dateOfBirth: birthday,
			})
			.then((response) => {
				console.log(response.data);
				setUser(response.data);
				router.push('/account');
			})
			.catch((err) => console.error(err));

		// Upload the image (if it has been changed)
		if (imageUpload) {
			const api2 = `${serverURL}/api/v1/users/${user._id}/uploadProfilePic`;
			const formData = new FormData();
			formData.append('file', imageUpload);
			console.log(formData);
			axios
				.post(api2, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response) => {
					console.log('Image uploaded:', response.data);
					// Set the image URL in the state after successful upload
					setImage(response.data.newFile.url);
					setUser(response.data);
				})
				.catch((error) => {
					console.error('Error uploading image:', error);
				});
		}
	};

	const updatePassword = () => {
		const api = `${serverURL}/api/v1/user/${user._id}`;

		axios
			.put(api, {
				password: password,
			})
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => console.error(err));
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			console.log(file);
			setImageUpload(file);

			const reader = new FileReader();

			reader.onload = (e) => {
				setImage(e.target.result);
			};

			reader.readAsDataURL(file);
		}
	};
	// const handleMobileNumberChange = () => {
	// 	// Add the logic to handle the change number button action
	// 	// This can include displaying a modal, sending an OTP, etc.
	// 	alert('Mobile Number changed');
	// };

	return (
		<div className="w-full flex flex-col items-start gap-4 flex-none">
			<div
				className={`w-32 h-32 rounded-full overflow-hidden `}
				style={{ position: 'relative' }}
				onMouseEnter={() => setImageInputHover(true)}
				onMouseLeave={() => setImageInputHover(false)}>
				<Image
					src={user?.profilePic?.url || '/images/man.svg'}
					width={300}
					height={300}
					alt={user.name}
					className={`${imageInputHover ? 'opacity-50' : 'opacity-100'}`}
				/>
				<div className={`absolute top-0 left-0 h-full w-full`}>
					<MdOutlinePhotoCamera
						size={25}
						className={`absolute inset-0 m-auto ${
							imageInputHover ? 'opacity-100' : 'opacity-0'
						}`}
					/>
				</div>

				<input
					type="file"
					className=""
					accept="image/*"
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						opacity: 0,
						cursor: 'pointer',
					}}
					onChange={(e) => handleImageChange(e)}
				/>
			</div>
			<div className="w-full font-medium flex items-center text-[#18181B] px-1 md:px-6">
				Edit Details
			</div>
			<div className="w-full px-1 md:px-6">
				<label>
					<input
						className="box-border flex flex-row items-start p-2 w-full border border-gray-500 mt-0"
						placeholder="Full Name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
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

				{/* <div className="w-full text-base leading-[150%] flex items-center text-gray-500 p-0">
							Mobile Number
						</div> */}
				<input
					className="box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-500"
					placeholder="Mobile Number"
					type="tel"
					value={mobileNumber}
					onChange={(e) => setMobileNumber(e.target.value)}
				/>

				<br />
				<div className="w-full flex items-center justify-between">
					<label className="flex flex-row justify-start items-center p-0 gap-4">
						<div className="box-border flex flex-row items-center justify-center w-24 gap-2 p-2 border border-gray-400 rounded-md h-9">
							<input
								className="w-4 h-4 border-2 border-gray-800 rounded-full accent-orange-400 outline-none"
								type="radio"
								value="male"
								checked={gender === 'male'}
								onChange={() => setGender('male')}
							/>
							Male
						</div>
						<div className="box-border flex flex-row justify-center items-center p-2 gap-2 border border-gray-400 rounded-md">
							<input
								className="w-4 h-4 border-2 border-gray-800 rounded-full accent-orange-400 outline-none"
								type="radio"
								value="female"
								checked={gender === 'female'}
								onChange={() => setGender('female')}
							/>
							Female
						</div>
						<div className="box-border flex flex-row justify-center items-center p-2 gap-2 border border-gray-400 rounded-md">
							<input
								className="w-4 h-4 border-2 border-gray-800 rounded-full accent-orange-400 outline-none"
								type="radio"
								value="other"
								checked={gender === 'other'}
								onChange={() => setGender('other')}
							/>
							Other
						</div>
					</label>
				</div>
				<br />
				<div className=" box-border flex flex-row items-start p-2 gap-2  border border-gray-400 ">
					<div className="flex items-center text-base font-normal leading-6 text-gray-700 w-168 h-21">
						Birthday
					</div>
					<label>
						<input
							placeholder="Birthday"
							type="date"
							value={birthday}
							onChange={(e) => setBirthday(e.target.value)}
							className="outline-none"
						/>
					</label>
				</div>
				<br />

				{/* <label>
					<input
						className="box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-400 "
						placeholder="Location"
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label> */}

				{/* <br />
				<label>
					<input
						className="box-border flex flex-row items-start p-3 gap-2 w-full h-[48px] border border-gray-400"
						placeholder="Hint name"
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
				</label> */}
				<button
					className="w-fit bg-gray-800 text-white my-4 mx-1 p-2"
					onClick={() => handleSubmit()}>
					UPDATE ACCOUNT
				</button>

				<Link href={'/account/forgotPwd'}>
					<button className="w-fit border border-gray-800 text-gray-800 my-4 mx-1 p-2">
						CHANGE PASSWORD
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ProfileEditDetails;
