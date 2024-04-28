import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HiEye } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const LoginwithPwd = () => {
	let sellerId = "65610769a581ad3bdd04f2bc"
	const { setAuthenticated } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [loginError, setLoginError] = useState('');

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};


	const handleLogin = async () => {
		setEmailError('');
		setPasswordError('');
		setLoginError('');

		if (!email) {
			setEmailError('Email is required');
			return;
		}

		if (!password) {
			setPasswordError('Password is required');
			return;
		}

		if (typeof window !== 'undefined') {
			localStorage.setItem('sellerId', sellerId);
		}

	};

	return (
		<>
			<div className="flex w-full flex-col mb-2">
				<p className="flex-wrap text-xl text-center items-center font-semibold my-2">
					Login
				</p>
				<p className="flex-wrap text-xs mb-2 text-center text-gray-500">
					Continue to Trialshopy
				</p>
			</div>

			<div className="flex w-full flex-col">
				<input
					type="email"
					placeholder="Email or Mobile number"
					className={`w-full h-[47px] px-1 py-1 border border-gray-400 rounded-md ${emailError ? 'border-red-500' : ''
						}`}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				{emailError && <p className="text-red-500 text-xs">{emailError}</p>}
			</div>

			<div className="grid-flow-col max-md:gap-3 justify-between">
				<div className="relative flex">
					<input
						type={showPassword ? 'text' : 'password'}
						placeholder="Password"
						className={`flex border w-full h-[47px] border-gray-400 py-1 px-2 rounded-md my-2 ${passwordError ? 'border-red-500' : ''
							}`}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<HiEye
						name="eye-fill"
						onClick={togglePasswordVisibility}
						className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
					/>
				</div>
				{passwordError && (
					<p className="text-red-500 text-xs">{passwordError}</p>
				)}
				{loginError && <p className="text-red-500 text-xs">{loginError}</p>}

				<div className="flex items-center justify-between">
					<div>
						Forgot Password ?
					</div>
					<div>
						<input type="radio" className="w-4 h-4 mr-2 " />
						<span className="text-xs mb-2 text-[14px] text-gray-900">
							Remember Me
						</span>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col my-1">
				<button
					onClick={handleLogin}
					className="w-full text-white bg-orange-400 rounded-md my-2 py-2 text-center flex items-center justify-center">
					Login
				</button>
			</div>
		</>
	);
};

export default LoginwithPwd;
