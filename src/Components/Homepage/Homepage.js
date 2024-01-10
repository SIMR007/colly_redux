import React from "react";
import HeaderSection from "./HeaderSection/HeaderSection";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import ReviewAchievement from "./ReviewAchievement/ReviewAchievement";
import OwnFashion from "./OwnFashion/OwnFashion";
import TBD_News from "./TBD_News/TBD_News";
import Footer from "./Footer/Footer";

const Homepage = () => {
  return (
    <>
      <HeaderSection />

      <CategoriesSection />

      <ReviewAchievement />

      <OwnFashion />

      <TBD_News />

      <Footer />
    </>
  );
};

export default Homepage;
