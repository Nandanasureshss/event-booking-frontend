import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import UpcomingEvents from "../src/Components/UpcomingEvents/UpcomingEvents.jsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage.jsx";
import PaymentOptions from "./Components/PaymentOptions/PaymentOptions.jsx";
import AllEvents from "./Components/AllEvents/AllEvents.jsx";
import WishList from "./Components/WishList/WishList.jsx";
import EventDetails from "./Components/EventDetails/EventDetails.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import MyOrders from "./Components/MyOrders/MyOrders.jsx";
import OrderDetails from "./Components/OrderDetails/OrderDetails.jsx";


function App() {
  return (
    <BrowserRouter>

      <Dashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment-options" element={<PaymentOptions />} />
          <Route path="/allevents" element={<AllEvents />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorder" element={<MyOrders />} />
          <Route path="/orderdetails" element={<OrderDetails />} />



        </Routes>
      </Dashboard>
    </BrowserRouter>
  );
}

export default App;
