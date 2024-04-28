import { useState } from 'react';
import Image from 'next/image';

const ColorFilter = ({ setSelectedFilters }) => {
    const [selectedColor, setSelectedColor] = useState('');

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedFilters({ color });
        console.log(`Filtering products by color: ${color}`);
    };

    return (
        <div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
            <div className="flex flex-row justify-between w-full">
                <h4 className="font-bold">Color</h4>
                <Image
                    className="duration-200"
                    src="/images/keyboard_arrow_down.svg"
                    width={20}
                    height={20}
                    alt="SVG map icon"
                />
            </div>
            <div className={`flex flex-col items-start justify-start w-full gap-2`}>
                <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
                    <input
                        className="h-4 w-4 appearance-none bg-red checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                        type="radio"
                        name="color"
                        value="red"
                        checked={selectedColor === 'red'}
                        onChange={() => handleColorChange('red')}
                    />
                    <span>Red</span>
                </div>
                <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
                    <input
                        className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                        type="radio"
                        name="color"
                        value="Black"
                        checked={selectedColor === 'Black'}
                        onChange={() => handleColorChange('Black')}
                    />
                    <span>Black</span>
                </div>
                <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
                    <input
                        className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                        type="radio"
                        name="color"
                        value="white"
                        checked={selectedColor === 'white'}
                        onChange={() => handleColorChange('white')}
                    />
                    <span>White</span>
                </div>
                <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
                    <input
                        className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                        type="radio"
                        name="color"
                        value="green"
                        checked={selectedColor === 'green'}
                        onChange={() => handleColorChange('green')}
                    />
                    <span>Green</span>
                </div>
                <div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
                    <input
                        className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                        type="radio"
                        name="color"
                        value="pink"
                        checked={selectedColor === 'pink'}
                        onChange={() => handleColorChange('pink')}
                    />
                    <span>Pink</span>
                </div>
            </div>
        </div>
    );
};

export default ColorFilter;
