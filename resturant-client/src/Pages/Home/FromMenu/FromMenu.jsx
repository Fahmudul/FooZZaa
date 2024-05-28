import React from "react";
import featured from "../../../assets/home/featured.jpg";
import Subtitle from "../../../Components/Subtitle/Subtitle";
import "./FromMenu.css";
import featuredbg from "../../../assets/home/featured.jpg";
const FromMenu = () => {
  return (
    <div className="bg-image  text-white h-[848px] flex flex-col justify-center mt-[100px]">
      <Subtitle subheading="Check it out" heading="FROM OUR MENU" />
      <div className="flex  justify-center gap-5 ">
        <img src={featuredbg} className="w-[600px] h-[300px]" alt="" />
        <div className="text-white  flex flex-col justify-center ">
          <h1>March 20, 2023</h1>
          <h1>WHERE CAN I GET SOME</h1>
          <p className="max-w-[604px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <div className="mt-6">
            <button className="btn btn-outline border  text-lg border-[#fff] hover:bg-[#1f2937] text-white border-t-0 border-r-0 border-l-0 shadow-none border-b-2">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromMenu;
