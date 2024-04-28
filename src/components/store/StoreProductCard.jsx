import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StoreProductCard = ({ product }) => {
	const { productName, shortDescription, price, discount } = product;
	const discountedPrice = (price - (price * discount) / 100).toFixed(2);
	return (
		<div className="flex flex-col items-start justify-between h-full w-48 shadow-lg p-2 shrink-0 hover:border">
			<div className="w-full h-44 relative">
				<Image
					src={product.images[0]?.url || '/noImage.png'}
					alt="product"
					className="w-full h-full object-cover"
					width={200}
					height={200}
				/>
				<div className="w-5 h-5 absolute top-2 right-2">
					<Image
						src={'/images/store/add_to_wishlist.svg'}
						width={20}
						height={20}
						className={`w-full h-full`}
						alt="heart"
					/>
				</div>
			</div>

			<div className="flex flex-col w-full item-start overflow-hidden">
				<Link
					href={`/products/details?productId=${product._id}`}
				>
					<h2 className="font-semibold whitespace-nowrap ">{productName}</h2>
				</Link>
				<p className="font-light h-[20px] pb-5 text-gray-500 overflow-hidden">{shortDescription}</p>
				<div className="flex flex-row items-center justify-between  w-full">
					<div className="flex flex-row gap-2 lg:gap-2">
						<p className="font-bold text-sm">₹{discountedPrice}</p>
						<p className="font-light line-through text-sm">₹{price}</p>
					</div>

					<p className="text-[green] text-sm">{discount}% off</p>
				</div>
			</div>
		</div>
	);
};

export default StoreProductCard;
