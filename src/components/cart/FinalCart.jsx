import { useState, useEffect } from "react";
import axios from 'axios';
import Image from 'next/image';
import { useAuth } from '../../../src/context/AuthContext';
import CartItemCard from "./CartItemCard";

function FinalCart() {
  const { authenticated, setAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  let total = 0;
  
  useEffect(() => {
    const customerId = localStorage.getItem('customerId');

    if (customerId) {
      setAuthenticated(true);

      axios.get(`https://trialshopy-backend.onrender.com/api/v1/cart/${customerId}`)
        .then((response) => {
          let cartItem = [];
          let items = response.data[0].items;

          for (let item of items) {
            const { productName, price } = item.productId;
            const qty = item.count || 0;
            const total = qty * price;

            cartItem.push({
              productName,
              price,
              qty,
              total,
            });
          }

          setCartItems(cartItem);
          console.log('CartItems: ', cartItems);
        })
        .catch((err) => {
          throw new Error('CartAPI Error...');
        });
    }

    total = cartItems.reduce((acc, item) => acc + item.total, 0);
    setCartPrice(total);

  }, [authenticated, cartItems]);

  return (
    <div>
      {cartItems.length > 0 && (
        <>
          {cartItems.map((item) => (
            <CartItemCard
              product={item}
              key={item.productId} // Change to a unique identifier from your data
            />
          ))}

          <div className='flex flex-col my-[12px] px-5'>
            <div className='flex justify-between'>
              <h1 className='text-lg'>Product Pricing:</h1>
              <div className='flex text-lg '><h1 className='pr-[5px] font-bold'> {cartPrice}</h1></div>
            </div>
          </div>

          <div className='flex flex-col my-[12px] px-5'>
            <div className='flex justify-between'>
              <h1 className='text-lg'>Discount:</h1>
              <div className='flex text-lg '><h1 className='pr-[5px] font-bold text-[#16A34A]'>2.5%</h1></div>
            </div>
          </div>

          <hr />

          <div className='flex flex-col my-[12px] px-5'>
            <div className='flex justify-between'>
              <h1 className='text-lg'>Subtotal:</h1>
              <div className='flex text-lg '><h1 className='pr-[5px] font-bold'> {cartPrice}</h1></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FinalCart;
