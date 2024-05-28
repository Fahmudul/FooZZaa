import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import img2 from "../../../assets/menu/soup-bg.jpg";
import img3 from "../../../assets/menu/salad-bg.jpg";
import img4 from "../../../assets/menu/pizza-bg.jpg";
import useCart from "../../../hooks/useCart";
const PrimaryCard = ({ item }) => {
  // const { name: title, recipe: description, image: img, price, _id } = item;
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const { refetch } = useCart();
  const handleAddToCart = async () => {
    const cartInfo = {
      cartId: item._id,
      customerEmail: user?.email,
      itemName: item?.name,
      price: item?.price,
      itemImage: item.image,
    };
    if (user) {
      // add cart by sending post request
      const res = await axiosSecure.post("/carts", cartInfo);
      if (res["data"].insertedId) {
        refetch();

        Swal.fire({
          title: "Successfully added to cart",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      }
    } else {
      Swal.fire({
        title: "You aren't logged in",
        text: "Please login to continue ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div>
      <div className="card rounded-none w-96 bg-base-100 shadow-xl min-h-[490px]">
        <figure className="relative">
          <img
            src={item ? item?.image : img2}
            alt="Shoes"
            className="rounded-none"
          />
          {item ? (
            item?.price && (
              <p className="absolute top-2 bg-[#111827] py-2 px-6 text-white right-3">
                ${12.45}
              </p>
            )
          ) : (
            <p className="absolute top-2 bg-[#111827] py-2 px-6 text-white right-3">
              ${12.45}
            </p>
          )}
        </figure>
        <div className="card-body items-center text-center rounded-none">
          <h2 className="card-title">{item ? item?.name : "chugi"}</h2>
          <p>{item ? item?.recipe : "vugi"}</p>
          <div className="card-actions">
            <button
              onClick={handleAddToCart}
              className="btn btn-outline border w-[196px] text-xl h-[64px] border-[#bb8506] hover:bg-[#1f2937] text-[#bb8506] hover:text-[#bb8506] border-t-0 border-r-0 border-l-0 shadow-none border-b-2"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryCard;
