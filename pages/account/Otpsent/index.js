import React, { useState, useEffect } from 'react';

import Otp from '../../../src/components/loginsignup/Otp';

export default function Otpsent() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		handleResize(); // Initial check on component mount
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return (
		<>
			<div
				className="max-sm bg-[#FFA51D] sm:pt-8 pt-[179px] flex-wrap sm:items-center"
				style={{
					backgroundImage: `url(${
						isMobile ? '/images/LoginMobile.png' : '/images/Login.png'
					})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					height: '100vh',
				}}>
				<Otp/>
			</div>
		</>
	);
}
