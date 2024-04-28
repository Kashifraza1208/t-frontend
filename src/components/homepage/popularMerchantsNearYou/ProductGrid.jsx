import React from 'react';
import ProductCard from './ProductCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const ProductGrid = ({ products }) => {
	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3.5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	};
	return (
		// <div className="flex flex-row items-start justify-start w-full gap-4 py-1 pt-0 lg:gap-14">
		<Slider {...settings}>
			{products?.map((product, key) => (
				<ProductCard key={key} productDetails={product} />
			))}
		</Slider>
	);
};

export default ProductGrid;
