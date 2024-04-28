// export default StorePage;
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Banner from './Banner';
import VisitStoreCard from './visitStoresCard_StoresOffersPage';
import StoreOverview1 from './StoreOverview1';
import StoreOverview from './StoreOverview';
import StoreReview from './StoreReview';
import StoreReview1 from './StoreReview1';
import StoreOffers from './StoreOffers';
import axios from 'axios';
import Loading from '../Loading';
import StoreReviewComp from './StoreReviewComp';
import { useUser } from '../../UserContext';
import {
	FacebookShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';
import {
	FacebookIcon,
	LinkedinIcon,
	TelegramIcon,
	TwitterIcon,
	WhatsappIcon,
} from 'react-share';
import { useRouter } from 'next/router';
const StorePage = ({ storeId }) => {
	
	const [storeData, setStoreData] = useState(null);
	const [storeReviews, setStoreReviews] = useState([]);
	const [activeTab, setActiveTab] = useState('overview');
	const [showFilePicker, setShowFilePicker] = useState(false);
	const [selectedPhotos, setSelectedPhotos] = useState([]);
	const [isFollowing, setIsFollowing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
	const [shareClick, setShareClick] = useState(false);
	const { user, token } = useUser();
	const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
	const [follow, setFollow] = useState(false); 
	const onShare = () => {
		setShareClick(!shareClick);
	};

	const handleCopyLink = () => {
		navigator.clipboard
			.writeText(shareUrl)
			.then(() => {
				alert('Link copied to clipboard!');
			})
			.catch((error) => {
				console.error('Failed to copy text: ', error);
			});
	};
	const serverURL = process.env.BASE_API_URL;

	const userId = user._id; 
	
	const storeId1 = storeId;

	useEffect(() => {
		const api = `${serverURL}/api/v1/storeReviews/${storeId}`;

		axios
			.get(api)
			.then((res) => {
				setStoreReviews(res.data);
				console.log(res.data);
			})
			.catch((err) => console.error(err));
	}, [serverURL, storeId]);

	

	function handleActiveTab(value) {
		setActiveTab(value);
	}

	const handleFollowerClick = () => {
		const apiUrl = `${serverURL}/api/v1/stores/${storeId1}/addFollower`;
		const removeFollowerUrl = `${serverURL}/api/v1/stores/${storeId1}/removeFollower`;

		const requestConfig = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// If the user is not following, add the follower
		if (!isFollowing) {
			axios
				.put(apiUrl, { userId }, requestConfig)
				.then(() => {
					setIsFollowing(true);
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			// If the user is already following, remove the follower
			axios
				.put(removeFollowerUrl, { userId }, requestConfig)
				.then(() => {
					setIsFollowing(false);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const handleAddPhotos = () => {
		setShowFilePicker(true);
	};

	const handleFileChange = (event) => {
		const files = event.target.files;

		const selectedPhotosArray = Array.from(files);
		setSelectedPhotos(selectedPhotosArray);
	};

	const handleUploadPhotos = () => {
		setShowFilePicker(false);
	};

	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${serverURL}/api/v1/stores/${storeId}`);
				setStoreData(response.data);
	
				// Ensure response.data.followers is an array before processing
				if (Array.isArray(response.data.followers.followers)) {
					// Find the current user's data in the list of followers
					const currentUserData = response.data.followers.followers.find(follower => follower.email === user.email);
					console.log('currentUserData',currentUserData)
					if (currentUserData) {
						// If the current user is found in the list of followers
						setIsFollowing(true);
						
					} else {
						// If the current user is not found in the list of followers
						setIsFollowing(false);
						
					}
				} else {
					console.error('Followers data is not an array:', response.data.followers);
				}
			} catch (error) {
				console.error(error);
			}
		};
	
		fetchData();
	}, [storeId, user.email]);
	
	
	
	
	
	const handleFollow = async () => {
		try {
			const apiUrl = `${serverURL}/api/v1/${storeId1}/follow`;
			const removeFollowerUrl = `${serverURL}/api/v1/${storeId1}/unfollow`;
	
			const requestConfig = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
	
			// If the user is not following, add the follower
			if (!isFollowing) {
				await axios.post(apiUrl, {}, requestConfig);
				setIsFollowing(true);

			} else {
				// If the user is already following, remove the follower
				await axios.post(removeFollowerUrl, {}, requestConfig);
				setIsFollowing(false);
			}
		} catch (error) {
			console.error('Error toggling follower status:', error);
		}
	};
	
	return storeData ? (
		<div className="w-full ">
			<Banner storeData={storeData}
			 onFollowStoreClick={handleFollowerClick} 
			 />
			<div className="flex flex-col w-full px-5 lg:px-[80px] pt-[40px] pb-[20px] items-start gap-4 lg:gap-8 relative">
				<div className="flex flex-col items-start justify-between w-full lg:flex-row">
					<div className=" flex flex-col items-start w-full gap-4 lg:w-3/4">
						<section className="flex  w-full   sm:flex-row sm:justify-evenly sm:py-2 ">
							<div className="flex   w-full">
					
{isFollowing ? (
    <span
        className="bg-gray-600 m-2 text-white font-fontMedium text-xs w-[6rem] flex cursor-pointer justify-center items-center sm:h-7"
        onClick={handleFollow}>
        <p className="text-xs">Unfollow</p>
    </span>
) : (
    <span
        className="bg-gray-800 m-2   text-white font-fontMedium text-xs w-[9rem] flex cursor-pointer justify-center items-center sm:h-7"
        onClick={handleFollow}>
        Follow
    </span>
)}
						

								<span
									className="bg-white m-2 border border-gray-400 cursor-pointer text-gray-600 font-fontMedium text-xs w-[11rem] flex justify-center items-center h-7"
									onClick={() => handleActiveTab('reviews')}>
									<span className="pb-1 pr-1 text-lg font-fontMedium">
									<Image
										width={10}
										height={10}
										src="/icons/StoreReviewPageTop3.png"
										alt="writeAReview"
										className="pt-1"
									/>
									</span>
									<div
										onClick={() => {
											setReviewBoxOpen(!reviewBoxOpen);
										}}>
										Write a Review
									</div>
								</span>
								<div
									className="bg-white m-2 border border-gray-400 cursor-pointer text-gray-600 font-fontMedium text-xs w-[8rem] flex flex-wrap justify-center items-center h-7"
									onClick={onShare}>
									<span className="pb-1 pr-1 text-lg font-fontMedium">
										<Image
											width={10}
											height={10}
											src="/icons/StoreReviewPageTop4.png"
											alt="writeAReiview"
											className="pt-1"
										/>
									</span>
									<span>Share</span>
								</div>

								{shareClick && (
									<div className="ml-60   z-50 xxs:flex-wrap  py-2 px-1 rounded-xl mt-11 absolute  flex flex-row border-2 border-[#ffa726] bg-white">
										<div className="mx-1">
											<FacebookShareButton url={shareUrl}>
												<FacebookIcon size={32} className="rounded-lg" />
											</FacebookShareButton>
										</div>
										<div className="mx-1">
											<WhatsappShareButton url={shareUrl}>
												<WhatsappIcon size={32} className="rounded-lg" />
											</WhatsappShareButton>
										</div>
										<div className="mx-1">
											<LinkedinShareButton url={shareUrl}>
												<LinkedinIcon size={32} className="rounded-lg" />
											</LinkedinShareButton>
										</div>
										<div className="mx-1">
											<TelegramShareButton url={shareUrl}>
												<TelegramIcon size={32} className="rounded-lg" />
											</TelegramShareButton>
										</div>
										<div className="mx-1">
											<TwitterShareButton url={shareUrl}>
												<TwitterIcon size={32} className="rounded-lg" />
											</TwitterShareButton>
										</div>
										<div
											className="mx-1 text-2xl cursor-pointer"
											onClick={handleCopyLink}>
											🧷
										</div>
									</div>
								)}
							</div>
						</section>
						<section className="flex justify-around w-full text-center sm:w-full">
							<span
								className={`sm:px-5 px-3 py-2 font-fontMedium w-full cursor-pointer ${
									activeTab === 'overview'
										? 'border-b-2 border-black text-black'
										: 'text-gray-400 border-b'
								}`}
								onClick={() => handleActiveTab('overview')}>
								Overview
							</span>
							<span
								className={` sm:px-5 px-3 py-2 font-fontMedium w-full cursor-pointer ${
									activeTab === 'reviews'
										? 'border-b-2 border-black text-black'
										: 'text-gray-400 border-b'
								}`}
								onClick={() => handleActiveTab('reviews')}>
								Reviews
							</span>
							<span
								className={` sm:px-5 px-3 py-2 font-fontMedium w-full cursor-pointer ${
									activeTab === 'offers'
										? 'border-b-2 border-black text-black'
										: 'text-gray-400 border-b'
								}`}
								onClick={() => handleActiveTab('offers')}>
								Offers
							</span>
						</section>
						{activeTab === 'overview' && (
							<StoreOverview1 storeData={storeData} />
						)}
						{activeTab === 'reviews' && (
							<StoreReview1 storeData={storeData} storeReviews={storeReviews} />
						)}
						{activeTab === 'offers' && <StoreOffers storeId={storeId} />}

					</div>
					<div className="   lg:w-[45vh]">
						<VisitStoreCard />
					</div>
				</div>
				<div className="absolute w-full lg:w-1/3  top-0 lg:left-1/2 shadow-lg ">
					{reviewBoxOpen && (
						<StoreReviewComp
							storeId={storeId}
							setReviewBoxOpen={setReviewBoxOpen}
						/>
					)}
				</div>
				<div className="flex w-full">
					{activeTab === 'overview' && <StoreOverview storeData={storeData} />}
					{activeTab === 'reviews' && (
						<StoreReview storeReviews={storeReviews} />
					)}
					
				</div>
			</div>
		</div>
	) : (
		<Loading/>
	);
};

export default StorePage;
