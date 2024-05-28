import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  // console.log(location)
  const withoutHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div className="container mx-auto">
      {withoutHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
