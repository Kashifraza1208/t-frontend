import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NearbyCard from '../ProductCards/NearbyCard';
import DealsCard from '../ProductCards/DealsCard';
import SkeletonLoader from './SkeletonLoader';

export default function NearbyStore({ allStores }) {
    const serverURL = process.env.BASE_API_URL;
    const [stores, setStores] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [loaderDisplayed, setLoaderDisplayed] = useState(false); // Flag to track if loader has been displayed

    useEffect(() => {
        axios
            .post(`${serverURL}/api/v1/stores`)
            .then((response) => {
                const allStoresData = response.data.data || [];
                setStores(allStoresData);
                console.log('allStoresData', allStoresData);
                const categories = allStoresData.flatMap((item) => item.categories);
                const uniqueCategories = [...new Set(categories)];
                setUniqueCategories(uniqueCategories);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching stores data:', error);
                setLoading(false);
            });

        axios
            .get(`${serverURL}/api/v1/homeCategories`)
            .then((response) => {
                setCategoriesData(response.data);
                console.log('Home categories:', response.data);
                sessionStorage.setItem('homeCategories', JSON.stringify(response.data));
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setLoading(false);
            });
    }, [serverURL]);

    useEffect(() => {
        if (!loading && !loaderDisplayed) { // Display loader only once per page
            setLoaderDisplayed(true);
        }
    }, [loading, loaderDisplayed]);

    return (
        <div>
            <h1 className="md:text-[28px] text-[20px] font-poppins font-semibold px-4 py-2">
                Nearby Store
            </h1>

            {loading || !loaderDisplayed ? ( // Render SkeletonLoader while loading or if loaderDisplayed is false
                <div>
                    <SkeletonLoader />
                </div>
            ) : (
                <>
                    {uniqueCategories.map((categoryId, index) => {
                        const categoryData = categoriesData.find(
                            (category) => category._id === categoryId
                        );
                        const categoryStores = stores.filter((store) =>
                            store.categories.includes(categoryId)
                        );

                        return (
                            <div key={index}>
                                <div className="flex font-poppins mx-[17px]">
                                    <span className="mr-auto md:text-[20px] text-[16px] w-[80vw] font-medium">
                                        {categoryData ? categoryData.name : 'Unknown Category'}
                                    </span>
                                    <span className="justify-end flex text-[16px] ml-auto w-[15vw] text-black font-medium">
                                        {uniqueCategories.length > 0 && (
                                            <Link
                                                href={`/nearByStore/nearByStoreCategory/${categoryId}`}>
                                                <span className="justify-end text-[14px] ml-auto w-[15vw] text-black">
                                                    See All
                                                </span>
                                            </Link>
                                        )}
                                    </span>
                                </div>

                                <div className="flex mx-4 flex-row mb-2 overflow-x-auto grid-container lg:mx-4">
                                    <div className="flex flex-row py-2">
                                        {categoryStores.map((item, storeIndex) => (
                                            <NearbyCard
                                                key={storeIndex}
                                                like={item?.rating?.rating}
                                                count={item?.rating?.count}
                                                imageName="store1"
                                                shop={item?.storeName}
                                                logo="bxs_offer.png"
                                                discount="Flat 20% OFF "
                                                text={item?.status}
                                                location={item?.address1}
                                                distance="- 8km"
                                                store={item}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="text-[20px] font-poppins underline py-2 font-semibold px-3">
                        BEST DEALS OF THE DAY
                    </div>

                    <div className="flex flex-row my-4 mb-2 overflow-x-auto grid-container">
                        {stores.map((item, index) => (
                            <section key={index} className="text-xs">
                                <DealsCard
                                    image={item.images[0]?.url || '/noImage.png'}
                                    title={item.storeName}
                                    offer={item.offers[0]?.description}
                                    id={item._id}
                                />
                            </section>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
