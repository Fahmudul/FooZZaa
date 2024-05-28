import {
  FaAd,
  FaBook,
  FaCalendar,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const {isAdmin} = useAdmin();
  // console.log(isAdmin)
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-slate-300">
        <ul>
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addItems"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageItems"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/bookings"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/userhome"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/reservation"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaCalendar />
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/carts"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaShoppingCart />
                  My Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/review"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaAd />
                  Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/bookings"
                  className="flex items-center mb-3 gap-2 text-xl font-bold"
                >
                  <FaList />
                  My Bookings
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
