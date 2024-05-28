import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Chefrecommends from "../Chefrecommends/Chefrecommends";
import FromMenu from "../FromMenu/FromMenu";
import Menu from "../Menu/Menu";
import ProductBanner from "../ProductBanner/ProductBanner";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner />
      <ProductBanner />
      <Menu />
      <Chefrecommends />
      <FromMenu />
      <Testimonial />
    </div>
  );
};

export default Home;
