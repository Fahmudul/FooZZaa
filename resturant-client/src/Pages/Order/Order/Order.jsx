import orderCover from "../../../assets/shop/banner2.jpg";
import useMenu from "../../../hooks/useMenu";
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PrimaryCard from "../../Shared/PrimaryCard/PrimaryCard";
import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import TabItem from "../TabItem/TabItem";
const Order = () => {
  const categories = ["Salad", "Pizza", "Soup", "Dessert", "Drinks"];
  const { category } = useParams();
  // console.log(category);
  const initialIndex = categories.indexOf(category);
  //   console.log(initialIndex);
  //   const [menu] = useMenu();
  const menu = [];
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");

  // console.log(pageNumberArr ay)
  // console.log(itemCount)
  return (
    <div className="">
      <Cover menuBg={orderCover} title="Order food" />
      <div className="w-[80%] mx-auto mt-10">
        <Tabs defaultIndex={initialIndex}>
          <TabList className="text-center pb-5">
            <Tab>SALAD</Tab>
            <Tab>PIZZA</Tab>
            <Tab>SOUPS</Tab>
            <Tab>DESSERTS</Tab>
            <Tab>DRINKS</Tab>
          </TabList>

          <TabPanel>
            <TabItem items={salad} category={"salad"} />
          </TabPanel>

          <TabPanel>
            <TabItem items={pizza} category={"pizza"} />
          </TabPanel>

          <TabPanel>
            <TabItem items={soup} category={"soup"} />
          </TabPanel>

          <TabPanel>
            <TabItem items={desserts} category={"dessert"} />
          </TabPanel>

          <TabPanel>
            <TabItem items={drinks} category={"drinks"} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
