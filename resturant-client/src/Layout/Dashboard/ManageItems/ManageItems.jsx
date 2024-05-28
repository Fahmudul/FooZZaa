import { RiDeleteBin6Line } from "react-icons/ri";
import Subtitle from "../../../Components/Subtitle/Subtitle";
import useMenu from "../../../hooks/useMenu";
import { FaPen } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const { menu, refetch, isLoading } = useMenu();
  const axiosSecure = useAxios();
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const data = await axiosSecure.delete(`/menu/${id}`);
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
  //   const cartInfo = [];
  // console.log(menu)
  return (
    <div>
      <Subtitle heading="Manage All Items" subheading="Hurry up" />
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
              {menu.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.image}
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
                  <th>
                    <Link to={`/dashboard/updateitem/${item._id}`} className="">
                      <FaPen className="w-6 h-6 hover:fill-red-600" />
                    </Link>
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

export default ManageItems;
