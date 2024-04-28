import React from 'react';
import ReviewCard from './ReviewCard';
import { useUser } from '../../UserContext';



const ProductReviews = ({ productReviews, onDelete,  }) => {
	

	return (
		<div className="lg:px-[120px] mx-auto px-4 ">
			{productReviews && productReviews.length > 0 ? (
				productReviews.map((review, index) => {
					//console.log("review",review);
					return (
						<ReviewCard key={index} review={review} rating={review.rating} onDelete={onDelete} />
					);
				})
			) : (
				<div>
					<p>No reviews available.</p>
				</div>
			)}
		</div>
	);
};

export default ProductReviews;
