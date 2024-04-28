import React from 'react';
import PriceFilter from './PriceFilter';
import SizeFilter from './SizeFilter';
import Color from './Color';
import GenderFilter from './GenderFilter';
import BrandFilter from './BrandFilter';
import ModelFilter from './ModelFilter';
import RatingFilter from './RatingFilter';
import StateFilter from './StateFilter';
import DistrictFilter from './DistrictFilter';
import BlockFilter from './BlockFilter';




const FiltersMenu = (props) => {
  const { selectedFilters, setSelectedFilters } = props;

  return (
    <div className="flex flex-col gap-2.5 max-h-min py-4">
      <div className="hidden lg:block px-4 border-b-2 border-gray-300 h-10">
        <h3 className="text-xl font-bold">Filter</h3>
      </div>

      <div className="px-4 flex flex-col items-start gap-2">
        {/* Add PriceFilter component here */}
        <PriceFilter setSelectedFilters={setSelectedFilters} />
        <SizeFilter setSelectedFilters={setSelectedFilters}/>
        <Color setSelectedFilters={setSelectedFilters}/>
        <GenderFilter setSelectedFilters={setSelectedFilters}/>
        <BrandFilter setSelectedFilters={setSelectedFilters} />
        <ModelFilter setSelectedFilters={setSelectedFilters} />
        <RatingFilter setSelectedFilters={setSelectedFilters}/>
        <StateFilter setSelectedFilters={setSelectedFilters} />
        <DistrictFilter setSelectedFilters={setSelectedFilters} />
        <BlockFilter setSelectedFilters={setSelectedFilters} />
       
        
        
      </div>
    </div>
  );
};

export default FiltersMenu;
