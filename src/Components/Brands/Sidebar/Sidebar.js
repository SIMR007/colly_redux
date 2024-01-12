// import React, { useContext, useState } from "react";
// import SidebarFilterContext from '../../../Pages/store/sidebarFilterContext';
// import commonimagepath from "../../../Components/commonimagepath/commonimagepath"

// const Sidebar = () => {
//   const ctx = useContext(SidebarFilterContext);
//   const [searchBrand, setSearchBrand] = useState("");
//   const [priceChange, setPriceChange] = useState();
//   const [rating, setRating] = useState();
//   const [location, setLocation] = useState("");
//   const [categories, setCategories] = useState("");

//   const searchHandler = (event) => {
//     setSearchBrand(event.target.value);
//     ctx.onSearchInputChange(event.target.value);
//   };

//   const clearSearchHandler = (event) => {
//     setSearchBrand("");
//     ctx.onSearchInputChange("");
//   };

//   const handleRatingChange = (event) => {
//     setRating(event.target.value);
//     ctx.onRatingChange(event.target.value);
//   };

//   const clearRatingHandler = () => {
//     setRating("");
//     ctx.clearRating([]);
//   };

//   const handlePriceChange = (event) => {
//     setPriceChange(event.target.value);
//     ctx.onPriceChange(event.target.value);
//   };

//   const clearPriceHandler = () => {
//     setPriceChange("");
//     ctx.clearPrice([]);
//   };

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//     ctx.onLocationChange(event.target.value);
//   };

//   const clearLocationHandler = () => {
//     setLocation("");
//     ctx.clearLocation([]);
//   };

//   const handleCategoryChange = (event) => {
//     setCategories(event.target.value);
//     ctx.onCategoriesChange(event.target.value);
//   };

//   const clearRetailCategoriesHandler = () => {
//     setCategories("");
//     ctx.clearCategories([]);
//   };

//   const clearAllFiltersHandler = () => {
//     clearSearchHandler();
//     clearRatingHandler();
//     clearPriceHandler();
//     clearLocationHandler();
//     clearRetailCategoriesHandler();
//   };

//   return (
//     <div className="search_sidebar">
//       <div className="search_option">
//         <h1>Search Options</h1>
//         <a href="javascript:void(0)" onClick={clearAllFiltersHandler}>
//           Clear All
//         </a>
//       </div>

//       <div className="search">
//         <h1>
//           <span>
//             <img src={commonimagepath("search.svg")} alt="Search" /> Search
//           </span>{" "}
//           <span>
//             <a
//               href="javascript:void(0)"
//               value={searchBrand}
//               onClick={clearSearchHandler}
//             >
//               Clear All
//             </a>
//           </span>
//         </h1>
//         <input
//           type="text"
//           placeholder="Search"
//           className="form-control"
//           value={searchBrand}
//           onChange={searchHandler}
//         />
//       </div>

//       <div className="search">
//         <h1>
//           <span>
//             <img src={commonimagepath("Ratings.svg")} alt="Rating" /> Ratings
//           </span>{" "}
//           <span>
//             <a
//               href="javascript:void(0)"
//               value={rating}
//               onClick={clearRatingHandler}
//             >
//               Clear All{" "}
//             </a>
//           </span>
//         </h1>
//         <div className="rating-bar-1">
//         <input
//           type="range"
//           id="rating"
//           min={1}
//           max={5}
//           value={rating}
//           className="rating-bar"
//           onChange={handleRatingChange}
//         />
//         </div>
//       </div>

//       <div className="search">
//         <h1>
//           <span>
//             <img src={commonimagepath("Price.svg")} alt="Price" /> Price
//           </span>{" "}
//           <span>
//             <a
//               href="javascript:void(0)"
//               value={priceChange}
//               onClick={clearPriceHandler}
//             >
//               Clear All
//             </a>
//           </span>
//         </h1>

//         <div className="rating-bar-1">
//         <input
//           type="range"
//           value={priceChange}
//           className="rating-bar"
//           min={1}
//           max={3}
//           onChange={handlePriceChange}
//         />
//         </div>
//       </div>

//       <div className="search">
//         <h1>
//           <span>
//             <img src={commonimagepath("location.svg")} alt="Location" />{" "}
//             Location
//           </span>{" "}
//           <span>
//             <a
//               href="javascript:void(0)"
//               value={location}
//               onClick={clearLocationHandler}
//             >
//               Clear All
//             </a>
//           </span>
//         </h1>
//         <select
//           className="form-control"
//           value={location}
//           onChange={handleLocationChange}
//         >
//           <option value="" disabled selected>
//             e.g “Local Brands”
//           </option>
//           <option value="International">International</option>
//           <option value="Local Brands">Local Brands</option>
//         </select>
//       </div>

//       <div className="search">
//         <h1>
//           <span>
//             <img
//               src={commonimagepath("Retail-categories.svg")}
//               alt="Retail Categories"
//             />{" "}
//             Retail Categories
//           </span>{" "}
//           <span>
//             <a
//               href="javascript:void(0)"
//               value={categories}
//               onClick={clearRetailCategoriesHandler}
//             >
//               Clear All
//             </a>
//           </span>
//         </h1>
//         <select
//           className="form-control"
//           value={categories}
//           onChange={handleCategoryChange}
//         >
//           <option value="" disabled selected>
//             e.g “Fast Fashion”
//           </option>
//           <option value="High-End Brand">High-End Brand</option>
//           <option value="Street Brand">Street Brand</option>
//           <option value="Sports Brand">Sports Brand</option>
//         </select>
//       </div>

//       {/* <div className="side_footer">
//         <a href="#">
//           <img src={commonimagepath("search_btn.svg")} alt="Search Button" />
//         </a>
//       </div> */}
//     </div>
//   );
// };

// export default Sidebar;
















//Performing same logic via redux 

import React, { useContext, useState } from "react";
// import SidebarFilterContext from '../../../Pages/store/sidebarFilterContext';
import commonimagepath from "../../../Components/commonimagepath/commonimagepath"
import { useSelector,useDispatch } from "react-redux";
import { filterBrandActions } from "../../../Pages/store/filterBrand-slice";


const Sidebar = () => {
  const dispatch = useDispatch();
  // const searchBrand =  useSelector(state => state.filterBrands.searchTerm)
  // const ctx = useContext(SidebarFilterContext);
  const [searchBrand, setSearchBrand] = useState("");
  // const [priceChange, setPriceChange] = useState();
  const [rating, setRating] = useState();
  // const [location, setLocation] = useState("");
  // const [categories, setCategories] = useState("");

  const searchHandler = (event) => {
    setSearchBrand(event.target.value);
    // ctx.onSearchInputChange(event.target.value);
    dispatch(filterBrandActions.onSearchInputChange(event.target.value))
  };

  const clearSearchHandler = (event) => {
    // setSearchBrand("");
    // ctx.onSearchInputChange("");
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    dispatch(filterBrandActions.onRatingChange(event.target.value))
    console.log(event.target.value)
    // ctx.onRatingChange(event.target.value);
  };

  const clearRatingHandler = () => {
    // setRating("");
    // ctx.clearRating([]);
  };

  const handlePriceChange = (event) => {
    // setPriceChange(event.target.value);
    // ctx.onPriceChange(event.target.value);
  };

  const clearPriceHandler = () => {
    // setPriceChange("");
    // ctx.clearPrice([]);
  };

  const handleLocationChange = (event) => {
    // setLocation(event.target.value);
    // ctx.onLocationChange(event.target.value);
  };

  const clearLocationHandler = () => {
    // setLocation("");
    // ctx.clearLocation([]);
  };

  const handleCategoryChange = (event) => {
    // setCategories(event.target.value);
    // ctx.onCategoriesChange(event.target.value);
  };

  const clearRetailCategoriesHandler = () => {
    // setCategories("");
    // ctx.clearCategories([]);
  };

  const clearAllFiltersHandler = () => {
    // clearSearchHandler();
    // clearRatingHandler();
    // clearPriceHandler();
    // clearLocationHandler();
    // clearRetailCategoriesHandler();
  };

  return (
    <div className="search_sidebar">
      <div className="search_option">
        <h1>Search Options</h1>
        <a href="javascript:void(0)" onClick={clearAllFiltersHandler}>
          Clear All
        </a>
      </div>

      <div className="search">
        <h1>
          <span>
            <img src={commonimagepath("search.svg")} alt="Search" /> Search
          </span>{" "}
          <span>
            <a
              href="javascript:void(0)"
              value={searchBrand}
              onClick={clearSearchHandler}
            >
              Clear All
            </a>
          </span>
        </h1>
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          value={searchBrand}
          onChange={searchHandler}
        />
      </div>

      <div className="search">
        <h1>
          <span>
            <img src={commonimagepath("Ratings.svg")} alt="Rating" /> Ratings
          </span>{" "}
          <span>
            <a
              href="javascript:void(0)"
              value={rating}
              onClick={clearRatingHandler}
            >
              Clear All{" "}
            </a>
          </span>
        </h1>
        <div className="rating-bar-1">
        <input
          type="range"
          id="rating"
          min={1}
          max={5}
          value={rating}
          className="rating-bar"
          onChange={handleRatingChange}
        />
        </div>
      </div>

      <div className="search">
        <h1>
          <span>
            <img src={commonimagepath("Price.svg")} alt="Price" /> Price
          </span>{" "}
          <span>
            <a
              href="javascript:void(0)"
              // value={priceChange}
              onClick={clearPriceHandler}
            >
              Clear All
            </a>
          </span>
        </h1>

        <div className="rating-bar-1">
        <input
          type="range"
          // value={priceChange}
          className="rating-bar"
          min={1}
          max={3}
          onChange={handlePriceChange}
        />
        </div>
      </div>

      <div className="search">
        <h1>
          <span>
            <img src={commonimagepath("location.svg")} alt="Location" />{" "}
            Location
          </span>{" "}
          <span>
            <a
              href="javascript:void(0)"
              // value={location}
              onClick={clearLocationHandler}
            >
              Clear All
            </a>
          </span>
        </h1>
        <select
          className="form-control"
          // value={location}
          onChange={handleLocationChange}
        >
          <option value="" disabled selected>
            e.g “Local Brands”
          </option>
          <option value="International">International</option>
          <option value="Local Brands">Local Brands</option>
        </select>
      </div>

      <div className="search">
        <h1>
          <span>
            <img
              src={commonimagepath("Retail-categories.svg")}
              alt="Retail Categories"
            />{" "}
            Retail Categories
          </span>{" "}
          <span>
            <a
              href="javascript:void(0)"
              // value={categories}
              onClick={clearRetailCategoriesHandler}
            >
              Clear All
            </a>
          </span>
        </h1>
        <select
          className="form-control"
          // value={categories}
          onChange={handleCategoryChange}
        >
          <option value="" disabled selected>
            e.g “Fast Fashion”
          </option>
          <option value="High-End Brand">High-End Brand</option>
          <option value="Street Brand">Street Brand</option>
          <option value="Sports Brand">Sports Brand</option>
        </select>
      </div>

      {/* <div className="side_footer">
        <a href="#">
          <img src={commonimagepath("search_btn.svg")} alt="Search Button" />
        </a>
      </div> */}
    </div>
  );
};

export default Sidebar;










