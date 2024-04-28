import React from 'react';

const SkeletonLoader1 = () => {
     return (
    <>
    <div className="animate-pulse">
      <div className="flex flex-col">
        <div className="transition-all w-[82px] h-[82px] md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full overflow-hidden hover:shadow-lg bg-gray-300">
          {/* Replace the Image component with a div to simulate loading */}
          <div className="w-full h-full"></div>
        </div>

        <div className="w-full mt-2">
          {/* Simulate loading for the product name */}
          <div className="h-4 bg-gray-300 w-36 rounded"></div>
        </div>
      </div>

      
    </div>
    </>
  );
};

export default SkeletonLoader1;
