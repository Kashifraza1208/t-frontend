// Your OrderDetails.jsx component
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderDetails = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details using the orderId
    if (orderId) {
      axios
        .get(`https://your-api-url.com/orders/${orderId}`)
        .then((response) => {
          setOrderDetails(response.data); // Set order details to state
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
        });
    }
  }, [orderId]);

  if (!orderDetails) {
    return <p>Loading...</p>; // Add a loading indicator while fetching data
  }

  // Render order details using the fetched data
  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {orderDetails.orderId}</p>
      {/* Add more details based on your API response structure */}
    </div>
  );
};

export default OrderDetails;
