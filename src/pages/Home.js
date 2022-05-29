import React from "react";
import Products from "../components/Products";

const Home = () => {
  return (
    <>
      <div className="hero py-16">
        <div className="container mx-auto flex items-center justify-center text-center">
          <div className="w-1/2">
            <h6 className="text-lg">
              <em>This Is Home Component</em>
            </h6>
            <h1 className="text-3xl md:text-6xl font-bold">Home Component</h1>
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Click on Below To Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="pb-24">
        <Products />
      </div>
    </>
  );
};

export default Home;
