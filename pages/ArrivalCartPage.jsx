// pages/arrivalcart.js

import React from 'react';
import { useRouter } from 'next/router';
import ArrivalCart from '../src/components/homepage/arrival/ArrivalCart';
import FilterMenuLayout from './../src/layouts/FilterMenuLayout'
// FilterMenuLayout
const ArrivalCartPage = () => {
    return (
        <div>
          <FilterMenuLayout>
            <ArrivalCart/>
          </FilterMenuLayout>      
        </div>
    );
};

export default ArrivalCartPage;



