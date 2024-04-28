import { useState } from 'react';

const DiscountFilter = ({ setSelectedFilters }) => {
    const [minDiscount, setMinDiscount] = useState(10); // Default minimum discount
    const [maxDiscount, setMaxDiscount] = useState(100); // Default maximum discount

    const handleMinDiscountChange = (value) => {
        setMinDiscount(Number(value));
        setSelectedFilters({ minDiscount: Number(value) });
    };

    const handleMaxDiscountChange = (value) => {
        setMaxDiscount(Number(value));
        setSelectedFilters({ maxDiscount: Number(value) });
    };

    return (
        <div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
            <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex flex-row justify-between bg-gray-700 text-white w-full p-1 rounded">
                    <p>{minDiscount}% and above</p>
                    <p className="font-bold">to</p>
                    <p>{maxDiscount}% and above</p>
                </div>
                <div className="flex w-full py-1">
                    <input
                        type="range"
                        className="w-1/2 bg-[#B3B3B3] h-0.5 rounded-full accent-gray-700"
                        min={10}
                        max={100} // Set the appropriate max value for your discount range
                        value={minDiscount}
                        onChange={(e) => {
                            handleMinDiscountChange(e.target.value);
                        }}
                    />
                    <input
                        type="range"
                        className="w-1/2 bg-[#B3B3B3] h-0.5 rounded-full accent-gray-700"
                        min={10}
                        max={100} // Set the appropriate max value for your discount range
                        value={maxDiscount}
                        onChange={(e) => {
                            handleMaxDiscountChange(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm">
                {["10%", "20%", "30%", "40%", "50%"].map((discount) => (
                    <div
                        key={discount}
                        className="flex flex-row items-center gap-2.5 w-full cursor-pointer"
                    >
                        <input
                            className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                            type="radio"
                            name="discount"
                            value={discount}
                            checked={minDiscount === parseInt(discount) && maxDiscount === parseInt(discount)}
                            onChange={() => {
                                handleMinDiscountChange(parseInt(discount));
                                handleMaxDiscountChange(parseInt(discount));
                            }}
                        />
                        <span>{discount} and above</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscountFilter;
