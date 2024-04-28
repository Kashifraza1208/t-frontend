import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '../../UserContext';

function ShopNowCard() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [changeImage, setChangeImage] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const productId = router.query.productId;
  const serverURL = process.env.BASE_API_URL;
  const { user, setUser } = useUser();
  const [favourites, setFavourites] = useState([]);
  

  const [liveDemoProducts, setLiveDemoProducts] = useState([]);
  
  const { storeName } = router.query;

  const fetchLiveDemoProducts = async () => {
    const customerId = user?._id ||  localStorage.getItem('customerId');
    try {
      const response = await axios.get(
        `${serverURL}/api/v1/liveDemo/${customerId}`
      );

      const data = response.data;
      console.log('ShopNowCard Data:', data);

      if (data.items) {
        // Filter products based on storeName
        const filteredProducts = storeName
          ? data.items.filter(
              (liveDemoProduct) =>
                liveDemoProduct.storeId.storeName === storeName
            )
          : data.items;

        setLiveDemoProducts(filteredProducts);
      } else {
        console.warn('Invalid live demo products data format:', data);
      }
    } catch (error) {
      console.error('Error fetching live demo products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveDemoProducts();
  }, [storeName]);
  useEffect(() => {
    setFavourites(user.wishList || []);
  }, [user.wishList]);

  
  const isFavourite = (productId) => {
    return favourites.includes(productId);
  };
 
  const handleFavouriteClick = (productId) => {
    setFavourite(!favourite);
    const customerId = user?._id ||  localStorage.getItem('customerId');

    let api = '';

    if (!favourite) {
      api = `${serverURL}/api/v1/addWishList/${customerId}/${productId}`;
      axios
        .post(api)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          console.log('pro add', res.data);
        })
        .catch((err) => console.error(err));
    } else {
      api = `${serverURL}/api/v1/deleteWishList/${customerId}/${productId}`;
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

  return (
    <>
      <div className="w-full mt-6">
        <div className="w-full h-full overflow-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 md:grid-col-4">
                {liveDemoProducts.map((liveDemoProduct) => (
                  <div key={liveDemoProduct._id} className="relative w-full h-auto">
                    
                    <div className="relative block w-full overflow-hidden">
                    <Link
                      href={`/products/details?productId=${liveDemoProduct._id}`}
                    >
                      <Image
                        width={500}
                        height={500}
                        src={liveDemoProduct.images[0].url}
                        alt={liveDemoProduct.productName}
                        className="block object-cover min-w-[80px] w-full h-[120px] xl:h-[256px] lg:h-[200px] md:h-[20vh]"
                      />
                    </Link>

                    <div className="absolute flex text-black py-0.5 lg:py-1  px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
                    <h2 className="flex flex-row items-center gap-1 text-[11px] lg:text-sm font-semibold">
                    {liveDemoProduct.rating?.rating}
                    </h2>
                    <span className="">
                    <Image
                      alt="heart"
                      width={25}
                      height={25}
                      className="w-2 h-2 lg:w-4 lg:h-4"
                      src={'/images/vector2.svg'}
                    />
                    </span>
                    <span className="pl-1 border-l border-gray-400 text-[12px]">
                    {liveDemoProduct.rating?.count}
                    </span>
                    </div>
                    <div className="absolute text-black right-2 lg:right-7 top-2 lg:top-3 ">
              <h2 className="">
                <button>
                <Image
  width={25}
  height={25}
  alt="ecommerce"
  className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
  src={
    isFavourite(liveDemoProduct._id)
      ? '/images/heart.svg'
      : '/images/vector3.svg'
  }
  onClick={() => handleFavouriteClick(liveDemoProduct._id)}
/>

                </button>
              </h2>
            </div>
                    </div>
                    <div className='flex flex-col w-full gap-2 mt-2 item-center'> 
                      <p className="text-[#18181B] font-poppins text-sm lg:text-[20px] leading-[20px] font-semibold ">
                        {liveDemoProduct.productName}
                      </p>
                     
                      <p className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
                        {liveDemoProduct.shortDescription}
                      </p>

                      <div className="font-poppins text-[7px] leading-11 text-left">
                        <span className="text-[#7C7C7C]">
                          <span className="font-normal text-xs lg:text-sm leading-9.66">
                            {liveDemoProduct.price -
                              (liveDemoProduct.price * liveDemoProduct.discount) / 100}
                          </span>
                          <span className="line-through ml-1 font-normal text-xs lg:text-sm leading-9.66">
                            {liveDemoProduct.price}
                          </span>
                          <span className="ml-1 text-[#FF6060] font-semibold text-xs lg:text-sm leading-9.66">
                            ({liveDemoProduct.discount}% off)
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShopNowCard;
