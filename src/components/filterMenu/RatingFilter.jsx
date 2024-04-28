import { useState } from 'react';

const RatingFilter = ({ setSelectedFilters }) => {
    const [minRating, setMinRating] = useState(1);
    const [maxRating, setMaxRating] = useState(5);

    const handleRatingChange = (rating) => {
        setMinRating(rating);
        setMaxRating(rating);
        setSelectedFilters({ minRating: rating, maxRating: rating });
    };

    return (
        <div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
            <div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm">
            <h4 className="font-bold">Rating</h4>
            <br/>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <div
                        key={rating}
                        className="flex flex-row items-center gap-2.5 w-full cursor-pointer"
                        onClick={() => handleRatingChange(rating)}
                    >
                        <input
                            className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={minRating === rating && maxRating === rating}
                            onChange={() => {}}
                        />
                        <span>Rating {rating}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingFilter;
