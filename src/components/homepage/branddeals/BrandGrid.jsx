import React from 'react';
import BrandCard from './BrandCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const BrandGrid = ({ products }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Display 4 cards at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // Reduce number of cards on smaller screens
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2, // Reduce number of cards on smaller screens
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1, // Display only 1 card on very small screens
                },
            },
        ],
    };
	return (
		<>
		
		{/* <div className="flex flex-row items-start justify-start w-full gap-5 pt-0 mt-2 md:mt-0"> */}
		<div className='w-full -ml-1'>
		<Slider {...settings}>
			{products?.map((product, key) => (
				<BrandCard key={key} productDetails={product} />
			))}
			</Slider>
		</div>
		
		</>
	);
};

export default BrandGrid;
