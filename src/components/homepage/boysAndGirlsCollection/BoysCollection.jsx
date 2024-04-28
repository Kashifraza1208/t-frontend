import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Slider from 'react-slick';
import {useRouter} from 'next/router';

const BoysCollection = () => {
    const serverURL = process.env.BASE_API_URL;
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverURL}/api/v1/clothing/getClothingByFilter`, {
                    params: {
                        category: '5f52b44a16c0f1e00c79b832'
                    }
                });

                // Filter out only the products belonging to the desired category
                const filteredProducts = response.data.filter(product => product.category === '5f52b44a16c0f1e00c79b832');
                setProducts(filteredProducts); 
                console.log('Filtered Products:', filteredProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [serverURL]);

    const handleOnClick = (categoryId) => {
        router.push(`/subcategory/${categoryId}`);
    };

    return (
        <div className="py-8 w-full overflow-x-auto md:px-12 pl-5  lg:px-[120px]">
            <div className="flex items-center justify-between text-xl font-bold text-left">
                <Link href={'/subcategory/64cfdb45f6f996cacc4087ff'} className="">
                    <h2 className="border-b-2 mb-5 border-red-700 inline-block">
                        BOYS COLLECTION
                    </h2>
                </Link>
                <div className="flex flex-row items-center ">
                    <div 
					//onClick={handleSliderPrev}
					>
                        <Image
                            src="/images/chevronleft.svg"
                            width={24}
                            height={24}
                            alt=""
                            className="w-[24px] h-[24px] cursor-pointer"
                        />
                    </div>
                    <div 
					//onClick={handleSliderNext}
					>
                        <Image
                            src="/images/chevron_right.svg"
                            width={24}
                            height={24}
                            alt=""
                            className="w-[24px] h-[24px] cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col-2 md:flex-row justify-start w-full gap-4">
                
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center shrink-0">
                            <div className="grid lg:grid-cols-2 w-24 md:w-44 lg:w-64">
                                <div className="flex flex-col justify-end lg:pb-8">
                                    <Link
                                        href={'/category/64cfdb45f6f996cacc4087ff'}
                                        className="">
                                        <div className="flex flex-row items-center justify-center px-[5px] py-[10px] rounded-[3px] bg-[#18181B] text-white w-[92px] lg:w-[124px] h-[27px] lg:h-[37px] z-10">
                                            <p className="font-Nunito font-semibold text-center">
                                                For Boys
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <Image
                                    className="h-[241px] md:py-0 py-2 w-full"
                                    width={220}
                                    height={190}
                                    src="/images/boyscollectionboy.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-flow-col mt-[15%] md:mt-[6%] lg:mt-2 overflow-auto grid-container">
                        {products.map((product) => (
                            <div key={product._id} className="product-card md:w-[200px] w-[160px]" onClick={() => handleOnClick(product.category)}>
                                <div className="relative w-full aspect-w-4 aspect-h-5 flex items-center justify-center">
                                    <Image
                                        className="h-[140px] w-[130px] md:h-[164px] md:w-[164px] rounded-full object-cover cursor-pointer"
                                        width={200}
                                        height={200}
                                        src={product.image.url || '/placeholder-image.jpg'}
                                        alt={product.name}
                                    />
                                </div>
                                <p className="text-center mt-2 text-lg font-semibold ">{product.name}</p>
                            </div>
                        ))}
                    </div>

            </div>
        </div>
    );
};

export default BoysCollection;
