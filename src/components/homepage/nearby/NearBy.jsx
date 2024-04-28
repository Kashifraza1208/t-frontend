import { useState, useEffect } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function NearBy() {
	const [userLocation, setUserLocation] = useState(null);
	const router = useRouter();
	const [categories, setCategories] = useState([]);
	const serverURL = process.env.BASE_API_URL;
	const loaderProp = ({ src }) => {
		return src;
	};
	useEffect(() => {
		if (sessionStorage.getItem('homeCategories')) {
			setCategories(JSON.parse(sessionStorage.getItem('homeCategories')));
		} else {
			const api = `${serverURL}/api/v1/homeCategories`;
			axios
				.get(api)
				.then((response) => {
					setCategories(response.data);
					sessionStorage.setItem(
						'homeCategories',
						JSON.stringify(response.data)
					);
				})
				.catch((error) => {
					console.error('Error fetching categories:', error);
				});
		}
	}, [serverURL]);

	const Column = ({ imageName, text, route }) => (
		<>
			<div
				className="flex  flex-col items-center rounded cursor-pointer hover:shadow-lg hover:font-semibold hover:scale-105"
				onClick={() => handleRequestLocationAccess(route)}>
				<div className="w-16 h-16 overflow-hidden rounded-full shrink-0 md:w-24 lg:w-48 md:h-24 lg:h-44 lg:rounded-sm">
					<Image
						className="object-cover w-full h-full"
						src={imageName}
						width={400}
						height={400}
						alt={text}
						loader={loaderProp}
					/>
				</div>
				<div className="w-20 p-2 md:w-24 lg:w-48 ">
					<p className="inline-block w-full overflow-hidden text-sm text-center lg:text-base whitespace-nowrap text-ellipsis">
						{text}
					</p>
				</div>
			</div>
		</>
	);

	useEffect(() => {
		const storedLocation = localStorage.getItem('userLocation');
		if (storedLocation) {
			setUserLocation(JSON.parse(storedLocation));
		}
	}, []);

	const handleRequestLocationAccess = (route) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const { latitude, longitude } = position.coords;

				localStorage.setItem(
					'userLocation',
					JSON.stringify({ latitude, longitude })
				);

				console.log(latitude, longitude);
				setUserLocation({ latitude, longitude });

				router.push(route);
			});
		} else {
			// Geolocation not available
		}
	};
	return (
		<>
			<div className="flex  flex-row justify-between w-full gap-4 overflow-auto grid-container">
				{categories.length > 0 &&
					categories.map((category) => (
						<div key={category._id}>
							<Column
								imageName={category?.image?.url}
								text={`${category.name}`}
								route={`/nearByStore/${category._id}`}
							/>
						</div>
					))}
			</div>
		</>
	);
}
