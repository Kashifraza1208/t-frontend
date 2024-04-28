// pages/account/orders/OrderDetailsPage/[orderId].jsx

import { useRouter } from 'next/router';
import React from 'react';
import OrderDetails from '../../../src/components/orders/OrderDetails';
import SidebarLayout from "../../../src/layouts/SidebarLayout"
const OrderDetailsPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  console.log('orderId:', orderId); // Log the orderId to the console

  return (
    <SidebarLayout>
      <OrderDetails orderId={orderId}/>
    </SidebarLayout>
  );
};

export default OrderDetailsPage;
