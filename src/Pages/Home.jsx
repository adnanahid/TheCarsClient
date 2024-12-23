import React from "react";
import Banner from "../Components/Banner";
import WhyChooseUs from "../Components/WhyChooseUs";
import RecentCars from "../Components/RecentCars";
import Testimonials from "../Components/Testimonials";
import SpecialOffers from "../Components/SpecialOffers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WhyChooseUs></WhyChooseUs>
      <RecentCars></RecentCars>
      <Testimonials></Testimonials>
      <SpecialOffers></SpecialOffers>
    </div>
  );
};

export default Home;
