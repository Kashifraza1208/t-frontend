import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import { getProducts } from './getProducts';
import axios, { all } from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const activeTabClass = 'pb-2 font-bold border-b-2 border-black';

const PopularMerchant = () => {
    const [allstores, setAllStores] = useState([]);
    const [popular_fashion, setPopularFashion] = useState([]);
    const [popular_jewellery, setPopularJewellery] = useState([]);
    const [popular_electronics, setPopularElectronics] = useState([]);
    const [popular_furniture, setPopularFurniture] = useState([]);
    const [popularStores, setPopularStores] = useState([]); // Define popularStores state
    const serverURL = process.env.BASE_API_URL;
	const router = useRouter();
    const [showCategories, setShowCategories] = useState(false);
    let sellerId = '64ca8e852eb496c7f2bf4e50';

   

    useEffect(() => {
        categorizeStores(allstores);
    }, [allstores]);

    useEffect(() => {
        setProductList(popular_fashion);
    }, [popular_fashion]);

    useEffect(() => {
        setProductList(popular_jewellery);
    }, [popular_jewellery]);

    useEffect(() => {
        setProductList(popular_electronics);
    }, [popular_electronics]);


    useEffect(() => {
        setProductList(popular_furniture);
    }, [popular_furniture]);

    const categorizeStores = (stores) => {
        setPopularFashion([]);
        setPopularJewellery([]);
        setPopularElectronics([]);
        setPopularFurniture([]);

        let fashion_count = 0;
        let jewellery_count = 0;
        let electronics_count = 0;
        let furniture_count = 0;

        stores.forEach((item) => {
            const items = item.categories;
            for (const obj of items) {
                if (obj === '64b9002188cb61a80b5cf503') {
                    if (fashion_count < 3) {
                        setPopularFashion((prevFashion) => [...prevFashion, item]);
                        fashion_count++;
                    }
                } else if (obj === '658d19a4a2fd1710d0ea7fcc') {
                    if (jewellery_count < 3) {
                        setPopularJewellery((prevJewellery) => [...prevJewellery, item]);
                        jewellery_count++;
                    }
                } else if (obj === '658d19a4a2fd1710d0ea7fe3') {
                    if (electronics_count < 3) {
                        setPopularElectronics((prevElectronics) => [
                            ...prevElectronics,
                            item,
                        ]);
                        electronics_count++;
                    }
                } else if (obj === '658d19a4a2fd1710d0ea7fdf') {
                    if (furniture_count < 3) {
                        setPopularFurniture((prevFurniture) => [...prevFurniture, item]);
                        furniture_count++;
                    }
                }
            }
        });
    };
	const toggleCategories = () => {
		setShowCategories(!showCategories);
	};
    const [activeTab, setActiveTab] = useState('fashion');
    const [productList, setProductList] = useState(getProducts('fashion'));
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
   

       
// 	const fetchData = async () => {
// 		const response = await axios.get(
// 			`${'https://trialshopy-backend-q24e.onrender.com'}/api/v1/getAllMerchantPopular`
// 		);
// 		const data = await response.data;
// 		setPopularStores(data);
// 	};
// 	useEffect(() => {
// 		// Fetch data from the API
// 		fetchData();
// 		axios
// 			.post(`${serverURL}/api/v1/${sellerId}/stores`)
// 			// .post(`https://trialshopy-backend.onrender.com/api/v1/${sellerId}/stores`)
// 			.then((response) => {
// 				setAllStores(response.data.data);
// 			})
// 			.catch((error) => {
// 				console.error('Error fetching data:', error);
// 			});
// 	}, []);
       

        const fetchData = async () => {
            const categoryId = "5f52b44a16c0f1e00c79b827"; // Replace 'your_category_id_here' with the actual category ID
            try {
                const response = await axios.get(
                    `${serverURL}/api/v1/merchants/popular/${categoryId}`
                );
                setPopularStores(response.data);
                console.log("mar",response.data)
            } catch (error) {
                console.error('Error fetching popular stores:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `${process.env.BASE_API_URL}/api/v1/homeCategories`
                );
                setCategories(response.data);
              
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        
        
        useEffect(() => {
            fetchData();
            fetchCategories();
        }, []);
        
    

   

    const filteredStores = popularStores.filter((store) =>
        store.categories.includes(activeTab)
    );
	const handleTabClick = (categoryId, categoryName) => {
        setActiveTab(categoryId);
        setSelectedCategory(categoryName);
		router.push({
            pathname: '/PopularMerchant',
            query: { category: categoryName, categoryId }
        });
    };
	
    return (
        <>
        <div className="m-auto">
            <Link href="/PopularMerchants">
                <div className="text-xl font-bold text-left cursor-pointer">
                    <h2 className="border-b-2 mb-5 border-red-700 inline-block">
                        POPULAR MERCHANTS NEAR YOU
                    </h2>
                </div>
            </Link>
         {/* Menu bar on the left */}
				<div className="cursor-pointer md:hidden" onClick={toggleCategories}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</div>
    
            <div className="flex flex-row justify-start gap-8 w-full">
                <div className='hidden sm:flex'>        
                    <div className="items-center md:flex-row lg:flex-row gap-7">
                        {categories.map((category) => (
                            <div key={category._id }>
                                <p
                                    className={`cursor-pointer mt-4
                                        ${
                                            activeTab === category._id
                                                ? 'font-bold hover:font-bold underline decoration-[#ed8605] underline-offset-[5px] decoration-2'
                                                : 'hover:font-bold hover:underline hover:underline-decoration-[#ed8605] hover:underline-offset-[5px]'
                                        }`}
                                    onClick={() => handleTabClick(category._id, category.name)}
                                >
                                    {`Popular in ${category.name}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>   
    
                {/* Dropdown content for smaller screens */}
                {showCategories && (
                    <div className="absolute z-50 mt-[1rem] bg-white rounded-md shadow-lg">
                        {categories.map((category) => (
                            <div
                                key={category._id}
                                className={`py-2 px-4 cursor-pointer hover:bg-gray-100 ${
                                    activeTab === category._id ? 'font-bold' : ''
                                }`}
                                onClick={() => {
                                    handleTabClick(category._id);
                                    // Close the dropdown after clicking a category if needed
                                    setShowCategories(false);
                                }}>
                                {`POPULAR IN ${category.name.toUpperCase()}`}
                            </div>
                        ))}
                    </div>
                )}
    
    <div className="mt-4 lg:m-0 overflow-auto w-full grid-container">
        {popularStores.length > 0 ? (
          <ProductGrid products={popularStores} />
        ) : (
          <p>No popular stores found. Please try again later.</p>
        )}
      </div>
            </div>
        </div>
    </>
    
    );
	
};

export default PopularMerchant;



// import React, { useState, useEffect } from 'react';
// import ProductGrid from './ProductGrid';
// import { getProducts } from './getProducts';
// import axios, { all } from 'axios';
// import Image from 'next/image';
// import Link from 'next/link';

// const activeTabClass = 'pb-2 font-bold border-b-2 border-black';

// const PopularMerchant = () => {
// 	const [allstores, setAllStores] = useState([]);
// 	const [popular_fashion, setPopularFashion] = useState([]);
// 	const [popular_jewellery, setPopularJewellery] = useState([]);
// 	const [popular_electronics, setPopularElectronics] = useState([]);
// 	const [popular_furniture, setPopularFurniture] = useState([]);
// 	const [popular_stores, setPopularStores] = useState([]);
// 	const serverURL = process.env.BASE_API_URL;
// 	let sellerId = '64ca8e852eb496c7f2bf4e50';
// 	const fetchData = async () => {
// 		const response = await axios.get(
// 			`${'https://trialshopy-backend-q24e.onrender.com'}/api/v1/getAllMerchantPopular`
// 		);
// 		const data = await response.data;
// 		setPopularStores(data);
// 	};
// 	useEffect(() => {
// 		// Fetch data from the API
// 		fetchData();
// 		axios
// 			.post(`${serverURL}/api/v1/${sellerId}/stores`)
// 			// .post(`https://trialshopy-backend.onrender.com/api/v1/${sellerId}/stores`)
// 			.then((response) => {
// 				setAllStores(response.data.data);
// 			})
// 			.catch((error) => {
// 				console.error('Error fetching data:', error);
// 			});
// 	}, []);
	

// 	useEffect(() => {
// 		categorizeStores(allstores);
// 	}, [allstores]);

// 	useEffect(() => {
// 		setProductList(popular_fashion);
// 	}, [popular_fashion]);

// 	useEffect(() => {
// 		setProductList(popular_jewellery);
// 	}, [popular_jewellery]);

// 	useEffect(() => {
// 		setProductList(popular_electronics);
// 	}, [popular_electronics]);

// 	useEffect(() => {
// 		setProductList(popular_furniture);
// 	}, [popular_furniture]);

// 	const categorizeStores = (stores) => {
// 		setPopularFashion([]);
// 		setPopularJewellery([]);
// 		setPopularElectronics([]);
// 		setPopularFurniture([]);

// 		let fashion_count = 0;
// 		let jewellery_count = 0;
// 		let electronics_count = 0;
// 		let furniture_count = 0;

// 		stores.forEach((item) => {
// 			const items = item.categories;
// 			for (const obj of items) {
// 				if (obj === '64b9002188cb61a80b5cf503') {
// 					if (fashion_count < 3) {
// 						setPopularFashion((prevFashion) => [...prevFashion, item]);
// 						fashion_count++;
// 					}
// 				} else if (obj === '658d19a4a2fd1710d0ea7fcc') {
// 					if (jewellery_count < 3) {
// 						setPopularJewellery((prevJewellery) => [...prevJewellery, item]);
// 						jewellery_count++;
// 					}
// 				} else if (obj === '658d19a4a2fd1710d0ea7fe3') {
// 					if (electronics_count < 3) {
// 						setPopularElectronics((prevElectronics) => [
// 							...prevElectronics,
// 							item,
// 						]);
// 						electronics_count++;
// 					}
// 				} else if (obj === '658d19a4a2fd1710d0ea7fdf') {
// 					if (furniture_count < 3) {
// 						setPopularFurniture((prevFurniture) => [...prevFurniture, item]);
// 						furniture_count++;
// 					}
// 				}
// 			}
// 		});
// 	};

// 	const [activeTab, setActiveTab] = useState('fashion');
// 	const [productList, setProductList] = useState(getProducts('fashion'));
// 	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

// 	const handleTabClick = (tab) => {
// 		setActiveTab(tab);
// 		const products = getProducts(
// 			activeTab,
// 			popular_fashion,
// 			popular_furniture,
// 			popular_electronics,
// 			popular_jewellery
// 		);
// 		console.log(products);
// 		setProductList(products);
// 		setMobileMenuOpen(false);
// 	};

// 	const toggleMobileMenu = () => {
// 		setMobileMenuOpen(!isMobileMenuOpen);
// 	};

// 	// useEffect(() => {
// 	// 	const products = getProducts(
// 	// 		activeTab,
// 	// 		popular_fashion,
// 	// 		popular_furniture,
// 	// 		popular_electronics,
// 	// 		popular_jewellery
// 	// 	);
// 	// 	setProductList(products);
// 	// }, []);

// 	useEffect(() => {
// 		const products = getProducts(
// 			activeTab,
// 			popular_fashion,
// 			popular_furniture,
// 			popular_electronics,
// 			popular_jewellery
// 		);
// 		setProductList(products);
// 	}, [
// 		activeTab,
// 		popular_electronics,
// 		popular_fashion,
// 		popular_furniture,
// 		popular_jewellery,
// 	]);

// 	return (
// 		<div className="m-auto">
// 			<Link href={`/PopularMerchants`}>
// 				<div className="text-xl font-bold text-left">
// 					<h2 className="border-b-2 mb-5 border-red-700 inline-block ">
// 						POPULAR MERCHANTS NEAR YOU
// 					</h2>
// 				</div>
// 			</Link>

// 			<div className="flex flex-row justify-start gap-8 w-full">
// 				<div className="hidden lg:block w-1/4 mt-3">
// 					<ul className="flex flex-col gap-14 ">
// 						<Link href={`/PopularMerchants`}>
// 							<li onClick={() => handleTabClick('fashion')}>
// 								<p
// 									className={`cursor-pointer inline-block ${
// 										activeTab === 'fashion' ? activeTabClass : ''
// 									}`}>
// 									Popular in Fashion
// 								</p>
// 							</li>
// 						</Link>
// 						<Link href={`/PopularMerchants`}>
// 							<li onClick={() => handleTabClick('jewellery')}>
// 								<p
// 									className={`cursor-pointer inline-block ${
// 										activeTab === 'jewellery' ? activeTabClass : ''
// 									}`}>
// 									Popular in Jewellery
// 								</p>
// 							</li>
// 						</Link>
// 						<Link href={`/PopularMerchants`}>
// 							<li onClick={() => handleTabClick('electronics')}>
// 								<p
// 									className={`cursor-pointer inline-block ${
// 										activeTab === 'electronics' ? activeTabClass : ''
// 									}`}>
// 									Popular in Electronics
// 								</p>
// 							</li>
// 						</Link>
// 						<Link href={`/PopularMerchants`}>
// 							<li onClick={() => handleTabClick('furniture')}>
// 								<p
// 									className={`cursor-pointer inline-block ${
// 										activeTab === 'furniture' ? activeTabClass : ''
// 									}`}>
// 									Popular in Furniture
// 								</p>
// 							</li>
// 						</Link>
// 					</ul>
// 				</div>
// 				<div className="mt-4 lg:m-0 overflow-auto w-full grid-container">
// 					<ProductGrid products={popular_stores} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default PopularMerchant;



// import React, { useState, useEffect } from 'react';
// import ProductGrid from './ProductGrid';
// import { getProducts } from './getProducts';
// import axios from 'axios';
// import Image from 'next/image';

// const activeTabClass = 'pb-2 font-bold border-b-2 border-black';

// const PopularMerchant = () => {
// 	let popular_fashion = [];
// 	let popular_jewellery = [];
// 	let popular_electronics = [];
// 	let popular_furniture = [];

// 	let fashion_count=0;
// 	let jewellery_count=0;
// 	let electronics_count=0;
// 	let furniture_count=0;
// 	const [allstores, setAllStores] = useState([]);
// 	useEffect(() => {
// 		axios.get('http://localhost:7000/api/v1/stores').then((response) => {
// 			setAllStores(response.data.data);
// 		});
// 	}, []);
// 		allstores.map((item) => {
// 			let items = item.categories;
// 		for (const obj of items) {
// 			if (obj == '64b9002188cb61a80b5cf503') {
// 				if(fashion_count<3)
// 				popular_fashion.push(item);
// 				fashion_count++;
// 			} else if (obj == '64b9004688cb61a80b5cf509') {
// 				if(jewellery_count<3)
// 				popular_jewellery.push(item);
// 				jewellery_count++;
// 			} else if (obj == '64b9001088cb61a80b5cf501') {
// 				if(electronics_count<3)
// 				popular_electronics.push(item);
// 				electronics_count++;
// 			} else if (obj == '64b9003888cb61a80b5cf507') {
// 				if(furniture_count<3)
// 				popular_furniture.push(item);
// 				furniture_count++;
// 			}
// 		}
// 	});

// 	const [activeTab, setActiveTab] = useState('fashion');
// 	const [productList, setProductList] = useState(getProducts('fashion'));
// 	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

// 	const handleTabClick = (tab) => {
// 		setActiveTab(tab);
// 		const products = getProducts(tab);
// 		console.log(products);
// 		setProductList(products);
// 		setMobileMenuOpen(false);
// 	};

// 	const toggleMobileMenu = () => {
// 		setMobileMenuOpen(!isMobileMenuOpen);
// 	};

// 	return (
// 		<div className="m-auto">
// 			<div className="text-xl font-bold text-left">
// 				<h2 className="border-b-2 mb-5 border-red-700 inline-block ">
// 					POPULAR MERCHANTS NEAR YOU
// 				</h2>
// 			</div>

// 			{/* <div className="block lg:hidden">
// 				<div className="flex flex-row justify-end items-center gap-1">
// 					<button className="" onClick={toggleMobileMenu}>
// 						EXPLORE BY CATEGORY
// 					</button>

// 					<div className="cursor-pointer" onClick={toggleMobileMenu}>
// 						<Image
// 							src="/images/keyboard_arrow_down.svg"
// 							width={20}
// 							height={20}
// 							alt="SVG map icon"
// 						/>
// 					</div>
// 				</div>

// 				{isMobileMenuOpen && (
// 					<ul className="flex flex-col gap-2 justify-center items-end px-4 w-full">
// 						<li onClick={() => handleTabClick('fashion')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'fashion' ? activeTabClass : ''
// 								}`}>
// 								Popular in Fashion
// 							</p>
// 						</li>
// 						<li onClick={() => handleTabClick('jewellery')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'jewellery' ? activeTabClass : ''
// 								}`}>
// 								Popular in Jewellery
// 							</p>
// 						</li>
// 						<li onClick={() => handleTabClick('electronics')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'electronics' ? activeTabClass : ''
// 								}`}>
// 								Popular in Electronics
// 							</p>
// 						</li>
// 						<li onClick={() => handleTabClick('furniture')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'furniture' ? activeTabClass : ''
// 								}`}>
// 								Popular in Furniture
// 							</p>
// 						</li>
// 					</ul>
// 				)}
// 			</div> */}
// 			<div className="flex flex-row justify-start gap-8 w-full">
// 				<div className="hidden lg:block w-1/4">
// 					<ul className="flex flex-col gap-14 ">
// 						<li onClick={() => handleTabClick('fashion')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'fashion' ? activeTabClass : ''
// 								}`}>
// 								Popular in Fashion
// 							</p>
// 						</li>

// 						<li onClick={() => handleTabClick('jewellery')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'jewellery' ? activeTabClass : ''
// 								}`}>
// 								Popular in Jewellery
// 							</p>
// 						</li>
// 						<li onClick={() => handleTabClick('electronics')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'electronics' ? activeTabClass : ''
// 								}`}>
// 								Popular in Electronics
// 							</p>
// 						</li>
// 						<li onClick={() => handleTabClick('furniture')}>
// 							<p
// 								className={`cursor-pointer inline-block ${
// 									activeTab === 'furniture' ? activeTabClass : ''
// 								}`}>
// 								Popular in Furniture
// 							</p>
// 						</li>
// 					</ul>
// 				</div>
// 				<div className="mt-4 lg:m-0 overflow-auto w-full">
// 					<ProductGrid products={productList} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default PopularMerchant;
