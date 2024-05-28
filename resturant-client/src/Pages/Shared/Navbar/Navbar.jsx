import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxios from "../../../hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };
  const axiosSecure = useAxios();
  // const queryClient = useQueryClient()
  const { data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log(cart);
  const navLink = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/order">Order</Link>
      </li>
      <li className="mr-8">
        <Link to="/dashboard/carts" className="indicator ">
          <span className="indicator-item badge badge-secondary">
            {cart.length}
          </span>
          <p>Cart</p>
        </Link>
      </li>
      {user ? (
        <>
          <p>{user?.displayName}</p>
          <button className="btn" onClick={handleLogOut}>
            Log out
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar  fixed z-10 bg-black bg-opacity-10  text-white container ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLink}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
