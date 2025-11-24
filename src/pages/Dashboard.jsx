import React from "react";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";

function Dashboard({ children }) {
  return (
    <div className="main-content">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Dashboard;
