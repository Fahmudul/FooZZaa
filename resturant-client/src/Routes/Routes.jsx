import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import MenuPage from "../Pages/Menu/MenuPage/MenuPage";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
// import testRoute from "../Pages/Order/testRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Cart from "../Layout/Dashboard/Cart";
import AllUsers from "../Layout/Dashboard/AllUsers/AllUsers";
import Bookings from "../Layout/Dashboard/Bookings/Bookings";
import AddItems from "../Layout/Dashboard/Add-item/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Layout/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Layout/Dashboard/Update-item/UpdateItem";
import Payment from "../Layout/Dashboard/Payment/Payment";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <MenuPage></MenuPage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/order",
        element: (
          <PrivateRoutes>
            <testRoute></testRoute>
          </PrivateRoutes>
        ),
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
        loader: () => fetch("http://localhost:5000/count"),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "carts",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      // Admin routes
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "bookings",
        element: <Bookings></Bookings>,
      },
      {
        path: "updateitem/:id",
        element: <UpdateItem></UpdateItem>,
      },
    ],
  },
]);

export default router;
