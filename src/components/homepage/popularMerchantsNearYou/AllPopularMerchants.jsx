// import React, { useEffect, useState } from 'react';
// import PopularProducts from './PopularProducts';
// import axios from 'axios';

// const AllPopularMerchantsGrid = ({ id }) => {
// 	const [activeTab, setActiveTab] = useState('');
// 	const [popularStores, setPopularStores] = useState([]);
// 	const [categories, setCategories] = useState([]);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get(
// 					'https://trialshopy-backend-q24e.onrender.com/api/v1/getAllMerchantPopular'
// 				);
// 				setPopularStores(response.data);
// 			} catch (error) {
// 				console.error('Error fetching popular stores:', error);
// 			}
// 		};

// 		fetchData();

// 		const fetchCategories = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${process.env.BASE_API_URL}/api/v1/homeCategories`
// 				);
// 				setCategories(response.data);
// 			} catch (error) {
// 				console.error('Error fetching categories:', error);
// 			}
// 		};

// 		fetchCategories();
// 	}, []);

// 	const handleTabClick = (categoryID) => {
// 		setActiveTab(categoryID);
// 	};

// 	const filteredStores = popularStores.filter((store) =>
// 		store.categories.includes(activeTab)
// 	);

// 	return (
// 		<>
// 			<div className="font-bold py-5 text-2xl">Popular Shops Near You</div>
// 			<div className="flex flex-col items-center md:flex-row lg:flex-row gap-7">
// 				{categories.map((category) => (
// 					<div
// 						key={category._id}
// 						className={`cursor-pointer
// 							${
// 								activeTab === category._id
// 									? 'font-bold hover:font-bold underline decoration-[#ed8605] underline-offset-[5px] decoration-2'
// 									: 'hover:font-bold'
// 							}`}
// 						onClick={() => handleTabClick(category._id)}>
// 						{`POPULAR IN ${category.name.toUpperCase()}`}
// 					</div>
// 				))}
// 			</div>
// 			{filteredStores.length > 0 ? (
// 				<PopularProducts products={filteredStores} activeTab={activeTab} />
// 			) : (
// 				<div className="flex justify-center my-24 font-bold text-lg">
// 					<p>No products are available for the selected category.</p>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default AllPopularMerchantsGrid;



// import React, { useEffect, useState } from 'react';
// import PopularProducts from './PopularProducts';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// import ProductGrid1 from './ProductGrid1';
// const AllPopularMerchantsGrid = ({ id }) => {
// 	const [activeTab, setActiveTab] = useState('');
// 	const [popularStores, setPopularStores] = useState([]);
// 	const [categories, setCategories] = useState([]);
// 	const router = useRouter();
// 	const { category: categoryName, categoryId } = router.query;

	
// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get(
// 					'https://trialshopy-backend-q24e.onrender.com/api/v1/getAllMerchantPopular'
// 				);
// 				setPopularStores(response.data);
// 				console.log('setPopularStores',response.data)
// 			} catch (error) {
// 				console.error('Error fetching popular stores:', error);
// 			}
// 		};

// 		fetchData();

// 		const fetchCategories = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${process.env.BASE_API_URL}/api/v1/homeCategories`
// 				);
// 				setCategories(response.data);
// 			} catch (error) {
// 				console.error('Error fetching categories:', error);
// 			}
// 		};

// 		fetchCategories();
// 	}, []);



// 	return (
// 		<>
// 			<div className="font-bold py-5 text-2xl">Popular Shops Near You</div>
// 			<div className="flex flex-col items-center md:flex-row lg:flex-row gap-7">
				
// 			</div>
// 			<>
//             <div className="font-bold py-5 text-2xl">Popular Shops Near You</div>
//             <h1 className='font-poppins lg:text-[22px] text-[14px]  font-fontMedium w-full'>
//                 Popular in {categoryName}
//             </h1>
// 			<div className="mt-4 lg:m-0 overflow-auto w-full grid-container">
//               <ProductGrid1 products={popularStores} />
//             </div>
//         </>
// 		</>
// 	);
// };

// export default AllPopularMerchantsGrid;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductGrid1 from './ProductGrid1';
import { useRouter } from 'next/router';

const AllPopularMerchants = () => {
    const [popularStores, setPopularStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const serverURL = process.env.BASE_API_URL;
    console.log('serverURL',serverURL)
    const { category: categoryName, categoryId } = router.query;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://trialshopy-backend-q24e.onrender.com/api/v1/getAllMerchantPopular'
                );
                setPopularStores(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching popular stores:', error);
            }
        };

        fetchData();
    }, []);

    // Filter popular stores based on category name or ID
    const filteredStores = categoryId 
        ? popularStores.filter(store => store.categories.includes(categoryId))
        : popularStores;

    return (
        <>
            <div className="font-bold text-2xl ml-3 lg:ml-0 py-2">
				Popular Shops Near You
			</div>

            <h1 className='font-poppins underline decoration-[#ed8605] underline-offset-[5px] decoration-2 lg:text-[20px] text-[14px] font-fontMedium w-full ml-3 lg:ml-0'>
                POPULAR IN {categoryName ? categoryName.toUpperCase() : ''}
            </h1>


            <div className="mt-4 lg:m-0 w-full">
                {loading ? (
                    <p>Loading...</p>
                ) : filteredStores.length > 0 ? (
                    <ProductGrid1 products={filteredStores} />
                ) : (
                    <div className="flex justify-center my-24 font-bold text-lg">
                    <p>No products are available for the selected category.</p>
                  </div>
                )}
            </div>
        </>
    );
};

export default AllPopularMerchants;
