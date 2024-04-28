import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiFillCaretDown } from 'react-icons/ai';
import ProgressBar from '@ramonak/react-progress-bar';
import StarRating from '../star_rating/StarRating';
import StarRatingInput from '../star_rating/StarRatingInput';
import { useUser } from '../../UserContext';
import { useAuth } from './../../context/AuthContext';

const StoreReview1 = ({ storeData, storeReviews }) => {
	const [reviewed, setReviewed] = useState(false);
	const [userReview, setUserReview] = useState(null);
	const { user } = useUser();
	const { authenticated } = useAuth();
	const [rating, setRating] = useState(0);

	const [progressData, setProgressData] = useState(null);
	useEffect(() => {
		let categorizedReview = {
			5: [],
			4: [],
			3: [],
			2: [],
			1: [],
		};

		let progressData = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
		if (user) {
			const ProcessData = async () => {
				await storeReviews.map((review) => {
					if (review.userId._id === user._id) {
						setReviewed(true);
						setUserReview(review);
						setRating(review.rating);
					}
					categorizedReview[review.rating].push(review);
				});
			};

			ProcessData().then(() => {
				Object.keys(categorizedReview).map((cat) => {
					progressData[cat] =
						(categorizedReview[cat].length / storeReviews.length) * 100;
				});

				// console.log(progressData);
			});
			setProgressData(progressData);
		}
	}, [user, storeReviews]);

	return (
		<div className="w-full">
			<section className="sm:w-full">
				<p className=" text-sm mx-4 p-4 font-fontBold">Recommended Reviews</p>
				<section className="flex flex-col sm:flex-row justify-center sm:h-auto  border sm:justify-between sm:w-full sm:px-4 ">
					<section className="flex sm:flex-row justify-center">
						<Image
							width={58}
							height={58}
							src={userReview?.userId?.profilePic?.url}
							className="py-2 sm:py-10"
							alt=""
						/>
						<section className="sm:justify-self-start items-center justify-center py-2 sm:py-10 mx-2 ">
							<p className="font-fontMedium text-lg">
								{userReview?.userId?.name}
							</p>
							<p className="font-light text-sm">{userReview?.user?.email}</p>
							{/* <p className="font-fontMedium text-sm">{user?.phone_no}</p> */}

							{/* <p className="font-fontRegular text-xs">Delhi, India</p> */}
							{/* <section className="flex ">
								<Image
									width={14}
									height={14}
									src="/../public/icons/StoreReiviewVectorprofileBelow1.png"
									alt=""
								/>
								<label className="font-fontMedium text-xs text-slate-500 px-1">
									5
								</label>
								<Image
									width={14}
									height={14}
									src="/../public/icons/StoreReiviewVectorprofileBelow2.png"
									alt=""
								/>
								<label className="font-fontMedium text-xs text-slate-500 px-1">
									9
								</label>
								<Image
									width={14}
									height={14}
									src="/../public/icons/StoreReiviewVectorprofileBelow3.png"
									alt=""
								/>
								<label className="font-fontMedium text-xs text-slate-500 px-1">
									0
								</label>
							</section> */}
						</section>
					</section>

					{authenticated ? (
						<section className="flex flex-col items-center justify-around ">
							<StarRatingInput rating={rating} setRating={setRating} />
							{reviewed ? (
								<p className="sm:p-2 font-fontBold text-xs">
									Your Review of {storeData?.storeName}
								</p>
							) : (
								<p className="sm:p-2 font-fontBold text-xs">
									Start your review of {storeData?.storeName}
								</p>
							)}
						</section>
					) : (
						<p>login </p>
					)}
				</section>
			</section>
			<section className="sm:w-full sm:py-3 border-y border-slate-400 ">
				<section className="flex flex-col sm:flex-row">
					<section className="sm:m-4 flex flex-col justify-center sm:justify-start sm:justify-self-end  items-center">
						<span className="font-fontMedium text-sm sm:m-5 ">
							Overall rating
						</span>
						<section className="flex sm:m-3">
							<span className="border w-[2rem] sm:w-[3rem] m-2 bg-green-700 text-white border-green-600 sm:text-lg rounded-lg text-center ">
								{storeData?.rating?.rating}
							</span>
							<StarRating stars={storeData?.rating?.rating} />
						</section>
						<section className="sm:m-5">{storeReviews?.length} Reviews</section>
					</section>
					{progressData && (
						<section className=" sm:ml-16 sm:py-7 sm:w-2/4 ">
							{Object.keys(progressData).map((progress, index) => {
								return (
									<section key={index} className="flex m-1">
										<label className="m-1 font-fontMedium text-xs">
											{progress} Stars
										</label>
										<ProgressBar
											height={10}
											completed={progressData[progress]}
											className="w-4/5 m-2"
											bgColor="grey"
											isLabelVisible={false}
										/>
									</section>
								);
							})}
						</section>
					)}
				</section>
			</section>
		</div>
	);
};

export default StoreReview1;
