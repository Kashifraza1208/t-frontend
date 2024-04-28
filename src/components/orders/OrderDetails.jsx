import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { MdArrowForwardIos, MdOutlinePhone } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import Link from 'next/link';
import { useUser } from '../../UserContext';

const OrderDetails = () => {
	const serverURL = process.env.BASE_API_URL;
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { user, setUser } = useUser();
  const [favourites, setFavourites] = useState([]);
  
//   const status = router.query.status;
//   const orderDate = router.query.orderDate
  const { _id, status, orderDate,exchangeReturnWindowClosedOn, shippingAddress,
	phone_number } = router.query;
  const productId = router.query.productId;
  const fetchCategoryDetails = async (categoryIds) => {
	try {
	  const response = await axios.post(`${serverURL}/api/v1/products`, {
		filters: {
		  categories: categoryIds,
		},
	  });
  
	  console.log('Full response for fetching category details:', response);
  
	  setCategoryDetails(response.data.data || []);
	  console.log('category details:', response.data.data);
  
	  // Extract and set category product data
	  const products = response.data.data.map((category) => {
		return {
		  id: category._id,
		  name: category.productName,
		  image: category.images[0]?.url || '/default-image.jpg',
		};
	  });
	  setCategoryProducts(products);
  
	} catch (error) {
	  console.error('Error fetching Category details:', error);
	}
  };


  useEffect(() => {
    setFavourites(user.wishList || []);
  }, [user.wishList]);
  const isFavourite = (productId) => {
    return favourites.includes(productId);
  };

  const handleFavouriteClick = (productId) => {
    const isCurrentlyFavourite = isFavourite(productId);
    const updatedFavourites = isCurrentlyFavourite
      ? favourites.filter((id) => id !== productId)
      : [...favourites, productId];

    setFavourites(updatedFavourites);

    let api = '';

    if (!isCurrentlyFavourite) {
      api = `${serverURL}/api/v1/addWishList/${user._id}/${productId}`;
      axios
        .post(api)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          console.log('pro add', res.data);
        })
        .catch((err) => console.error(err));
    } else {
      api = `${serverURL}/api/v1/deleteWishList/${user._id}/${productId}`;
      axios
        .delete(api)
        .then((res) => {
          console.log('wishlist', res.data);
          setUser(res.data);
          console.log('pro remove', res.data);
        })
        .catch((err) => console.error(err));
    }
  };
  

  useEffect(() => {
    const productId = router.query.productId;

    if (productId) {
      axios
        .get(`https://trialshopy-backend.onrender.com/api/v1/products/${productId}`)
        .then((response) => {
          setProductData(response.data);
          console.log('setProductData', response.data);

          const categoryIds = response.data.categories || [];
          fetchCategoryDetails(categoryIds);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
        });
    }
  }, [router.query.productId]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const { price, discount } = productData;
  const discountedPrice = price - discount;
  const formattedExchangeReturnDate = new Date(exchangeReturnWindowClosedOn).toLocaleDateString('en-US', {
    day: 'numeric',
	month: 'short',
    //year: 'numeric',
  });
 


  
  return (
    <>
      <div className="m-3 overflow-x-hidden">
	    <div className="flex flex-row my-3">
			<div className="flex flex-col mb-2 ">
			<span className="text-[18px] font-medium">All Orders</span>
			<span className="text-[#7C7C7C] text-[14px]"> from anytime</span>
			</div>

			<div className="flex flex-row justify-end m-2 ml-auto">
				<div className="md:flex hidden flex-row border-[1px]  border-black  mx-2">
					<span className="flex flex-row">
						<Image
						width={20} 
						height={20} 
						alt="" 
						src={'/images/Vector18.png'} 
						className="w-8 h-8 my-auto p-2" 
						/>
					</span>
					<input
					type="text"
					placeholder="Search in orders"
					className=" -p-2"
					/>
				</div>
				<div className="flex items-center justify-center ">
					<button className="flex flex-row px-6 py-2 border-[1px] border-black">
					<span>
					<Image
					 width={20}
					 height={20}
					 alt=""
					 src={'/images/Vector19.png'}
					 className="w-[30px] p-2"
					/>
				    </span>
					Filter
					</button>
				</div>
			</div>
	    </div>

		<div className="flex flex-row ">
        <div className="flex w-full md:flex-row md:w-1/2">
          <Image
            width={200}
            height={200}
            className="w-20 h-30"
            src={productData.images[0]?.url || '/default-image.jpg'}
            alt="Product Image"
          />
          <span className="mx-3">
            <h2 className="text-[18px] font-bold tracking-widest text-black ">
              {productData.productName} 
            </h2>
            <h1 className="mb-1 text-[14px] md:text-[16px] text-[#7C7C7C]  ">
              {productData.shortDescription}
            </h1>
            <h1 className="mb-1 text-[14px] md:text-[16px] text-[#7C7C7C]   ">
              Size: {productData.size}
            </h1>
            <h1 className="flex flex-row my-3 mb-1 ">
              {/* Assuming rating is available in productData */}
              <FaStar className="text-yellow-500 mx-0.5" />
              <FaStar className="text-yellow-500 mx-0.5" />
              <FaStar className="text-yellow-500 mx-0.5" />
              <FaStar className="text-yellow-500 mx-0.5" />
              <FaStar className="text-yellow-500 mx-0.5" />
              <span className="mx-2 text-[#A1A1AA] md:flex hidden text-[16px]">
                ({productData.rating.rating})
              </span>
            </h1>
          </span>
        </div>
        <div className="items-center hidden mx-4 md:grid md:w-1/2 py-auto ">
         
          {/* <Link href={`/product/${productData.id}`}> */}
		  <Link href={`/products/details?productId=${productId}`}>
            <p className="w-fit flex flex-row items-center bg-gradient-to-b from-primary to-secondary px-4 py-2 rounded-sm ml-auto">
              View Products
              <MdArrowForwardIos className="mx-1" />
            </p>
          </Link>
        </div>
        </div>

		<div className="flex w-full py-3 my-3 bg-green-600">
			<span className="mx-2 mt-2">
			<Image
			width={20}
			height={20}
			className="w-10 h-10 p-2"
			src={'/images/Vector20.png'}
			alt="imgg"
			/>
			</span>
			<span className="flex flex-col">
			<span className="flex flex-col">
            <span className="text-[16px] text-white font-medium">{status}</span>
			</span>
			<span className="text-[14px] text-white">On {orderDate}</span>
			</span>
		</div>

		<div className="my-4">
					<div className="flex flex-row">
						<TbTruckDelivery className="text-red-400 text-2xl mr-2" />
						EXPRESS
						<span className="text-[#7C7C7C] text-[14px] mx-1">
							Order delivered in 30 Mint
						</span>
					</div>
					<div className="my-3">
						<span className="pl-2 font-bold">∙</span>
						<span className="px-2 text-[#7C7C7C] text-[14px]">
							Exchange/Return window closed on {formattedExchangeReturnDate}
						</span>
					</div>
				</div>
        <div>
		<div className="text-[16px] font-medium">Delivery Address</div>
			<div className="flex flex-col my-3">
			<span className="text-[14px] font-medium">{shippingAddress}</span>
			
		</div>

		<div className="text-[16px] font-medium">Payment Information</div>

		    <div className="flex flex-row w-full  text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
					<div className="flex justify-start text-[16px] ">
					{productData.productName}  {productData.shortDescription}
					</div>

					<div className="flex justify-end ml-auto font-medium text-black ">
					₹{price.toFixed(2)}
					</div>
			</div>

			<div className="flex flex-row w-full text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
				<div className="flex justify-start text-[16px] ">Discount</div>

				<div className="flex justify-end ml-auto font-medium text-black ">
					-₹{discount.toFixed(2)}
				</div>
				</div>

				<div className="flex flex-row w-full text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
					<div className="flex justify-start text-[16px] ">
						Discounted Price
					</div>

					<div className="flex justify-end ml-auto font-medium text-black ">
					₹{discountedPrice.toFixed(2)}
					</div>
				</div>

				<div className="flex flex-row w-full text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
					<div className="flex justify-start text-[18px] font-semibold text-black ">
						Total Paid
					</div>

					<div className="flex justify-end ml-auto font-medium text-black ">
					₹{discountedPrice.toFixed(2)}
					</div>
				</div>

				<div className=" bg-[#F3F3F3] lg:w-1/5 md:w-1/3 w-3/5 flex flex-row py-4 my-3 px-6">
					<Image src="/images/bhim.svg"
					 alt="myIcon" width={30} 
					 height={30} />
					<span className="text-[#7C7C7C] text-14px mx-2">Paid by UPI</span>
				</div>
				<div>
					<div className="my-1 text-[16px] font-medium">Updates sent to</div>
					<div className="flex flex-row items-center text-[#7C7C7C] text-xl">
						<MdOutlinePhone />
						{phone_number}
					</div>
				</div>
				<div className="my-3">
					<span className="text-[#7C7C7C]">Order ID </span>
					<span className="text-[#7C7C7C]">#{_id}</span>
				</div>
				</div>	
				
			<div>		
            <div className=" text-[16px]  text-black ">
						
						<p>Buy again</p>
						<div className="flex h-auto gap-3 my-2 mb-2 overflow-auto grid-container">
						<div className='flex gap-4'>
						{categoryDetails.map((category) => (
                        <div key={category._id} className='w-[150px] h-auto'>
                            <div className="relative">
                            <Image
                            width={200}
                            height={200}
                            src={category.images[0]?.url}
                            alt={`error`}
		                    className="w-full h-[129.2px] object-cover"
                           />
						    <div className="absolute text-black py-0.5 px-1 lg:px-1 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
							<h2 className="flex flex-row items-center gap-1 font-semibold lg:text-sm">
							<span className="text-[10px]">
                            {category.rating.rating}
                            </span>
							<span className="">
                            <Image
                              alt="heart"
                              width={25}
                              height={25}
                              className="w-2 h-2 lg:w-2 lg:h-2"
                              src={'/images/vector2.svg'}
                            />
                          </span>
						  <span className="pl-1 border-l text-[10px] border-gray-400">
                            {category.rating.count}
                          </span>
							</h2>	
							</div>	

							<div className="absolute text-black right-2 top-1 lg:top-2">
                           <h2 className="">
                          <button
                             onClick={() => handleFavouriteClick(category._id)}
                          >
                            <Image
                              width={25}
                              height={25}
                              alt="wishlist"
                              className="w-5 h-5 cursor-pointer"
                              src={
                                isFavourite(category._id)
                                  ?'/images/heart.svg': '/images/vector3.svg'
                                  
                              }
                            />
                          </button>
                        </h2>
                            </div>
                     </div>
					 <div className="overflow-hidden">
                        <span className="text-[#18181B] whitespace-nowrap font-poppins text-[9px] leading-[13px] font-semibold mb-0">
                        {category.productName}
                      </span>
                    </div>
					<div className="font-poppins text-[7px] overflow-hidden leading-[13.79px] text-left ">
                      <span className="text-[#7C7C7C] whitespace-nowrap">
                        {category.shortDescription}
                      </span>
                    </div>

					<div className="font-poppins text-[7px] leading-11 text-left">
                      <span className="text-[#7C7C7C]">
                        <span className="font-normal text-[8px] leading-9.66">
                          {category.price -
                            (category.price * category.discount) /
                              100}
                        </span>
                        <span className="line-through ml-1 font-normal text-[9px] leading-9.66">
                          {category.price}
                        </span>
                        <span className="ml-1 text-[#FF6060] font-semibold text-[9px] leading-9.66">
                          ({category.discount}% off)
                        </span>
                      </span>
                    </div>
  </div>
))}

					  </div>
					  </div>
					</div>
				</div>
      </div>
    </>
  );
};

export default OrderDetails;


