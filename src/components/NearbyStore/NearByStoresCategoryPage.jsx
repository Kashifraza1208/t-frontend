import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NearbyCard from '../ProductCards/NearbyCard';
import { useRouter } from 'next/router';
import Pagination from '../pagination/Pagination';

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16; // Display sixteen products per page
  const [totalPages, setTotalPages] = useState(1); // Initialize with 1

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = stores.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.BASE_API_URL}/api/v1/stores`, { categoryId });
        const filteredStores = response.data.data.filter((item) => item.categories.includes(categoryId));
        setStores(filteredStores);
        setTotalPages(Math.ceil(filteredStores.length / productsPerPage));
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    if (categoryId) {
      fetchData();
    }
  }, [categoryId, currentPage, productsPerPage]);

  return (
    <div>
      <div className="flex flex-col gap-2 px-3 my-3">
        <div className="grid grid-cols-2 gap-6  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4">
          {displayedProducts.map((item, storeIndex) => (
            <NearbyCard
              key={storeIndex}
              like={item?.rating?.rating}
              count={item?.rating?.count}
              imageName="store1"
              shop={item?.storeName}
              logo="bxs_offer.png"
              discount="Flat 20% OFF "
              text={item?.status}
              location={item?.address1}
              distance="- 8km"
              store={item}
            />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryPage;
