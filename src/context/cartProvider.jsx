import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartData, setCartData] = useState({
		address: null,
		userDetails: null,
		productDetails: null,
		pricingDetails: null,
	});

	const updateCart = (
		newAddress,
		newUserDetails,
		newProductDetails,
		newPricingDetails
	) => {
		setCartData({
			address: newAddress,
			userDetails: newUserDetails,
			productDetails: newProductDetails,
			pricingDetails: newPricingDetails,
		});
	};

	return (
		<CartContext.Provider value={{ cartData, setCartData, updateCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
