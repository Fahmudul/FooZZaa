import Subtitle from "../../../Components/Subtitle/Subtitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
const AddItems = () => {
  const { register, handleSubmit } = useForm();
  const imgbb_api_key = import.meta.env.VITE_IMGBB_API_URL;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;
  const axiosSecure = useAxios();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    console.log(imageFile);
    // const form = new FormData();
    // form.append("image", imageFile);
    // console.log(import.meta.env.IMGBB_API_URL);
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      const addedItemResponse = await axiosSecure.post("/menu", menuItem);
      if(addedItemResponse.data.insertedId){
        alert('Menu added successfully')
      }
    }
  };
  return (
    <div>
      <Subtitle heading="Add an item" subheading="What's new" />
      <form onSubmit={handleSubmit(onSubmit)} className="text-left p-6">
        <label className="label">
          <span className="label-text">Recipe name</span>
        </label>
        <input
          className="input input-border w-full border border-gray-300 my-3"
          placeholder="Recipe Name"
          {...register("name")}
        />
        <div className="flex items-end gap-3 mb-4">
          <select
            {...register("category")}
            className="select select-bordered w-[50%]"
            defaultValue="Pizza"
          >
            <option disabled value="salad">
              Salad
            </option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="dessert">Dessert</option>
            <option value="drinks">Drinks</option>
          </select>
          <div className="w-[50%]">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              className="input input-border w-full border border-gray-300 "
              placeholder="Price"
              {...register("price")}
            />
          </div>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Recipe name</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Bio"
            {...register("recipe")}
          />
        </div>
        <div className="form-control w-full my-6">
          <input
            type="file"
            {...register("image")}
            className="file-input w-full max-w-xs"
          />
        </div>
        <button type="submit" value="Submit" className="btn">
          <FaUtensils className="ml-4" />
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItems;
