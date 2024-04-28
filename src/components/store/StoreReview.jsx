import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ProductCard from '../categories/ProductCard';
import ReviewCard from '../productReview/ReviewCard';
import ProductReviews from '../productReview/ProductReview';
import StoreReviewSec from './StoreReviewSec';
const img_fashion = '/images/img_fashion.jpeg';
const sponseredProducts = [
	{
		id: 1,
		name: 'Product 1 ',
		description: 'Sample Description of Product 1 ',
		rating: 4.5,
		image: img_fashion,
		numberOfRatings: 107,
		price: 329.99,
	},
	{
		id: 2,
		name: 'Product 2 ',
		description: 'Sample Description of Product 2 ',
		rating: 3.8,
		image: img_fashion,
		numberOfRatings: 75,
		price: 119.99,
	},
	{
		id: 3,
		name: 'Product 3 ',
		description: 'Sample Description of Product 3 ',
		rating: 4.2,
		image: img_fashion,
		numberOfRatings: 238,
		price: 939.99,
	},
	{
		id: 3,
		name: 'Product 4 ',
		description: 'Sample Description of Product 4',
		rating: 4.2,
		image: img_fashion,
		numberOfRatings: 238,
		price: 939.99,
	},
];

const reviewData = {
	reviewerName: 'Amilia James',
	location: 'New York, USA',
	rating: 4.5,
	description:
		'Equipped with advanced health monitoring features, this smartwatch helps you track your fitness goals and maintain a healthy lifestyle. The built-in heart rate monitor and pedometer accurately measure your heart rate, steps, calories burned, and sleep patterns, providing valuable insights into your overall well-being.',
	images: [
		'https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_633.jpg',
		'https://i.pinimg.com/736x/61/2a/8f/612a8fefc8939feb0b453970c43d4e87--dress-online-pretty-dresses.jpg',
		'https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2Fpricing_2021-07-16-155607_hohu.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.4959&fp-y=0.2239&h=415&q=88&w=622&s=739bdc87da0c7912cf59f8353ce844b5',
		'https://5.imimg.com/data5/ZC/ON/IL/ANDROID-85587791/1556868433251-jpg-500x500.jpg',
	],
};

const StoreReview = ({ storeReviews }) => {
	
	return (
		<div className="flex flex-col gap-4 items-start w-full">
			<div className="flex flex-col  items-start w-full">
				<StoreReviewSec storeReviews={storeReviews} />
			</div>
			<div>
				<ProductReviews />
			</div>
			<div className="flex flex-col items-start gap-4 w-full">
				<div className="flex items-center gap-2 ">
					<h2 className="text-base font-semibold">Sponsered Results</h2>
					<Image
						src={'/icons/ic_outline-info.svg'}
						width={16}
						height={16}
						alt=""
					/>
				</div>
				<div className="flex flex-row items-center justify-between w-full overflow-auto gap-4">
					{sponseredProducts.map((product, key) => (
						<ProductCard key={key} productDetails={product} />
					))}
				</div>
			</div>
			<div className="flex flex-col items-start gap-4 w-full">
				<div className="flex items-center gap-2 ">
					<h2 className="text-base font-semibold">Sponsered Results</h2>
					<Image
						src={'/icons/ic_outline-info.svg'}
						width={16}
						height={16}
						alt=""
					/>
				</div>
				<div className="flex flex-row items-center justify-between w-full overflow-auto gap-4">
					{sponseredProducts.map((product, key) => (
						<ProductCard key={key} productDetails={product} />
					))}
				</div>
			</div>
		</div>
	);
};

export default StoreReview;
