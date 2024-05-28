import MenuShared from "../Shared/MenuShared/MenuShared";
import Cover from "../Shared/Cover/Cover";
import { Link } from "react-router-dom";

const Menucategory = ({ title, img, items,  }) => {
  return (
    <div className="pt-8">
      {title && <Cover menuBg={img} title={title} />}
      <div className="grid grid-cols-2 gap-7 mt-16">
        {items.map((item) => (
          <MenuShared
            key={item._id}
            img={item.image}
            title={item.name}
            description={item.recipe}
            amount={item.price}
          />
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn btn-block mt-5">Order Food</button>
      </Link>
    </div>
  );
};

export default Menucategory;
