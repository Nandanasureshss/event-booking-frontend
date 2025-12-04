import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard.jsx";   // PUBLIC LAYOUT
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

import AdminLandingPage from "./Components/AdminLandingPage/AdminLandingPage.jsx";
import AdminSidebar from "./pages/AdminSidebar/AdminSidebar.jsx";
import Topbar from "./pages/Topbar/Topbar.jsx";
import AdminEvents from "./Components/AdminEvents/AdminEvents.jsx";
import AddEvent from "./Components/AddEvent/AddEvent.jsx";
import AddHotels from "./Components/AddHotels/AddHotels.jsx";
import AddHotelsForm from "./Components/AddHotelsForm/AddHotelsForm.jsx";
import Payments from "./Components/Payments/Payments.jsx";
import ManageUsers from "./Components/ManageUsers/ManageUsers.jsx";
import TrackSales from "./Components/TrackSales/TrackSales.jsx";
import RecentTicketsTable from "./Components/AdminLandingPage/RecentTicketsTable.jsx";

function AppWrapper() {
  const location = useLocation();

  // detect ANY admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminPage ? (
        // ADMIN ROUTES
        <Routes>
          <Route path="/adminlandingpage" element={<AdminLandingPage />} />
          <Route path="/adminsidebar" element={<AdminSidebar />} />
          <Route path="/admintopbar" element={<Topbar />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/events/add" element={<AddEvent />} />
          <Route path="/admin/hotels" element={<AddHotels />} />
          <Route path="/admin/hotels/add" element={<AddHotelsForm />} />
          <Route path="/admin/payments" element={<Payments />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/tracksales" element={<TrackSales />} />   
          {/* <Route path="/admin/recentticket" element={<RecentTicketsTable/>} /> */}
            </Routes>
      ) : (
        // PUBLIC ROUTES
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
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
