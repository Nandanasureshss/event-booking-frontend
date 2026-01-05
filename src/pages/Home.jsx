import React, { useRef } from "react";

import Hero from "../Components/Hero/Hero.jsx";
import PopularEvents from "../Components/PopularEvents/PopularEvents.jsx";
import Steps from "../Components/Steps/Steps.jsx";
import Categories from "../Components/Categories/Categories.jsx";

function Home({ popularRef, categoryRef }) {
 

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* POPULAR EVENTS */}
      <div ref={popularRef} className="scroll-section">
        <PopularEvents />
      </div>

      {/* STEPS */}
      <Steps />

      {/* CATEGORIES */}
      <div ref={categoryRef} className="scroll-section">
        <Categories />
      </div>
    </>
  );
}

export default Home;
