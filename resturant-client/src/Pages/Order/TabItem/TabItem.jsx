import { useEffect, useState } from "react";
import PrimaryCard from "../../Shared/PrimaryCard/PrimaryCard";
import "./TabItem.css";
const TabItem = ({ category }) => {
  //   const itemsCount = 5;
  // console.log(category)
  const [items, setItems] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(3);
  //   console.log(category);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get menu by category
        const categoryResponse = await fetch(
          `http://localhost:5000/menucategory/?category=${category}&skip=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await categoryResponse.json();
        setItems(data);
        // get menu item count
        const response = await fetch(
          `http://localhost:5000/count/?category=${category}`
        );
        const productCounts = await response.json();
        // setProductCount(p)
        // console.log(productCounts["productCounts"]);
        setProductCount(productCounts["productCounts"]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [category, itemsPerPage, currentPage]);
  const itemCountInt = parseInt(productCount);
  const pageNumber = Math.ceil(itemCountInt / itemsPerPage);
  const pageNumberArray = [...Array(pageNumber).keys()];
  const handlePrev = () => {
    // console.log(currentPage);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pageNumber) {
      setCurrentPage(currentPage + 1);
    }
  };

  //   handle Item per page
  const handleItemPerPage = (e) => {
    setItemsPerPage(e.target.value);
    setCurrentPage(1);
  };
  //   console.log(pageNumberArray);
  //   console.log(currentPage);
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {items.map((item) => (
          <PrimaryCard
            key={item._id}
            // title={item.name}
            // description={item.recipe}
            // img={item.image}
            // price={item.price}
            item={item}
          />
        ))}
      </div>
      {/** Pagination control */}
      <p>Page: {currentPage}</p>
      <div className=" flex justify-center gap-3 mt-6">
        <button className="btn" onClick={handlePrev}>
          Prev
        </button>
        {pageNumberArray.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page + 1)}
            className={currentPage === page + 1 ? "selected btn" : "btn"}
          >
            {page + 1}
          </button>
        ))}
        <button className="btn" onClick={handleNext}>
          Next
        </button>
        <select name="" id="" onChange={(e) => handleItemPerPage(e)}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

export default TabItem;

/**
 * const binaryCode = `001010 1000110 001001001`
 * const binaryToString(binaryCode) =>{
 *
 * return binaryCode.split('/n').reduce((string, binary))=>{
 * return (string += String.fromCharCode(parseInt(binary,2)));
 * }
 *
 * }
 *
 */
