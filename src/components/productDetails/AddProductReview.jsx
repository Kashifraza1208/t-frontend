import React, { useState, useEffect } from 'react';
import Review from '../store/Review';
import Image from 'next/image';

const AddProductReview = ({ productId }) => {
	const [reviewBoxOpen, setReviewBoxOpen] = useState(false);

	return (
		<div className="lg:px-[120px] flex flex-col  mx-auto px-4 ">
			{/* Use flex-col to arrange items vertically */}
			<div className="flex justify-between ">
				<div>
					<h1 className="text-base font-semibold lg:text-xl">Review</h1>
				</div>
				<div
					className="px-4 py-2 text-xs text-white bg-black border border-gray-400 cursor-pointer sm:px-8"
					onClick={() => setReviewBoxOpen(!reviewBoxOpen)}>
					<div className="">Write a Review</div>
				</div>
			</div>
			{reviewBoxOpen && (
				<div className="absolute  w-full lg:w-4/5 xl:w-[600px] xl:ml-[170px] mt-16 2xl:w-[600px] 2xl:ml-96 shadow-lg  ">
					<Review setReviewBoxOpen={setReviewBoxOpen} productId={productId} />
				</div>
			)}
		</div>
	);
};

export default AddProductReview;
