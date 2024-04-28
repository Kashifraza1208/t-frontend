import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

const GirlsCollection = () => {
	const [products, setProducts] = useState([]);
     const serverURL = process.env.BASE_API_URL;
	// useEffect(() => {
	//   const fetchProducts = async () => {
	// 	try {
	// 	  const response = await axios.post(
	// 		`${serverURL}/api/v1/products/`,
	// 		{
	// 		  filters: {
	// 			categories: ['5f52b44a16c0f1e00c79b834'],
	// 		  },
	// 		}
	// 	  );

	// 	  // Filter only products intended for boys
	// 	  const boysProducts = response.data.data.filter(
	// 		(product) => product.categories.includes('5f52b44a16c0f1e00c79b834')
	// 	  );
	// 	  // Update state with the received products
	// 	  setProducts(response.data.data);
  
	// 	  console.log('API response:', response);
  
		 
	// 	} catch (error) {
	// 	  console.error('Error fetching products:', error);
	// 	}
	//   };
  
	//   fetchProducts();
	// }, []);

	useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${serverURL}/api/v1/clothing/getClothingByFilter`, {
                    params: {
                        category: "5f52b44a16c0f1e00c79b833"
                    }
                });

                // Filter out only the products belonging to the desired category
                const filteredProducts = response.data.filter(product => product.category === "5f52b44a16c0f1e00c79b833");
                setProducts(filteredProducts); 
                console.log('Filtered Products:', filteredProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [serverURL]);
  
  const router = useRouter();
  
    const handleOnClick = (categoryId) => {
      router.push(`/subcategory/${categoryId}`);
  };

  
  return (
    <div className="py-8 w-full overflow-x-aut0 pl-5 md:px-12 lg:px-[120px]">
    <div className="flex  items-center justify-between text-xl font-bold text-left">
				<Link href={'/category/64cfdb45f6f996cacc4087ff'} className="">
					<h2 className="border-b-2 mb-5 border-red-700 inline-block">
						GIRLS COLLECTION
					</h2>
				</Link>
				<div className="flex flex-row items-center lg:hidden">
					<div>
						<Image
							src="/images/chevronleft.svg"
							width={24}
							height={24}
							alt=""
							className="w-[24px] h-[24px]"
						/>
					</div>
					<div>
						<Image
							src="/images/chevron_right.svg"
							width={24}
							height={24}
							alt=""
							className="w-[24px] h-[24px]"
						/>
					</div>
				</div>
			</div>
            
			<div className="flex  flex-col-2 md:flex-row justify-start w-full gap-4">
        {/* girls Collection Section */}
        <div className="w-full md:w-1/4 mt-4 md:block">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center shrink-0">
              <div className="grid lg:grid-cols-2 w-24 md:w-44 lg:w-64">
                <div className="flex flex-col justify-end lg:pb-8">
                  <Link href={'/category/64cfdb45f6f996cacc4087ff'} className="">
                    <div className="flex flex-row items-center justify-center px-[5px] py-[10px] rounded-[3px] bg-[#18181B] text-white  w-[92px] lg:w-[124px] h-[27px] lg:h-[37px] z-10">
                      <p className="font-Nunito font-semibold text-center">
                        For Girls
                      </p>
                    </div>
                  </Link>
                </div>
                <Image
                  className="h-[241px] w-full"
                  width={220}
                  height={190}
                  src="/images/girlscollectiongirl.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

		{/* Product cards container with grid and overflow */}
		<div className="grid grid-flow-col mt-[15%] md:mt-[6%] lg:mt-[4%] overflow-auto grid-container">
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
                                <p className="text-center mt-2 text-lg font-semibold">{product.name}</p>
                            </div>
                        ))}
                    </div>

       
      </div>
	  
    </div>
  );
};

export default GirlsCollection;