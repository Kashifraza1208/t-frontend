
import React, {useState,useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../../UserContext';
import axios from 'axios';
import { useRouter } from 'next/router';
const LiveDemoCart = ({ liveDemoProducts, onRemoveProduct,onGoLive, setIsCart }) => {
  
  console.log('liveDemoProducts',liveDemoProducts)
  const [selectedStore, setSelectedStore] = useState(null);
  const [favourite, setFavourite] = useState(false)
  const [favourites, setFavourites] = useState([]);
  const { user, setUser } = useUser();
  const serverURL = process.env.BASE_API_URL;
  const router = useRouter();

  const uniqueStoreNames = [
    ...new Set(liveDemoProducts.map((item) => item.storeId.storeName)),
  ];

  const filterProductsByStore = (storeName) => {
    return liveDemoProducts.filter(
      (item) => item.storeId.storeName === storeName
    );
  };

  // useEffect(() => {
  //   setFavourite(user.wishList && user.wishList.includes(item.productId._id));
  // }, [user.wishList, item.productId._id]);
  
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

  const handleStoreNameClick = (storeName) => {
    const storeId = liveDemoProducts.find(
      (item) => item.storeId.storeName === storeName
    )?.storeId._id;

    if (storeId) {
      // Use Next.js router to navigate to the store page
      router.push(`/nearByStore/store?storeId=${encodeURIComponent(storeId)}`);
      
      // Close the cart modal
      setIsCart(false);
    }
  };
  return (
    <>
    <div className="px-4 lg:w-[40vw] md:w-[60vw] w-[85vw] overflow-auto h-full absolute">
      {uniqueStoreNames.map((storeName) => (
        <div key={storeName}>
          <div className="flex py-2 font-poppins">
          

          <div
              className="text-[#000000] mr-auto text-[14px] 2xl:text-[24px] xl:text-[20px] lg:text-[14px] md:text-[14px] font-semibold items-center flex"
              onClick={() => handleStoreNameClick(storeName)}
              style={{ cursor: 'pointer' }}
            >
              <h1>{storeName}</h1>
            </div>
            
            <button 
             onClick={() => {
              onGoLive(storeName, filterProductsByStore(storeName));
              setSelectedStore(storeName);
            }}
            className="bg-[#EB8105] text-black w-32 md:h-[40px] py-2 border-0 border-b-5 border-r-6 transition duration-300 ease-out">
              
              
              Go Live
             
            </button>
          </div>

          <div className="flex h-auto gap-3 my-2 mb-2 overflow-auto grid-container">
            <div className="flex gap-3">
              {filterProductsByStore(storeName).map((item) => (
                <div key={item._id} className="w-[120px] h-auto">
                  <div className="relative">
                    <Image
                      width={100}
                      height={100}
                      alt={item.productName}
                      loading="eager"
                      unoptimized={true}
                      src={item.images[0].url}
                      className="w-full h-[129.2px] object-cover"
                    />
                   <div className="absolute text-black py-0.5 px-1 lg:px-1 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
                        <h2 className="flex flex-row items-center gap-1 font-semibold lg:text-sm">
                          <span className="text-[10px]">
                            {item.rating.rating}
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
                            {item.rating.count}
                          </span>
                        </h2>
                      </div>
                      <div className="absolute text-black right-2 top-1 lg:top-2">
                        <h2 className="">
                          <button>
                            <Image
                              width={25}
                              height={25}
                              alt="wishlist"
                              className="w-5 h-5 cursor-pointer"
                              src={
                                isFavourite(item._id)
                                  ? '/images/heart.svg'
                                  : '/images/vector3.svg'
                              }
                              onClick={() => handleFavouriteClick(item._id)}

                            />
                          </button>
                        </h2>
                      </div>
                      <div className="absolute text-black md:left-1 left-1 mr-[80%] top-2 md:top-1">
                        <button 
                        onClick={() => onRemoveProduct(item._id)}
                        >
                          <Image
                            width={20}
                            height={20}
                            alt="crossbtn"
                            className="md:mx-0 block  lg:pt-1 lg:mt-0.5  xl:h-[2vh] md:h-[1.5vh] h-[1.5vh] md:h-full]"
                            src="/images/cross.svg"
                          />
                        </button>
                      </div>
                  </div>
                  <div>
                    <div className="overflow-hidden">
                      <span className="text-[#18181B] whitespace-nowrap font-poppins text-[9px] leading-[13px] font-semibold mb-0">
                        {item.productName}
                      </span>
                    </div>
                    <div className="font-poppins text-[7px] overflow-hidden leading-[13.79px] text-left ">
                      <span className="text-[#7C7C7C] whitespace-nowrap">
                        {item.shortDescription}
                      </span>
                    </div>
                    <div className="font-poppins text-[7px] leading-11 text-left">
                      <span className="text-[#7C7C7C]">
                        <span className="font-normal text-[8px] leading-9.66">
                          {item.price -
                            (item.price * item.discount) /
                              100}
                        </span>
                        <span className="line-through ml-1 font-normal text-[9px] leading-9.66">
                          {item.price}
                        </span>
                        <span className="ml-1 text-[#FF6060] font-semibold text-[9px] leading-9.66">
                          ({item.discount}% off)
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default LiveDemoCart;
