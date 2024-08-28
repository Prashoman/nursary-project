// import { Category } from "../../components/Category/Category";
// import {
//   useAddCategoryMutation,
//   useGetCategoryQuery,
// } from "../../redux/api/baseApi";
// import { Model } from "../../components/Model/Model";
// import { useRef, useState } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import About from "../../components/About/About";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import HomeProduct from "../../components/HomeProduct/HomeProduct";

const Home = () => {
  

  return (
    <>
    <HeroSection/>
    <About/>
    <HomeProduct/>
    <ImageGallery/>
    </>
    

    
  );
};

export default Home;
