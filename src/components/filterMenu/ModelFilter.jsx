import { useState } from 'react';

const ModelFilter = ({ setSelectedFilters }) => {
    const [minDiscount, setMinDiscount] = useState(10);

    const handleDiscountChange = (value) => {
        setMinDiscount(value);
        setSelectedFilters({ minDiscount: value });
    };

    return (
        <div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
            <div className="flex flex-col items-start gap-2 w-full">
                <h4 className="font-bold mb-2">Discount</h4>
                {[10, 20, 30, 40, 50].map((discount) => (
                    <div
                        key={discount}
                        className="flex flex-row items-center gap-2.5 w-full cursor-pointer"
                        onClick={() => handleDiscountChange(discount)}
                    >
                        <input
                            className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                            type="radio"
                            name="discount"
                            value={discount}
                            checked={minDiscount === discount}
                            onChange={() => {}}
                        />
                        <span>{discount}% and above</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModelFilter;
