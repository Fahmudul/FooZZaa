import React from "react";
import Subtitle from "../../../Components/Subtitle/Subtitle";
import PrimaryCard from "../../Shared/PrimaryCard/PrimaryCard";
import img2 from "../../../assets/menu/soup-bg.jpg";
import img3 from "../../../assets/menu/salad-bg.jpg";
import img4 from "../../../assets/menu/pizza-bg.jpg";
const Chefrecommends = () => {
  return (
    <div className="">
      <Subtitle heading="CHEF RECOMMENDS" subheading="Should Try" />
      <div className="flex border w-[80%] mx-auto justify-between">
        <PrimaryCard
          title="Caeser Salad"
          description="Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          img={img2}
        />
        <PrimaryCard
          title="Caeser Salad"
          description="Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          img={img3}
        />
        <PrimaryCard
          title="Caeser Salad"
          description="Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets."
          img={img4}
        />
      </div>
    </div>
  );
};

export default Chefrecommends;
