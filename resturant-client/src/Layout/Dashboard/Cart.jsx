import React from "react";
import useCart from "../../hooks/useCart";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cartInfo, isLoading, refetch } = useCart();
  const axiosSecure = useAxios();
  // console.log(cartInfo?.itemImage);
  const totalPrice = cartInfo.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );
  // Delete operation using tanstack query
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const data = axiosSecure.delete(`/carts/${id}`);
      console.log(data["data"]);
    },
    onSuccess: () => {
      refetch();
    },
  });
  const handleDelete = async (id) => {
    console.log(id);
    await mutateAsync(id);
  };
  return (
    <div>
      <div className="flex justify-between px-5">
        <div className="text-4xl">Items: {cartInfo.length}</div>
        <div className="text-4xl">Total Price: {totalPrice}</div>
        {cartInfo.length ? (
          <Link to="/dashboard/payment" className="text-4xl">
            <button className="btn">Pay</button>
          </Link>
        ) : (
          <button disabled className="btn cursor-not-allowed">
            Pay
          </button>
        )}
      </div>
      {/*Cart table*/}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cartInfo.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.itemImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>Purple</td>
                  <th>
                    <button className="" onClick={() => handleDelete(item._id)}>
                      <RiDeleteBin6Line className="w-6 h-6 hover:fill-red-600" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
