import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxios();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  //   make Admin button
  const handleMakeAdmin = async (user) => {
    const { data } = await axiosSecure.patch(`/users/admin/${user._id}`);
    if (data.modifiedCount > 0) {
      refetch();
      alert(`${user.name} is now Admin`);
    }
  };

  const handleUserDelete = async (user) => {
    const { data } = await axiosSecure.delete(`/users/${user?._id}`);
    if (data.deletedCount > 0) {
      refetch();
    }
  };
  return (
    <div>
      <div className="flex justify-around">
        <h1 className="text-4xl">All Users</h1>
        <h1 className="text-4xl">Total Users</h1>
      </div>

      {/**Users data in table */}
      <div className="overflow-x-auto max-w-[1090px] mx-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button onClick={() => handleMakeAdmin(user)}>
                      <FaUsers className="w-6 h-6" />
                    </button>
                  )}
                </td>
                <td>
                  <button className="" onClick={() => handleUserDelete(user)}>
                    <RiDeleteBin6Line className="w-6 h-6 hover:fill-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
