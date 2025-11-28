import React from "react";
import Hero from "../Components/Hero/Hero.jsx";
import PopularEvents from "../Components/PopularEvents/PopularEvents.jsx";
import Steps from "../Components/Steps/Steps.jsx";
import Categories from "../Components/Categories/Categories.jsx";
import ProfilePage from "../Components/ProfilePage/ProfilePage.jsx";

function Home() {
  return (
    <>
      <Hero />
      <PopularEvents />
      <Steps />
      <Categories />
    </>
  );
}

export default Home;
