import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
function Home() {
  return (
    <>
      <Header />
      <Carousel carouselTitle={"Popular"} isCuisine={false} />
      <Carousel carouselTitle={"Indian"} isCuisine={true} />
    </>
  );
}

export default Home;
