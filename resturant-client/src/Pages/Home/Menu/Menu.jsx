import React from "react";
import Subtitle from "../../../Components/Subtitle/Subtitle";
import img1 from "../../../assets/menu/menu-bg.png";
import img2 from "../../../assets/menu/soup-bg.jpg";
import img3 from "../../../assets/menu/salad-bg.jpg";
import img4 from "../../../assets/menu/pizza-bg.jpg";
import MenuShared from "../../Shared/MenuShared/MenuShared";
import useMenu from "../../../hooks/useMenu";
const Menu = () => {
  const { menu } = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  return (
    <div>
      <Subtitle subheading="Check it out" heading="FROM OUR MENU"></Subtitle>
      <div className="grid grid-cols-2 gap-5">
        {popular.map((item) => (
          <MenuShared
            key={item._id}
            img={item.image}
            title={item.name}
            description={item.recipe}
            amount={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
