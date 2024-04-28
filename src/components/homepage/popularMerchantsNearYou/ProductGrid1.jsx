import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid1 = ({ products }) => {
    return (
        <div className="grid mt-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start items-start  lg:gap-4 w-full py-1 pt-0">
           
            {products?.map((product, key) => (
                <ProductCard key={key} productDetails={product} />
            ))}
        </div>
    );
};

export default ProductGrid1;
