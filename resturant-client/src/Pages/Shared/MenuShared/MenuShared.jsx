import React from "react";

const MenuShared = ({ title, description, img, amount }) => {
  return (
    <div>
      <div className="flex gap-2">
        <img
          src={img}
          className="w-24 "
          style={{ borderRadius: "0 200px 200px 200px" }}
          alt=""
        />
        <div className="min-w-[615px] ">
          <h1>{title} ------------------</h1>
          <p>{description}</p>
        </div>
        <div className="text-yellow-500">
          <span>${amount}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuShared;
