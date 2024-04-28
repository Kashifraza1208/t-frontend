import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function NewArrival() {
    const [userLocation, setUserLocation] = useState(null);
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const serverURL = process.env.BASE_API_URL;

    const handleRequestLocationAccess = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const { latitude, longitude } = position.coords;

                localStorage.setItem(
                    'userLocation',
                    JSON.stringify({ latitude, longitude })
                );

                console.log(latitude, longitude);
                setUserLocation({ latitude, longitude });
            });
        }
    };
    
    const loaderProp = ({ src }) => {
		return src;
	};

    useEffect(() => {
        const api =`${serverURL}/api/v1/homeCategories`;
        axios
            .get(api)
            .then((response) => {
                console.log('Response Data:', response.data); // Log entire response data
                const allCategories = response.data.reduce((acc, category) => {
                    if (category.children) {
                        return acc.concat(category.children);
                    }
                    return acc;
                }, []);
                setCategories(allCategories);
                console.log('All Categories Data:', allCategories); // Log all categories data
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, [serverURL]);

    const handleCategoryClick = (categoryName, categoryId) => {
        handleRequestLocationAccess();

        router.push({
            pathname: '/ArrivalCartPage',
            query: { category: categoryName, categoryId }
        });
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                },
                breakpoint: 400,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    const Column = ({ category }) => (
        <div
            className="flex items-center mx-1 mt-4 rounded cursor-pointer hover:scale-105"
            onClick={() => handleCategoryClick(category.name, category._id)}
        >
            <div className="relative w-full overflow-hidden h-28 shrink-0 md:h-38 lg:h-44 lg:rounded-sm">
                <Image
                    className="object-cover w-full h-full"
                    src={category.image?.url}
                    width={300}
                    loader={loaderProp}
                    height={300}
                    alt=""
                />
    
                <div className="absolute bg-black h-full bg-opacity-20 text-black w-full bottom-0.5 flex justify-center items-center">
                    <h2 className="text-white gap-1 text-center text-[8px] lg:text-[20px]">
                        <span>{category.name}</span>
                    </h2>
                </div>
            </div>
        </div>
    );
    
    
    
    return (
        <div className='w-full -ml-1'>
        <Slider {...settings}>
            {categories.map((category, index) => (
                <div key={index} className='flex'>
                    <Column category={category} />
                </div>
            ))}
        </Slider>
        </div>
    );
}