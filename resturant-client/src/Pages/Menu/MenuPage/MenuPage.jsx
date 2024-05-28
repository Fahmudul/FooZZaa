import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import MenuShared from "../../Shared/MenuShared/MenuShared";
import Menu from "../../Home/Menu/Menu";
import useMenu from "../../../hooks/useMenu";
import Subtitle from "../../../Components/Subtitle/Subtitle";
import Menucategory from "../../Menucategory/Menucategory";
import menuBg from "../../../assets/menu/banner3.jpg";
import dessertBg from "../../../assets/menu/dessert-bg.jpeg";
import pizzatBg from "../../../assets/menu/pizza-bg.jpg";
import saladBg from "../../../assets/menu/salad-bg.jpg";
import soupBg from "../../../assets/menu/soup-bg.jpg";

const MenuPage = () => {
  const { menu } = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover menuBg={menuBg} />

      <Subtitle subheading="Don't miss" heading="Todays offer" />
      <Menucategory items={offered} category={offered} />
      <Menucategory
        items={desserts}
        title="Dessert"
        img={dessertBg}
        category={desserts}
      />
      <Menucategory
        items={pizza}
        title="Pizza"
        img={pizzatBg}
        category={pizza}
      />
      <Menucategory
        items={salad}
        title="Salad"
        img={saladBg}
        category={salad}
      />
      <Menucategory items={soup} title="Soup" img={soupBg} category={soup} />
    </div>
  );
};

export default MenuPage;
